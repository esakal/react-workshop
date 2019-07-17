import React, {Component} from 'react';
import Chatkit from '@pusher/chatkit-client';


function log(severity: 'info' | 'warn' | 'error', method: string, message : string, data: Record<string, any>) {
	console[severity](`[ChannelService().${method}()] ${message}`, data);
}

export interface ChatChannel {
	id: string;
	name: string;

}

export interface ChatUser {
	id: string;
	name: string;
	avatarURL: string
}

export interface ChatMessage {
	id: string;
	sender: ChatUser;
	content: string;
	createdAt: string;
}

export interface ChannelsService {
	user: ChatUser | null;
	userChannels: ChatChannel[],
	joinableChannels: ChatChannel[],
	activeChannel: ChatChannel | null,
	activeChannelMessages: ChatMessage[],
	activateChannel(channelId: string): void;
	connect(): Promise<void>;
	sendMessage(message: string): void;
	deleteMessage(messageId: string): void;
	createChannel(name: string): void;
	updateJoinableChannels(): void;
}

interface ChannelsProviderState {
	value: ChannelsService
}

interface ChannelsProviderProps {
	children: React.ReactNode
}

export class ChannelsProvider extends Component<ChannelsProviderProps, ChannelsProviderState> {
	private _chatManager: any = null;
	private _currentUser: any = null;

	state: ChannelsProviderState = {
		value: {
			user: null,
			userChannels: [],
			joinableChannels: [],
			activeChannel: null,
			activeChannelMessages: [],
			connect: this.connect.bind(this),
			activateChannel: this.activateChannel.bind(this),
			sendMessage: this.sendMessage.bind(this),
			deleteMessage: this.deleteMessage.bind(this),
			createChannel: this.createAChannel.bind(this),
			updateJoinableChannels: this.updateJoinableChannels.bind(this)

		}
	}

	connect(): Promise<void> {
		const userId = process.env.REACT_APP_USER_ID;
		const tokenProviderUrl = process.env.REACT_APP_CHATKIT_TOKEN_PROVIDER;
		const instanceLocator = process.env.REACT_APP_CHATKIT_INSTANCE_LOCATOR;
		// TODO throw error if failed to extract
		// TODO add env template

		const tokenProvider = new Chatkit.TokenProvider({
			url: tokenProviderUrl
		});

		this._chatManager = new Chatkit.ChatManager({
			instanceLocator,
			userId,
			tokenProvider: tokenProvider
		});


		return this._chatManager
			.connect({
				onRoomUpdated: (room: ChatChannel) => {

				},
				onAddedToRoom: (room: any) => {
					this.setState(prevState => {
						const chatChannel = this._toChatChannel(room);
						const userChannels = [...prevState.value.userChannels, chatChannel];
						const joinableChannels = prevState.value.joinableChannels.filter(item => item.id !== chatChannel.id);

						return {
							...prevState,
							value: {
								...prevState.value,
								userChannels,
								joinableChannels
							}
						}
					})
				},
				onRemovedFromRoom: (room: any) => {
					this.setState(prevState => {
						const chatChannel = this._toChatChannel(room);
						const userChannels = prevState.value.userChannels.filter(item => item.id !== chatChannel.id);
						const joinableChannels = [...prevState.value.joinableChannels, chatChannel];
						const isRemovedFromActive = prevState.value.activeChannel && prevState.value.activeChannel.id === chatChannel.id;


						return {
							...prevState,
							value: {
								...prevState.value,
								userChannels,
								joinableChannels,
								activeChannel: isRemovedFromActive ? null : prevState.value.activeChannel,
								activeChannelMessages: isRemovedFromActive ? [] : prevState.value.activeChannelMessages,
							}
						}
					})
				},
				onRoomDeleted: (room: any) => {
					this.setState(prevState => {
						const chatChannel = this._toChatChannel(room);
						const userChannels = prevState.value.userChannels.filter(item => item.id !== chatChannel.id);
						const joinableChannels = prevState.value.joinableChannels.filter(item => item.id !== chatChannel.id);
						const isActiveChannelDeleted = prevState.value.activeChannel && prevState.value.activeChannel.id === chatChannel.id;

						return {
							...prevState,
							value: {
								...prevState.value,
								userChannels,
								joinableChannels,
								activeChannel: isActiveChannelDeleted ? null : prevState.value.activeChannel,
								activeChannelMessages: isActiveChannelDeleted ? [] : prevState.value.activeChannelMessages,
							}
						}
					})
				},
			})
			.then((currentUser: any) => {
				log('info', 'connect', 'user connected', { currentUser });
				this._currentUser = currentUser;

				const userChannels = currentUser.rooms.map(this._toChatChannel);

				const user = this._toChatUser(currentUser);

				return this._getJoinableChannels()
					.then(joinableChannels => {
						this.setState(prev => ({
							value: {
								...prev.value,
								user,
								userChannels,
								joinableChannels: joinableChannels.map(this._toChatChannel)
							}
						}));

						return;
					});

			})
			.catch((error: Error) => {
				log('error', 'connect', 'failed to connect user', { error });
				throw error;
			});
	}

	activateChannel(channelId: string): void {
		this.invariantConnected();
		const isJoined = this.state.value.userChannels.some(channel => channel.id === channelId);

		log('info', 'activateChannel', 'user request to activate channel', {channelId, isJoined});

		let verify = Promise.resolve();

		if (!isJoined) {
			verify = this._currentUser.joinRoom({roomId: channelId})
				.then(() => {
					log('info', 'activateChannel', 'user joined channel', {channelId});
				})
				.catch((error: any) => {
					log('error', 'activateChannel', 'failed to join channel', {error});

					if (error.info.error === "services/chatkit/not_found/channel_not_found") {
						this.updateJoinableChannels();
					}
					throw error;
				});
		}

		verify.then(() => {
			this.setState(prevState => {

				const userChannel = prevState.value.userChannels.find(channel => channel.id === channelId);
				const joinableChannel = prevState.value.joinableChannels.find(channel => channel.id === channelId);

				if (!userChannel && !joinableChannel) {
					return prevState;
				}

				return {
					value: {
						...prevState.value,
						activeChannel: userChannel || joinableChannel || null,
						activeChannelMessages: []
					}
				}
			}, this._subscribeToActiveChannel);
		});
	}

	private _subscribeToActiveChannel = () => {
		log('info', '_subscribeToActiveChannel', 'subscribe to active channel ', {});

		this._unsubsribeToActiveChannel();

		if (!this.state.value.activeChannel) {
			return;
		}

		const channelId = this.state.value.activeChannel.id;

		this._currentUser.fetchMessages({
			roomId: channelId,
		})
			.then((messages: ChatMessage[]) => {
				if (!this.state.value.activeChannel || this.state.value.activeChannel.id !== channelId) {
					return;
				}

				this._currentUser.subscribeToRoom({
					roomId: channelId,
					hooks: {
						onMessage: (message: ChatMessage) => {
							log('info', '_subscribeToActiveChannel', `channel ${channelId} got new message`, { message });
							this.setState(prevState => ({
								value: {
									...prevState.value,
									activeChannelMessages: [
										...prevState.value.activeChannelMessages,
										this._toChatMessage(message)
										]
								}
							}));
						},
						onMessageDeleted: (messageId: string) => {
							log('info', '_subscribeToActiveChannel', `channel ${channelId} notifies that message ${messageId} was deleted`, { messageId });
							this.setState(prevState => {
								const messageIndexId = prevState.value.activeChannelMessages.findIndex(message => message.id === messageId);

								if (messageIndexId === -1) {
									return prevState;
								}

								return {
									value: {
										...prevState.value,
										activeChannelMessages:
											prevState.value.activeChannelMessages.splice(
												messageIndexId, 1
											)
									}
								}
							});
						},
					},
					messageLimit: 0
				})
				log('info', '_subscribeToActiveChannel', 'user listening to a channel', { messages });
				this.setState(prevState => ({
					value: {
						...prevState.value,
						activeChannelMessages: messages.map(message => this._toChatMessage(message))
					}
				}));
			})
			.catch((error: Error) => {
				log('error', '_subscribeToActiveChannel', 'failed to connect user', { error });
				// TODO handle errors
				throw error;
			});
	}

	private _toChatChannel(channel: any): ChatChannel {
		return {
			id: channel.id,
			name: channel.name
		}
	}
	private _toChatUser(user: any): ChatUser {
		return {
			id: user.id,
			name: user.name,
			avatarURL: `https://github.com/${user.id}.png?size=40`
		};
	}

	private _toChatMessage(message: any): ChatMessage {
		return {
			id: message.id,
			sender: this._toChatUser(message.userStore.snapshot()[message.senderId]),
			content: message.text,
			createdAt: message.createdAt
		};
	}

	private _unsubsribeToActiveChannel = () : void => {
		this.invariantConnected();

		if (this.state.value.activeChannel === null) {
			return;
		}

		const subscription = this._currentUser.roomSubscriptions[this.state.value.activeChannel.id];

		if (!subscription) {
			return;
		}
		log('info', '_unsubsribeToActiveChannel', 'unsubscribe to active channel', {activeChannel: this.state.value.activeChannel});

		subscription.cancel();
	}

	updateAChannelName(channelId: string, name: string): Promise<void> {
		this.invariantConnected();
		log('info', 'updateAChannelName', 'user request to update a channel name', { channelId, name });
		return this._currentUser.updateRoom({
			roomId: channelId,
			name
		})
			.then(() => {
				log('info', 'updateAChannelName', 'user updated a channel name', { channelId });

			})
			.catch((error: Error) => {
				log('error', 'subscribeToAChannel', 'failed to update a channel name', { error });
				throw error;
			})
	}

	createAChannel(channelName: string): Promise<void> {
		this.invariantConnected();
		log('info', 'createAChannel', 'user request to create a new channel', { channelName });

		return this._currentUser.createRoom({
			name: channelName,
			private: false,
		}).then((room: any) => {
			const chatChannel = this._toChatChannel(room);
			log('info', 'createAChannel', 'channel created', { chatChannel });
			this.setState({
				value: {
					...this.state.value,
					activeChannel:chatChannel,
					activeChannelMessages: []
				}
			})
		})
			.catch((error: Error) => {
				log('error', 'createAChannel', 'failed to create a channel', { error });
				throw error;
			})
	}

	updateJoinableChannels() {
		this._getJoinableChannels()
			.then((joinableChannels) => {
				this.setState({
					value: {
						...this.state.value,
						joinableChannels
				}})
			})
	}
	private _getJoinableChannels(): Promise<ChatChannel[]> {
		this.invariantConnected();
		log('info', 'getJoinableChannels', 'user request to get joinable channel list', {});
		return this._currentUser.getJoinableRooms()
			.then((rooms: any) => {
				const channels = rooms.map(this._toChatChannel);
				log('info', 'getJoinableChannels', 'got list of joinable channels', { channels });
				return channels;
			})
			.catch((error: Error) => {
				log('error', 'subscribeToAChannel', 'failed to get joinable channel list', { error });
				throw error;
			})
	}

	deleteMessage(messageId: string) {
		this.invariantConnected();

		if (!this.state.value.activeChannel) {
			return;
		}

		const channelId = this.state.value.activeChannel.id;
		log('info', 'deleteMessage', 'user request to delete a message', { channelId, messageId });

		this._currentUser.serverInstanceV2
			.request({
				method: "DELETE",
				path: `/rooms/${encodeURIComponent(channelId)}/messages/${encodeURIComponent(messageId)}`,
			})
			.then(() => {
				log('info', 'deleteMessage', 'message deleted', { channelId, messageId });
			})
			.catch((error: Error) => {
				log('error', 'deleteMessage', 'failed to delete a message', { error });
				throw error;
			})
	}
	sendMessage(message: string): Promise<void> {
		this.invariantConnected();

		if (!this.state.value.activeChannel) {
			return Promise.reject(new Error('failed to find active channel'));
		}

		const channelId = this.state.value.activeChannel.id;
		log('info', 'sendMessage', 'user request to send a message', { channelId, message });


		return this._currentUser.sendSimpleMessage({
			text: message,
			roomId: channelId
		}).then(() => {
			log('info', 'sendMessage', 'message sent', { channelId, message });
		})
			.catch((error: Error) => {
				log('error', 'sendMessage', 'failed to send a message', { error });
				throw error;
			})
	}

	private invariantConnected(): void {
		if (!this._chatManager || !this._currentUser) {
			throw new Error(`user is not connected`);
		}
	}

	render() {
		return (
			<ChannelsContext.Provider value={this.state.value}>
				{this.props.children}
			</ChannelsContext.Provider>
		)
	}
}

export const ChannelsContext = React.createContext<ChannelsService>({} as any);

interface WithChannelsContext {
	channelsService: ChannelsService
}

export function withChannelsService<TProps extends WithChannelsContext>(WrappedComponent: React.ComponentType<TProps>) {
	return class extends Component<Omit<TProps, keyof WithChannelsContext>> {
		static contextType = ChannelsContext;
		context!: React.ContextType<typeof ChannelsContext>

		render() {
			return <WrappedComponent {...this.props as TProps} channelsService={this.context} />
		}
	}
}

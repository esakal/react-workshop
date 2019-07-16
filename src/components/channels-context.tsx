import React, {Component} from 'react';
import Chatkit from '@pusher/chatkit-client';


function log(severity: 'info' | 'warn' | 'error', method: string, message : string, data: Record<string, any>) {
	console[severity](`[RoomService().${method}()] ${message}`, data);
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
	userRooms: ChatChannel[],
	joinableRooms: ChatChannel[],
	activeChannel: ChatChannel | null,
	activeChannelMessages: ChatMessage[],
	activateRoom(roomId: string): void;
	connect(): Promise<void>;
	sendMessage(message: string): void;
	deleteMessage(messageId: string): void;
	createChannel(name: string): void;
	updateJoinableRooms(): void;
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
			userRooms: [],
			joinableRooms: [],
			activeChannel: null,
			activeChannelMessages: [],
			connect: this.connect.bind(this),
			activateRoom: this.activateRoom.bind(this),
			sendMessage: this.sendMessage.bind(this),
			deleteMessage: this.deleteMessage.bind(this),
			createChannel: this.createARoom.bind(this),
			updateJoinableRooms: this.updateJoinableRooms.bind(this)

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
						const chatRoom = this._toChatChannel(room);
						const userRooms = [...prevState.value.userRooms, chatRoom];
						const joinableRooms = prevState.value.joinableRooms.filter(item => item.id !== chatRoom.id);

						return {
							...prevState,
							value: {
								...prevState.value,
								userRooms,
								joinableRooms
							}
						}
					})
				},
				onRemovedFromRoom: (room: any) => {
					this.setState(prevState => {
						const chatRoom = this._toChatChannel(room);
						const userRooms = prevState.value.userRooms.filter(item => item.id !== chatRoom.id);
						const joinableRooms = [...prevState.value.joinableRooms, chatRoom];
						const isRemovedFromActive = prevState.value.activeChannel && prevState.value.activeChannel.id === chatRoom.id;


						return {
							...prevState,
							value: {
								...prevState.value,
								userRooms,
								joinableRooms,
								activeChannel: isRemovedFromActive ? null : prevState.value.activeChannel,
								activeChannelMessages: isRemovedFromActive ? [] : prevState.value.activeChannelMessages,
							}
						}
					})
				},
				onRoomDeleted: (room: any) => {
					this.setState(prevState => {
						const chatRoom = this._toChatChannel(room);
						const userRooms = prevState.value.userRooms.filter(item => item.id !== chatRoom.id);
						const joinableRooms = prevState.value.joinableRooms.filter(item => item.id !== chatRoom.id);
						const isActiveChannelDeleted = prevState.value.activeChannel && prevState.value.activeChannel.id === chatRoom.id;

						return {
							...prevState,
							value: {
								...prevState.value,
								userRooms,
								joinableRooms,
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

				const userRooms = currentUser.rooms.map(this._toChatChannel);

				const user = this._toChatUser(currentUser);

				return this._getJoinableRooms()
					.then(joinableRooms => {
						this.setState(prev => ({
							value: {
								...prev.value,
								user,
								userRooms,
								joinableRooms: joinableRooms.map(this._toChatChannel)
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

	activateRoom(roomId: string): void {
		this.invariantConnected();
		const isJoined = this.state.value.userRooms.some(room => room.id === roomId);

		log('info', 'activateRoom', 'user request to activate room', {roomId, isJoined});

		let verify = Promise.resolve();

		if (!isJoined) {
			verify = this._currentUser.joinRoom({roomId})
				.then(() => {
					log('info', 'activateRoom', 'user joined room', {roomId});
				})
				.catch((error: any) => {
					log('error', 'activateRoom', 'failed to join room', {error});

					if (error.info.error === "services/chatkit/not_found/room_not_found") {
						this.updateJoinableRooms();
					}
					throw error;
				});
		}

		verify.then(() => {
			this.setState(prevState => {

				const userRoom = prevState.value.userRooms.find(room => room.id === roomId);
				const joinableRoom = prevState.value.joinableRooms.find(room => room.id === roomId);

				if (!userRoom && !joinableRoom) {
					return prevState;
				}

				return {
					value: {
						...prevState.value,
						activeChannel: userRoom || joinableRoom || null,
						activeChannelMessages: []
					}
				}
			}, this._subscribeToActiveChannel);
		});
	}

	private _subscribeToActiveChannel = () => {
		log('info', '_subscribeToActiveChannel', 'subscribe to active room ', {});

		this._unsubsribeToActiveChannel();

		if (!this.state.value.activeChannel) {
			return;
		}

		const roomId = this.state.value.activeChannel.id;

		this._currentUser.fetchMessages({
			roomId,
		})
			.then((messages: ChatMessage[]) => {
				if (!this.state.value.activeChannel || this.state.value.activeChannel.id !== roomId) {
					return;
				}

				this._currentUser.subscribeToRoom({
					roomId,
					hooks: {
						onMessage: (message: ChatMessage) => {
							log('info', '_subscribeToActiveChannel', `room ${roomId} got new message`, { message });
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
							log('info', '_subscribeToActiveChannel', `room ${roomId} notifies that message ${messageId} was deleted`, { messageId });
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
				log('info', '_subscribeToActiveChannel', 'user listening to a room', { messages });
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

	private _toChatChannel(room: any): ChatChannel {
		return {
			id: room.id,
			name: room.name
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

	updateARoomName(roomId: string, name: string): Promise<void> {
		this.invariantConnected();
		log('info', 'updateARoomName', 'user request to update a room name', { roomId, name });
		return this._currentUser.updateRoom({
			roomId,
			name
		})
			.then(() => {
				log('info', 'updateARoomName', 'user updated a room name', { roomId });

			})
			.catch((error: Error) => {
				log('error', 'subscribeToARoom', 'failed to update a room name', { error });
				throw error;
			})
	}

	createARoom(roomName: string): Promise<void> {
		this.invariantConnected();
		log('info', 'createARoom', 'user request to create a new room', { roomName });

		return this._currentUser.createRoom({
			name: roomName,
			private: false,
		}).then((room: any) => {
			const chatRoom = this._toChatChannel(room);
			log('info', 'createARoom', 'room created', { roomId: room.id, roomName });
			this.setState({
				value: {
					...this.state.value,
					activeChannel:chatRoom,
					activeChannelMessages: []
				}
			})
		})
			.catch((error: Error) => {
				log('error', 'createARoom', 'failed to create a room', { error });
				throw error;
			})
	}

	updateJoinableRooms() {
		this._getJoinableRooms()
			.then((joinableRooms) => {
				this.setState({
					value: {
						...this.state.value,
						joinableRooms
				}})
			})
	}
	private _getJoinableRooms(): Promise<ChatChannel[]> {
		this.invariantConnected();
		log('info', 'getJoinableRooms', 'user request to get joinable room list', {});
		return this._currentUser.getJoinableRooms()
			.then((rooms: ChatChannel[]) => {
				log('info', 'getJoinableRooms', 'got list of joinable rooms', { rooms });
				return rooms;
			})
			.catch((error: Error) => {
				log('error', 'subscribeToARoom', 'failed to get joinable room list', { error });
				throw error;
			})
	}

	deleteMessage(messageId: string) {
		this.invariantConnected();

		if (!this.state.value.activeChannel) {
			return;
		}

		const roomId = this.state.value.activeChannel.id;
		log('info', 'deleteMessage', 'user request to delete a message', { roomId, messageId });

		this._currentUser.serverInstanceV2
			.request({
				method: "DELETE",
				path: `/rooms/${encodeURIComponent(roomId)}/messages/${encodeURIComponent(messageId)}`,
			})
			.then(() => {
				log('info', 'deleteMessage', 'message deleted', { roomId, messageId });
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

		const roomId = this.state.value.activeChannel.id;
		log('info', 'sendMessage', 'user request to send a message', { roomId, message });


		return this._currentUser.sendSimpleMessage({
			text: message,
			roomId
		}).then(() => {
			log('info', 'sendMessage', 'message sent', { roomId, message });
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

import Chatkit from '@pusher/chatkit-client';


function log(severity: 'info' | 'warn' | 'error', method: string, message : string, data: Record<string, any>) {
	console[severity](`[RoomService().${method}()] ${message}`, data);
}

export interface ChatRoom {
	id: string;
	name: string;

}

export interface ChatUser {
	id: string;
	name: string;
	avatarURL: string
}

export interface ChatMessage {
	id: number;
	sender: ChatUser;
	content: string;
	createdAt: string;
}

export class ChatkitService {
	private _chatManager: any = null;
	private _currentUser: any = null;

	connect(): Promise<{user: ChatUser, rooms: ChatRoom[]}> {
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
				onRoomUpdated: (room: ChatRoom) => {

				},
				onAddedToRoom: (room: ChatRoom) => {

				},
				onRemovedFromRoom: (room: ChatRoom) => {

				},
				onRoomDeleted: (room: ChatRoom) => {

				},
			})
			.then((currentUser: any) => {
				this._currentUser = currentUser;
				log('info', 'connect', 'user connected', { currentUser });

				return {
					user: {
						id: currentUser.id,
						name: currentUser.name,
						avatarURL: `https://github.com/${currentUser.id}.png?size=40`
					},
					rooms: currentUser.rooms.map((room: any) => ({
						id: room.id,
						name: room.name
					}))
				};
			})
			.catch((error: Error) => {
				log('error', 'connect', 'failed to connect user', { error });
				throw error;
			});
	}

	subscribeToARoom(roomId: string): Promise<ChatMessage[]> {
		this.invariantConnected();
		log('info', 'subscribeToARoom', 'user request to listen to a room', { roomId });

		return this._currentUser.fetchMessages({
			roomId: roomId,
		})
			.then((messages: ChatMessage[]) => {
				// do something with the messages
				this._chatManager.subscribeToRoom({
					roomId,
					hooks: {
						onMessage: (message: ChatMessage) => {
							log('info', 'subscribeToARoom', `room ${roomId} got new message`, { message });
						},
						onMessageDeleted: (messageId: string) => {
							log('info', 'subscribeToARoom', `room ${roomId} notifies that message ${messageId} was deleted`, { messageId });
						},
					},
					messageLimit: 0
				})
				log('info', 'subscribeToARoom', 'user listening to a room', { messages });
				return messages;
			})
			.catch((error: Error) => {
				log('error', 'subscribeToARoom', 'failed to connect user', { error });
				throw error;
			});
	}

	unsubscribeToARoom(roomId: string) : void {
		this.invariantConnected();
		log('info', 'unsubscribeToARoom', 'user unsubscribe to room', { roomId });
		this._currentUser.roomSubscriptions[roomId].cancel()
	}

	// joinARoom(roomId: string) : Promise<void> {
	// 	this.invariantConnected();
	// 	log('info', 'joinARoom', 'user request to join a room', { roomId });
	// 	return this._currentUser.joinRoom({ roomId })
	// 		.then((room: Room) => {
	// 			log('info', 'joinARoom', 'user joined a room', { room });
	//
	// 		})
	// 		.catch((error: Error) => {
	// 			log('error', 'joinARoom', 'failed to join a room', { error });
	// 			throw error;
	// 		})
	// }

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

	getJoinableRooms(): Promise<ChatRoom[]> {
		this.invariantConnected();
		log('info', 'getJoinableRooms', 'user request to get joinable room list', {});
		return this._currentUser.getJoinableRooms()
			.then((rooms: ChatRoom[]) => {
				log('info', 'getJoinableRooms', 'got list of joinable rooms', { rooms });
				return rooms;
			})
			.catch((error: Error) => {
				log('error', 'subscribeToARoom', 'failed to get joinable room list', { error });
				throw error;
			})
	}

	sendMessage(roomId: string, message: string) {
		this.invariantConnected();

		this._currentUser.sendSimpleMessage({
			text: message,
			roomId: roomId
		});
	}

	private invariantConnected(): void {
		if (!this._chatManager || !this._currentUser) {
			throw new Error(`user is not connected`);
		}
	}
}

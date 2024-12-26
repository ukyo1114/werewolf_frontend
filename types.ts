export interface UserState {
  _id: string;
  name: string;
  pic: string;
  token: string;
  status: string;
  role: string;
  wolfPartnerId: string;
}

export interface UserAction {
  type:
    | 'LOGIN'
    | 'LOGOUT'
    | 'JOIN_GAME'
    | 'LEAVE_GAME'
    | 'CHANGE_NAME'
    | 'UPDATE_STATUS';
  payload?: any;
}

export interface ChannelState {
  _id: string;
  users: {
    [_id: string]: {
      name: string;
      pic: string;
    };
  };
  channelInfo: {
    _id: string;
    channelName: string;
    description: string;
    channelAdmin: string;
    blockedUsers: string[];
  };
  isGame: boolean;
  gameState: {
    currentDay: number;
    currentPhase: string;
    changedAt: Date | null;
  };
}

export interface ChannelAction {
  type:
    | 'JOIN_CHANNEL'
    | 'JOIN_GAME'
    | 'LEAVE_CHANNEL'
    | 'USER_JOINED'
    | 'USER_LEFT'
    | 'USER_BLOCKED'
    | 'CANCEL_BLOCK'
    | 'SETTINGS_CHANGED'
    | 'UPDATE_GAME_STATE';
  payload?: any;
}

export interface IMessage {
  _id: string;
  senderId: string;
  content: string;
  channel: string;
  messageType: string;
  createdAt: Date;
}

export interface MessageAction {
  type: 'FETCH_MESSAGES' | 'RECEIVE_MESSAGE';
  payload?: any;
}

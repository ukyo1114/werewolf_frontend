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

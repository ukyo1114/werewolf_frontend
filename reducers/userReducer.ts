import { UserState, UserAction } from '@/types';

const initialUserState: UserState = {
  _id: '',
  name: '',
  pic: '',
  token: '',
  status: '',
  role: '',
  wolfPartnerId: '',
};

function userReducer(
  state: UserState = initialUserState,
  action: UserAction
): UserState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    case 'JOIN_GAME':
      return { ...state, ...action.payload };
    case 'LEAVE_GAME':
      return { ...state, status: '', role: '', wolfPartnerId: '' };
    case 'LOGOUT':
      return initialUserState;
    case 'CHANGE_NAME':
      if (typeof action.payload === 'string') {
        return { ...state, name: action.payload };
      }
      return state;
    case 'UPDATE_STATUS': {
      const user = action.payload?.users?.[state._id];
      return user ? { ...state, status: user.status } : state;
    }
    default:
      return state;
  }
}

export { userReducer, initialUserState };

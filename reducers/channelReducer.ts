import { reject, union, update, without } from 'lodash';
import { ChannelState, ChannelAction } from '@/types';

const initialChannelState: ChannelState = {
  _id: '',
  users: {},
  channelInfo: {
    _id: '',
    channelName: '',
    description: '',
    channelAdmin: '',
    blockedUsers: [],
  },
  isGame: false,
  gameState: {
    currentDay: 0,
    currentPhase: '',
    changedAt: null,
  },
};

function channelReducer(
  state: ChannelState = initialChannelState,
  action: ChannelAction
): ChannelState {
  switch (action.type) {
    case 'JOIN_CHANNEL':
      return { ...initialChannelState, ...action.payload };
    case 'JOIN_GAME':
      return { ...state, ...action.payload, isGame: true };
    case 'LEAVE_CHANNEL':
      return initialChannelState;
    case 'USER_JOINED': {
      const { joinedUser } = action.payload;
      const users = { ...state.users, ...joinedUser };
      return { ...state, users };
    }
    case 'USER_LEFT': {
      const { _id } = action.payload;
      const { [_id]: removedUser, ...remainingUsers } = state.users;
      return { ...state, users: remainingUsers };
    }
    case 'USER_BLOCKED': {
      const { _id } = action.payload;
      const { [_id]: blockedUser, ...remainingUsers } = state.users;
      const users = remainingUsers;
      const blockedUsers = union(state.channelInfo.blockedUsers, [_id]);
      const channelInfo = {
        ...state.channelInfo,
        blockedUsers,
      };
      return { ...state, users, channelInfo };
    }
    case 'CANCEL_BLOCK': {
      const { _id } = action.payload;
      const blockedUsers = without(state.channelInfo.blockedUsers, _id);
      const channelInfo = { ...state.channelInfo, blockedUsers };
      return { ...state, channelInfo };
    }
    case 'SETTINGS_CHANGED': {
      const { channelName, description } = action.payload;
      const channelInfo = {
        ...state.channelInfo,
        channelName,
        description,
      };
      return { ...state, channelInfo };
    }
    case 'UPDATE_GAME_STATE': {
      const { users, gameState } = action.payload;
      const updatedUsers = { ...state.users, ...users };
      return { ...state, users: updatedUsers, gameState };
    }
    default:
      return state;
  }
}

export { channelReducer, initialChannelState };

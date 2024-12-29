import { channelReducer, initialChannelState } from '@/reducers/channelReducer';
import { ChannelState, ChannelAction } from '@/types';

describe('channelReducer', () => {
  let initialState: ChannelState;

  beforeEach(() => {
    initialState = { ...initialChannelState };
  });

  it('should return the initial state when action type is not recognized', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    const newState = channelReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  describe('JOIN_CHANNEL', () => {
    it('should replace state with action.payload while preserving default props in initialChannelState', () => {
      const action = {
        type: 'JOIN_CHANNEL',
        payload: {
          _id: 'channel123',
          users: {
            user1: { name: 'Alice', pic: 'alice.png' },
          },
          channelInfo: {
            _id: 'channel123',
            channelName: 'Test Channel',
            description: 'Test Description',
            channelAdmin: 'user1',
            blockedUsers: [],
          },
        },
      } as ChannelAction;

      const newState = channelReducer(initialState, action);
      expect(newState._id).toBe('channel123');
      expect(newState.users).toEqual({
        user1: { name: 'Alice', pic: 'alice.png' },
      });
      expect(newState.channelInfo.channelName).toBe('Test Channel');
      expect(newState.mode).toBe('channel');
    });
  });

  describe('JOIN_GAME', () => {
    it('should merge payload into state and set mode to game', () => {
      const action = {
        type: 'JOIN_GAME',
        payload: {
          _id: 'gameChannel',
          users: {
            user2: { name: 'Bob', pic: 'bob.png' },
          },
        },
      } as ChannelAction;

      const newState = channelReducer(initialState, action);
      expect(newState._id).toBe('gameChannel');
      expect(newState.users).toEqual({
        user2: { name: 'Bob', pic: 'bob.png' },
      });
      expect(newState.mode).toBe('game');
    });
  });

  describe('LEAVE_CHANNEL', () => {
    it('should reset the state to initialChannelState', () => {
      const joinedAction = {
        type: 'JOIN_CHANNEL',
        payload: {
          _id: 'tempChannel',
          users: {
            user1: { name: 'Alice', pic: 'alice.png' },
          },
        },
      } as ChannelAction;
      let tempState = channelReducer(initialState, joinedAction);
      expect(tempState._id).toBe('tempChannel');

      const leaveAction = { type: 'LEAVE_CHANNEL' } as ChannelAction;
      const newState = channelReducer(tempState, leaveAction);
      expect(newState).toEqual(initialChannelState);
      expect(newState.mode).toBe('list');
    });
  });

  describe('USER_JOINED', () => {
    it('should add a user to the users object', () => {
      initialState.users = {
        user1: { name: 'Alice', pic: 'alice.png' },
      };

      const action = {
        type: 'USER_JOINED',
        payload: {
          joinedUser: {
            user2: { name: 'Bob', pic: 'bob.png' },
          },
        },
      } as ChannelAction;

      const newState = channelReducer(initialState, action);
      expect(newState.users).toEqual({
        user1: { name: 'Alice', pic: 'alice.png' },
        user2: { name: 'Bob', pic: 'bob.png' },
      });
    });
  });

  describe('USER_LEFT', () => {
    it('should remove the specified user from the users object', () => {
      initialState.users = {
        user1: { name: 'Alice', pic: 'alice.png' },
        user2: { name: 'Bob', pic: 'bob.png' },
      };

      const action = {
        type: 'USER_LEFT',
        payload: {
          _id: 'user2',
        },
      } as ChannelAction;

      const newState = channelReducer(initialState, action);
      expect(newState.users).toEqual({
        user1: { name: 'Alice', pic: 'alice.png' },
      });
    });
  });

  describe('USER_BLOCKED', () => {
    it('should remove the user from users and add to channelInfo.blockedUsers', () => {
      initialState.users = {
        user1: { name: 'Alice', pic: 'alice.png' },
        user2: { name: 'Bob', pic: 'bob.png' },
      };
      initialState.channelInfo = {
        _id: 'channel123',
        channelName: 'Test Channel',
        description: 'Test Description',
        channelAdmin: 'user1',
        blockedUsers: [],
      };

      const action = {
        type: 'USER_BLOCKED',
        payload: {
          _id: 'user2',
        },
      } as ChannelAction;

      const newState = channelReducer(initialState, action);
      expect(newState.users).toEqual({
        user1: { name: 'Alice', pic: 'alice.png' },
      });
      expect(newState.channelInfo.blockedUsers).toEqual(['user2']);
    });

    it('should avoid duplicating the same user in blockedUsers array', () => {
      initialState.users = {
        user1: { name: 'Alice', pic: 'alice.png' },
      };
      initialState.channelInfo.blockedUsers = ['user2'];

      const action = {
        type: 'USER_BLOCKED',
        payload: {
          _id: 'user2',
        },
      } as ChannelAction;

      const newState = channelReducer(initialState, action);
      expect(newState.channelInfo.blockedUsers).toEqual(['user2']);
    });
  });

  describe('CANCEL_BLOCK', () => {
    it('should remove the user from blockedUsers', () => {
      initialState.channelInfo.blockedUsers = ['user2', 'user3'];
      const action = {
        type: 'CANCEL_BLOCK',
        payload: {
          _id: 'user2',
        },
      } as ChannelAction;

      const newState = channelReducer(initialState, action);
      expect(newState.channelInfo.blockedUsers).toEqual(['user3']);
    });
  });

  describe('SETTINGS_CHANGED', () => {
    it('should update channelName and description', () => {
      initialState.channelInfo = {
        ...initialState.channelInfo,
        channelName: 'Original Name',
        description: 'Original Description',
      };

      const action = {
        type: 'SETTINGS_CHANGED',
        payload: {
          channelName: 'New Name',
          description: 'New Description',
        },
      } as ChannelAction;

      const newState = channelReducer(initialState, action);
      expect(newState.channelInfo.channelName).toBe('New Name');
      expect(newState.channelInfo.description).toBe('New Description');
    });
  });

  describe('UPDATE_GAME_STATE', () => {
    it('should merge users and update gameState', () => {
      initialState.users = {
        user1: { name: 'Alice', pic: 'alice.png' },
      };
      initialState.gameState = {
        currentDay: 1,
        currentPhase: 'discussion',
        changedAt: new Date('2024-01-01T00:00:00Z'),
      };

      const action = {
        type: 'UPDATE_GAME_STATE',
        payload: {
          users: {
            user2: { name: 'Bob', pic: 'bob.png' },
          },
          gameState: {
            currentDay: 2,
            currentPhase: 'night',
            changedAt: new Date('2024-01-01T12:00:00Z'),
          },
        },
      } as ChannelAction;

      const newState = channelReducer(initialState, action);

      expect(newState.users).toEqual({
        user1: { name: 'Alice', pic: 'alice.png' },
        user2: { name: 'Bob', pic: 'bob.png' },
      });
      expect(newState.gameState.currentDay).toBe(2);
      expect(newState.gameState.currentPhase).toBe('night');
      expect(newState.gameState.changedAt).toEqual(
        new Date('2024-01-01T12:00:00Z')
      );
    });
  });
});

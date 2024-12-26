import messageReducer from '../../reducers/messageReducer';
import { IMessage, MessageAction } from '@/types';

describe('messageReducer', () => {
  const initialMessages: IMessage[] = [];

  it('should return the initial state if action type is unknown', () => {
    const unknownAction = { type: 'UNKNOWN' } as any;
    const newState = messageReducer(initialMessages, unknownAction);
    expect(newState).toEqual(initialMessages);
  });

  describe('FETCH_MESSAGES', () => {
    it('should replace the state with action.payload', () => {
      const mockMessages: IMessage[] = [
        {
          _id: 'm1',
          senderId: 'user1',
          content: 'Hello!',
          channel: 'general',
          messageType: 'text',
          createdAt: new Date('2024-01-01T12:00:00Z'),
        },
        {
          _id: 'm2',
          senderId: 'user2',
          content: 'Hi there!',
          channel: 'general',
          messageType: 'text',
          createdAt: new Date('2024-01-01T12:01:00Z'),
        },
      ];

      const action = {
        type: 'FETCH_MESSAGES',
        payload: mockMessages,
      } as MessageAction;

      const newState = messageReducer(initialMessages, action);
      expect(newState).toEqual(mockMessages);
    });
  });

  describe('RECEIVE_MESSAGE', () => {
    it('should add a new message at the beginning, remove duplicates, and sort by createdAt descending', () => {
      const existingMessages: IMessage[] = [
        {
          _id: 'm1',
          senderId: 'user1',
          content: 'Existing message',
          channel: 'general',
          messageType: 'text',
          createdAt: new Date('2024-01-01T12:00:00Z'),
        },
      ];

      const newMessage: IMessage = {
        _id: 'm2',
        senderId: 'user2',
        content: 'New message',
        channel: 'general',
        messageType: 'text',
        createdAt: new Date('2024-01-01T13:00:00Z'),
      };

      const action = {
        type: 'RECEIVE_MESSAGE',
        payload: newMessage,
      } as MessageAction;

      const newState = messageReducer(existingMessages, action);

      expect(newState).toHaveLength(2);
      expect(newState[0]._id).toBe('m2');
      expect(newState[1]._id).toBe('m1');
    });

    it('should avoid duplicating the same message (_id)', () => {
      const existingMessages: IMessage[] = [
        {
          _id: 'm1',
          senderId: 'user1',
          content: 'Existing message',
          channel: 'general',
          messageType: 'text',
          createdAt: new Date('2024-01-01T12:00:00Z'),
        },
      ];

      const duplicateMessage: IMessage = {
        _id: 'm1',
        senderId: 'user1',
        content: 'This is a duplicate!',
        channel: 'general',
        messageType: 'text',
        createdAt: new Date('2024-01-01T12:00:00Z'),
      };

      const action = {
        type: 'RECEIVE_MESSAGE',
        payload: duplicateMessage,
      } as MessageAction;

      const newState = messageReducer(existingMessages, action);
      expect(newState).toHaveLength(1);
      expect(newState[0].content).toBe('Existing message');
    });

    it('should sort messages by createdAt descending if multiple new messages are received in a row', () => {
      const existingMessages: IMessage[] = [
        {
          _id: 'm1',
          senderId: 'user1',
          content: 'Older message',
          channel: 'general',
          messageType: 'text',
          createdAt: new Date('2024-01-01T12:00:00Z'),
        },
      ];

      // 新メッセージ（あえて古い日付のもの）
      const newMessageOld: IMessage = {
        _id: 'm2',
        senderId: 'user2',
        content: 'Newer but actually older date',
        channel: 'general',
        messageType: 'text',
        createdAt: new Date('2024-01-01T11:00:00Z'),
      };

      // 新メッセージ（最新の日付）
      const newMessageNew: IMessage = {
        _id: 'm3',
        senderId: 'user3',
        content: 'Newest date',
        channel: 'general',
        messageType: 'text',
        createdAt: new Date('2024-01-01T13:00:00Z'),
      };

      // 先に古いメッセージを受信
      let newState = messageReducer(existingMessages, {
        type: 'RECEIVE_MESSAGE',
        payload: newMessageOld,
      });
      // 次に最新メッセージを受信
      newState = messageReducer(newState, {
        type: 'RECEIVE_MESSAGE',
        payload: newMessageNew,
      });

      // ソート順: [m3 (13:00), m1 (12:00), m2 (11:00)]
      expect(newState).toHaveLength(3);
      expect(newState[0]._id).toBe('m3');
      expect(newState[1]._id).toBe('m1');
      expect(newState[2]._id).toBe('m2');
    });
  });
});

import { uniqBy } from 'lodash';
import { IMessage, MessageAction } from '@/types';

const initialMessages: IMessage[] = [];

function messageReducer(
  state: IMessage[] = initialMessages,
  action: MessageAction
): IMessage[] {
  switch (action.type) {
    case 'FETCH_MESSAGES':
      return action.payload;
    case 'RECEIVE_MESSAGE': {
      const updatedMessages = uniqBy([...state, action.payload], '_id');
      return updatedMessages.sort(
        (a: IMessage, b: IMessage) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    default:
      return state;
  }
}

export { messageReducer, initialMessages };

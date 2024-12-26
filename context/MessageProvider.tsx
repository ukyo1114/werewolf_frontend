import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from 'react';

import { IMessage, MessageAction } from '@/types';
import { messageReducer, initialMessages } from '@/reducers/messageReducer';

interface MessageContextType {
  messages: IMessage[];
  mDispatch: Dispatch<MessageAction>;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
  children: ReactNode;
}

const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [messages, mDispatch] = useReducer(messageReducer, initialMessages);

  return (
    <MessageContext.Provider value={{ messages, mDispatch }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageState = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessageState must be used within a MessageProvider');
  }
  return context;
};

export default MessageProvider;

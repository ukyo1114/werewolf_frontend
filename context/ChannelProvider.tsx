import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from 'react';

import { ChannelState, ChannelAction } from '@/types';
import { channelReducer, initialChannelState } from '@/reducers/channelReducer';

interface ChannelContextType {
  channel: ChannelState;
  chDispatch: Dispatch<ChannelAction>;
}

const ChannelContext = createContext<ChannelContextType | undefined>(undefined);

interface ChannelProviderProps {
  children: ReactNode;
}

const ChannelProvider: React.FC<ChannelProviderProps> = ({ children }) => {
  const [channel, chDispatch] = useReducer(channelReducer, initialChannelState);

  return (
    <ChannelContext.Provider value={{ channel, chDispatch }}>
      {children}
    </ChannelContext.Provider>
  );
};

export const useChannelState = (): ChannelContextType => {
  const context = useContext(ChannelContext);
  if (!context) {
    throw new Error('useChannelState must be used within a ChannelProvider');
  }
  return context;
};

export default ChannelProvider;

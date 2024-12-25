import {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  ReactNode,
} from 'react';

import { UserState, UserAction } from '../types';

import { userReducer, initialUserState } from '../reducers/userReducer';

interface UserContextType {
  user: UserState;
  uDispatch: Dispatch<UserAction>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, uDispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{ user, uDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserState = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
};

export default UserProvider;

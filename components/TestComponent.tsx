import React from 'react';
import { useUserState } from '../context/UserProvider';

const TestComponent: React.FC = () => {
  const { user, uDispatch } = useUserState();

  return (
    <div>
      <p data-testid="user-name">{user.name}</p>
      <button
        onClick={() => uDispatch({ type: 'CHANGE_NAME', payload: 'Bob' })}
      >
        Change Name
      </button>
    </div>
  );
};

export default TestComponent;

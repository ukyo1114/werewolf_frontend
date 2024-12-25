import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProvider, { useUserState } from '../../context/UserProvider';
import TestComponent from '../../components/TestComponent';

describe('UserContext', () => {
  it('初期状態を提供すること', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const userName = screen.getByTestId('user-name');
    expect(userName).toHaveTextContent('');
  });

  it('CHANGE_NAMEアクションで名前を変更すること', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    const button = screen.getByText('Change Name');
    fireEvent.click(button);

    const userName = screen.getByTestId('user-name');
    expect(userName).toHaveTextContent('Bob');
  });
});

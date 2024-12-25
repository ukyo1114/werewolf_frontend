import { userReducer, initialUserState } from '../../reducers/userReducer';
import { UserAction } from '../../types';

describe('userReducer', () => {
  it('初期状態を返すこと', () => {
    const result = userReducer(undefined, { type: '' } as any);
    expect(result).toEqual(initialUserState);
  });

  it('LOGINアクションで状態を更新すること', () => {
    const action: UserAction = {
      type: 'LOGIN',
      payload: {
        _id: 'abc123',
        name: 'Alice',
        token: 'dummy_token',
      },
    };
    const expectedState = {
      ...initialUserState,
      _id: 'abc123',
      name: 'Alice',
      token: 'dummy_token',
    };
    const result = userReducer(initialUserState, action);
    expect(result).toEqual(expectedState);
  });

  it('JOIN_GAMEアクションで状態を更新すること', () => {
    const action: UserAction = {
      type: 'JOIN_GAME',
      payload: {
        status: 'playing',
        role: 'wolf',
        wolfPartnerId: 'wolf123',
      },
    };
    const expectedState = {
      ...initialUserState,
      status: 'playing',
      role: 'wolf',
      wolfPartnerId: 'wolf123',
    };
    const result = userReducer(initialUserState, action);
    expect(result).toEqual(expectedState);
  });

  it('LEAVE_GAMEアクションで状態をリセットすること（status, role, wolfPartnerId）', () => {
    const initialState = {
      ...initialUserState,
      status: 'playing',
      role: 'wolf',
      wolfPartnerId: 'wolf123',
    };
    const action: UserAction = { type: 'LEAVE_GAME' };
    const expectedState = {
      ...initialUserState,
      status: '',
      role: '',
      wolfPartnerId: '',
    };
    const result = userReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('LOGOUTアクションで初期状態に戻すこと', () => {
    const initialState = {
      ...initialUserState,
      _id: 'testId',
      name: 'testUser',
    };
    const action: UserAction = { type: 'LOGOUT' };
    const result = userReducer(initialState, action);
    expect(result).toEqual(initialUserState);
  });

  it('CHANGE_NAMEアクションで名前を変更すること', () => {
    const action: UserAction = { type: 'CHANGE_NAME', payload: 'Bob' };
    const expectedState = {
      ...initialUserState,
      name: 'Bob',
    };
    const result = userReducer(initialUserState, action);
    expect(result).toEqual(expectedState);
  });

  it('CHANGE_NAMEのpayloadがstring以外なら無視すること', () => {
    const action: UserAction = { type: 'CHANGE_NAME', payload: 12345 };
    const result = userReducer(initialUserState, action);
    // 変更なしで元のstateをそのまま返すはず
    expect(result).toEqual(initialUserState);
  });

  it('UPDATE_STATUSアクションでstatusを更新すること', () => {
    const initialState = {
      ...initialUserState,
      _id: 'user123',
      status: 'old_status',
    };
    const action: UserAction = {
      type: 'UPDATE_STATUS',
      payload: { users: { user123: { status: 'new_status' } } },
    };
    const expectedState = {
      ...initialState,
      status: 'new_status',
    };
    const result = userReducer(initialState, action);
    expect(result).toEqual(expectedState);
  });

  it('未知のアクションなら現在の状態を返すこと', () => {
    const initialState = {
      ...initialUserState,
      name: 'NoChangeName',
    };
    const action = { type: 'UNKNOWN_ACTION' };
    const result = userReducer(initialState, action as any);
    expect(result).toEqual(initialState);
  });
});

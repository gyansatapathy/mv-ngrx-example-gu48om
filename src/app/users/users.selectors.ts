import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUser from './users.reducer';

export interface State {
  users: fromUser.UserState
};

export const userReducer: ActionReducerMap<State> = {
  users: fromUser.userReducer
};

export const selectUserState = createFeatureSelector<fromUser.UserState>('users');

// Select all userIds
export const selectUserIds = createSelector(
  selectUserState,
  fromUser.selectUserIds
);

// Select all users
export const selectUsers = createSelector(
  selectUserState,
  fromUser.selectUsers
);

// Select selected user ids
export const selectSelectedUsers = createSelector(
  selectUserState,
  fromUser.getSelectedUsers
);

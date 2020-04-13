import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { User } from './users.reducers';

export enum UserActionTypes {
  LoadUsersRequest = '[User] Load Users Request',
  LoadUsers = '[User] Load Users Success',
  AddUsers = '[User] Add Users',
  SetSelectedUsers = '[User] Set Selected Users',
  ClearUsers = '[User] Clear Users'
};

export class LoadUsersRequest implements Action {
  readonly type = UserActionTypes.LoadUsersRequest;
}

export class LoadUsers implements Action {
  readonly type = UserActionTypes.LoadUsers;

  constructor(public payload: { users: Array<User> }) {}
}

export class AddUsers implements Action {
  readonly type = UserActionTypes.AddUsers;

  constructor(public payload: { users: Array<User> }) {}
}

export class SetSelectedUsers implements Action {
  readonly type = UserActionTypes.SetSelectedUsers;

  constructor(public payload: { selectedUsers: Array<number> }) {}
}

export class ClearUsers implements Action {
  readonly type = UserActionTypes.ClearUsers;
}

export type UserActionsUnion = LoadUsers | AddUsers | SetSelectedUsers | ClearUsers;

import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { UserActionTypes, UserActionsUnion } from './users.actions';

export interface User {
  userId: string;
  username: string;
};

export interface UserState extends EntityState<User> {
  // additional properties go here
  selectedUsers: Array<number>;
}

export function selectUserId(user: User): string {
  return user.userId;
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId
});

export const userInitialState: UserState = userAdapter.getInitialState({
  selectedUsers: []
});

export function userReducer(state = userInitialState, action: UserActionsUnion): UserState {
  switch (action.type) {
    case UserActionTypes.LoadUsers: {
      return userAdapter.addAll(action.payload.users, state);
    }
    case UserActionTypes.AddUsers: {
      return userAdapter.addMany(action.payload.users, state);
    }
    case UserActionTypes.ClearUsers: {
      return userAdapter.removeAll({ ...state, selectedUsers: []});
    }
    case UserActionTypes.SetSelectedUsers: {
      const newState = {
        ...state,
        selectedUsers: [...action.payload.selectedUsers]
      };

      return newState;
    }
    default: {
      return state;
    }
  }
}

export const getSelectedUsers = (state: UserState) => state.selectedUsers;

const {
  selectIds,
  selectAll
} = userAdapter.getSelectors();

// Select array of userIds
export const selectUserIds = selectIds;

// Select array of users
export const selectUsers = selectAll;

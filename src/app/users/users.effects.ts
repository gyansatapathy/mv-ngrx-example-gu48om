import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { UserService } from '../services/user-service';
import { LoadUsers, UserActionTypes } from './users.actions';

@Injectable()
export class UsersEffects {
  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.LoadUsersRequest),
    mergeMap(() => this.userService.getUsers()
      .pipe(
        map(users => new LoadUsers({ users }))
      ))
  )

  constructor(private actions$: Actions, private userService: UserService) { }
}

import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { GridDataResult, PageChangeEvent, SelectAllCheckboxState } from '@progress/kendo-angular-grid';

import { UserState } from './users/users.reducers';
import { UserService } from './services/user-service';
import { AddUsers, LoadUsersRequest, SetSelectedUsers } from './users/users.actions';
import { selectUsers, selectSelectedUsers } from './users/users.selectors';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  data = [];
  gridView: GridDataResult;
  users = this.store.select(selectUsers);
  selectedUsers: Array<number> = [];
  selectAllState: SelectAllCheckboxState = 'unchecked';
  skip = 0;
  pageSize = 100;

  constructor(private userService: UserService, private store: Store<{ users: UserState }>) {
    this.store.select(selectSelectedUsers).subscribe(selectedUsers => {
      console.log(selectedUsers);
    });

    this.store.select(selectUsers).subscribe(users => {
      this.data = users;
      this.loadData();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadUsersRequest());
  }

  // event contains information on the selection changes, we could use these and multiple actions to set, add, and delete selections from the store
  onSelectionChange(event: any): void {
    setTimeout(() => {
      this.store.dispatch(new SetSelectedUsers({ selectedUsers: this.selectedUsers }));
    });
  }

  public onSelectedKeysChange(e) {
    const len = this.selectedUsers.length;

    if (len === 0) {
      this.selectAllState = 'unchecked';
    } else if (len > 0 && len < this.data.length) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = 'checked';
    }
  }

  public onSelectAllChange(checkedState: SelectAllCheckboxState) {
    if (checkedState === 'checked') {
      this.selectedUsers = this.data.map((item) => item.userId);
      this.selectAllState = 'checked';
    } else {
      this.selectedUsers = [];
      this.selectAllState = 'unchecked';
    }
  }

  pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadData();
  }

  loadData(): void {
    this.gridView = {
      data: this.data.slice(this.skip, this.skip + this.pageSize),
      total: this.data.length
    };
  }

  addMoreUsers(): void {
    this.store.dispatch(new AddUsers({ users: this.userService.createMoreUsers()}));
  }
}

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private count = 100;
  private index = 0;

  getUsers(): Observable<any> {
    return of(this.createMoreUsers());
  }

  createMoreUsers(): Array<any> {
    const users = [];

    for (let i = this.index * this.count; i <= this.count * (this.index + 1); i += 1) {
      users.push({
        userId: i,
        username: `username${i}`
      });
    }

    this.index += 1;

    return users;
  }
}
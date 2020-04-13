import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { GridModule } from '@progress/kendo-angular-grid';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { UsersEffects } from './users/users.effects';
import { userReducer } from './users/users.selectors';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([UsersEffects]),
    GridModule,
    StoreModule.forRoot({
      ...userReducer
    })
  ],
  declarations: [
    AppComponent,
    HelloComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

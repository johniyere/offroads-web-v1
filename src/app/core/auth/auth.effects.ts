import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from './auth.service';
import { Login, AuthActionTypes, LoginSuccess, Logout, CheckLogin, CheckLoginSuccess, CheckLoginFailure } from './auth.actions';
import { tap, mergeMap, map } from 'rxjs/operators';


@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  @Effect()
  login$ = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    mergeMap((action) =>
      this.authService.login(action.payload).pipe(
        map((token) => new LoginSuccess(token))
      )
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap((action) => this.authService.authToken = action.payload)
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => this.authService.logout())
  );

  @Effect()
  checkLogin$ = this.actions$.pipe(
    ofType<CheckLogin>(AuthActionTypes.CheckLogin),
    map(() => (this.authService.isAuthenticated ? new CheckLoginSuccess : new CheckLoginFailure))
  );
}

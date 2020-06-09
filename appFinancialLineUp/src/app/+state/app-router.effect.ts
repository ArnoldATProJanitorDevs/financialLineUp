import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {LocationStrategy} from '@angular/common';
import {routerNavigationAction} from '@ngrx/router-store';
import * as RouteActions from './app-router.actions';
import {RouteComponentPartialState} from "./app-router.reducer";

export enum AppRouteNames {
  Home = 'home',
  LifeStyles = 'lifestyles'
}

export class RelativeUrl {

  readonly path: string;
  readonly pathSegments: string[];
  readonly search: string;
  readonly searchParams: URLSearchParams;

  constructor(relativeUrl: string) {
    const url = new URL(relativeUrl, 'file://x/');
    this.path = url.pathname.substr(1);
    this.pathSegments = this.path.split('/');
    this.search = url.search;
    this.searchParams = url.searchParams;
  }
}

@Injectable()
export class AppRouterEffects {

  @Effect({dispatch: false})
  navigate$ = this.actions$.pipe(
    ofType(RouteActions.routerGo),
    map(({path, queryParams, extras}) => this.router.navigate(path, {
      queryParams,
      queryParamsHandling: 'merge', ...extras
    }))
  );

  navigated$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigationAction),
      withLatestFrom(this.store),
      switchMap(([action, store]) => {
          const relativeUrl = new RelativeUrl(store.router.state.url);
          const routerParams = store.router.state.params;

          if (relativeUrl.pathSegments.includes(AppRouteNames.Home)) {
            return [RouteActions.routerNoopAction()];
          }
          if (relativeUrl.pathSegments.includes(AppRouteNames.LifeStyles)) {
            return [
              RouteActions.routerNoopAction()
            ];
          }

          return [RouteActions.routerNoopAction()];
        }
      )
    );
  });

  constructor(
    private actions$: Actions,
    private router: Router,
    private location: LocationStrategy,
    private store: Store<any>,
  ) {
  }
}






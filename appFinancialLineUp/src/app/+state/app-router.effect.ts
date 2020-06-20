import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {LocationStrategy} from '@angular/common';
import {routerNavigationAction} from '@ngrx/router-store';
import * as RouteActions from './app-router.actions';
import * as LifeStyleActions from '../lifestyles/+state/lifestyles.actions';



export enum AppRouteNames {
  LifeStyles = 'lifestyles',
}

interface QueryParam {
  Name: string;
  Params: string[];

}

function splitQueryParams(search: string): QueryParam[] {
  if (!search)
    return null;

  search = search.substr(1, search.length);
  const params: string[] = search.split('&');

  const QueryParams: QueryParam[] = [];

  params.map((param, index) => {
    QueryParams.push({
      Name: params[index].split('=')[0],
      Params: params[index].split('=')[1].split('~')
    });
  });

  return QueryParams;
}


export class RelativeUrl {

  readonly path: string;
  readonly pathSegments: string[];
  readonly search: string;
  readonly queryParams: QueryParam[];
  readonly searchParams: URLSearchParams;

  constructor(relativeUrl: string) {
    const url = new URL(relativeUrl, 'file://x/');
    this.path = url.pathname.substr(1);
    this.pathSegments = this.path.split('/');
    this.search = url.search;
    this.queryParams = splitQueryParams(url.search);
    this.searchParams = url.searchParams;
  }
}

function getQueryParamsOfParam(compareTo , relativeUrl) {
  let lifestyleIds: string[] = [];

  relativeUrl.queryParams.map(qp => {
    if (qp.Name == compareTo)
      qp.Params.map(qpp => lifestyleIds.push(qpp));
  });
  return lifestyleIds;
}

@Injectable()
export class AppRouterEffects {

  LIFESTYLESQUERYPARAM = 'lifestyles';

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
          const actionArray = [];

          if (relativeUrl.pathSegments.includes(AppRouteNames.LifeStyles)) {
            if (!relativeUrl.queryParams) {
              actionArray.push(
                LifeStyleActions.loadExampleLifestyles()
              );
            } else {
              actionArray.push(
                LifeStyleActions.loadLifestylesById({ids: getQueryParamsOfParam(this.LIFESTYLESQUERYPARAM,relativeUrl)}));
            }
          }

          return actionArray;
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






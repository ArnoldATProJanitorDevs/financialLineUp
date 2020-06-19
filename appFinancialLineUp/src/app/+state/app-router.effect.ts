import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Actions, createEffect, Effect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {LocationStrategy} from '@angular/common';
import {routerNavigationAction} from '@ngrx/router-store';
import * as RouteActions from './app-router.actions';
import * as LifeStyleActions from '../lifestyles/+state/lifestyles.actions';
import {RouteComponentPartialState} from "./app-router.reducer";
import {loadLifestyles} from "../lifestyles/+state/lifestyles.actions";
import {Lifestyle} from "../lifestyle/models/lifestyle.interface";
import {v4 as uuidv4} from 'uuid';


export enum AppRouteNames {
  LifeStyles = 'lifestyles'
}

function splitQueryParams(search: string) {
  if (!search)
    return null;

  return search.split('&')?.map(queryParam => queryParam.split("=")[1]?.substr(0, queryParam.length) || null);
}

export class RelativeUrl {

  readonly path: string;
  readonly pathSegments: string[];
  readonly search: string;
  readonly queryParams: string[];
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

@Injectable()
export class AppRouterEffects {

  //TODO: Outsource
  ExampleLifestyles: Lifestyle[] = [
    {
      Id: 'example1',
      Name: 'Living Alone',
      TaxRates: [42],
      Items: [{
        Id: uuidv4(),
        Cost: 40,
        Category: {name: 'house', icon: 'house'},
        Comment: "Example Item"
      }],
      Description: 'This is an example for ...'
    },
    {
      Id: 'example2',
      Name: 'Living Together',
      TaxRates: [35],
      Items: [{
        Id: uuidv4(),
        Cost: 20,
        Category: {name: 'house', icon: 'house'},
        Comment: "Example Item"
      }],
      Description: 'This is an example for ...'
    }
  ];


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

          console.log(relativeUrl);

          if (relativeUrl.pathSegments.includes(AppRouteNames.LifeStyles)) {

            if (!relativeUrl.queryParams) {
              actionArray.push(
                LifeStyleActions.CreateLifestyles({Lifestyles: this.ExampleLifestyles}),
                LifeStyleActions.loadLifestylesById({ids: this.ExampleLifestyles.map(ls => ls.Id)})
              );
            } else {
              actionArray.push(
                LifeStyleActions.loadLifestylesById({ids: relativeUrl.queryParams}));
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






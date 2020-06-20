import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LifestylesComponent} from "./lifestyles/lifestyles/lifestyles.component";

const routes: Routes = [{
  path: 'lifestyles', component: LifestylesComponent, children: [
    {
      path: 'examples', component: LifestylesComponent
    },
  ]
},
  {
    path: '**',
    redirectTo: 'lifestyles',
    pathMatch: 'prefix'
  },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

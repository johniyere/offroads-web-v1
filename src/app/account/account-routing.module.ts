import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { ExploreComponent } from './explore/explore.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountComponent } from './account.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { RouteDetailsComponent } from './route-details/route-details.component';
import { RecommendedComponent } from './explore/recommended/recommended.component';
import { AllTrailsComponent } from './explore/all-trails/all-trails.component';
import { PopularComponent } from './explore/popular/popular.component';

const accountRoutes: Routes = [
  {
    path: '',
    redirectTo: '/feed',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'feed',
        component: FeedComponent,
        canActivateChild: [AuthGuard],

      },
      {
        path: 'explore',
        component: ExploreComponent,
        canActivateChild: [AuthGuard],
        children: [
          {
            path: '',
            redirectTo: 'recommended',
            pathMatch: 'full'
          },
          {
            path: 'recommended',
            component: RecommendedComponent
          },
          {
            path: 'all-trails',
            component: AllTrailsComponent
          },
          {
            path: 'popular-trails',
            component: PopularComponent
          }
        ]
      },
      {
        path: 'dashboard',
        canActivateChild: [AuthGuard],
        component: DashboardComponent
      },
      {
        path: 'routes/:id',
        component: RouteDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(accountRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AccountRoutingModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from 'src/app/pages/about/about.component';
import { SideNavComponent } from 'src/app/side-nav/side-nav.component';
import { ContainerComponent } from 'src/app/container/container.component';
import { UserGuard } from 'src/app/user.guard';
import { RegisterComponent } from 'src/app/register/register.component';
import { ProductListComponent } from 'src/app/pages/product-list/product-list.component';
import { AddComponent } from 'src/app/pages/add/add.component';
import { EditComponent } from 'src/app/pages/edit/edit.component';
import { ShowDetailComponent } from 'src/app/container/showDetail/show-detail.component';
import { ManagementComponent } from 'src/app/pages/management/management.component';
import { ProductChartListComponent } from 'src/app/pages/product-chart-list/product-chart-list.component';
import { MyChartComponent } from 'src/app/pages/my-chart/my-chart.component';
import { LoginComponent } from 'src/app/login/login.component';
import { SignInComponent } from 'src/app/sign-in/sign-in.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { EditUserComponent } from 'src/app/pages/edit-user/edit-user.component';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';


const routing:Routes=[

  {
    path:'', 
    redirectTo: 'container',
    pathMatch: 'full',
    data: { depth:1 }
  },
  {
    path:'container', 
    component:ContainerComponent,
    data: { depth:2 }
  },
  {
    path:'add',
    component:AddComponent,
    canActivate:[UserGuard],
    data: { depth:3 }
  },
  {
    path:'register',
    component: RegisterComponent,
    data: { depth:4 }
  },
  {
    path:'about',
    component:AboutComponent,
    canActivate:[UserGuard],
    data: { depth:5 }
  },
  {
    path:'productList',
    component:ProductListComponent,
    canActivate:[UserGuard],
    data: { depth:6 }
  },
  {
    path:'editProduct/:id',
    component:EditComponent,
    canActivate:[UserGuard],
    data: { depth:7 }
  },
  {
    path:'showProduct/:id',
    component:ShowDetailComponent,
    canActivate:[ UserGuard ],
    data: { depth:8 }
  },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate:[UserGuard],
    data: { depth:9 }
  },
  {
    path:'productChartaList',
    component:ProductChartListComponent,
    canActivate:[UserGuard],
    data: { depth:10 }
  },
  {
    path:'my-chart',
    component: MyChartComponent,
    canActivate:[ UserGuard ],
    data: { depth:11 }
  },
  {
    path:'sign-in',
    component: SignInComponent,
    data: { depth:12 }
  },
  {
    path:'profile',
    component: ProfileComponent,
    canActivate:[UserGuard],
    data: { depth:13 }
  },
  {
    path: 'editUser/:id',
    component: EditUserComponent,
    canActivate:[UserGuard],
    data: { depth:14 }
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { depth:15 }
  }
  
]

@NgModule({
  imports: [
    CommonModule,
    
    RouterModule.forRoot(routing),

  ],
  declarations: [
  ]
})
export class RoutesModule { }

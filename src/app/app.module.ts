import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/material/material.module';
import { LoginComponent } from './login/login.component';
import { ContainerComponent } from './container/container.component';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { AboutComponent } from './pages/about/about.component';
import { RoutesModule } from 'src/app/routes/routes.module';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/user.guard';
import { RegisterComponent } from './register/register.component';
import { ManagementComponent } from './pages/management/management.component';
import { ProductService } from 'src/app/services/product.service';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { TokenInterceptorService } from 'src/app/token-interceptor.service';
import { AddComponent } from './pages/add/add.component';
import { EditComponent } from './pages/edit/edit.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { ShowDetailComponent } from './container/showDetail/show-detail.component';
import { ProductChartListComponent } from './pages/product-chart-list/product-chart-list.component';
import { MyChartComponent } from './pages/my-chart/my-chart.component';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './pages/footer/footer.component';
import { BannerComponent } from './pages/banner/banner.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ContainerComponent,
    LoginComponent,
    SideNavComponent,
    AboutComponent,
    RegisterComponent,
    ProductListComponent,
    AddComponent,
    EditComponent,
    ShowDetailComponent,
    ManagementComponent,
    ProductChartListComponent,
    MyChartComponent,
    FooterComponent,
    BannerComponent,
    SignInComponent,
    ProfileComponent,
    EditUserComponent,
    PageNotFoundComponent,

    

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    RoutesModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    AngularFileUploaderModule,
    ToastrModule.forRoot(),


  ],

  entryComponents:[
    LoginComponent,
  ],

  providers: [
    AuthService,
    CartService,
    UserService,
    UserGuard,
    ProductService,
    [{
        provide: HTTP_INTERCEPTORS,
        useClass:TokenInterceptorService,
        multi: true
    }]
    
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

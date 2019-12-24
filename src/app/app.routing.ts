import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import { AdminloginComponent } from './adminlogin';
import { ExploreComponent } from './explore';
import { ProfileComponent } from './profile';
import { AboutComponent } from './about';
import { OrderComponent } from './order';
import { EditprofileComponent } from './editprofile';
import { LocationComponent } from './location';

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'adminlogin', component: AdminloginComponent },
    { path: 'explore', component: ExploreComponent },
    { path: 'about', component: AboutComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'bookingform', component: OrderComponent },
    { path: 'editprofile', component: EditprofileComponent },
    { path: 'location', component: LocationComponent },
    { path: 'order', component: OrderComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*****************************  COMPONENTS  ******************************/ 
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { CalendarComponent } from './components/calendar/calendar.component';


const routes: Routes = [
  { 
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },  
  { 
    path: 'home', 
    component: HomeComponent
  },
  { 
    path: 'not-found', 
    component: ErrorComponent
  },
  {
    path: 'calendar',
    component: CalendarComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: '**', 
    redirectTo:'/not-found'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

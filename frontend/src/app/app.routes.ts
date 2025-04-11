import { UserComponent } from './pages/user/user.component';
import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { TarefasComponent } from './pages/tarefas/tarefas.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [GuestGuard] },
  { path: 'tarefas', component: TarefasComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UserComponent, canActivate: [AuthGuard] }
];
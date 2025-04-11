import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.getToken()) {
      // Redireciona para a última rota conhecida ou para /tarefas
      const lastRoute = localStorage.getItem('last_route') || '/tarefas';
      this.router.navigate([lastRoute]);
      return false;
    }
    return true;
  }
}
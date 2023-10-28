import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanMatch,
  Route,
  UrlSegment,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class PublicGuard implements CanMatch, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  private checkAuthStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuthentication().pipe(
      tap((isAuthenticated) => console.log({ authenticated: isAuthenticated })),
      tap((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
        }
      }),
      map((isAuthenticated) => !isAuthenticated)
    );
  }

  canMatch(): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
  canActivate(): boolean | Observable<boolean> {
    return this.checkAuthStatus();
  }
}

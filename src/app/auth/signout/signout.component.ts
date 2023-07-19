import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss'],
})
export class SignoutComponent implements OnInit, OnDestroy {
  logoutTimer: any;
  routeTimeout: any;
  timer = 4;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.logoutTimer = setInterval(() => {
      this.timer = --this.timer;
    }, 1000);
    this.routeTimeout = setTimeout(() => {
      this.router.navigateByUrl('/');
    }, 4000);
  }

  ngOnDestroy(): void {
    clearInterval(this.logoutTimer);
    clearTimeout(this.routeTimeout);
  }
}

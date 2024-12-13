import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatIconModule, MatToolbarModule, RouterLink, MatButtonModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  currentRoute: string | undefined;
  private routerSub: Subscription | undefined;

  constructor(public loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    // Subscribe to router events to update the current route dynamically
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        console.log('Current Route:', this.currentRoute);  // Log current route for debugging
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe when the component is destroyed
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }


  logout() {
    this.loginService.logoutUser();
  }
}
  
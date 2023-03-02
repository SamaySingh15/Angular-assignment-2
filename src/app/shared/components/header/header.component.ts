import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserDetails } from 'src/app/datatype';
import { LoginService } from '../../services/login.service';
import { UserServicesService } from '../../services/user-services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub: Subscription;
  userDetails:UserDetails;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  constructor(private authService: LoginService, private userService:UserServicesService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !user ? false : true;
    });
    this.userService.userDetails.subscribe((res)=>{
      this.userDetails=res;
    });
  }
  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onLogout() {
    this.authService.logout();
    this.isAuthenticated = false;
  }
}

import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
  isAuthenticated=false;
  private userSub:Subscription;
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  constructor(private authService :LoginService) { }

  ngOnInit(): void {
   this.userSub= this.authService.user.subscribe((user)=>{
   this.isAuthenticated=!user?false:true;
   });
  }
  SideNavToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
    this.isAuthenticated=false;
  }
}

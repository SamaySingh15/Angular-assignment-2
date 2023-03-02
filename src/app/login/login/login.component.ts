import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';
import { SettingService } from 'src/app/shared/services/setting.service';
import { UserServicesService } from 'src/app/shared/services/user-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService :LoginService, private router :Router ,private userService :UserServicesService ,private settingService:SettingService) { }
  isLoginMode=true;
  isAdmin:boolean=false;
  error:string="";
  ngOnInit(): void {
  }

  
  /*nSwitchMode(){
    this.isLoginMode=!this.isLoginMode;

  } */
  onSubmit(form: NgForm){
    if(!form.valid){
      return; 
    }
    const email =form.value.username;
    const password= form.value.password;
    if(this.isLoginMode){
      this.authService.login(email,password).subscribe((res)=>{
        this.userService.getUserDetails(res.localId);
        this.settingService.getSetting();
        this.router.navigate(['/list-of-products']);          
      },
      errorMessage=>{ 
        this.error=errorMessage;
      }
      );
    }

   /* else{
      this.authService.signup(email , password).subscribe((res)=>{
        console.log(res);
      },(err)=>{
        switch(err.error.error.message){
          case 'EMAIL_EXISTS':
            this.error='This email already exists';
            break;
          default:
            this.error='An unknown error occured';
        }
      });
    } */
    
    form.reset();
  }
}

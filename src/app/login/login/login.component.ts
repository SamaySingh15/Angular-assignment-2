import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService :LoginService, private router :Router) { }
  isLoginMode=true;
  error:string="";
  ngOnInit(): void {
  }

  
  onSwitchMode(){
    this.isLoginMode=!this.isLoginMode;

  }
  onSubmit(form: NgForm){
    if(!form.valid){
      return; 
    }
    const email =form.value.username;
    const password= form.value.password;
    if(this.isLoginMode){
      this.authService.login(email,password).subscribe((res)=>{
        console.log(res);
        this.router.navigate(['/list-of-products']);
      },
      errorMessage=>{
        console.log(errorMessage);
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

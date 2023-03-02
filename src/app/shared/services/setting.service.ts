import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminSettings } from 'src/app/datatype';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  currentSettings= new BehaviorSubject<AdminSettings>(null);

  constructor(private http:HttpClient) { 
      this.currentSettings.next(JSON.parse(localStorage.getItem('currentSettings')));
      
  }

  updateSetting(settings:AdminSettings){
    this.http.put('https://angular-assignment-2-25c2c-default-rtdb.firebaseio.com/Settings.json',settings).subscribe((res)=>{console.log(res)});
  }

  getSetting(){
    this.http.get<AdminSettings>('https://angular-assignment-2-25c2c-default-rtdb.firebaseio.com/Settings.json').subscribe((res)=>{
      this.currentSettings.next(res);
      localStorage.setItem('currentSettings', JSON.stringify(res));
    });
  }
  ngOnDestroy() {
    localStorage.removeItem('currentSettings');
  }
}

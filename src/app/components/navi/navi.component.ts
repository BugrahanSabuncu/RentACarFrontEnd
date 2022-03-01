import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {
  currentUser:User;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.currentUser=this.authService.getUser();
  }
  logOut(){
    
  }

}

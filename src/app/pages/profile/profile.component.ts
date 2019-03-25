import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userData:any = [];

  panelExpanded:boolean = true;
  requiredPanelExpanded:boolean = true;

  constructor(private userService:UserService) { }

  ngOnInit() {

    this.userService.getUser()
    .subscribe(
      result =>{
        this.userData = result;
        console.log(this.userData);
      }
      
    )
  }

}

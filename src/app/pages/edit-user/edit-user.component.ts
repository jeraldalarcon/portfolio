import { Component, OnInit } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router , ActivatedRoute  } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})

export class EditUserComponent implements OnInit {

  editUserForm:FormGroup;
  userInfo:any = [];
  editUserData:any = [];
  roles:any = [];
  errorMsg :string = '';
  loading:boolean = false;

  constructor( private userService:UserService  ,private fb:FormBuilder , private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {

    this.editUserForm = this.fb.group({
      // id: [0,Validators.required],
      name: [ '', Validators.required],
      email: ['', Validators.required],
      role: [''],
      password: ['', Validators.required]
    });

    this.getUserInfo(this.activatedRoute.snapshot.params['id'] );

    this.userService.getRoles().subscribe(
      res=>{
        this.roles = res;
        console.log('ROLES:',this.roles);
      }
    )

  }

  getUserInfo(id){
    this.userService.geSingleUser(id)
    .subscribe(
      result =>{
        this.userInfo = result;
        console.log(result);
      }
      
    )
  }

  updateUser()
  {
    this.loading = true;
    let userData = this.editUserForm.value;
    console.log('userData:',userData)
    let id = this.activatedRoute.snapshot.params['id'];

    this.userService.updataUserData(id,userData,)
    .subscribe(
      result =>{
        this.editUserData = result;

        this.router.navigate(['management'])
        
      },
      error=>{
        this.errorMsg = error.statusText ;
       }
    )
  }

}

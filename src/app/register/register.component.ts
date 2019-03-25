import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  data:any =[];
  roles:any = [];
  errorMsg:string ='';
  loading:boolean = false;

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router,
    private toastr:ToastrService
   ) { }

  ngOnInit() {

    this.registerForm = this.fb.group({
      name:['', Validators.required],
      email:['', Validators.required],
      password: ['',Validators.required ],
      c_password:['',Validators.required],
      role:[0,Validators.required]
    });

    this.userService.getRoles().subscribe(
      res=>{
        this.roles = res;
        console.log('ROLES:',this.roles);
      }
    )
  }

  register(){
    this.loading = true;
    let data = this.registerForm.value;
    console.log('data:',data);
    this.userService.registration(data).subscribe(
      (res)=>{
          this.data = res;
          console.log(this.data);
          this.router.navigateByUrl('sign-in');
      },
      error=>{
        this.loading = false;
        this.errorMsg = error.statusText ;
        this.toastr.warning(this.errorMsg);
        this.registerForm.reset();
       }
    )
  }

}

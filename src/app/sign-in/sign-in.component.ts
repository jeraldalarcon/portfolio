import { Component, OnInit } from '@angular/core';
import { FormBuilder , FormGroup , Validators} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  siginForm:FormGroup;
  signResult:any = [];
  errorMsg:string = '';
  loading:boolean = false;

  constructor(
    private fb:FormBuilder,
    private userService:UserService,
    private router:Router,
    private toastr:ToastrService ) { }

  ngOnInit() {

    this.siginForm = this.fb.group({
      email:['',Validators.required],
      password:['', Validators.required]
    });

  }

  login(){
    this.loading = true;
    let formValue = this.siginForm.value;
    this.userService.loginService(formValue)
    .subscribe(
      result=>{
        this.signResult = result;
        // console.log('token  result data:',this.signResult['success'].token);
        // this.userService.storeToken(this.signResult);
        this.router.navigate(['']);
      },
      error=>{
        this.loading = false;
        this.errorMsg = error.statusText ;
        this.toastr.warning(this.errorMsg);
        this.siginForm.reset();
        
       }
    )
  }


}

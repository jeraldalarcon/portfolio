import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder , Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  response:any = [];
  isLoggedIn:boolean;
  loading = false;
  errorMsg ='';

  constructor(
    public matDialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data:string,
    private formbuilder:FormBuilder,
    private userService:UserService,
    
  ) { }

  ngOnInit() {
    this.loginForm = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  Cancel(){
    this.matDialogRef.close('cancel')
  }


  Login(){
    this.loading = true;
    let user = this.loginForm.value;
    this.isLoggedIn = false;
    this.userService.loginService(user)
      .subscribe((result)=>{
           this.response = result['success'].token;
        this.userService.storeToken(this.response);
        // this.isLoggedIn = true;
         console.log('this is response:',this.response);
        window.location.href=" "; 
           

      }),
      error=>{
        this.errorMsg = error.statusText ;
        console.log('errror handler',this.errorMsg); 
       }
      // ()=>{
       
      //   this.userService.storeToken(this.response);
      //   this.isLoggedIn = true;
      //    console.log(this.isLoggedIn);
      // }
  }

}

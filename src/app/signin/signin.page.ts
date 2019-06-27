import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { FormControl, FormGroup, FormBuilder, Validators, CheckboxControlValueAccessor } from '@angular/forms';
import { VerbalizeServiceService } from './../verbalize-service.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit, DoCheck {

  user: Observable<User>;
  showSpinner:boolean =false;
  marked = false;
  message: string =" ";
  errror1:string = "";
  check:boolean;

  signin = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
    terms: new FormControl
  });

  constructor(private splash:SplashScreen,private _service:VerbalizeServiceService,
    private router:Router,private fb:FormBuilder,public NavCrl:NavController,
    public toastController: ToastController) {
    
   }
  ngDoCheck(){
    if(this.signin.controls['terms'].value == true){
      this.check = true;
    }else{
      this.check = false;
    }
  }
  ngOnInit() {
  }
  SignIN(){
    this.splash.show();
    var email = this.signin.controls['email'].value;
    var password =this.signin.controls['password'].value;

    this._service.signin(email,password).then(user =>{
      console.log('successful' )
      this.splash.hide();
      localStorage.setItem('user',JSON.stringify(user));
      localStorage.setItem('user-uid',JSON.stringify(user.user.uid));
      this.message = 'successful logged in as ' + this.signin.controls['email'].value;
      this.presentToast();
  
      this.router.navigate(['/newsfeed'])
    },error=>{
      this.splash.hide();
      this.message = error.message;
      console.log(error.code)
      if (error.code.toString() == 'auth/invalid-email') {
        this.message = 'Please enter a valid email address';
      }else if(error.code.toString() =='auth/wrong-password' ) {
        if(this.signin.controls['password'].value == ""){
          this.message = 'Please enter your password';
        }else{
          this.message = 'Incorrect password , ' + 
          'If you forgot your password , use forgot password to reset your password';

        }
      }else if(error.code.toString() =='auth/user-not-found'){
        this.message = error.message + ' Please use SIGN UP to register as a new user';
       }
      //  else if()
      this.presentToast();
      console.log('Unsuccessful ' + error.message)
      this.signin.reset();
    })
  }
  termsCheck(){
  
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 6000,
      position: 'middle'
    });
    toast.present();
  }
  goToSignUp(){
    this.splash.show();
    this.router.navigate(['/signup']).then(res=>{
      this.splash.hide();
    })
  }
}

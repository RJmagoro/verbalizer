import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ToastController } from '@ionic/angular';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VerbalizeServiceService } from '../verbalize-service.service';
import { Router } from '@angular/router';
import { SignModule } from '../sign/sign.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  user: SignModule;
  showSpinner: boolean = false;
  message: string = " ";
  constructor(private _service: VerbalizeServiceService, private router: Router, public toastController: ToastController, private splash: SplashScreen) {

  }

  ngOnInit() {
  }

  userProfile = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.required]),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    ethnic: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    birthDate: new FormControl('', Validators.required)
  });
  signUp() {
    this.showSpinner = true;
    this.splash.show();
    this.user = {
      name: this.userProfile.controls['name'].value,
      surname: this.userProfile.controls['surname'].value,
      birthDate: this.userProfile.controls['birthDate'].value,
      age: this.userProfile.controls['age'].value,
      gender: this.userProfile.controls['gender'].value,
      ethnic: this.userProfile.controls['ethnic'].value,
      phone: this.userProfile.controls['phone'].value,
      email: this.userProfile.controls['email'].value,
      profilepic: "iconv.png",
      role: 'Regular'
    };

    this._service.signUp(this.userProfile.controls['email'].value, this.userProfile.controls['password'].value)
      .then((result) => {
        this._service.SendVerificationMail()
          .then((res) => {
            this.showSpinner = false;

            this.message = 'Successfully signed up';
            this.presentToast();
            this.router.navigate(['/signin'])
            console.log('Data sent')
            this._service.signUpDetails(this.user, result.user.uid).then(() => {

            });
          })
      }).catch((error) => {

        this.showSpinner = false;
        console.log(error)
        this.message = error.message;
        console.log(error.message)
        if (error.code.toString() == 'auth/invalid-email') {
          this.message = "Please enter a valid email address";
        } else if (error.code.toString() =='auth/weak-password' ) {
          this.message = "Please enter a valid password " + error.message;
        } else if (error.code.toString()=='auth/email-already-in-use'){
          this.message = "The email address is already registered. Did you forgot your login information ? Please use the forgot password"
        }
        this.presentToast();
        this.userProfile.reset();

      })
  }
  goToSignIn() {
    this.splash.show()
    this.router.navigate(['/signin']).then(res => {
      this.splash.hide();
    })
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message,
      duration: 6000,
      position: 'middle'
    });
    toast.present();
  }
}

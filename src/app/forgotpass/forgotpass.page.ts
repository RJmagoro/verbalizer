import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { VerbalizeServiceService } from '../verbalize-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {

  message:string;
  constructor(private _service:VerbalizeServiceService,private afauth:AngularFireAuth,public router:Router,private toastCrl:ToastController) { }

  ngOnInit() {
  }
  forgotpass =new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email])
  });

  sendMail(){
    var email = this.forgotpass.controls['email'].value;
    this.afauth.auth.sendPasswordResetEmail(email).then(res=>{
      this.message = 'verification email has been sent to your ['+ this.forgotpass.controls['email'].value +'] email , follow the instructions to reset your password';
      this.presentToast();
      this.router.navigate(['/signin'])
      console.log('email sent')
    },err=>{
      this.message = err.message;
      this.presentToast();
      console.log(err.message)
    })
  }
  async presentToast() {
    const toast = await this.toastCrl.create({
      message: this.message,
      duration: 5000
    });
    toast.present();
  }
}

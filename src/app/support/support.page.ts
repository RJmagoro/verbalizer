import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VerbalizeServiceService } from '../verbalize-service.service';
import { SupportdataModule } from '../supportdata/supportdata.module';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  showSpinner:boolean =false;
  message_res:any;
  message:string;
  submitted = false;
  supportform:SupportdataModule;
  constructor(private _service:VerbalizeServiceService,public router:Router,public toastController: ToastController) { 

    
  }

  ngOnInit() {
  }
  contactForm = new FormGroup({
    name:new FormControl('',Validators.required),
    email:new FormControl('',Validators.email),
    message:new FormControl('',Validators.required),
    subjects:new FormControl('',Validators.required),

  });
  onSubmit(){
    // this.submitted = true;
    this.showSpinner = true;
    //     // stop here if form is invalid
    //     if (this.contactForm.invalid) {
    //         return;
    //     }
        
    this.supportform = {
      name: this.contactForm.controls['name'].value,
      email: this.contactForm.controls['email'].value,
      message:this.contactForm.controls['message'].value,
      subjects:this.contactForm.controls['subjects'].value,
      time: new Date(),
      reply: 'n'
    };
    this._service.contactUs(this.supportform).then(res =>{
      this.message_res = 'We appreciate you contacting us about your ['+ this.contactForm.controls['subjects'].value + ']. One of our support agents will get back to you shortly. Have a great day! '
      this.presentToast();
      this.router.navigate(['/newsfeed'])
      this.showSpinner = false;
      console.log('data sent')
      this.contactForm.reset()
      
    },err=>{
      this.message_res = err.message;
      this.presentToast();
      
      this.showSpinner = false;
      console.log('error')
    })
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: this.message_res,
      duration: 5000
    });
    toast.present();
  }
  
}

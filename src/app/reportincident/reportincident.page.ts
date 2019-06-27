import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VerbalizeServiceService } from '../verbalize-service.service';
import { ReportModule } from '../report/report.module';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reportincident',
  templateUrl: './reportincident.page.html',
  styleUrls: ['./reportincident.page.scss'],
})
export class ReportincidentPage implements OnInit {

  selectedFile: File;
  showSpinner: boolean = false;
  report: any;
  err: string = " ";
  tdate: Date = new Date(); 
  rep: ReportModule;
  message:any = " ";
  uid:string;
  Reportform:FormGroup;
  lat:any;
  lng:any;
  constructor(public toastCrl:ToastController,private _service: VerbalizeServiceService,private storage: AngularFireStorage,private splash:SplashScreen) {
    this.Reportform = new FormGroup ({
      description: new FormControl(''),
        typeOfabuse: new FormControl(''),
        date: new FormControl(''),
        uid: new FormControl(''),
       incidentDate:new FormControl(''),
       location:new FormControl('')
      });

      if (navigator)
    {
    navigator.geolocation.getCurrentPosition( pos => {
        this.lng = +pos.coords.longitude;
        this.lat = +pos.coords.latitude;
      });
    }
  }
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  this.storage.upload("report/" + this.selectedFile.name, this.selectedFile)
   }
  onUpload() {
    console.log(this.selectedFile); // You can use FormData upload to backend server
    
  }
  ngOnInit() {
    this.uid = localStorage.getItem('user-uid')
    console.log(this.uid)
  }

  reportIncident() {
    this.splash.show();
    this.showSpinner = true;
    this.rep = {
      typeOfAbuse: this.Reportform.controls['typeOfabuse'].value,
      description: this.Reportform.controls['description'].value,
      date: this.Reportform.controls['date'].value,
      attatchment: this.selectedFile.name,
      location:this.Reportform.controls['location'].value,
      uid: this.uid
    };

    this._service.addReport(this.rep).then(res=>{
      this.message = 'Incident reported our consultants will get back to you'
      alert(this.message)
      this.splash.hide();
      this.presentToast();
      this.showSpinner = false;
      console.log('successfull')
      this.Reportform.reset();

    },err=>{
      this.message = err.message;
      this.splash.show();
      this.presentToast();
      alert(this.message)
      console.log('form submission failed..' + this.message)

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

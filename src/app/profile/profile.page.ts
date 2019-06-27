import { ToastController, LoadingController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ProfileinterfaceModule } from '../profileinterface/profileinterface.module';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { VerbalizeServiceService } from '../verbalize-service.service';
import { Router } from '@angular/router';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public photos : any;
  public base64Image : string;
  showSpinner: boolean = false;
  myUser: any;
  myUserID: string;
  selectedFile = null;
  profileForm: FormGroup;
  profile: ProfileinterfaceModule;
  Name: string;
  Surname: string;
  message: string;
  messageFile: string;
  user: any;
  constructor(public camera: Camera, public loadingController:
     LoadingController, private storage: AngularFireStorage,
      private db: AngularFirestore, private _storage:
      AngularFireStorage, private _service: VerbalizeServiceService,
      private router: Router, public toastCrl: ToastController) {
        
    this.profileForm = new FormGroup({
      name: new FormControl(''),
      surname: new FormControl('')
    })
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.myUserID = JSON.parse(localStorage.getItem('user-uid'));
    console.log(this.user.uid)
    this._service.getUserProfile(this.myUserID).subscribe(res => {
      this.myUser = res
      console.log(this.myUser)
      if (this.myUser.profilepic) {
        this._storage.ref("profile/" + this.myUser.profilepic).getDownloadURL().subscribe(imgRes => {
          this.myUser.profilepic = imgRes;
          console.log(imgRes)
        })
      } else {
        this._storage.ref("post/" + "iconv.png").getDownloadURL().subscribe(imgR => {
          this.myUser.profilepic = imgR;
        })
      }
    })

  }

  takePicture() {
    console.log('take picture')
    this.camera.PictureSourceType.CAMERA;

    const options : CameraOptions = {
      quality: 50, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options) .then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.photos.push(this.base64Image);
        this.photos.reverse();
      }, (err) => {
        console.log(err);
      });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this._storage.upload('profile/' + this.selectedFile.name, this.selectedFile).then(res => {
      this.messageFile = 'successessfuly uploaded';
      this.presentLoading();
    }, err => {
      this.messageFile = 'upload unsuccessful';
      this.presentLoading();
    });
  }

  onUpload() {
   
    console.log(this.selectedFile.name); // You can use FormData upload to backend server

  }
  UpdateProfile(profile: ProfileinterfaceModule) {
    this.showSpinner = true;
    
    this.presentLoading();
    if (this.profileForm.controls['name'].value == "") {
      this.Name = profile.name
    } else {
      this.Name = this.profileForm.value.name
    }
    if (this.profileForm.controls['surname'].value == "") {
      this.Surname = profile.surname
    } else {
      this.Surname = this.profileForm.value.surname
    }

    
    
    this.profile = {
      name: this.Name,
      surname: this.Surname,
      uid: this.myUserID,
      profilepic: this.selectedFile.name

    }
    this._service.updateProfile(this.myUserID, this.profile).then(res => {
      this.showSpinner = false;
      this.message = 'Profile updated';
      this.presentToast();
      
      this.router.navigate(['/app-landing'])
    }, err => {
      this.showSpinner = false;
      this.message = err.message;
      this.presentToast()

    })
  }
  async presentToast() {
    const toast = await this.toastCrl.create({
      message: this.message,
      duration: 4000
    });
    toast.present();
  }
  async presentToastFile() {
    const toast = await this.toastCrl.create({
      message: this.messageFile,
      duration: 3000
    });
    toast.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 4000
    
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }

  //  
}

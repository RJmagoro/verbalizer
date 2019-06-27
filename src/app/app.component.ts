import { AngularFireStorage } from '@angular/fire/storage';
import { VerbalizeServiceService } from './verbalize-service.service';
import { Component } from '@angular/core';

import { Platform, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import  {timer} from 'rxjs';
import { app } from 'firebase';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  ngDoCheck() {
    this.user = localStorage.getItem('user');
  }

  myUserID:any;
  myUser: any;
  loginUser:any;
  user: string;
  showSplash = true;
  public appPages = [
    {
      title: 'News Feed',
      url: '/newsfeed',
      icon: 'paper'
    },
    {
      title:'Profile',
      url:'/profile',
      icon:'contact'
    },
    {
      title: 'Institutions',
      url: '/institutions',
      icon: 'business'
    },
    {
      title: 'Chat',
      url: '/userchat',
      icon: 'chatbubbles'
    },
    {
      title: 'Report incident',
      url: '/reportincident',
      icon: 'document'
    },
    {
      title: 'Quick Dial',
      url: '/quickdial',
      icon: 'call'
    },
    {
      title: 'Support',
      url: '/support',
      icon: 'hammer'
    },
    {
      title:'Log out',
      url:'/logout',
      icon:'md-log-out'
    }
   
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router:Router,
    public loadCrl: LoadingController,
    private _service:VerbalizeServiceService,
    private _storage:AngularFireStorage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      timer(300).subscribe(()=> this.showSplash = false)
    });
  }
  ngOnInit(){
   
    this.myUserID = JSON.parse(localStorage.getItem('user-uid'));
   
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
  logout(){
    localStorage.clear();
    localStorage.removeItem('user')
    this.router.navigate(['signin'])
    
  }

  
}

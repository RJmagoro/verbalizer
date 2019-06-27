import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import{AngularFireModule} from 'angularfire2';
import { environment } from './../environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Plugins } from '@capacitor/core';
import { Camera } from '@ionic-native/Camera/ngx';


// firebase.initializeApp ({
//   apiKey: "AIzaSyCFmxm7h7RKBC0ujKq0yzT_RpVh2FCCVpo",
//     authDomain: "onepagesigninsignup-mast-25121.firebaseapp.com",
//     databaseURL: "https://onepagesigninsignup-mast-25121.firebaseio.com",
//     projectId: "onepagesigninsignup-mast-25121",
//     storageBucket: "onepagesigninsignup-mast-25121.appspot.com",
//     messagingSenderId: "151322820563",
//     appId: "1:151322820563:web:2a9153eef42d4dd3"
// }),



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule.forRoot(),
   
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    AngularFireAuth,
    AngularFirestore,
    Storage,
    AngularFireStorage,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

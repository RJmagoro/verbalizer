import { LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router:Router, public loadCrl:LoadingController) { }

  ngOnInit() {
    localStorage.removeItem('user');
    this.router.navigate(['/signin']).then(res=>{
    });
  }

  async presentLoading() {
    const loading = await this.loadCrl.create({
      message: 'Signing out...',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
}

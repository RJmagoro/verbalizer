import { Component, OnInit } from '@angular/core';
import { VerbalizeServiceService } from '../verbalize-service.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-quickdial',
  templateUrl: './quickdial.page.html',
  styleUrls: ['./quickdial.page.scss'],
})
export class QuickdialPage implements OnInit {

  contacts: any;
  constructor(private service: VerbalizeServiceService,public modalController: ModalController) { }

  ngOnInit() {
    this.service.getContacts().subscribe(data => {
      this.contacts = data;
      console.log(this.contacts)
    })
  }
}

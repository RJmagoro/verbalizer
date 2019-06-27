import { NavController } from '@ionic/angular';
import { AuthService } from './../auth.service';
import { ChatserviceService } from './../chatservice.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.page.html',
  styleUrls: ['./groupchat.page.scss'],
})
export class GroupchatPage implements OnInit {
  chat$: Observable<any>;
  newMsg: string;

  showSpinner: boolean =false;
  constructor(private navCrl:NavController, private location: Location,
    public cs: ChatserviceService,
    private route: ActivatedRoute,
    public auth: AuthService
  ) {}

  ngOnInit() {
    const chatId = this.route.snapshot.paramMap.get('id');
    const source = this.cs.get(chatId);
    // this.chat$ = this.cs.joinUsers(source); // .pipe(tap(v => this.scrollBottom(v)));
    this.scrollBottom();
  }

  submit(chatId) {
    if (!this.newMsg) {
      return alert('you need to enter something');
    }
    this.cs.sendMessage(chatId, this.newMsg);
    this.newMsg = '';
    this.scrollBottom();
  }

  trackByCreated(i, msg) {
    return msg.createdAt;
  }

  private scrollBottom() {
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight), 500);
  }
  OnBack(){
    this.showSpinner = false;
    this.navCrl.back();
  }
}

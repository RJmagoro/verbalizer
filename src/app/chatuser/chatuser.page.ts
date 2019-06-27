import { ChatadataModule } from './../chatadata/chatadata.module';
import { Component, OnInit } from '@angular/core';
import { InstitutionModule } from '../institution/institution.module';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VerbalizeServiceService } from '../verbalize-service.service';
import { SignModule } from '../sign/sign.module';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatuser',
  templateUrl: './chatuser.page.html',
  styleUrls: ['./chatuser.page.scss'],
})
export class ChatuserPage implements OnInit {

  inst: InstitutionModule;
  showSpinner: boolean = false;
  user: SignModule;
  users: any;
  chat: any[];
  receiver: string;
  messageArray: any = [];
  chatData: ChatadataModule;
  institution: any;
  today: Date = new Date();
  userid = JSON.parse(localStorage.getItem('user-uid'));
  messages: FormGroup;
  instid:any;

  constructor(public router:Router,private _service: VerbalizeServiceService, private _storage: AngularFireStorage) {
    this.messages = new FormGroup({
      message: new FormControl('', Validators.required)
    })

  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem("user"))
    //this.user = this.user[0];
    this.getInsitutions();
    this.today;
    this.myFunction();
    this.instid = JSON.parse(localStorage.getItem('institution'));
    this.showMessage(this.instid);
    console.log(this.instid);
  }
  onBack(){
    this.instid ="";
    console.log('id refreshed');
    this.router.navigate(['userchat']);
  }
  getUsers() {
    this._service.getUser().subscribe(res => {
      this.users = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as SignModule;
      })
      for (let i = 0; i < Object.keys(this.users).length; i++) {
        if ((this.users[i].profilepic).substring(0, 23) == "https://firebasestorage") {
        } else {
          if (this.users[i].profilepic) {
            this._storage.ref("profile/" + this.users[i].profilepic).getDownloadURL().subscribe(imgRes => {
              this.users[i].profilepic = imgRes;
            })
          }
        }
      }
    })
  }
  getInsitutions() {
  
  }

  myFunction() {
    var elmnt = document.getElementById("content");
    elmnt.scrollIntoView();
  }
  submitMessage() {
    this.showSpinner = true;
    this.chatData = {
      message: this.messages.controls["message"].value,
      time: new Date(),
      receiver: this.receiver,
      sender: this.userid
    }
    this._service.sendAdminChat(this.chatData).then(res => {
      console.log('sent')
      console.log(this.userid)
      this.messages.reset();
    });
    console.log(this.chatData)
  }
  showMessage(institution: InstitutionModule) {
    this.receiver = institution.id;
    this.inst = institution;

    this._service.getAdminChat().subscribe(res => {
      this.chat = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as ChatadataModule;
      })
      console.log(this.chat)

      console.log(this.receiver)


      //console.log(this.userid.substr(1,this.userid.length-2))
      this.messageArray.splice(0, Object.keys(this.messageArray).length);

      for (let i = 0; i < Object.keys(this.chat).length; i++) {
        if (this.chat[i].sender == this.userid && this.chat[i].receiver == this.receiver) {
          this.messageArray.push({ receiver: this.receiver, sender: this.userid, message: this.chat[i].message, time: this.chat[i].time });
          console.log(this.messageArray)
        }
        if (this.chat[i].sender == this.receiver && this.chat[i].receiver == this.userid) {
          this.messageArray.push({ sender: this.receiver, receiver: this.userid, message: this.chat[i].message, time: this.chat[i].time });
          console.log(this.messageArray)
        }
      }


    })
  }
}

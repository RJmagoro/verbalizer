import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { PostModule } from '../post/post.module';
import { InstitutionModule } from '../institution/institution.module';
import { SignModule } from '../sign/sign.module';
import { VerbalizeServiceService } from '../verbalize-service.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.page.html',
  styleUrls: ['./newsfeed.page.scss'],
})
export class NewsfeedPage implements OnInit {

  liked: number = 0;
  disliked: number;
  clickedCard: any = "";
  showSpinner: boolean = true;
  post: any
  user: any;
  Num: number;
  id: string;
  uComment: string;
  institution: any;
  Institution: InstitutionModule;
  DateR: Date;
  allUsers: string;
  myUser: any;
  commentsAr: string[];
  allcomments: any;
  postcomments: any;
  commentForm: FormGroup;
  myUserID: string;
  usermessages: any;
  num0fmessages: any;
  iconname: string = "mail";

  constructor(private _service: VerbalizeServiceService, private storage: AngularFireStorage) {
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.myUserID = JSON.parse(localStorage.getItem('user-uid'));
    this._service.getnewmessages(this.myUserID).subscribe(res => {
      this.usermessages = res;
      this.num0fmessages = res.length;
      console.log(res.length)
      console.log(this.num0fmessages)
      if (this.num0fmessages) {
        if (this.num0fmessages > this.num0fmessages) {
          this.iconname = "mail-unread";
        } else {
          this.iconname = "mail-open"
        }
      }
    })

    this._service.getPosts().subscribe(data => {

      this.post = data.map(e => {
        return {
          postId: e.payload.doc.id,
          ...e.payload.doc.data()
        } as PostModule;

      })
      this.showSpinner = false;

      for (let i = 0; i < Object.keys(this.post).length; i++) {
        if (this.post[i].comments == "") {
          this.post[i].comments = [];
        }
        if (this.post[i].image) {
          this.storage.ref("post/" + this.post[i].image).getDownloadURL().subscribe(imgRes => {
            this.post[i].image = imgRes;
            console.log(imgRes)
          })
        } else {
          this.storage.ref("post/" + "iconv.png").getDownloadURL().subscribe(imgR => {
            this.post[i].image = imgR;
          })
        }
        if (this.post[i].comments != null) {
          this.post[i].noComment = Object.keys(this.post[i].comments).length

        } else {
          this.post[i].noComment = 0;
        }
        this.DateR = this.post[i].date
      }

    })

    this._service.getUser().subscribe(data => {
      this.user = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()

        } as SignModule;

      })
      for (let i = 0; i < Object.keys(this.user).length; i++) {
        if (this.user[i].profilepic) {
          this.storage.ref("profile/" + this.user[i].profilepic).getDownloadURL().subscribe(imgRes => {
            this.user[i].profilepic = imgRes;
            console.log(imgRes)
          })
        } else {
          this.storage.ref("post/" + "iconv.png").getDownloadURL().subscribe(imgR => {
            this.user[i].profilepic = imgR;
          })
        }
      }
    })


    console.log(this.myUserID)
    this._service.getUserProfile(this.myUserID).subscribe(res => {
      this.myUser = res
      console.log(this.myUser)
      if (this.myUser.profilepic) {
        this.storage.ref("profile/" + this.myUser.profilepic).getDownloadURL().subscribe(imgRes => {
          this.myUser.profilepic = imgRes;
          console.log(imgRes)
        })
      } else {
        this.storage.ref("post/" + "iconv.png").getDownloadURL().subscribe(imgR => {
          this.myUser.profilepic = imgR;
        })
      }
    })
    this.myUser = JSON.parse(localStorage.getItem('user'));
    // console.log(localStorage.getItem('user-uid'))

    this._service.getComments().subscribe(data => {
      this.allcomments = data
    })

    this._service.getInstitution().subscribe(res => {
      this.institution = res.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as InstitutionModule
      })
      for (let i = 0; i < Object.keys(this.institution).length; i++) {
        if ((this.institution[i].image).substring(0, 23) == 'https://firebasestorage') {
        } else {
          if (this.institution[i].image) {
            this.storage.ref("institution/" + this.institution[i].image).getDownloadURL().subscribe(imgRes => {
              this.institution[i].image = imgRes;
            })
          }
        }
      }
    })
    for (let i = 0; i < Object.keys(this.institution).length; i++) {
      if (this.institution[i].image) {
        this.storage.ref("institution/" + this.institution[i].image).getDownloadURL().subscribe(imgRes => {
          this.institution[i].image = imgRes;
        })
      } else {
        this.storage.ref("post/" + "iconv.png").getDownloadURL().subscribe(imgR => {
          this.institution[i].image = imgR;
        })
      }
    }


  }

  onComment(post: PostModule) {
    if (this.clickedCard == "") {
      this.clickedCard = post;
    } else if (this.clickedCard == post) {
      this.clickedCard = "";
    }

  }


  dislike(post: PostModule, id: string) {
    post.reaction -= 1
    this._service.addReactions(post, id).then(res => {

    })

    return console.log("disliked");
  }

  onLike(post: PostModule, id: string) {
    if (this.liked == 0) {
      post.reaction += 1

      this._service.addReactions(post, id).then(res => {

      })
      this.liked = 1;
    } else if (this.liked == 1) {
      post.reaction -= 1

      this._service.addReactions(post, id).then(res => {

      })
      this.liked = 0;
    }


    return console.log("liked");
  }

  onDislike(dislike) {


    return this.disliked;
  }



  commentAdd(post: PostModule) {

    console.log(this.commentForm.controls['comment'].value);
    console.log(JSON.parse(localStorage.getItem('user-uid')));
    post.comments.splice(Object.keys(post.comments).length, 1, 
    { uid: this.myUserID, comment: this.commentForm.controls['comment'].value, date: new Date })
    //console.log(post);
    this._service.addC(post)

    this.commentForm.reset()

  }


}

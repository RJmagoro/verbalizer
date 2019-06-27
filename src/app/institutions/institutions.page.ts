import { InstitutionModule } from './../institution/institution.module';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { VerbalizeServiceService } from '../verbalize-service.service';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.page.html',
  styleUrls: ['./institutions.page.scss'],
})
export class InstitutionsPage implements OnInit {

  InstitutionsNum:any;
  showSpinner: boolean =true;
  institutions:any;
  constructor(private _service: VerbalizeServiceService,private storage:AngularFireStorage) { }

  ngOnInit() {
    this._service.getInstitution().subscribe(data=>{
      this.institutions = data.map(e=>{
        return{
          id:e.payload.doc.id,
          ...e.payload.doc.data()
        }as InstitutionModule
      })
      console.log(this.institutions)
      for(let i = 0; i < Object.keys(this.institutions).length;i++){
      this.InstitutionsNum = i + 1; 
       
        if(this.institutions[i].image){
          this.storage.ref("institution/" + this.institutions[i].image).getDownloadURL().subscribe(imgRes=>{
            this.institutions[i].image =imgRes;
          })
        }else{
          this.storage.ref("post/" + "iconv.png").getDownloadURL().subscribe(imgR=>{
            this.institutions[i].image=imgR;
          })
        }
        }
        this.showSpinner = false;
    }) 
  }
}

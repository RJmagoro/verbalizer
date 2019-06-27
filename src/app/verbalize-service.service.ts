import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { ReportModule } from './report/report.module';
import { SignModule } from './sign/sign.module';
import { ChatadataModule } from './chatadata/chatadata.module';
import { PostModule } from './post/post.module';
import { ProfileinterfaceModule } from './profileinterface/profileinterface.module';
import { SupportdataModule } from './supportdata/supportdata.module';
import { InstitutionModule } from './institution/institution.module';

@Injectable({
  providedIn: 'root'
})
export class VerbalizeServiceService {

  constructor(private afAuth:AngularFireAuth, private afs:AngularFirestore) { }

  getInst(ints: InstitutionModule){
    return this.afs.collection('institution').doc(ints.id).snapshotChanges();
  }
  getChatInstituiton(ints: InstitutionModule){

    return this.afs.collection('Institution', ref => ref.where(ints.id,'==','id')).snapshotChanges();

  }
  getnewmessages(uid:string){
    return this.afs.collection('AdminChat', ref => ref.where('receiver','==',uid)).valueChanges();
  }
  signin(email,password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }
  getPostByID(id:string){
    return this.afs.collection('Post').doc(id).snapshotChanges();
  }
  getPosts() {
    return this.afs.collection('Post').snapshotChanges();
  }
  signUpDetails(user: SignModule, uid: string) {
    return this.afs.collection("SignUp").doc(uid).set(user);
  }
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }
  signUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }
  
  addReport(report: ReportModule) {
    return this.afs.collection('Report').add(report);
  }
  resetPassword(email: string) {
    
    return this.afAuth.auth.sendPasswordResetEmail(email)

  }
  getUserProfile(Id:string){
    //sessionStorage.setItem('user',JSON.stringify('user'))
    return this.afs.collection('SignUp').doc(Id).valueChanges();
  }
  getContacts() {
    return this.afs.collection('Quick-dial',ref=> ref.where("name",">","")).valueChanges();
  }
  getInstitution() {
    return this.afs.collection('Institution',ref => ref.where('name',">", "")).snapshotChanges();
  }
  getAdminChat() {
    return this.afs.collection("AdminChat", ref => ref.orderBy("time", "asc")).snapshotChanges();
  }
 
  sendAdminChat(message: ChatadataModule) {
    return this.afs.collection("AdminChat").add(message);
  }
  addReactions(post:PostModule, id : string){
    return this.afs.collection('Post').doc(id).update(post)
  }
  getComments(){
    return this.afs.collection('Comments').valueChanges();
  }
  getUser(){
    return this.afs.collection('SignUp').snapshotChanges();
  }
  addC(post: PostModule){
    return this.afs.collection('Post').doc(post.id).set(post)
  }

  reportIncident(id: string, report: ReportModule) {
    return this.afs.collection('Report').doc(id).set(report);
  }
  updateProfile(id:string, profile:ProfileinterfaceModule){
    return this.afs.collection('SignUp').doc(id).update(profile);
  }
  contactUs(support: SupportdataModule){
    return this.afs.collection('Support').add(support);
  }
}




import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'signin', 
  loadChildren: './signin/signin.module#SigninPageModule' 
},
  { path: 'signup',
   loadChildren: './signup/signup.module#SignupPageModule' 
  },
  { path: 'newsfeed', 
  loadChildren: './newsfeed/newsfeed.module#NewsfeedPageModule'
 },
  { path: 'profile',
   loadChildren: './profile/profile.module#ProfilePageModule'
   },
  { path: 'quickdial', 
  loadChildren: './quickdial/quickdial.module#QuickdialPageModule'
 },
  { path: 'userchat', loadChildren: './userchat/userchat.module#UserchatPageModule' },
  { path: 'institutions', loadChildren: './institutions/institutions.module#InstitutionsPageModule' },
  { path: 'forgotpass', loadChildren: './forgotpass/forgotpass.module#ForgotpassPageModule' },
  { path: 'reportincident', loadChildren: './reportincident/reportincident.module#ReportincidentPageModule' },
  { path: 'support', loadChildren: './support/support.module#SupportPageModule' },
  { path: 'menupage', loadChildren: './menupage/menupage.module#MenupagePageModule' },
  { path: 'terms', loadChildren: './terms/terms.module#TermsPageModule' },
  { path: 'groupchat', loadChildren: './groupchat/groupchat.module#GroupchatPageModule' },
  { path: 'logout', loadChildren: './logout/logout.module#LogoutPageModule' },
  { path: 'chatuser', loadChildren: './chatuser/chatuser.module#ChatuserPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

import {Component, ViewChild} from '@angular/core';
import {
  IonicPage,
  NavController,
  Nav,
  NavParams,
  LoadingController,
  Loading
} from 'ionic-angular';
import {AuthProvider} from '../../providers/auth/auth';

@IonicPage()
@Component({selector: 'page-home', templateUrl: 'home.html'})

export class HomePage {
  @ViewChild(Nav)nav : Nav;
  rootPage : any = 'DefaultPage'
  pages : Array < {
    page: boolean,
    icon?: string;
    title: string,
    component?: string
  } >;
  loading : Loading;
  username : string = 'username';
  company : string = 'company';

  constructor(public loadingCtrl : LoadingController, public navCtrl : NavController, public navParams : NavParams, public authProvider : AuthProvider) {

    this.pages = [
      {
        title: 'Default',
        icon: 'log-out',
        component: 'DefaultPage',
        page: true
      }, {
        title: 'Log Out',
        icon: 'log-out',
        page: false
      }
    ];
  }
  ionViewWillEnter() {
    this
      .authProvider
      .validateUserWithPromise()
      .then(userData => {
        console.log("HomePage - ionViewWillEnter - userloggedIn" + userData)
        this.username = userData.userData.username
      })
      .catch(error => {
        console.log("HomePage - ionViewWillEnter - userNotLoggedIn" + error)
        this
          .nav
          .setRoot("LoginPage")
      })
  } //end ionViewWillEnter

  openPage(page, title) {
    console.log('open page', page, title);
    // Reset the content nav to have just this page we wouldn't want the back button
    // to show in this scenario

    if (!page && title === "Log Out") {
      this
        .authProvider
        .logout()
        .subscribe(success => this.nav.setRoot('LoginPage'), error => this.nav.setRoot('LoginPage', {error: error}));
    }

    this
      .nav
      .setRoot(page, {title: title});
  }

}
import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  AlertController,
  Loading
} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthProvider} from '../../providers/auth/auth';
import {regexPatterns} from '../../validators/regexPatterns'
import {MatchPasswordValidator} from '../../validators/matchPasswordValidator'
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({selector: 'page-login', templateUrl: 'login.html'})
export class LoginPage {
  public loginForm : FormGroup;

  constructor(public navCtrl : NavController, public navParams : NavParams, public formBuilder : FormBuilder, public alertCtrl : AlertController, public loadingCtrl : LoadingController, public AuthProvider : AuthProvider, public nav : NavController) {

    //Form
    this.loginForm = formBuilder.group({
      email: [
        '', Validators.compose([
          Validators.required, Validators.pattern(regexPatterns.email)
        ])
      ],
      //PASSWORD
      password: [
        '', Validators.compose([
          Validators.required
          // ,Validators.pattern(regexPatterns.password)
        ])
      ]
    }); //end this.loginForm
  } // end constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() : void {
    //Check for missing credentials
    if(this.loginForm.invalid) {
      console.log(this.loginForm.value);
      //Alert pop-up
      let missingCredentialsAlert = this
        .alertCtrl
        .create({
          message: "Some credentials are missing",
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
      missingCredentialsAlert.present();
      //Call login
    } else {
      let loading = this
        .loadingCtrl
        .create({spinner: "Bubbles", content: "logging in ...."});
      loading.present();
      this
        .AuthProvider
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(user => {
          console.log("login component - login - success response" + JSON.stringify(user, null, 4))
          loading
            .dismiss()
            .then(() => {
              this
                .nav
                .setRoot("HomePage");
            });
        }, error => {
          console.log("login component - login - error response - " + error)
          // if(error.status === 404)
          loading
            .dismiss()
            .then(() => {
              let alert = this
                .alertCtrl
                .create({
                  title: error.status,
                  message: error,
                  buttons: [
                    {
                      text: "Ok"
                    }
                  ]
                });
              alert.present();
            });
        });
    }
  }

  goToSignup() : void {
    this
      .nav
      .setRoot("SignupPage");
  }

  goToResetPassword() : void {
    this
      .nav
      .push("ForgotPasswordPage");
  }

} // end export class LoginPage
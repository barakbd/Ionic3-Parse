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
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({selector: 'page-signup', templateUrl: 'signup.html'})
export class SignupPage {
  public signupForm : FormGroup;
  public loading : Loading;

  constructor(public navCtrl : NavController, public navParams : NavParams, public formBuilder : FormBuilder, public alertCtrl : AlertController, public loadingCtrl : LoadingController, public authProvider : AuthProvider, public nav : NavController) {

    this.signupForm = formBuilder.group({
      //FIRST NAME
      first_name: [
        '', Validators.compose([
          // Validators.required,
          Validators.minLength(3),
          Validators.pattern(regexPatterns.nameStrings)
        ])
      ], //LAST NAME
      last_name: [
        '', Validators.compose([
          // Validators.required,
          Validators.minLength(3),
          Validators.pattern(regexPatterns.nameStrings)
        ])
      ],
      email: [
        '', Validators.compose([
          Validators.required, Validators.pattern(regexPatterns.email)
        ])
      ],
      //PASSWORDS GROUP
      passwords: formBuilder.group({
        //PASSWORD
        password: [
          '', Validators.compose([
            Validators.required
            ,Validators.pattern(regexPatterns.password)
          ])
        ],
        //REPEAT_PASSWORD
        repeat_password: [
          '', Validators.compose([Validators.required])
        ]
      }, {validator: MatchPasswordValidator.isMatching})
    }); //end this.signupForm
  } // end constructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() : void {
    if(this.signupForm.invalid) {
      console.log(this.signupForm.value);
    } else {
      this
        .authProvider
        .signup(this.signupForm.value.email, this.signupForm.controls.passwords.value.password)
        .subscribe(newUserCreated => {
          console.log("signup component - signup - success response" + JSON.stringify(newUserCreated, null, 4))
          this
            .loading
            .dismiss()
            .then(() => {
              this
                .nav
                .setRoot("HomePage");
            });
        }, error => {
          console.log("signup component - signup - error response" + error)          
          this
            .loading
            .dismiss()
            .then(() => {
              let alert = this
                .alertCtrl
                .create({
                  message: error,
                  buttons: [
                    {
                      text: "Ok",
                      role: 'cancel'
                    }
                  ]
                });
              alert.present();
            });
        });

      this.loading = this
        .loadingCtrl
        .create();
      this
        .loading
        .present();
    }
  }

  goToLogin() : void {
    this
      .nav
      .setRoot("LoginPage");
  }

  goToResetPassword() : void {
    this
      .nav
      .push("ForgotPasswordPage");
  }

} // end export class SignupPage
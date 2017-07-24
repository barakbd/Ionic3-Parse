import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// import {NativeStorage} from "@ionic-native/native-storage"
import {Storage} from '@ionic/storage';

// var baseUrl = "http://" + window.location.hostname + ":1337"
// console.log("baseUrl - " + baseUrl)

/* If you wish to override or add headers use below options.
Otherwise, DefaultRequestOptionsProvider are added to every call
import {Headers, RequestOptions} from '@angular/http';
var headerProperties = {
  "X-Parse-Application-Id": "myAppId",
  "Content-Type": "application/x-www-form-urlencoded"
}

let headers = new Headers(headerProperties);
let options = new RequestOptions({ headers: headers }); */

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthProvider {
  // nativeStorage : NativeStorage

  constructor(private http : Http, private ionicStorage : Storage) {
    // constructor(private http : Http, nativeStorage : NativeStorage, private
    // ionicStorage : Storage) {

    console.log('Hello AuthProvider Provider');
  }

  /** ------------------ signup ----------------------
 *
 * @param email
 * @param password
 */
  signup(email : string, password : string) : Observable < Response > {
    if(email === null || password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return this
        .http
        .post("/users", {
          username: email,
          password: password
        })
      // .map(response => response.json())
    }
  }

  /** ------------------ login ----------------------
  *
  * @param  {string} email
  * @param  {string} password
  */
  public login(email : string, password : string) : Observable < any > {
    if(email === null || password === null) {
      console.log("AuthProvider - login")
      return Observable.throw("Please insert credentials");
    } else {
      let loginParams : URLSearchParams = new URLSearchParams()
      loginParams.set("username", email)
      loginParams.set("password", password)

      return this
        .http
        .get('/login', {search: loginParams})
        .map(response => {
          console.log("AuthProvider - login - response.json() " + response.json())
          /*           this
            .nativeStorage
            .setItem("sessionToken", response.json().sessionToken)
 */
          this
            .setUserDataInStorage(response)
            .then((userDataSaved) => {
              console.log("AuthProvider - login - userDataSaved - ", userDataSaved)
              return response
            })
        }) // end map
    } //end else
  } // end login

  // ------------------ storage methods ----------------------

  /** --------------------- setUserDataInStorage ------------------------
 *
 * @param response
 */
  private setUserDataInStorage(response) {
    console.log("AuthProvider - setUserDataInStorage - response - " + response)
    return this
      .ionicStorage
      .set('userData', response.json())
  }
  /** --------------------- getUserDataFromStorage ------------------------
 * public for dislpaying name on home page
 */
  public getUserDataFromStorage() {
    console.log("AuthProvider - getUserDataFromStorage")
    return this
      .ionicStorage
      .get('userData')
  }

  /** ------------------ logout ----------------------
  */
  public logout() : Observable < boolean > {
    return this
      .http
      .post('logout', {})
      .map(response => response.json());
  }

  /** ------------------ resetPassword ----------------------
   *
   * @param email
   */
  public resetPassword(email : string) : Observable < boolean > {
    if(email === null) {
      return Observable.throw("Please insert email");
    } else {
      return this
        .http
        .get('api/forgotPassword.json')
        .map(response => response.json());
    }
  }

  /**  ------------------ validateUser ----------------------
 * Check if current user exsists in local storage (or native storage)
 * and if so check if token is still valid
 * @param token
 */
  /*   public validateUser() : any {
    this
      .getUserDataFromStorage()
      .then(userData => {
        console.log('AuthProvider - validateUser - userData- ', userData);
        if (userData) {
          return this
            .http
            .get('/users/me')
            .map(response => {
              console.log('AuthProvider - validateUser - response - ', response);
              if (response.status === 200) {
                console.log('AuthProvider - validateUser - validated!');
                return {
                  loggedIn: true,
                  userData: response.json()
                }
              } else {
                console.log('AuthProvider - validateUser - NOT validated!');
                return {loggedIn: false}
              }
            });
        } else {
          console.log('AuthProvider - validateUser - no local userData!');
          return {loggedIn: false}
        }
      });
  } // end validateUser
 */
  public validateUserWithPromise() : any {
    this
      .getUserDataFromStorage()
      .then(userData => {
        return new Promise((resolve, reject) => {
            console.log('AuthProvider - validateUser - userData exists' + JSON.stringify(userData, null, 4));
            this
              .http
              .get('/users/me')
              .subscribe(response => {
                console.log('AuthProvider - validateUser - response - ', response);
                if (response.status === 200) {
                  console.log('AuthProvider - validateUser - validated!');
                  resolve({
                    loggedIn: true,
                    userData: response.json()
                  })
                } else {
                  console.log('AuthProvider - validateUser - NOT validated!');
                  reject({loggedIn: false})
                }
              }) //end map
        }) // end Promise
      })
      .catch(error => {
        return new Promise(reject => {
          reject({loggedIn: false})
        })
      }) //end then

  } //end validateUserWityhPromise

  //     console.log('AuthProvider - validateUser - userData- ', userData); });})}
  // else { console.log('AuthProvider - validateUser - no local userData!');
  // return {loggedIn: false}

} // end export class AuthProvider

export interface currentUserInterface {
  name : string;
  email : string;
}

export class CurrentUser implements currentUserInterface {
  name : string;
  email : string;

  constructor(name : string, email : string) {
    this.name = name;
    this.email = email;
  }
}
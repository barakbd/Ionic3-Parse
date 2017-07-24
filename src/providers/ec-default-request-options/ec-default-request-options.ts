import {Injectable} from '@angular/core';
import {BaseRequestOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';
import {Storage} from '@ionic/storage';

// import {NativeStorage} from "@ionic-native/native-storage"
import 'rxjs/add/operator/map';

/*
  Generated class for the DefaultRequestOptionsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
class DefaultRequestOptionsClass extends BaseRequestOptions {

  constructor(private ionicStorage : Storage) {
    super()
    console.log('Hello DefaultRequestOptionsProvider Provider');
    // Set the default headers
    this
      .headers
      .set('Content-Type', 'application/json');
    this
      .headers
      .set("X-Parse-Application-Id", "myAppId",)
    /*     this
      .headers
      .set("X-Host-Override", "localhost:1337")
    */
    // this   .headers   .set("Access-Control-Allow-Origin", true)
    /*     nativeStorage
      .getItem("user_name")
      .then(userName => this.headers.set("user_name", userName), error => console.log(error))
    nativeStorage
      .getItem("user_pass")
      .then(userPass => this.headers.set("user_name", userPass), error => console.log(error))
 */
  } // end Constructor

  merge(options?: RequestOptionsArgs) : RequestOptions {
    console.log("BaseRequestOptions - options.url - " + options.url);
    /*   https://stackoverflow.com/questions/35687038/angular-2-dynamically-change-base-url-in-post-requests
 */
    options.url = 'http://localhost:1337/parse' + options.url;
    const newOptions = super.merge(options);
    this
      .ionicStorage
      .get('userData')
      .then(userData => {

        console.log("DefaultRequestOptionsClass - userData exists - ", userData)
        newOptions
          .headers
          .set('X-Parse-Session-Token', userData.sessionToken);
      }, error => {
        console.log("DefaultRequestOptionsClass - userData does not exist - ", error)
      });
    newOptions.merge = this.merge;
    console.log("DefaultRequestOptionsClass - newOptions - " + JSON.stringify(newOptions, null, 4))
    return newOptions;
  }
}

export const DefaultRequestOptionsProvider = {
  provide: RequestOptions,
  useClass: DefaultRequestOptionsClass
};
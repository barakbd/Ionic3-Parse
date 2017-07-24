import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';
import {HttpModule, XHRBackend, Http, RequestOptions} from '@angular/http';

import {MyApp} from './app.component';
import {AuthProvider} from '../providers/auth/auth';
// import {DefaultRequestOptionsProvider} from '../providers/default-request-options/default-request-options';
// import {DefaultResponseOptionsProvider} from '../providers/default-response-options/default-response-options';
// import {NativeStorage} from "@ionic-native/native-storage"
import {IonicStorageModule} from '@ionic/storage';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule, IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen, {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    AuthProvider,
    // DefaultRequestOptionsProvider,
    // DefaultResponseOptionsProvider,
    // NativeStorage
  ]
})
export class AppModule {}
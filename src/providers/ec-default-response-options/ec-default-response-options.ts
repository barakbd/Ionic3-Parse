import {Injectable} from '@angular/core';
import {BaseResponseOptions, ResponseOptions} from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the DefaultRequestOptionsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DefaultResponseOptionsProvider extends BaseResponseOptions {

  constructor() {
    console.log('Hello DefaultRequestOptionsProvider Provider');
    super()
    // Set the default headers
    this
      .headers
      .set('Content-Type', 'application/json');
    this
      .headers
      .set("X-Parse-Application-Id", "myAppId",)
      this
      .headers
      .set("Host", "localhost:1337",)

  }

}

export const requestOptionsProvider = {
  provide: ResponseOptions,
  useClass: DefaultResponseOptionsProvider
};
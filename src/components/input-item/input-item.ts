import { Component } from '@angular/core';

/**
 * Generated class for the InputItemComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'input-item',
  templateUrl: 'input-item.html'
})
export class InputItemComponent {

  text: string;

  constructor() {
    console.log('Hello InputItemComponent Component');
    this.text = 'Hello World';
  }

}

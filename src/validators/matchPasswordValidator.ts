// import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

export class MatchPasswordValidator {
    static isMatching(abstractContorl:AbstractControl): any {
        let password = abstractContorl.get('password').value;
        let repeat_password = abstractContorl.get('repeat_password').value;

        if( (password && repeat_password) && (password !== repeat_password) ) {
            console.log ('mismatch');
            abstractContorl.get('repeat_password').setErrors({ "mismatch": true });
        } else {
            console.log ('null');
            return null;
        }
    }
}
import { FormGroup, FormControl ,ValidatorFn, Validators} from '@angular/forms';
import { AppConstants } from './constants';



export function requireCheckboxesToBeCheckedValidator(minRequired = 1): ValidatorFn {
  return function validate (formGroup: FormGroup) {
    let checked = 0;

    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.controls[key];

      if (control.value === true) {
        checked ++;
      }
    });

    if (checked < minRequired) {
      return {
        requireOneCheckboxToBeChecked: true,
      };
    }

    return null;
  };
}

export function matchingDefaultValuePossibleValues(defaultValue: string, possibleValues: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let defValue = group.controls[defaultValue];
      
     let verif= group.controls[possibleValues].value.find(element => 
        element === defValue.value 
      
      )
      console.log(verif);
      defValue.setErrors(null);
      if(!verif || verif== undefined || verif==null){
        console.log("undefined here");
        defValue.setErrors({'mismatched': true});
        return {
          mismatched: true
        };
      }
      
      
      
    }
  }

  export function validateArrayNotEmpty(c: FormControl) {
    console.log("here");
    if (c.value && c.value.length === 0) {
      return {
        validateArrayNotEmpty: { valid: false }
      };
    }


    return null;
  }
  
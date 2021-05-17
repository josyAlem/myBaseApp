import { AbstractControl, ValidatorFn } from '@angular/forms';
import { isNullOrUndefined } from 'util';

export function NestNumRangeValidator(minNum: number, maxNum: number): ValidatorFn {
        return (control: AbstractControl): { [key: string]: { minValue: number, maxValue: number, message: string } } | null => {

            if (isNullOrUndefined(control.value).valueOf() == false) {
                if (Number(control.value) >= minNum && Number(control.value) < maxNum)
                    return null;
                else
                    return {
                        'numRange':
                        {
                            minValue: minNum,
                            maxValue: maxNum,
                            message: "*Number must be between " + minNum.toString()
                                + " and " + maxNum + "!"
                        }
                    };
            }
            return null;
        };
    }


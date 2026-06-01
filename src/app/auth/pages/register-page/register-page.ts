import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe,ReactiveFormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {

  fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm : FormGroup = this.fb.group({
    name : ['', Validators.required, Validators.required,Validators.pattern(FormUtils.namePattern)],   
    email: ['', [Validators.required, Validators.pattern(FormUtils.emailPattern)],
            [FormUtils.checkingServerResponse]],
    username: ['', [Validators.required, 
                    Validators.minLength(6),
                    Validators.pattern(FormUtils.notOnlySpacesPattern),
                  this.formUtils.strider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword:['', [Validators.required, Validators.minLength(6)]],
  },{
    validators:[this.formUtils.isFieldOneEqualFieldTwo('password','confirmPassword')

    ]
  })

  

  onSave() {
 this.myForm.markAllAsTouched();

}


}

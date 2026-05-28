import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './switches-page.html',
})
export class SwitchesPage {
  formUtils = FormUtils;
  fb = inject(FormBuilder);

  myForm : FormGroup = this.fb.group({
    gender:['M', Validators.required],
    wantNotifications:[true],
    termsAndConditions:[false, Validators.requiredTrue]

  });

  onSubmit() {
    console.log(this.myForm.value);
    this.myForm.markAllAsTouched();
}
}

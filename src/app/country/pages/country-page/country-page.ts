import { JsonPipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
  standalone: true
})
export class CountryPage {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);
  countriesByRegions = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChanged = effect((onCleanUp) => {
    const regionSubsCription = this.onRegionChanged();
    const countrySubsCription = this.onCountryChanged();


    onCleanUp(() => {
      regionSubsCription.unsubscribe();
      countrySubsCription.unsubscribe();
    })

  });

  onRegionChanged() {
    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegions.set([]);
        }),
        switchMap(region => this.countryService.getCountriesByRegions(region!))
      )
      .subscribe((countries) => {
        console.log(countries)
        this.countriesByRegions.set(countries);
      })
  }

  onCountryChanged() {
    return this.myForm.get('country')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        filter(value => value!.length > 0),
        switchMap(alphaCode => this.countryService.getCountryByAlphaCode(alphaCode ?? '')
      ),
      switchMap(country => this.countryService.getCountryNamesByCodes(country.borders))
      )
      .subscribe((borders) => {
        this.borders.set(borders);
      })
  }

}

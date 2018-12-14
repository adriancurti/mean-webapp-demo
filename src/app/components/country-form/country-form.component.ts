import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Country } from '../../models/country';
import { CountryService } from '../../services/country.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.css']
})
export class CountryFormComponent implements OnInit {
  title = 'Country';

  country: Country = {
    name: '',
    value: 0,
    id: ''
  };

  snackBarRef = null;
  showRequired = false;
  showInvalid = false;
  countries: Country[] = [];

  constructor(private router: Router,
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private countryService: CountryService) { }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
      return;
    }
    this.getCountries();
  }

  openSnackBar(message: string, action: string) {
    this.snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  getCountries(): void {
    this.countryService.getCountries()
      .subscribe(countries => this.countries = countries);
  }

  clear() {
    this.country.name = '';
    this.country.value = 0;
    this.country.id = '';
    this.showRequired = false;
    this.showInvalid = false;
  }

  submit() {
    this.showRequired = true;
    this.showInvalid = true;

    if (!this.country.id 
      || !this.country.value 
      || this.country.value === 0) {
      this.openSnackBar('Missing required data!', 'Close');
      return;
    }
    else if (this.country.id 
      && this.country.value 
      && this.country.value < 0) {
      this.openSnackBar('The data is not valid!', 'Close');
      return;
    }

    let selectedCountry = this.countries.find(country => country.id === this.country.id);
    if (selectedCountry) {
      this.country.name = selectedCountry.name;
      this.countryService.updateCountry(this.country)
        .subscribe(() => {
          this.openSnackBar('The data has been updated!', 'Close');
          this.clear();
          this.getCountries();
        });
    }
  }
}

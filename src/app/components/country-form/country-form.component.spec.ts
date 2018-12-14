import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes, RouterModule } from '@angular/router';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { CountryFormComponent } from './country-form.component';
import { CountryChartComponent } from '../country-chart/country-chart.component';

import { environment } from '../../../environments/environment';

const config: SocketIoConfig = { url: environment.apiURL, options: {} };

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'countries', component: CountryFormComponent },
  { path: '**', redirectTo: 'home' }
];

describe('CountryFormComponent', () => {
  let component: CountryFormComponent;
  let fixture: ComponentFixture<CountryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        SocketIoModule.forRoot(config),
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSnackBarModule,
        NgxChartsModule
      ],
      declarations: [
        HomeComponent,
        LoginComponent,
        CountryFormComponent,
        CountryChartComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Country'`, () => {
    const fixture = TestBed.createComponent(CountryFormComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Country');
  });

  it('should render title in a #countryTitle tag', () => {
    const fixture = TestBed.createComponent(CountryFormComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#countryTitle').textContent).toContain('Country');
  });
});

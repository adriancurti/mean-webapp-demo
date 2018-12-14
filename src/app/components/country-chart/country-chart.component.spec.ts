import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { CountryChartComponent } from './country-chart.component';

import { environment } from '../../../environments/environment';

const config: SocketIoConfig = { url: environment.apiURL, options: {} };

describe('CountryChartComponent', () => {
  let component: CountryChartComponent;
  let fixture: ComponentFixture<CountryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        SocketIoModule.forRoot(config),
        MatDividerModule,
        MatProgressSpinnerModule,
        NgxChartsModule
      ],
      declarations: [ CountryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Chart'`, () => {
    const fixture = TestBed.createComponent(CountryChartComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Chart');
  });

  it('should render title in a #chartTitle tag', () => {
    const fixture = TestBed.createComponent(CountryChartComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#chartTitle').textContent).toContain('Chart');
  });
});

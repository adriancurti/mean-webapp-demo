import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { HomeComponent } from './home.component';

import { environment } from '../../../environments/environment';

const config: SocketIoConfig = { url: environment.apiURL, options: {} };

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SocketIoModule.forRoot(config)
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'MEAN UP!'`, () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('MEAN UP!');
  });

  it('should render title in a #homeTitle tag', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#homeTitle').textContent).toContain('MEAN UP!');
  });
});

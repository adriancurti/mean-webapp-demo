import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { CountryService } from './country.service';

import { environment } from '../../environments/environment';

const config: SocketIoConfig = { url: environment.apiURL, options: {} };

describe('CountryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      SocketIoModule.forRoot(config),
    ]
  }));

  it('should be created', () => {
    const service: CountryService = TestBed.get(CountryService);
    expect(service).toBeTruthy();
  });
});

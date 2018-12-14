import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AuthService } from './auth.service';

import { environment } from '../../environments/environment';

const config: SocketIoConfig = { url: environment.apiURL, options: {} };

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      SocketIoModule.forRoot(config),
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});

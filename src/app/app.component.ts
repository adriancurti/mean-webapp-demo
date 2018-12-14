import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  snackBarRef = null;

  constructor(private authService: AuthService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.authService.checkAccessToken();
  }

  openSnackBar(message: string, action: string) {
    this.snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  logout() {
    this.authService.logout()
      .subscribe(data => {
        this.openSnackBar('User disconnected!', 'Close');
        this.authService.setAccessToken('');
      });
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

  isProcessing() {
    return this.authService.isProcessing();
  }
}

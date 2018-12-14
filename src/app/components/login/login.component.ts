import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = 'Login';
  
  snackBarRef = null;
  showPassword = false;
  showRequired = false;
  showInvalid = false;
  user: User = {
    username: '',
    password: ''
  };

  constructor(private router: Router, 
    public snackBar: MatSnackBar, 
    private authService: AuthService) { }

  ngOnInit() {
  }

  openSnackBar(message: string, action: string) {
    this.snackBarRef = this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  submit() {
    this.showRequired = true;
    this.showInvalid = true;
    if (!this.user.username
      || !this.user.password) {
      this.openSnackBar('Missing required data!', 'Close');
      return;
    }
    if (this.user.username.includes(' ')
      || this.user.password.includes(' ')) {
      this.openSnackBar('The data is not valid!', 'Close');
      return;
    }

    this.authService.login(this.user)
      .subscribe(data => {
        if (data && data.id) {
          this.openSnackBar('User connected!', 'Close');
          this.authService.setAccessToken(data.id);
          this.router.navigate(['/countries']);
        } else {
          this.openSnackBar('Unauthenticated user!', 'Close');
          this.authService.setAccessToken('');
        }
      });
  }
}

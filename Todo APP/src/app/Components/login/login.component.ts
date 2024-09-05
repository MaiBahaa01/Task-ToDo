import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { LoginData } from '../../Model View/login-data';
import { TokenService } from '../../Services/token.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router:Router
  ){}

  login(username: string, password: string){
     // Create a LoginData object
    const data: LoginData = {
      username: username,
      password: password
    };

    this.authService.login(data).subscribe({
      next: (response) =>{
        //store the token and navigate to home page if login successfully
        this.tokenService.setToken(response.token);
        this.router.navigate(["/home"])
      },
      error: (err) => {
        alert('Login Failed');
      }
    })
  }
  // Method to prevent the default form submission behavior
  onsubmit(event:any){
    event.preventDefault();

  }
}

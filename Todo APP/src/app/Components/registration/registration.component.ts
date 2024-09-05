import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoginData } from '../../Model View/login-data';
import { AuthService } from '../../Services/auth.service';
import { TokenService } from '../../Services/token.service';
import { RegistrationData } from '../../Model View/registration-data';
import {  Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ){}

  signup(username: string,email:string, password: string){
    // Create a RegistrationData object
    const data: RegistrationData = {
      username: username,
      email:email,
      password: password
    };
    //Show a success message and navigate to login page if registraction successfully
    this.authService.registration(data).subscribe({
      next: (response) =>{
        alert('User registered successfully')
        this.router.navigate(["/login"])
      },
      error: (err) => {
        alert('User registered falid');
      }
    })
  }
   // Method to prevent the default form submission behavior
  onsubmit(event:any){
    event.preventDefault();

  }
}

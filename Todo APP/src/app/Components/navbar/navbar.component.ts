import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../Services/token.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private tokenService: TokenService, private router: Router) { }
  makesure():boolean {
    return confirm('Are you sure sign out!') 
  }
  signout() {
    if(this.makesure()){
      this.tokenService.clearToken()
      this.router.navigate(["/login"])
    }
  }
}

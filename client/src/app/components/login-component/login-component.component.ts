import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.css'
})
export class LoginComponentComponent implements OnInit {
  email: string = "";
  password: string = "";

  constructor(
    private authService: AuthService,
    private router: Router
  )
  {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe((res)=>
    {
      if(res.authenticated)
      {
        this.router.navigate(['/dashboard']);
      }
      else{
        this.router.navigate(['/login']);
      }
    });
  }

  async onSubmit(username:string, password:string) {
    await this.authService.login({username, password}).subscribe((res) => {
      if(res.success)
      {
        this.router.navigate(['/home']);
      }
    });
  }

}

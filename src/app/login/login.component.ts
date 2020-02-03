import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Login } from './login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../app.component.css','./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private authService: AuthService, private router: Router) { }
  email : null;
  senha : string;

  carregaLogin(email: string, senha: string) : Login{
    const retorno : Login = new Login();
    retorno.email = email;
    retorno.senha = senha;

    return retorno;
  }

  ngOnInit() {
  }

  login(){
      const logar :Login = this.carregaLogin(this.email,this.senha);
      this.authService.login(logar);
  }
  
}

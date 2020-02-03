import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, pipe, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { HttpClient , HttpErrorResponse, HttpResponse, HttpHeaders} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Login } from './login/login';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: string;

  constructor(private _router: Router, private http: HttpClient, private _snackBar: MatSnackBar) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  /**
   * this is used to clear anything that needs to be removed
   */
  clear(): void {
    localStorage.clear();
  }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isLoggedIn() {
    return localStorage.getItem('token') == 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo';
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  // isTokenExpired(): boolean {
  //   return false;
  // }

  validPermission(url){
    //  let user = JSON.parse(localStorage.getItem('funcionario'));
    //  if (url == '/cadastros' || url == '/cadastros/empresas' || url == '/cadastros/usuarios') {
    //     if (user.acesso != 0) return false;
    //  }
    //  if (url == '/liberacao') {
    //     if (user.acesso == 2) return false;
    //  }
     return true;
  }

  login(login : Login) {
    interface Data {
       data : any,
       token: string,
       erros: string[]
    }
  
    //this.http.post('https://controle-ponto-inteligente-api.herokuapp.com/auth',login , this.httpOptions).subscribe((data:Data
    this.http.post('http://localhost:8080/auth',login , this.httpOptions).subscribe((data:Data
    ) =>  {
      localStorage.setItem('token', data.data.token);
      this._router.navigate(['/home']);
     } ,
      error => {
        this._snackBar.open('Usuário e senha inválidos ', null, {
        duration: 3000,
        });
    });
    return ;
  }
  
  logout() {
    this.clear();
    this._router.navigate(['/login']);
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
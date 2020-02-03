import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { FuncionarioDTO } from '../cadastro/funcionario/funcionarioDTO';
import { Data } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) { }

    headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    });

    httpOptions = {
      headers: this.headers_object
    };

    urlFuncionario = 'api/funcionarios'
   
  getFuncionarios(): Observable<FuncionarioDTO[]> {
    return this.httpClient.get<FuncionarioDTO[]>(this.urlFuncionario,this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getFuncionarioByCPF(cpf: String): Observable<FuncionarioDTO> {
    return this.httpClient.get<FuncionarioDTO>(this.urlFuncionario + '/cpf/' + cpf, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // // salva um carro
  // saveCar(car: Car): Observable<Car> {
  //   return this.httpClient.post<Car>(this.url, JSON.stringify(car), this.httpOptions)
  //     .pipe(
  //       retry(2),
  //       catchError(this.handleError)
  //     )
  // }

  // // utualiza um carro
  // updateCar(car: Car): Observable<Car> {
  //   return this.httpClient.put<Car>(this.url + '/' + car.id, JSON.stringify(car), this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // }

  // // deleta um carro
  // deleteCar(car: Car) {
  //   return this.httpClient.delete<Car>(this.url + '/' + car.id, this.httpOptions)
  //     .pipe(
  //       retry(1),
  //       catchError(this.handleError)
  //     )
  // }

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

import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Data } from '@angular/router';
import { LocationStrategy } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

    headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Bearer "+localStorage.getItem("token")
    });

    httpOptions = {
      headers: this.headers_object
    };
   
  saveFuncionario(){

    interface Data {
      data : any,
      cnpj: string,
      id: BigInteger,
      razaoSocial: string,
      erros: string[]
   }

    const url = '/api/empresas/cnpj/00000000000191';

    this.http.get(url, this.httpOptions).subscribe(
        (data : any) => {
            console.log(data);
            console.log(data.data.id);
            console.log(data.data.cnpj);
            console.log(data.data.razaoSocial);
        },
        (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                console.log('Client-side error occured. '+err.error);
            } else {
                console.log('Server-side error occured.');
            }
        }
    );
  }
  

  search(id) {
    const url = '/api/funcionarios/'+id;
    this.http.put(url, this.httpOptions).subscribe(
          (data : any) => {
              console.log(data);
              console.log(data.data.id);
              console.log(data.data.nome);
              console.log(data.data.email);
          },
          (err: HttpErrorResponse) => {
              if (err.error instanceof Error) {
                  console.log('Client-side error occured. '+err.error);
              } else {
                  console.log('Server-side error occured.');
              }
          }
      );
  }

  // save(params) {
  //   let empresa = JSON.parse(localStorage.getItem('funcionario')).idEmpresa;
  //   params.idEmpresa = empresa;
  //   if (!params.edicao) 
  //     return this.http.post('https://appwebcondom.azurewebsites.net/api/0.2/empresa/adicionar', params);
  //   if (params.edicao) 
  //     return this.http.put('https://appwebcondom.azurewebsites.net/api/0.2/empresa/atualizar', params);
  // }

  // search(cnpj) {
  //   return this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/empresa/buscarEmpresaPorCNPJ/' + cnpj);
  // }

  // delete(id){
  //   return this.http.delete('https://appwebcondom.azurewebsites.net/api/0.2/empresa/remover/' + id);
  // }

  // saveUsuario(params) {
  //   let empresa = JSON.parse(localStorage.getItem('funcionario')).idEmpresa;
  //   params.idEmpresa = params.empresa;
  //   params.ativo = true;
  //   if (!params.edicao) 
  //     return this.http.post('https://appwebcondom.azurewebsites.net/api/0.2/usuario/adicionar', params);
  //   if (params.edicao) 
  //     return this.http.put('https://appwebcondom.azurewebsites.net/api/0.2/usuario/atualizar', params);
  // }

  // searchUsuario(username) {
  //   return this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/usuario/buscarUsuarioLogin/' + username);
  // }

  // deleteUsuario(id){
  //   return this.http.delete('https://appwebcondom.azurewebsites.net/api/0.2/usuario/remover/' + id);
  // }

  // listarEmpresas(){
  //   return this.http.get('https://appwebcondom.azurewebsites.net/api/0.2/empresa/buscarEmpresasAtivas');
  // }
}

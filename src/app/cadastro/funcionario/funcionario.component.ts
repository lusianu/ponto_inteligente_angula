import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  
import { CadastroService } from '../cadastro.service';
import { AuthService } from '../../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as cep from 'cep-promise'

export interface DialogData {
 nome: any
, email : any
, valorHora : any
}

@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['../../app.component.css','./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  constructor(public dialog: MatDialog, private cadastroService : CadastroService, private _snackBar: MatSnackBar, private authService: AuthService) { }
  data : any;

  search : string;

  ngOnInit() {
  }
  
  back(){
    window.history.back();
  }

  logout(){
    this.authService.logout();
  }

  abrirModalCadastroFuncionario(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogDataExampleFunc, {
      data: {
         nome: null
        , email : null
        , valorHora : null
      }
    });
  }

  searchFuncionario(){
    if (this.search && this.search != ''){
      this.cadastroService.search(this.search)
      .subscribe((data) => 
        {
          if (data)
            this.data = data
          else  
          this._snackBar.open('Funcionário não encontrado =(', null, {
            duration: 3000,
          });
        }  ,
      error => {
        this._snackBar.open('Funcionário não encontrado =(', null, {
          duration: 3000,
        });
      }
        
      ); 
    } else {
      this.data = {};
    }
      
  }

  editarEmpresa(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogDataExampleFunc, {
      data: {
        id : this.data.id
        , razaoSocial: this.data.razaoSocial
        , nomeFantasia : this.data.nomeFantasia
        , cnpj : this.data.cnpj
        , ie : this.data.ie
        , eMail : this.data.eMail
        , telefone : this.data.telefone
        , cep : this.data.cep
        , logradouro : this.data.logradouro
        , numero : this.data.numero
        , bairro : this.data.bairro
        , complemento : this.data.complemento
        , cidade : this.data.cidade
        , uf : this.data.uf
        , edicao : true
      }
    })
    .afterClosed().subscribe(result => {
       if (this.data.id) {
          this.search = '';
          this.searchFuncionario();
       }
    });
  }

  

  excluirFuncionario(){
    localStorage.setItem("refresh", "false");
    this.dialog.open(DialogConfirmationDataExampleFunc, {
      data: {
        id : this.data.id
        , razaoSocial: this.data.razaoSocial
        , nomeFantasia : this.data.nomeFantasia
        , cnpj : this.data.cnpj

      }
    })
    .afterClosed().subscribe(result => {
      if (localStorage.getItem("refresh") == "true" ) {
        this.search = '';
        this.searchFuncionario();
      }
    });
  }

}

@Component({
  selector: 'funcionario-dialog',
  templateUrl: 'funcionario-dialog.html',
  providers:  [ CadastroService ]
})
export class DialogDataExampleFunc {
  constructor( private dialogRef: MatDialogRef<DialogDataExampleFunc>, @Inject(MAT_DIALOG_DATA) public data: DialogData,  private cadastroService : CadastroService, private _snackBar: MatSnackBar) {}


  saveFuncionario() {
    this.cadastroService.saveFuncionario2();
        this.dialogRef.close();
        this._snackBar.open('Funcionário salva com sucesso!', null, {
          duration: 3000,
          }
        );

    // this.cadastroService.saveFuncionario(this.data)
    //   .subscribe( data  =>  {
    //      if (data.valido) {
    //       this.dialogRef.close();
    //       this._snackBar.open('Funcionário salva com sucesso!', null, {
    //         duration: 3000,
    //       });
    //     }
    //   } 
    //   );
    }

    // cepChanged(newObj){
    //   if  ( newObj && newObj.length == 8) {
    //     cep(newObj)
    //       .then((response) => {
    //           if (response.city){
    //             this.data.cidade = ''+response.city;
    //             this.data.bairro = ''+response.neighborhood;
    //             this.data.uf = ''+response.state;
    //             this.data.logradouro = ''+response.street;
  
    //           }
    //       })
    //       .catch()

    //   }
    // }
}

@Component({
  selector: 'funcionario-delete-dialog',
  templateUrl: 'funcionario-delete-dialog.html',
  providers:  [ CadastroService ]
})
export class DialogConfirmationDataExampleFunc {
  constructor( private dialogRef: MatDialogRef<DialogConfirmationDataExampleFunc>, @Inject(MAT_DIALOG_DATA) public data: DialogData,  private cadastroService : CadastroService, private _snackBar: MatSnackBar) {}
  

  delete() {
    // this.cadastroService.delete(this.data.id)
    //   .subscribe((data) =>  {
    //       localStorage.setItem("refresh", "true");
    //       this.dialogRef.close();
    //       this._snackBar.open('Funcionário deletada com sucesso!', null, {
    //         duration: 3000,
    //       });
    //   } ,
    //   error => {
    //     this._snackBar.open('Ocorreu um problema na deleção', null, {
    //       duration: 3000,
    //     });
    //   });
  }

 }

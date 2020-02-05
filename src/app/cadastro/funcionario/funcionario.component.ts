import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';  
import { CadastroService } from '../cadastro.service';
import { AuthService } from '../../auth.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { FuncionarioDTO } from './funcionarioDTO';



@Component({
  selector: 'app-funcionario',
  templateUrl: './funcionario.component.html',
  styleUrls: ['../../app.component.css','./funcionario.component.css']
})
export class FuncionarioComponent implements OnInit {
  constructor(public dialog: MatDialog, private cadastroService : CadastroService,  private _snackBar: MatSnackBar, private authService: AuthService) { }
  data : FuncionarioDTO;
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
        nome : null
       ,email: null
       ,cpf : null
       ,valorHora: null
       ,qtdHorasAlmoco: null
       ,qtdHorasTrabalhoDia: null
       ,senha: null
    }
    });
  }


  searchFuncionario(){
    if (this.search && this.search != ''){
      this.cadastroService.getFuncionarioByCPF(this.search).subscribe((retorno: any) => {
        this.data = retorno.data;
        this.editarFuncionario();
        });
    }
      
  }


  // searchFuncionario2(){
  //   if (this.search && this.search != ''){
  //     this.cadastroService.buscarFuncionario(this.search) 
  //     .subscribe((data: any) => 
  //         {
  //           if (data){
  //             this.data = data.data;
  //             this.editarFuncionario();
  //           } else { 
  //             this._snackBar.open('Funcionario não encontrada =(', null, {
  //               duration: 3000,
  //             });
  //           }
  //         }  ,
  //       error  => {
  //         this._snackBar.open('Funcionario não encontrada =(', null, {
  //           duration: 3000,
  //         });
  //       }
          
  //       ); 
  //   } else {
  //     this.data = {};
  //   }
      
  // }

  editarFuncionario(){
    //localStorage.setItem("refresh", "false");
    console.log(this.data)
    this.dialog.open(DialogDataExampleFunc, {
      data: {
          id : this.data.id
         ,nome : this.data.nome
         ,cpf : this.data.cpf
         ,email: this.data.email
         ,valorHora: this.data.valorHora
         ,qtdHorasAlmoco: this.data.qtdHorasAlmoco
         ,qtdHorasTrabalhoDia: this.data.qtdHorasTrabalhoDia
         ,senha: this.data.senha
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
  constructor( private dialogRef: MatDialogRef<DialogDataExampleFunc>, @Inject(MAT_DIALOG_DATA) public data: FuncionarioDTO,  private cadastroService : CadastroService, private _snackBar: MatSnackBar) {}


  // saveFuncionario() {
  //   //this.cadastroService.chamarAPI('/api/empresas/cnpj/00000000000191','GET',null);
  //   this.cadastroService.chamarAPI('/api/funcionarios/1','PUT',null);
  //       this.dialogRef.close();
  //       this._snackBar.open('Funcionário salva com sucesso!', null, {
  //         duration: 3000,
  //         }
  //       );

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
    //}

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
  constructor( private dialogRef: MatDialogRef<DialogConfirmationDataExampleFunc>, @Inject(MAT_DIALOG_DATA) public data: FuncionarioDTO,  private cadastroService : CadastroService, private _snackBar: MatSnackBar) {}
  

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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CadastroHomeComponent } from './cadastro/cadastro-home/cadastro-home.component';
import { EmpresaComponent } from './cadastro/empresa/empresa.component';
import { FuncionarioComponent } from './cadastro/funcionario/funcionario.component';



const routes: Routes = [
   { path: '' , component : LoginComponent   }
  , { path: 'login',  component: LoginComponent }
  , { path: 'home', component : HomeComponent   }
  , { path: 'cadastros', component : CadastroHomeComponent }
  , { path: 'cadastros/empresas', component : EmpresaComponent  }
  , { path: 'cadastros/funcionario', component : FuncionarioComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

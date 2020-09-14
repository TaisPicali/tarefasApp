import { Injectable } from '@angular/core';
import { Usuario } from '../models/Usuario';
import { ArmazenagemService } from './armazenagem.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private armazenamentoService: ArmazenagemService) { }

  public listaUsuarios = [];

  public async buscarTodos(){
    this.listaUsuarios = await this.armazenamentoService.pegarDados('usuarios');

    if(this.listaUsuarios) {
      this.listaUsuarios = [];
    }
  }

  public async salvar(usuario: Usuario){
    await this;this.buscarTodos();

    if(usuario) {
      this.listaUsuarios = [];
    }

    this.listaUsuarios.push(usuario);

    return await this.armazenamentoService.salvarDados('usuarios', this.listaUsuarios);

  }

}

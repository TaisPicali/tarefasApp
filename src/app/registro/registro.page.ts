import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CpfValidator } from '../validators/cpf-validator';
import { ComparacaoValidator } from '../validators/comparacao-validator';
import { UsuarioService } from '../services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

public formRegistro: FormGroup;
public mensagens_validacao = {
  nome: [
    {tipo: 'required', mensagem:'O campo Nome é obrigatório!' },
    {tipo: 'minlength', mensagem: 'O nome deve ter pelo menos 3 caracteres!'}
  ], 

  cpf: [
    {tipo:'required', mensagem:'O campo CPF é obrigatório!'},
    {tipo: 'minlength', mensagem: 'O CPF deve ter pelo menos 11 caracteres!'},
    {tipo: 'maxlength', mensagem: 'O CPF deve ter no máximo 14 caracteres!'},
    {tipo: 'invalido', mensagem: 'CPF Inválido!'}
  ],

  dataNascimento: [
    {tipo: 'required', mensagem:'O campo Data de Nascimento é obrigatório!' }
  ],

  genero: [
    {tipo:'required', mensagem:'O campo Gênero é obrigatório!'}
  ],

  celular: [
    {tipo: 'required', mensagem:'O campo Celular é obrigatório!' },
    {tipo: 'minlength', mensagem: 'O celular deve ter no mínimo 10 caracteres'},
    {tipo: 'maxlength', mensagem: 'O celular deve ter no máximo 16 caracteres'}
  ],

  email: [
    {tipo: 'required', mensagem:'O campo E-mail é obrigatório!' },
    {tipo: 'email', mensagem:'E-mail inválido!'}
  ],

  senha: [
    {tipo:'required', mensagem:'O campo Senha é obrigatório!'},
    {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!'}
  ],

  confirmarSenha: [
    {tipo:'required', mensagem:'O campo Senha é obrigatório!'},
    {tipo: 'minlength', mensagem: 'A senha deve ter pelo menos 6 caracteres!'},
    {tipo: 'comparacao', mensagem: 'Deve ser igual a Senha!'}
  ]
}

  constructor(private formBuilder: FormBuilder,
    public router:Router,
    private usuarioService: UsuarioService,
    public alertController: AlertController
    ) { 
    this.formRegistro = formBuilder.group({
      
      nome: ['', Validators.compose(
        [Validators.required, Validators.minLength(3)])],

      cpf: ['', Validators.compose(
        [Validators.required, Validators.minLength(11),
          Validators.maxLength(14),
          CpfValidator.cpfValido
        ])],

      dataNascimento: ['', Validators.compose(
        [Validators.required])],

      genero: ['', Validators.compose(
        [Validators.required])],

      celular: ['', Validators.compose(
        [Validators.required, Validators.maxLength(16), Validators.minLength(10)])],
        
      email: ['', Validators.compose(
        [Validators.required, Validators.email])],

      senha: ['', Validators.compose(
        [Validators.required, Validators.minLength(6)])],

      confirmarSenha: ['', Validators.compose(
        [Validators.required, Validators.minLength(6)])]
    }, {
      validator: ComparacaoValidator('senha', 'confirmarSenha' )
    });
  }

  async ngOnInit() {
    this.usuarioService.buscarTodos();
    console.log(this.usuarioService.listaUsuarios);
  }

  public registro(){
    if(this.formRegistro.valid){
      console.log('Formulário Valido!');
    } else {
      console.log('Formulário Inválido!')
    }
  }

  public async salvarFormulario() {
    if(this.formRegistro.valid){
      let usuario = new Usuario();
      usuario.nome = this.formRegistro.value.nome;
      usuario.cpf = this.formRegistro.value.cpf;
      usuario.dataNascimento = new Date (this.formRegistro.value.dataNascimento);
      usuario.genero = this.formRegistro.value.genero;
      usuario.email = this.formRegistro.value.email;
      usuario.senha = this.formRegistro.value.senha;

      if(await this.usuarioService.salvar(usuario)){
        this.exibirAlerta('SUCESSO!', 'Usuário salvo com sucesso!');
        this.router.navigateByUrl('/login');
      } else{
        this.exibirAlerta('ERRO!','Erro ao salvar o usuário!');
      }

  }else{
      this.exibirAlerta('ASVERTÊNCIA!', 'Formulário inválido<br/>Verifique os campos do seu formulário!');
  }

}

async exibirAlerta(titulo: string, mensagem: string) {
  const alert = await this.alertController.create({
    header: titulo,
    message: mensagem,
    buttons: ['OK']
  });

}
}

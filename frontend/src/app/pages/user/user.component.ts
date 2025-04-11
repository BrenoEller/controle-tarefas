import { UsuarioService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

declare var bootstrap: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class UserComponent implements OnInit {
  usuarios: any[] = [];
  form!: FormGroup;
  editandoId: number | null = null;
  idParaExcluir: number | null = null;

  mensagem: string = '';
  tipoMensagem: 'success' | 'danger' = 'success';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.auth.getUsuarioLocal();
    
    if (!usuario || !usuario.is_admin) {
      this.router.navigate(['/']);
      return;
    }
  
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      is_admin: [false]
    });
  
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.listar().subscribe(usuarios => this.usuarios = usuarios);
  }

  editar(usuario: any) {
    this.form.patchValue(usuario);
    this.editandoId = usuario.id;
  }

  salvar() {
    if (this.editandoId) {
      this.usuarioService.atualizar(this.editandoId, this.form.value).subscribe(() => {
        this.mostrarMensagem('Usuário atualizado com sucesso.', 'success');
        this.carregarUsuarios();
        this.editandoId = null;
        this.form.reset();
      });
    }
  }

  cancelar() {
    this.editandoId = null;
    this.form.reset();
  }

  pedirConfirmacaoExclusao(id: number) {
    this.idParaExcluir = id;
    const modal = new bootstrap.Modal(document.getElementById('confirmarExclusaoUsuarioModal'));
    modal.show();
  }

  confirmarExclusao() {
    if (this.idParaExcluir !== null) {
      this.usuarioService.excluir(this.idParaExcluir).subscribe(() => {
        this.mostrarMensagem('Usuário excluído com sucesso.', 'danger');
        this.carregarUsuarios();
        this.idParaExcluir = null;
      });
    }

    const modalEl = document.getElementById('confirmarExclusaoUsuarioModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }

  mostrarMensagem(texto: string, tipo: 'success' | 'danger') {
    this.mensagem = texto;
    this.tipoMensagem = tipo;

    setTimeout(() => {
      this.mensagem = '';
    }, 10000);
  }
}
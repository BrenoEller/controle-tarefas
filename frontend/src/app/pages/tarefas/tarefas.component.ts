import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TarefaService } from '../../services/tarefa.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-tarefas',
  standalone: true,
  templateUrl: './tarefas.component.html',
  styleUrls: ['./tarefas.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class TarefasComponent implements OnInit {
  tarefas: any[] = [];
  form!: FormGroup;
  editandoId: number | null = null;
  idParaExcluir: number | null = null;

  mensagem: string = '';
  tipoMensagem: 'success' | 'danger' = 'success';

  constructor(private fb: FormBuilder, private tarefaService: TarefaService, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      data_hora: ['', Validators.required],
    });

    this.carregarTarefas();
  }

  carregarTarefas() {
    this.tarefaService.listar().subscribe(tarefas => this.tarefas = tarefas);
  }

  mostrarMensagem(msg: string, tipo: 'success' | 'danger' = 'success') {
    this.mensagem = msg;
    this.tipoMensagem = tipo;
    setTimeout(() => this.mensagem = '', 10000);
  }

  salvar() {
    if (this.editandoId) {
      this.tarefaService.atualizar(this.editandoId, this.form.value).subscribe(() => {
        this.mostrarMensagem('Tarefa atualizada com sucesso.');
        this.carregarTarefas();
        this.form.reset();
        this.editandoId = null;
      });
    } else {
      this.tarefaService.criar(this.form.value).subscribe(() => {
        this.mostrarMensagem('Tarefa criada com sucesso.');
        this.carregarTarefas();
        this.form.reset();
      });
    }
  }

  editar(tarefa: any) {
    const data = new Date(tarefa.data_hora);
    const dataFormatada = data.toISOString().slice(0, 16);
    this.form.patchValue({
      ...tarefa,
      data_hora: dataFormatada
    });
    this.editandoId = tarefa.id;
  }

  cancelarEdicao() {
    this.editandoId = null;
    this.form.reset();
  }

  pedirConfirmacaoExclusao(id: number) {
    this.idParaExcluir = id;
    const modal = new bootstrap.Modal(document.getElementById('confirmarExclusaoModal'));
    modal.show();
  }

  confirmarExclusao() {
    if (this.idParaExcluir !== null) {
      this.tarefaService.excluir(this.idParaExcluir).subscribe(() => {
        this.mostrarMensagem('Tarefa deletada com sucesso.', 'danger');
        this.carregarTarefas();
        this.idParaExcluir = null;
      });
    }

    const modalEl = document.getElementById('confirmarExclusaoModal');
    const modal = bootstrap.Modal.getInstance(modalEl);
    modal.hide();
  }
}
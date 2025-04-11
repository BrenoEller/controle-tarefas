import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
  private apiUrl = 'http://localhost:8000/api/tarefas';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.apiUrl);
  }

  criar(tarefa: any) {
    return this.http.post(this.apiUrl, tarefa);
  }

  atualizar(id: number, tarefa: any) {
    return this.http.put(`${this.apiUrl}/${id}`, tarefa);
  }

  excluir(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
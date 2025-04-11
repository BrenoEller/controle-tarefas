import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private api = 'http://localhost:8000/api/usuarios';

  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<any[]>(this.api);
  }

  atualizar(id: number, data: any) {
    return this.http.put(`${this.api}/${id}`, data);
  }

  excluir(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }
}
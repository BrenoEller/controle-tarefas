<?php

namespace App\Services;

use App\Models\Tarefa;

class TarefaService
{
    public function listarPorUsuario(int $usuarioId)
    {
        return Tarefa::where('usuario_id', $usuarioId)->get();
    }

    public function criar(array $dados, int $usuarioId): Tarefa
    {
        return Tarefa::create([
            ...$dados,
            'usuario_id' => $usuarioId,
        ]);
    }

    public function atualizar(Tarefa $tarefa, array $dados, int $usuarioId): bool
    {
        if ($tarefa->usuario_id !== $usuarioId) {
            return false;
        }

        return $tarefa->update($dados);
    }

    public function excluir(Tarefa $tarefa, int $usuarioId): bool
    {
        if ($tarefa->usuario_id !== $usuarioId) {
            return false;
        }

        return $tarefa->delete();
    }
}
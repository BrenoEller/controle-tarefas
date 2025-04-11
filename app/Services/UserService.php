<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function listarUsuariosExcetoOAtual()
    {
        return User::where('id', '!=', Auth::id())->get();
    }

    public function atualizarUsuario(User $user, array $dados)
    {
        $user->update($dados);
        return $user;
    }

    public function excluirUsuario(int $id): array
    {
        $user = User::find($id);

        if (!$user) {
            return ['status' => 404, 'mensagem' => 'Usuário não encontrado.'];
        }

        if ($user->id === Auth::id()) {
            return ['status' => 403, 'mensagem' => 'Você não pode excluir sua própria conta.'];
        }

        $user->delete();
        return ['status' => 200, 'mensagem' => 'Usuário excluído'];
    }
}
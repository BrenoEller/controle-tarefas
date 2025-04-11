<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function index()
    {
        $this->authorizeAdmin();
        return $this->userService->listarUsuariosExcetoOAtual();
    }

    public function update(Request $request, User $user)
    {
        $this->authorizeAdmin();

        $validated = $request->validate([
            'username' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'is_admin' => 'boolean',
        ]);

        $this->userService->atualizarUsuario($user, $validated);

        return response()->json(['message' => 'Usuário atualizado']);
    }

    public function destroy($id)
    {
        $this->authorizeAdmin();

        $resultado = $this->userService->excluirUsuario($id);

        return response()->json(
            ['message' => $resultado['mensagem']],
            $resultado['status']
        );
    }

    private function authorizeAdmin()
    {
        if (!Auth::check() || !Auth::user()->is_admin) {
            abort(403, 'Acesso negado');
        }
    }
}
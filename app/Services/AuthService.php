<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function registrar(array $dados): array
    {
        $user = User::create([
            'username' => $dados['username'],
            'email' => $dados['email'],
            'password' => Hash::make($dados['password']),
        ]);

        return [
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user' => $user,
        ];
    }

    public function autenticar(array $credenciais): array
    {
        $user = User::where('username', $credenciais['username'])->first();

        if (! $user || ! Hash::check($credenciais['password'], $user->password)) {
            throw ValidationException::withMessages([
                'username' => ['Credenciais inválidas.'],
            ])->status(401);
        }

        return [
            'token' => $user->createToken('auth_token')->plainTextToken,
            'user' => $user,
        ];
    }

    public function logout(Request $request): void
    {
        $request->user()->currentAccessToken()->delete();
    }
}
<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function register(Request $request, AuthService $authService)
{
    $validated = $request->validate([
        'username' => 'required|string|unique:users,username',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
    ]);

    return response()->json($authService->registrar($validated));
}

public function login(Request $request, AuthService $authService)
{
    $validated = $request->validate([
        'username' => 'required|string',
        'password' => 'required|string',
    ]);

    return response()->json($authService->autenticar($validated));
}

public function logout(Request $request, AuthService $authService)
{
    $authService->logout($request);

    return response()->json(['message' => 'Logout realizado com sucesso.']);
}
}
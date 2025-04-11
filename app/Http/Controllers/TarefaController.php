<?php

namespace App\Http\Controllers;

use App\Models\Tarefa;
use Illuminate\Http\Request;
use App\Services\TarefaService;
use Illuminate\Support\Facades\Auth;

class TarefaController extends Controller
{
    private TarefaService $tarefaService;

    public function __construct(TarefaService $tarefaService)
    {
        $this->tarefaService = $tarefaService;
    }

    public function index()
    {
        return $this->tarefaService->listarPorUsuario(Auth::id());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'data_hora' => 'required|date',
        ]);

        $tarefa = $this->tarefaService->criar($validated, Auth::id());

        return response()->json([
            'message' => 'Tarefa criada com sucesso.',
            'tarefa' => $tarefa,
        ], 201);
    }

    public function update(Request $request, Tarefa $tarefa)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'required|string',
            'data_hora' => 'required|date',
        ]);

        $resultado = $this->tarefaService->atualizar($tarefa, $validated, Auth::id());

        if ($resultado === false) {
            return response()->json(['error' => 'Não autorizado.'], 403);
        }

        return response()->json([
            'message' => 'Tarefa atualizada com sucesso.',
            'tarefa' => $tarefa->fresh(),
        ]);
    }

    public function destroy(Tarefa $tarefa)
    {
        $resultado = $this->tarefaService->excluir($tarefa, Auth::id());

        if ($resultado === false) {
            return response()->json(['error' => 'Não autorizado.'], 403);
        }

        return response()->json(['message' => 'Tarefa deletada com sucesso.']);
    }
}
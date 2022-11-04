<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Task;
use App\Models\User;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks = Task::where('user_id', Auth::id())
            ->orderBy('finished_at', 'asc')
            ->paginate();
        return response()->json($tasks, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreTaskRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTaskRequest $request)
    {
        $validated = $request->safe()->all();

        try {
            $user = User::findOrFail(Auth::id());
            $user->tasks()->create($validated);

            return response()->json('Tarefa cadastrada com sucesso!', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTaskRequest  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTaskRequest $request, $id)
    {
        $validated = $request->safe()->all();

        try {
            $task = Task::where('user_id', Auth::id())->where('id', $id)->whereNull('finished_at')->firstOrFail();
            $task->update($validated);

            return response()->json('Tarefa editada com sucesso!', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            Task::where('user_id', Auth::id())->where('id', $id)->firstOrFail()->delete();
            return response()->json('Tarefa deletada com sucesso!', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function finish($id) 
    {
        try {
            $task = Task::where('user_id', Auth::id())->where('id', $id)->firstOrFail();
            $task->update(['finished_at' => now()]);

            return response()->json('Tarefa finalizada com sucesso!', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}

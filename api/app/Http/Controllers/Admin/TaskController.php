<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Task;

class TaskController extends Controller
{
    public function list (Request $request)
    {
        $validated = $request->validate([
            'lateTasks' => 'nullable',
        ]);

        $tasks = Task::with('user')
            ->when(isset($validated['lateTasks']), function ($query) {
                $query->where('deadline', '<', now())
                    ->whereNull('finished_at');
            })->paginate();

        return response()->json($tasks, 200);
    }
}

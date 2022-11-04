<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use App\Models\User;
use App\Models\Task;

class TaskTest extends TestCase
{
    use WithFaker;

    public function test_store_task()
    {
        $token = Auth::guard('user')->login(User::first());

        $data = [
            'description' => $this->faker->title,
            'deadline' => Carbon::now()->addDays(5)->format('Y-m-d H:i:s')
        ];

        $headers = ['Authentication' => "Bearer $token"];
        $response = $this->postJson('/api/v1/tasks', $data, $headers);
        $response->assertStatus(200);
    }

    public function test_list_tasks()
    {
        $user = User::with('tasks')->first();
        $token = Auth::guard('user')->login($user);

        $headers = ['Authentication' => "Bearer $token"];
        $response = $this->getJson('/api/v1/tasks', $headers);
        $response->assertStatus(200);
    }

    public function test_update_task()
    {
        $data = [
            'description' => $this->faker->title,
            'deadline' => Carbon::now()->addDays(5)->format('Y-m-d H:i:s')
        ];

        $task = Task::first();
        $user = User::find($task->user_id);
        $token = Auth::guard('user')->login($user);

        $headers = ['Authentication' => "Bearer $token"];
        $response = $this->putJson("/api/v1/tasks/$task->id", $data, $headers);
        $response->dump()->assertStatus(200);
    }

    public function test_destroy_task()
    {
        $user = User::with('tasks')->first();
        $token = Auth::guard('user')->login($user);
        $taskId = Task::where('user_id', $user->id)->first()->id;

        $headers = ['Authentication' => "Bearer $token"];
        $response = $this->deleteJson("/api/v1/tasks/$taskId", $headers);
        $response->assertStatus(200);
    }
}

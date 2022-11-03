<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use WithFaker;
    
    public function test_register()
    {
        $response = $this->post('api/v1/auth/register', 
            ['name' => $this->faker->name(), 'email' => $this->faker->email(), 'password' => 'password']);

        $response->assertOk();
    }

    public function test_authenticate()
    {
        $user = User::firstOrFail();
        $response = $this->post('api/v1/auth/authenticate', 
            ['email' => $user->email, 'password' => 'password']);

        $response->assertOk();
    }
}

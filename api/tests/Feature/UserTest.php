<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    public function test_register()
    {
        $response = $this->post('api/v1/auth/register', 
            ['email' => 'teste@teste.com.br', 'password' => 'password']);

        $response->assertOk();
    }
}

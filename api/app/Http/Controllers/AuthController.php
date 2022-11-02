<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request) 
    {
        $validated = $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $validated['password'] = Hash::make('password');
            User::create($validated);

            return response()->json('Conta criada com sucesso!', 200);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function authenticate(Request $request) 
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $credentials = $request->only('email', 'password');

            if (!$token = Auth::guard('user')->attempt($credentials)) {
                return response()->json(['error' => 'E-mail ou senha inválidos'], 400);
            }

            return $this->respondWithToken($token);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => Auth::guard('user')->factory()->getTTL() * 60
        ]);
    }
}

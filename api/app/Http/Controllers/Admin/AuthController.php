<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function authenticate(Request $request) 
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $credentials = $request->only('email', 'password');
            
            if (!$token = Auth::guard('admin')->attempt($credentials)) {
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
            'expires_in' => Auth::guard('admin')->factory()->getTTL() * 60
        ]);
    }
}

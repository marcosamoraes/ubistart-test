<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\Admin\TaskController as AdminTaskController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')->group(function() {
    Route::post('auth/register', [AuthController::class, 'register']);
    Route::post('auth/authenticate', [AuthController::class, 'authenticate']);
    Route::post('admin/auth/authenticate', [AdminAuthController::class, 'authenticate']);

    Route::middleware('auth:user')->group(function() {
        Route::put('tasks/finish/{id}', [TaskController::class, 'finish']);
        Route::apiResources(['tasks' => TaskController::class], ['except' => 'show']);
    });

    Route::middleware('auth:admin')->group(function() {
        Route::get('admin/tasks', [AdminTaskController::class, 'list']);
    });
});

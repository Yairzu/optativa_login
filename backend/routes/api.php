<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Middleware\IsUserAuth;
use App\Http\Middleware\IsAdmin;

//public routes
Route::post('register', [App\Http\Controllers\AuthController::class, 'register']);
Route::post('login', [App\Http\Controllers\AuthController::class, 'login']);

//private routes
Route::middleware(['IsUserAuth'])->group(function () {
    Route::controller(AuthController::class)->group(function () {
        Route::post('logout', 'logout');
        Route::get('me', 'getuser');
        Route::get('users', 'index');
    });

    Route::get('products', [ProductController::class, 'getProducts']);

    Route::middleware(['IsAdmin'])->group(function () {
        Route::controller(ProductController::class)->group(function () {
            Route::post('products', 'addProduct');
            Route::get('/products/{id}', 'getProductById');
            Route::patch('/products/{id}', 'updateProductById');
            Route::delete('/products/{id}', 'deleteProductById');
        });
    });
});
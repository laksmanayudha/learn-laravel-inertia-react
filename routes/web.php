<?php

use App\Http\Controllers\TodoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('todos', [TodoController::class, 'index'])->name('todo.index');
    Route::get('todos/create', [TodoController::class, 'create'])->name('todo.create');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

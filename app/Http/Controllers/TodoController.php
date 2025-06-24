<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        $todos = [
            [
                'title' => 'Todo Title One',
                'body' => 'Todo Body One',
            ],
            [
                'title' => 'Todo Title Two',
                'body' => 'Todo Body Two',
            ],
        ];

        return Inertia::render('todos/index', compact('todos'));
    }
}

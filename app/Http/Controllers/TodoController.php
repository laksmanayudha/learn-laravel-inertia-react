<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        $pagination = Todo::latest()->paginate(5);

        return Inertia::render('todos/index', compact('pagination'));
    }

    public function create()
    {
        return Inertia::render('todos/create');
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'title' => ['required', 'string'],
            'body' => ['required', 'string']
        ]);

        Todo::create($fields);

        // return redirect()->route('todos.index');
        return to_route('todos.index');
    }

    public function destroy(Request $request, $id)
    {
        Todo::find($id)->delete();

        return to_route('todos.index')->with('message', 'Todo deleted successfully');
    }
}

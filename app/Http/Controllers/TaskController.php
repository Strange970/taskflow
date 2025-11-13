<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function store(Request $request) {
        $task = Task::create($request->all());
        return redirect()->back(); // Inertia will sync state
    }

    public function update(Request $request, Task $task) {
        $task->update($request->all());
        return redirect()->back();
    }

    public function updatePosition(Request $request, Task $task) {
        $task->update(['board_id' => $request->board_id, 'position' => $request->position]);
        return response()->json(['success' => true]);
    }
}

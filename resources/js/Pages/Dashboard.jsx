// resources/js/Pages/Dashboard.jsx
import React, { useState, useContext } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import Navbar from '@/Components/Navbar';
import Modal from '@/Components/Modal';
import { ThemeContext } from '@/Components/ThemeProvider';
import { Inertia } from '@inertiajs/inertia';



export default function Dashboard({ initialBoards }) {
    const { theme } = useContext(ThemeContext);
    const [boards, setBoards] = useState(initialBoards); // Loaded from backend via Inertia
    const [selectedTask, setSelectedTask] = useState(null);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
    const [addBoardId, setAddBoardId] = useState(null);
    const [newTask, setNewTask] = useState({ title: '', description: '', dueDate: '', priority: 'Medium', assignees: [], tags: [] });

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const openTaskDetail = (task) => {
        setSelectedTask(task);
        setIsTaskModalOpen(true);
    };

    const saveTask = () => {
        if (selectedTask.id) {
        // Edit existing task
        Inertia.put(route('tasks.update', selectedTask.id), selectedTask, { preserveScroll: true });
        } else {
        // Add new task
        Inertia.post(route('tasks.store'), { ...newTask, board_id: addBoardId }, { preserveScroll: true });
        }
        setIsAddTaskModalOpen(false);
        setIsTaskModalOpen(false);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        let sourceBoardId = parseInt(active.data.current.boardId);
        let destBoardId = parseInt(over.data.current.boardId);

        setBoards((prev) => {
        let newBoards = [...prev];
        const sourceBoard = newBoards.find(b => b.id === sourceBoardId);
        const destBoard = newBoards.find(b => b.id === destBoardId);
        const taskIndex = sourceBoard.tasks.findIndex(t => t.id === active.id);
        const [movedTask] = sourceBoard.tasks.splice(taskIndex, 1);

        movedTask.board_id = destBoardId;
        destBoard.tasks.splice(over.data.current.index, 0, movedTask);

        // Optional: send update to backend
        Inertia.patch(route('tasks.updatePosition', movedTask.id), { board_id: destBoardId, position: over.data.current.index }, { preserveScroll: true });

        return newBoards;
        });
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
        case 'Low': return 'bg-green-200 dark:bg-green-700';
        case 'Medium': return 'bg-yellow-200 dark:bg-yellow-700';
        case 'High': return 'bg-red-200 dark:bg-red-700';
        default: return 'bg-gray-200 dark:bg-gray-700';
        }
    };

    return (
        <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
        <Navbar />
        <div className="p-6 flex gap-6 overflow-x-auto">
            {boards.map((board, boardIndex) => (
            <div key={board.id} className="flex-shrink-0 w-64 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                <h2 className="font-bold text-lg mb-4">{board.title}</h2>
                <button
                className="mb-4 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700"
                onClick={() => { setAddBoardId(board.id); setIsAddTaskModalOpen(true); }}
                >
                + Add Task
                </button>

                <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                >
                <SortableContext items={board.tasks} strategy={verticalListSortingStrategy}>
                    {board.tasks.map((task, index) => (
                    <div
                        key={task.id}
                        id={task.id}
                        data-board-id={board.id}
                        data-index={index}
                        className={`${getPriorityColor(task.priority)} p-2 rounded cursor-pointer hover:opacity-90 flex items-center justify-between`}
                        onClick={() => openTaskDetail(task)}
                    >
                        <span>{task.title}</span>
                        {task.assignees && task.assignees.length > 0 && (
                        <div className="flex -space-x-2">
                            {task.assignees.map((user, idx) => (
                            <img key={idx} src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full border-2 border-white dark:border-gray-900" />
                            ))}
                        </div>
                        )}
                    </div>
                    ))}
                </SortableContext>
                </DndContext>

                {/* Add Task Modal */}
                <Modal
                isOpen={isAddTaskModalOpen && addBoardId === board.id}
                onClose={() => setIsAddTaskModalOpen(false)}
                title={`Add Task to ${board.title}`}
                >
                <div className="space-y-2">
                    <input type="text" placeholder="Title" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    <textarea placeholder="Description" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    <input type="date" value={newTask.dueDate} onChange={e => setNewTask({...newTask, dueDate: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                    <select value={newTask.priority} onChange={e => setNewTask({...newTask, priority: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    </select>
                    <button onClick={saveTask} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Save Task</button>
                </div>
                </Modal>
            </div>
            ))}

            {/* Task Detail / Edit Modal */}
            <Modal
            isOpen={isTaskModalOpen}
            onClose={() => setIsTaskModalOpen(false)}
            title={selectedTask?.title}
            >
            {selectedTask && (
                <div className="space-y-2">
                <input type="text" value={selectedTask.title} onChange={e => setSelectedTask({...selectedTask, title: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                <textarea value={selectedTask.description} onChange={e => setSelectedTask({...selectedTask, description: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                <input type="date" value={selectedTask.dueDate} onChange={e => setSelectedTask({...selectedTask, dueDate: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600" />
                <select value={selectedTask.priority} onChange={e => setSelectedTask({...selectedTask, priority: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <button onClick={saveTask} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Save Changes</button>
                </div>
            )}
            </Modal>
        </div>
        </div>
    );
}

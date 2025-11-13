import { useForm } from '@inertiajs/react';
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
} from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Index({ pendingTasks, completedTasks }) {
    const { data, setData, post, reset } = useForm({
        title: '',
        description: '',
        priority: 'medium',
        due_date: ''
    });

    const sensors = useSensors(useSensor(PointerSensor));

    const createTask = (e) => {
        e.preventDefault();
        post('/tasks', { onSuccess: () => reset() });
    };

    const toggleStatus = (id) => {
        fetch(`/tasks/${id}/toggle-status`, { method: 'PATCH' }).then(() => location.reload());
    };

    const deleteTask = (id) => {
        fetch(`/tasks/${id}`, { method: 'DELETE' }).then(() => location.reload());
    };

    const TaskCard = ({ task }) => {
        const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

        const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        };

        return (
        <div ref={setNodeRef}
            {...attributes} {...listeners}
            className="bg-white rounded shadow p-3 mb-2 border-l-4 cursor-grab"
            style={{
            borderLeftColor: task.priority === 'high' ? '#dc2626'
                : task.priority === 'medium' ? '#facc15'
                : '#16a34a',
            transform: CSS.Transform.toString(transform),
            transition,
            }}
        >
            <h3 className="font-semibold">{task.title}</h3>
            {task.description && <p className="text-sm mt-1">{task.description}</p>}

            <div className="flex justify-between text-xs mt-2 opacity-70">
            <button onClick={() => toggleStatus(task.id)} className="underline">
                {task.status ? 'Move to Pending' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)} className="underline text-red-600">
                Delete
            </button>
            </div>
        </div>
        );
    };

    const handleDragEnd = (event) => {
        const { over, active } = event;

        if (!over) return;

        // If moved between lists -> toggle status
        if (over.id === 'pending' && completedTasks.find(t => t.id === active.id)) {
        toggleStatus(active.id);
        }

        if (over.id === 'completed' && pendingTasks.find(t => t.id === active.id)) {
        toggleStatus(active.id);
        }
    };

    return (
        <div className="p-6 grid grid-cols-3 gap-6">
        <form onSubmit={createTask} className="col-span-1 bg-white p-4 rounded shadow space-y-3">
            <h2 className="font-bold">Add Task</h2>

            <input type="text" placeholder="Title" className="w-full border rounded p-1"
            value={data.title} onChange={(e) => setData('title', e.target.value)} />

            <textarea placeholder="Description" className="w-full border rounded p-1"
            value={data.description} onChange={(e) => setData('description', e.target.value)} />

            <select className="w-full border rounded p-1"
            value={data.priority} onChange={(e) => setData('priority', e.target.value)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            </select>

            <input type="date" className="w-full border rounded p-1"
            value={data.due_date} onChange={(e) => setData('due_date', e.target.value)} />

            <button className="bg-blue-600 text-white w-full py-1 rounded">Add Task</button>
        </form>

        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={pendingTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div id="pending">
                <h2 className="font-bold mb-2">Pending</h2>
                {pendingTasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
            </SortableContext>

            <SortableContext items={completedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
            <div id="completed">
                <h2 className="font-bold mb-2">Completed</h2>
                {completedTasks.map(task => <TaskCard key={task.id} task={task} />)}
            </div>
            </SortableContext>
        </DndContext>
        </div>
    );
}

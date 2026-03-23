import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import api from "../lib/api";
import { getToken, clearToken } from "../lib/auth";
import { FaArchive, FaTrashAlt } from "react-icons/fa";
import { Footer } from "~/components/page_layout/footer";
import { NavBar } from "~/components/page_layout/navbar";
import { PageBody } from "~/components/page_layout/pageBody";
import { TodoFieldBody } from "~/components/todo_ui/todoFieldBody";
import { TodoListWrapper } from "~/components/todo_ui/todoListWrapper";
import { InfoField } from "~/components/todo_ui/infoField";

export async function loader() {
    return null;
}

type Task = {
    id: number;
    description: string;
    isComplete: boolean;
    isArchived: boolean;
};

export const Tasks = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newDescription, setNewDescription] = useState("");
    const [loading, setLoading] = useState(true);

  // -------- AUTH + INITIAL FETCH --------
    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate("/login");
            return;
        }

        api.get("/me")
            .then(() => fetchTasks())
            .catch(() => {
                clearToken();
                navigate("/login");
            })
        .finally(() => setLoading(false));
    }, [navigate]);

    const fetchTasks = async () => {
        const res = await api.get("/api/tasks");
        setTasks(res.data);
    };

  // -------- CREATE --------
    const createTask = async () => {
        if (!newDescription.trim()) return;

        await api.post("/api/tasks", {
            description: newDescription,
            completed: false
        });

        setNewDescription("");
        fetchTasks();
    };

  // -------- TOGGLE --------
    const toggleTask = async (task: Task) => {
        await api.patch(`/api/tasks/${task.id}/complete`, {
        ...task,
        isComplete: !task.isComplete
    });
        fetchTasks();
    };

  // -------- DELETE --------
    const deleteTask = async (id: number) => {
        await api.delete(`/api/tasks/${id}`);
        fetchTasks();
    };

    const inProgressTasks = tasks.filter(task => !task.isComplete)

    const completedTasks = tasks.filter(task => task.isComplete)

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col">
        <NavBar />
        <PageBody>
            <TodoFieldBody>
                <div>
                    <li className="list-row card bg-base-300 flex justify-around">
                        <label className="floating-label">
                            <input
                                placeholder="New task..."
                                type="text"
                                value={newDescription}
                                onChange={e => setNewDescription(e.target.value)}
                                className="input input-primary"
                            />
                            <span>New Task</span>
                        </label>
                        <div className="card-actions">
                            <button onClick={createTask} className="btn btn-primary w-30">Add</button>
                        </div>
                    </li>
                </div>
                <div className="divider"></div>
                <InfoField />
            </TodoFieldBody>
            <div className="divider divider-horizontal"></div>
            <div className="tabs tabs-lift">
                <label className="tab">
                <input type="radio" name="in_progress" />
                    In Progress
                </label>
            <TodoListWrapper>
                {inProgressTasks.map(task => (
                    <li className="list-row border border-primary-content flex flex-wrap" key={task.id}>
                    <div>
                        <input type="checkbox" checked={task.isComplete} onChange={() => toggleTask(task)} className="checkbox checkbox-accent"/>
                    </div>
                    <div
                    className={`text-base font-semibold opacity-60 ${task.isComplete ? 'line-through' : ''} min-w-3xs`}
                    >
                                {task.description}
                    </div>
                        <button className="btn" disabled={task.isComplete}>
                            <FaArchive />
                        </button>
                        <button className="btn btn-soft" onClick={() => deleteTask(task.id)}>
                            <FaTrashAlt />
                            Delete
                        </button>
                    </li>
                    ))}
                </TodoListWrapper>
                <label className="tab">
                <input type="radio" name="in_progress" />
                    Completed
                </label>
            <TodoListWrapper>
                {completedTasks.map(task => (
                    <li className="list-row border border-primary-content flex flex-wrap" key={task.id}>
                    <div>
                        <input type="checkbox" checked={task.isComplete} onChange={() => toggleTask(task)} className="checkbox checkbox-accent"/>
                    </div>
                    <div
                    className={`text-base font-semibold opacity-60 ${task.isComplete ? 'line-through' : ''} min-w-3xs`}
                    >
                                {task.description}
                    </div>
                        <button className="btn" disabled={task.isComplete}>
                            <FaArchive />
                        </button>
                        <button className="btn btn-soft" onClick={() => deleteTask(task.id)}>
                            <FaTrashAlt />
                            Delete
                        </button>
                    </li>
                    ))}
                </TodoListWrapper>
                </div>
            </PageBody>
        <Footer />    
    </div>
);
}
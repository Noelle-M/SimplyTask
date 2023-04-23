// Tasks.js
import React, { useState, useEffect } from 'react';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('/api/tasks', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Erreur1 lors de la récupération des tags:', response.statusText);
                    return [];
                }
            })
            .then((response) => setTasks(response))
            .catch((error) => console.error('Erreur2 lors de la récupération des tags:', error));
    }, []);

    const activeTasks = tasks.filter((task) => !task.archived);

    return (
        <div>
            {activeTasks.length === 0 ? (
                <>
                    <p className="text-center">Vous n'avez aucune tâche en cours.</p>
                    <a href="/">Créer une tâche</a>
                </>
            ) : (
                <>
                    {activeTasks.map((task) => (
                        <div className="card-task-one" key={task.id}>
                            <table className="table table-hover">
                                <tbody>
                                <tr>
                                    <td>
                                        {task.tags.map((tag) => (
                                            <div
                                                className="color-tag"
                                                key={tag.id}
                                                style={{ backgroundColor: tag.color }}
                                            ></div>
                                        ))}
                                    </td>
                                    <td>
                                        {task.title}
                                    </td>
                                    <td>
                                        {task.duree}
                                    </td>
                                    <td>
                                        {task.marge_securite}
                                    </td>
                                    <td>
                                        {task.priority}
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export { Tasks };

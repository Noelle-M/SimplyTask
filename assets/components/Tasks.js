// Tasks.js
import React, { useState, useEffect } from 'react';
import etoile from '../img/etoile-pleine.png';
import archiver from '../img/archiver.png';
import play from '../img/play.png';
import pause from '../img/pause.png';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState(new Map());
    const [taskStatuses, setTaskStatuses] = useState({});
    const formatDuration = (durationInMinutes) => {
        const days = Math.floor(durationInMinutes / 1440);
        const hours = Math.floor((durationInMinutes % 1440) / 60);
        const minutes = durationInMinutes % 60;
        let formattedDuration = '';
        if (days > 0) {
            formattedDuration += `${days} jours `;
        }
        if (hours > 0) {
            formattedDuration += `${hours} heures `;
        }
        if (minutes > 0) {
            formattedDuration += `${minutes} minutes`;
        }
        return formattedDuration.trim();
    };
    const handlePause = (taskId) => {
        setTaskStatuses({
            ...taskStatuses,
            [taskId]: {
                ...taskStatuses[taskId],
                isPaused: !taskStatuses[taskId]?.isPaused,
            },
        });
    };
    const activeTasks = tasks.filter((task) => !task.archived);
    const calculateWidth = (elapsedTime, totalTime) => {
        return (elapsedTime / totalTime) * 100;
    };
    const calculatePercentage = (duration, totalDuration, elapsed) => {
        if (elapsed) {
            duration = Math.min(elapsed, duration);
            totalDuration = elapsed;
        }
        return (duration / totalDuration) * 100;
    };

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
    }, [tasks, taskStatuses]);

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
                        <div className="card-task-one border shadow-sm" key={task.id}>
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
                                        <img src={archiver} alt="archiver" title="Archiver cette tâche" height="30"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        {formatDuration(task.duree)}
                                    </td>
                                    <td>
                                        {formatDuration(task.marge_securite)}
                                    </td>
                                    <td>
                                        {Array.from({ length: task.priority }).map((_, i) => (
                                            <span key={i}><img src={etoile} height="20" alt="priorité"/></span>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <div style={{ display: 'flex', height: '40px' }}>
                                            <div
                                                style={{
                                                    width: `${calculatePercentage(task.duree, task.duree + task.marge_securite, progress.get(task.id)?.elapsed)}%`,
                                                    backgroundColor: progress.get(task.id)?.elapsed ? 'rgba(0, 128, 0, 1)' : 'rgba(0, 128, 0, 0.7)',
                                                }}
                                            ></div>
                                            <div
                                                style={{
                                                    width: `${calculatePercentage(task.marge_securite, task.duree + task.marge_securite, progress.get(task.id)?.elapsed)}%`,
                                                    backgroundColor: progress.get(task.id)?.elapsed ? 'rgba(255, 255, 0, 1)' : 'rgba(255, 255, 0, 0.7)',
                                                }}
                                            ></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <img
                                            src={taskStatuses[task.id]?.isPaused ? pause : play}
                                            alt={taskStatuses[task.id]?.isPaused ? 'pause' : 'play'}
                                            title={taskStatuses[task.id]?.isPaused ? 'Mettre en pause' : 'Lancer le pomodoro'}
                                            height="50"
                                            onClick={() => handlePause(task.id)}
                                            style={{ cursor: 'pointer' }}
                                        />
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

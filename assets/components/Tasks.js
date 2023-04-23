// Tasks.js
import React, { useState, useEffect } from 'react';
import etoile from '../img/etoile-pleine.png';
import archiver from '../img/archiver.png';
import play from '../img/play.png';
import pause from '../img/pause.png';
import horloge from '../img/horloge.png';
import sablier from '../img/sablier.png';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState({});
    const [intervals, setIntervals] = useState({});

    const formatDuration = (durationInSeconds) => {
        const days = Math.floor(durationInSeconds / 86400);
        const hours = Math.floor((durationInSeconds % 86400) / 3600);
        const minutes = Math.floor((durationInSeconds % 3600) / 60);
        const seconds = durationInSeconds % 60;
        let formattedDuration = '';
        if (days > 0) {
            formattedDuration += `${days} jours `;
        }
        if (hours > 0) {
            formattedDuration += `${hours} heures `;
        }
        if (minutes > 0) {
            formattedDuration += `${minutes} minutes `;
        }
        if (seconds > 0) {
            formattedDuration += `${seconds} secondes`;
        }
        return formattedDuration.trim();
    };

    const handlePause = (taskId) => {
        if (!taskStatuses[taskId]) {
            setTaskStatuses({
                ...taskStatuses,
                [taskId]: {
                    elapsedTime: parseInt(localStorage.getItem(`elapsedTime-${taskId}`) || '0', 10),
                    isPaused: true,
                },
            });
        }

        if (taskStatuses[taskId]?.isPaused) {
            const intervalId = setInterval(() => {
                setTaskStatuses((prevStatuses) => ({
                    ...prevStatuses,
                    [taskId]: {
                        ...prevStatuses[taskId],
                        elapsedTime: prevStatuses[taskId].elapsedTime + 1,
                    },
                }));
                localStorage.setItem(`elapsedTime-${taskId}`, taskStatuses[taskId].elapsedTime.toString());
            }, 1000); // 1000 ms = 1 seconde

            setIntervals((prevIntervals) => ({
                ...prevIntervals,
                [taskId]: intervalId,
            }));

            setTaskStatuses((prevStatuses) => ({
                ...prevStatuses,
                [taskId]: {
                    ...prevStatuses[taskId],
                    isPaused: false,
                },
            }));
        } else {
            clearInterval(intervals[taskId]);

            localStorage.setItem(`elapsedTime-${taskId}`, taskStatuses[taskId].elapsedTime.toString());

            setIntervals((prevIntervals) => {
                const newIntervals = { ...prevIntervals };
                delete newIntervals[taskId];
                return newIntervals;
            });

            setTaskStatuses((prevStatuses) => ({
                ...prevStatuses,
                [taskId]: {
                    ...prevStatuses[taskId],
                    isPaused: true,
                },
            }));
        }
    };

    const activeTasks = tasks.filter((task) => !task.archived);

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
            .then((response) => {            const updatedTasks = response.map((task) => {
                const elapsedTime = parseInt(localStorage.getItem(`elapsedTime-${task.id}`) || '0', 10);
                return {
                    ...task,
                    elapsedTime,
                };
            });
                setTasks(updatedTasks);
            })
            .catch((error) => console.error('Erreur2 lors de la récupération des tags:', error));
    }, [tasks, taskStatuses]);


    return (
        <div className="mt-4">
            {activeTasks.length === 0 ? (
                <>
                    <p className="text-center">Vous n'avez aucune tâche en cours.</p>
                    <a href="/">Créer une tâche</a>
                </>
            ) : (
                <>
                    {activeTasks.map((task) => (
                        <div className="card-task-one border shadow-sm mt-4" key={task.id}>
                            <table className="table">
                                <tbody>
                                <tr className="card-header">
                                    <td className="td-left">
                                        {task.tags.map((tag) => (
                                            <span
                                                className="color-tag"
                                                key={tag.id}
                                                style={{ backgroundColor: tag.color }}
                                            ></span>
                                        ))}
                                        {task.title}
                                    </td>
                                    <td></td>
                                    <td className="td-right">
                                        <img src={archiver} alt="archiver" title="Archiver cette tâche" height="30"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <img src={horloge} alt="temps estimé" title="temps estimé" height="40"/>
                                        {formatDuration(task.duree)}
                                    </td>
                                    <td>
                                        <img src={sablier} alt="marge de sécurité" title="marge de sécurité" height="30"/>
                                        {task.marge_securite ? formatDuration(task.marge_securite) : '0'}
                                    </td>
                                    <td>
                                        {Array.from({ length: task.priority }).map((_, i) => (
                                            <span key={i}><img src={etoile} height="20" alt="priorité"/></span>
                                        ))}
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3">
                                        <div className="timeline" style={{ display: 'flex', height: '40px' }}>
                                            <div
                                                style={{
                                                    width: `${calculatePercentage(task.duree, task.duree + task.marge_securite, task.elapsedTime)}%`,
                                                    backgroundColor: 'rgba(0, 128, 0, 1)',
                                                }}
                                            ></div>
                                            <div
                                                style={{
                                                    width: `${calculatePercentage(task.marge_securite, task.duree + task.marge_securite, task.elapsedTime)}%`,
                                                    backgroundColor: 'rgba(255, 255, 0, 1)',
                                                }}
                                            ></div>
                                        </div>
                                        <p>Temps écoulé: {formatDuration(task.elapsedTime)}</p>
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

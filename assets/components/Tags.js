import React, { useState, useEffect } from 'react';

const Tags = () => {
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch('/api/tags', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    console.error('Erreur lors de la récupération des tags:', response.statusText);
                    return [];
                }
            })
            .then((response) => setTags(response))
            .catch((error) => console.error('Erreur lors de la récupération des tags:', error));
    }, []);

    return (
        <>
            {tags.map((tag) => (
                <span
                    key={tag.id}
                    style={{ backgroundColor: tag.color }}
                >
                    {tag.name}
                </span>
            ))}
        </>
    );
};

export {Tags};

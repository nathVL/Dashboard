import { useState, useEffect } from 'react';
import { fetchLast24HoursData } from '../api.js';

export default function useHistoryData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const result = await fetchLast24HoursData();
                console.log('fetch')
                if (isMounted) {
                    setData(result);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup pour éviter les updates si le composant est démonté
        };
    }, []); // Tableau de dépendances vide = exécution unique

    return { data, loading, error };
}
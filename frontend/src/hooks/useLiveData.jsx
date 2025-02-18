import {useEffect, useState} from "react";
import {fetchLiveData} from "../api.js";

export default function useLiveData(intervalMs = 5000) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetchLiveData();
        setData(response);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    loadData();
    const interval = setInterval(loadData, intervalMs);
    return () => clearInterval(interval);
  }, [intervalMs]);

  return { data, loading, error };
};
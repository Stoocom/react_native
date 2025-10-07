import { useState, useEffect } from "react";
import { apiService } from "../../services/api/apiService";
import { Shift } from "../types/types";

export function useGetShifts(params: object = {}) {
  const [data, setData] = useState<Shift[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await apiService.get('shifts/map-list-unauthorized/', params);
        setData(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "Ошибка при загрузке данных");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, loading, error };
}
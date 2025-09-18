import { useEffect, useState } from 'react';
import api from '../lib/api';

export default function HealthCheck() {
  const [status, setStatus] = useState<string>('Checking...');

  useEffect(() => {
    api
      .get('/health')
      .then((res) => {
        const { ok, from, time } = res.data;
        setStatus(`Backend says: ok=${ok}, from=${from}, time=${time}`);
      })
      .catch((err) => {
        setStatus('Error: ' + err.message);
      });
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="font-bold">Health Check</h2>
      <p>{status}</p>
    </div>
  );
}

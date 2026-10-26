import { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Reads the API base URL from VITE_API_BASE_URL environment variable
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        setLoading(true);
        // Explicitly invokes GET /api/v1/status endpoint
        const response = await fetch(`${apiBaseUrl}/api/v1/status`);
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStatus();
  }, [apiBaseUrl]);

  return (
    <div className="dashboard-card">
      <h2>Service Telemetry Monitor</h2>
      {loading && <p>Fetching service status...</p>}
      {error && <div className="badge badge-offline">Offline: {error}</div>}
      {data && (
        <>
          <div className={`badge badge-${data.status}`}>
            Status: {data.status}
          </div>
          <div className="meta-grid">
            <div className="meta-item">
              <strong>Service Name</strong>
              <span>{data.service}</span>
            </div>
            <div className="meta-item">
              <strong>Version</strong>
              <span>{data.version}</span>
            </div>
            <div className="meta-item">
              <strong>Uptime</strong>
              <span>{data.uptime_seconds}s</span>
            </div>
            <div className="meta-item">
              <strong>Dependencies</strong>
              <span>
                {data.dependencies ? Object.keys(data.dependencies).join(', ') : 'None'}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

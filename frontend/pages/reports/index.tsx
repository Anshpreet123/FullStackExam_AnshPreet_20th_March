// frontend/pages/reports/index.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      const response = await axios.get('/api/reports');
      setReports(response.data);
    };
    fetchReports();
  }, []);

  return (
    <div>
      <h1>Reports</h1>
      <ul>
        {reports.map((report, index) => (
          <li key={index}>{report}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReportsPage;
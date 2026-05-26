import { Sidebar } from '@/components/sidebar';
import { CreditMonitoringDashboard } from '@/components/credit-monitoring-dashboard';

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <CreditMonitoringDashboard />
      </div>
    </div>
  );
}

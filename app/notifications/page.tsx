import { Sidebar } from '@/components/sidebar';
import { NotificationsPanel } from '@/components/notifications-panel';

export default function NotificationsPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 ml-64">
        <NotificationsPanel />
      </div>
    </div>
  );
}

import { Sidebar } from '@/components/sidebar';
import { FormCKPN } from '@/components/form-ckpn';

export default function FormCKPNPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <FormCKPN />
      </div>
    </div>
  );
}

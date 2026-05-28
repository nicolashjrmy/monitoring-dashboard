import { Sidebar } from '@/components/sidebar';
import { FormLKN } from '@/components/form-lkn';

export default function FormLKNPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 ml-64">
        <FormLKN />
      </div>
    </div>
  );
}

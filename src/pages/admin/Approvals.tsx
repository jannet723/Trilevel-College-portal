import { useState } from 'react';
import { Clock } from 'lucide-react';
import AdminEmptyState from '../../components/AdminEmptyState';
import AdminLayout from '../../layouts/AdminLayout';

const Approvals = () => {
  const [approvals] = useState<never[]>([]);

  return (
    <AdminLayout
      title="Approvals"
      subtitle="Pending student and enrolment requests"
      backTo="/admin/dashboard"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#e8e2d9] overflow-hidden shadow-sm">
        {approvals.length === 0 && (
          <div className="p-6">
            <AdminEmptyState
              icon={<Clock size={28} />}
              title="No pending approvals"
              description="When students submit enrolment or registration requests, they will appear here for your review."
            />
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Approvals;

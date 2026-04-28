import { type ReactNode } from 'react';

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#fafaf5]">
      {/* Main Content Area */}
      <main className="pt-24 pb-10 px-8 max-w-screen-2xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;

import { Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Admin = () => {
  const { user } = useAuth();

  // Check if user is admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-mono">
        <div className="text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">ACCESS DENIED</h1>
          <p className="text-gray-600">You do not have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-mono">
      {/* Header */}
      <div className="border-b border-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-black border border-black flex items-center justify-center mr-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">ADMIN PANEL</h1>
                <p className="text-gray-600">System administration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="border border-black p-8 text-center">
          <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">ADMIN FEATURES COMING SOON</h2>
          <p className="text-gray-600">
            Admin dashboard functionality is not yet available in this version.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Admin;

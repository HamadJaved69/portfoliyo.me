import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Save, AlertCircle, Trash2, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { apiClient } from '../../lib/api';
import { API_ENDPOINTS } from '../../config/api';
import { validateProfileForm, getFieldError } from '../../lib/validation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import LoadingSpinner from '../../components/ui/LoadingSpinner';
import type { UpdateProfileData, ValidationError } from '../../types';

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const { showError, showSuccess } = useToast();

  // Profile form state
  const [profileData, setProfileData] = useState<UpdateProfileData>({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || 'default',
  });

  // Password change state
  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // UI state
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState({
    profile: false,
    password: false,
    delete: false,
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  // Update form when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username || 'default',
      });
    }
  }, [user]);

  const handleProfileInputChange = (field: keyof UpdateProfileData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setProfileData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error on change
    if (errors.length > 0) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  };

  const handlePasswordInputChange = (field: keyof PasswordChangeData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setPasswordData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error on change
    if (errors.length > 0) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationErrors = validateProfileForm(profileData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(prev => ({ ...prev, profile: true }));
    setErrors([]);

    try {
      const response = await apiClient.put(API_ENDPOINTS.AUTH.PROFILE, profileData);

      if (response.success && response.data) {
        updateUser(response.data);
        showSuccess('Profile updated', 'Your profile information has been updated successfully.');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Profile update failed';
      showError('Update Failed', errorMessage);
      
      // Handle specific error cases
      if (errorMessage.includes('username')) {
        setErrors([{ field: 'username', message: 'This username is already taken' }]);
      }
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password change form
    const validationErrors: ValidationError[] = [];
    
    if (!passwordData.currentPassword) {
      validationErrors.push({ field: 'currentPassword', message: 'Current password is required' });
    }
    
    if (!passwordData.newPassword) {
      validationErrors.push({ field: 'newPassword', message: 'New password is required' });
    } else if (passwordData.newPassword.length < 8) {
      validationErrors.push({ field: 'newPassword', message: 'Password must be at least 8 characters long' });
    }
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      validationErrors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
    }
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(prev => ({ ...prev, password: true }));
    setErrors([]);

    try {
      await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, {
        oldPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      showSuccess('Password changed', 'Your password has been updated successfully.');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Password change error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Password change failed';
      showError('Password Change Failed', errorMessage);
      
      if (errorMessage.includes('current password')) {
        setErrors([{ field: 'currentPassword', message: 'Current password is incorrect' }]);
      }
    } finally {
      setLoading(prev => ({ ...prev, password: false }));
    }
  };

  const handleDeleteAccount = async () => {
    // Account deletion not currently supported by API
    showError('Not Available', 'Account deletion is not currently available. Please contact support.');
    setShowDeleteConfirmation(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">Manage your account information and preferences</p>
        </div>

        <div className="space-y-8">
          {/* Profile Information */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-gray-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  label="First Name"
                  value={profileData.firstName || ''}
                  onChange={handleProfileInputChange('firstName')}
                  error={getFieldError(errors, 'firstName') || undefined}
                  placeholder="John"
                  autoComplete="given-name"
                />
                
                <Input
                  type="text"
                  label="Last Name"
                  value={profileData.lastName || ''}
                  onChange={handleProfileInputChange('lastName')}
                  error={getFieldError(errors, 'lastName') || undefined}
                  placeholder="Doe"
                  autoComplete="family-name"
                />
              </div>

              <Input
                type="text"
                label="Username"
                value={profileData.username || ''}
                onChange={handleProfileInputChange('username')}
                error={getFieldError(errors, 'username') || undefined}
                placeholder="johndoe"
                helperText="This will be your portfolio URL: portfoliyo.me/@username"
                autoComplete="username"
                required
              />

              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-700">
                    Email: <span className="font-medium">{user.email}</span>
                    {user.emailVerified ? (
                      <span className="ml-2 text-green-600 text-xs">✓ Verified</span>
                    ) : (
                      <span className="ml-2 text-amber-600 text-xs">⚠ Not verified</span>
                    )}
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                loading={loading.profile}
                leftIcon={<Save className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Save Changes
              </Button>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex items-center mb-6">
              <AlertCircle className="w-6 h-6 text-gray-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Change Password</h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="relative">
                <Input
                  type={showPasswords.current ? 'text' : 'password'}
                  label="Current Password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordInputChange('currentPassword')}
                  error={getFieldError(errors, 'currentPassword') || undefined}
                  placeholder="Enter current password"
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="absolute top-9 right-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                >
                  {showPasswords.current ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPasswords.new ? 'text' : 'password'}
                  label="New Password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordInputChange('newPassword')}
                  error={getFieldError(errors, 'newPassword') || undefined}
                  placeholder="Enter new password"
                  autoComplete="new-password"
                  helperText="At least 8 characters with uppercase, lowercase, and number"
                  required
                />
                <button
                  type="button"
                  className="absolute top-9 right-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                >
                  {showPasswords.new ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <div className="relative">
                <Input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  label="Confirm New Password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordInputChange('confirmPassword')}
                  error={getFieldError(errors, 'confirmPassword') || undefined}
                  placeholder="Confirm new password"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="absolute top-9 right-3 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                >
                  {showPasswords.confirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              <Button
                type="submit"
                loading={loading.password}
                variant="secondary"
                leftIcon={<Save className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Update Password
              </Button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-white shadow rounded-lg p-6 border-l-4 border-red-400">
            <div className="flex items-center mb-6">
              <Trash2 className="w-6 h-6 text-red-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Danger Zone</h2>
            </div>

            <div className="bg-red-50 p-4 rounded-md mb-4">
              <p className="text-sm text-red-700">
                <strong>Warning:</strong> Deleting your account is permanent and cannot be undone. 
                All your portfolios and data will be permanently deleted.
              </p>
            </div>

            {!showDeleteConfirmation ? (
              <Button
                variant="danger"
                onClick={() => setShowDeleteConfirmation(true)}
                leftIcon={<Trash2 className="w-4 h-4" />}
              >
                Delete Account
              </Button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-gray-700 font-medium">
                  Are you absolutely sure? This action cannot be undone.
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="danger"
                    loading={loading.delete}
                    onClick={handleDeleteAccount}
                    leftIcon={<Trash2 className="w-4 h-4" />}
                  >
                    Yes, Delete My Account
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setShowDeleteConfirmation(false)}
                    disabled={loading.delete}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Back to dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
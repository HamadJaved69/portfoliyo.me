import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Mail, Lock, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { validateRegisterForm, getFieldError } from '../../lib/validation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import type { RegisterData, ValidationError } from '../../types';

const Signup = () => {
  const navigate = useNavigate();
  const { register, isAuthenticated } = useAuth();
  const { showError, showSuccess } = useToast();

  const [formData, setFormData] = useState<RegisterData & { confirmPassword: string }>({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field: keyof typeof formData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear field error on change
    if (errors.length > 0) {
      setErrors(prev => prev.filter(error => error.field !== field));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    const validationErrors = validateRegisterForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      showSuccess('Account created!', 'Welcome to PortfoliYo. Let\'s create your portfolio.');
      navigate('/start', { replace: true });
    } catch (error) {
      console.error('Registration error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      showError('Registration Failed', errorMessage);

      // Handle specific error cases
      if (errorMessage.includes('email')) {
        setErrors([{ field: 'email', message: 'This email is already registered' }]);
      } else if (errorMessage.includes('username')) {
        setErrors([{ field: 'username', message: 'This username is already taken' }]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 py-12 font-mono">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <div className="inline-flex items-center space-x-2">
              <Terminal className="w-6 h-6" />
              <span className="text-xl font-bold tracking-tight">PORTFOLIYO</span>
            </div>
          </Link>
          <h2 className="mt-8 text-2xl font-bold">CREATE ACCOUNT</h2>
          <p className="mt-2 text-gray-600 text-sm">Start building your portfolio</p>
        </div>

        {/* Signup Form */}
        <div className="border-2 border-black p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                label="First Name"
                value={formData.firstName}
                onChange={handleInputChange('firstName')}
                error={getFieldError(errors, 'firstName') || undefined}
                placeholder="John"
                autoComplete="given-name"
              />

              <Input
                type="text"
                label="Last Name"
                value={formData.lastName}
                onChange={handleInputChange('lastName')}
                error={getFieldError(errors, 'lastName') || undefined}
                placeholder="Doe"
                autoComplete="family-name"
              />
            </div>

            <Input
              type="email"
              label="Email address"
              value={formData.email}
              onChange={handleInputChange('email')}
              error={getFieldError(errors, 'email') || undefined}
              leftIcon={<Mail className="h-4 w-4" />}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />

            <Input
              type="text"
              label="Username"
              value={formData.username}
              onChange={handleInputChange('username')}
              error={getFieldError(errors, 'username') || undefined}
              leftIcon={<UserPlus className="h-4 w-4" />}
              placeholder="Choose a username"
              autoComplete="username"
              helperText="URL: portfoliyo.me/@username"
              required
            />

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={getFieldError(errors, 'password') || undefined}
                leftIcon={<Lock className="h-4 w-4" />}
                placeholder="Create a password"
                autoComplete="new-password"
                helperText="8+ chars, mixed case, number"
                required
              />
              <button
                type="button"
                className="absolute top-9 right-3 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                error={getFieldError(errors, 'confirmPassword') || undefined}
                leftIcon={<Lock className="h-4 w-4" />}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="absolute top-9 right-3 hover:text-gray-600"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <div className="flex items-start">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-black focus:ring-black border-gray-300 mt-1"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link to="/terms" className="underline hover:no-underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="underline hover:no-underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              loading={loading}
              fullWidth
              className="text-lg"
            >
              Create Account
            </Button>
          </form>

          {/* Sign in link */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="underline hover:no-underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Back to home */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
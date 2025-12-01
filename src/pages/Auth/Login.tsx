import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Terminal, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { validateLoginForm, getFieldError } from '../../lib/validation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import type { LoginCredentials, ValidationError } from '../../types';

const Login = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { showError, showSuccess } = useToast();

  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field: keyof LoginCredentials) => (
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
    const validationErrors = validateLoginForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors([]);

    try {
      await login(formData);
      showSuccess('Welcome back!', 'You have been logged in successfully.');
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      showError('Login Failed', errorMessage);
      
      // Handle specific error cases
      if (errorMessage.includes('email')) {
        setErrors([{ field: 'email', message: 'Email not found' }]);
      } else if (errorMessage.includes('password')) {
        setErrors([{ field: 'password', message: 'Invalid password' }]);
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
          <h2 className="mt-8 text-2xl font-bold">SIGN IN</h2>
          <p className="mt-2 text-gray-600 text-sm">Welcome back</p>
        </div>

        {/* Login Form */}
        <div className="border-2 border-black p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                value={formData.password}
                onChange={handleInputChange('password')}
                error={getFieldError(errors, 'password') || undefined}
                leftIcon={<Lock className="h-4 w-4" />}
                placeholder="Enter your password"
                autoComplete="current-password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-black focus:ring-black border-gray-300"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="underline hover:no-underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              loading={loading}
              fullWidth
              className="text-lg"
            >
              Sign In
            </Button>
          </form>

          {/* Sign up link */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="underline hover:no-underline font-medium"
              >
                Sign up
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

export default Login;
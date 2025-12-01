import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { apiClient } from '../lib/api';
import { tokenService, userService } from '../lib/auth';
import { API_ENDPOINTS } from '../config/api';
import type { User, LoginCredentials, RegisterData, AuthResponse } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user && tokenService.isAuthenticated();

  // Initialize auth state
  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const storedUser = userService.getUser();
      const hasValidToken = tokenService.isAuthenticated();

      if (storedUser && hasValidToken) {
        // Verify token with server by fetching profile
        const response = await apiClient.get<{ user: User }>(API_ENDPOINTS.AUTH.PROFILE);
        if (response.success && response.data?.user) {
          setUser(response.data.user);
          userService.setUser(response.data.user);
        } else {
          // Invalid token, clear auth
          tokenService.clearTokens();
          userService.clearUser();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      tokenService.clearTokens();
      userService.clearUser();
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      if (response.success && response.data) {
        const { user, token } = response.data;

        // Store token and user
        tokenService.setTokens(token);
        userService.setUser(user);
        setUser(user);
      } else {
        throw new Error(response.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        data
      );

      if (response.success && response.data) {
        const { user, token } = response.data;

        // Store token and user
        tokenService.setTokens(token);
        userService.setUser(user);
        setUser(user);
      } else {
        throw new Error(response.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = (): void => {
    // Clear local state
    tokenService.clearTokens();
    userService.clearUser();
    setUser(null);
  };

  const updateUser = (updates: Partial<User>): void => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      userService.updateUser(updates);
    }
  };

  const refreshUser = async (): Promise<void> => {
    try {
      const response = await apiClient.get<{ user: User }>(API_ENDPOINTS.AUTH.PROFILE);
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        userService.setUser(response.data.user);
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated,
        login,
        register,
        logout,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
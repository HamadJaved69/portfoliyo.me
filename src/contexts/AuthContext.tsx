import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { apiClient } from '../lib/api';
import { tokenService, userService } from '../lib/auth';
import { API_ENDPOINTS } from '../config/api';
import type { User, LoginCredentials, RegisterData } from '../types';

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
        // Verify token with server
        const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
        if (response.success && response.data) {
          setUser(response.data);
          userService.setUser(response.data);
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
      const response = await apiClient.post<{
        user: User;
        accessToken: string;
        refreshToken?: string;
      }>(API_ENDPOINTS.AUTH.LOGIN, credentials);

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        
        // Store tokens and user
        tokenService.setTokens(accessToken, refreshToken);
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
      const response = await apiClient.post<{
        user: User;
        accessToken: string;
        refreshToken?: string;
      }>(API_ENDPOINTS.AUTH.REGISTER, data);

      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        
        // Store tokens and user
        tokenService.setTokens(accessToken, refreshToken);
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
    try {
      // Call logout endpoint (fire and forget)
      apiClient.post(API_ENDPOINTS.AUTH.LOGOUT).catch(console.error);
    } finally {
      // Clear local state regardless of API call result
      tokenService.clearTokens();
      userService.clearUser();
      setUser(null);
    }
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
      const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.ME);
      if (response.success && response.data) {
        setUser(response.data);
        userService.setUser(response.data);
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
import { STORAGE_KEYS } from '../config/api';
import type { User } from '../types';

class TokenService {
  getAccessToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  setTokens(token: string): void {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  clearTokens(): void {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      // If token has expiration, check it; otherwise just verify token exists and is valid
      if (payload.exp) {
        const currentTime = Date.now() / 1000;
        return payload.exp > currentTime;
      }
      // Token without expiration - consider valid if it has required fields
      return !!(payload.id || payload.email);
    } catch {
      return false;
    }
  }
}

class UserService {
  getUser(): User | null {
    const userStr = localStorage.getItem(STORAGE_KEYS.USER);
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }

  setUser(user: User): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }

  clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }

  updateUser(updates: Partial<User>): void {
    const currentUser = this.getUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...updates };
      this.setUser(updatedUser);
    }
  }
}

export const tokenService = new TokenService();
export const userService = new UserService();

// Auth utility functions
export const parseJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error parsing JWT:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = parseJWT(token);
  if (!payload) return true;

  // If no expiration, token is not expired
  if (!payload.exp) return false;

  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
};

export const logout = (): void => {
  tokenService.clearTokens();
  userService.clearUser();
  window.location.href = '/';
};
/**
 * Authentication Context Provider
 * Manages user authentication state with session persistence
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, authenticateUser, mockUsers, UserRole } from '@/data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  nameAr: string;
  role: UserRole;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'hospital-queue-auth';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth) {
        try {
          const savedUser = JSON.parse(savedAuth);
          // Verify user still exists in mock data
          const validUser = mockUsers.find(u => u.id === savedUser.id);
          if (validUser) {
            setUser(validUser);
          } else {
            localStorage.removeItem(AUTH_STORAGE_KEY);
          }
        } catch (error) {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  /**
   * Login function - authenticates user with email and password
   * Returns success status and optional error message
   */
  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate inputs
    if (!email || !password) {
      return { success: false, error: 'Email and password are required' };
    }

    // Attempt authentication
    const authenticatedUser = authenticateUser(email, password);
    
    if (authenticatedUser) {
      setUser(authenticatedUser);
      // Store session (excluding password for security)
      const sessionData = { ...authenticatedUser, password: undefined };
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  /**
   * Signup function - creates new user account
   * In production, this would create a new user in the database
   */
  const signup = async (userData: SignupData): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validate inputs
    if (!userData.email || !userData.password || !userData.name) {
      return { success: false, error: 'All fields are required' };
    }

    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (existingUser) {
      return { success: false, error: 'Email already registered' };
    }

    // Create new user (in real app, this would be saved to database)
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: userData.email,
      password: userData.password,
      name: userData.name,
      nameAr: userData.nameAr || userData.name,
      role: userData.role,
      phone: userData.phone,
    };

    // Add to mock users (for demo purposes)
    mockUsers.push(newUser);

    // Auto-login after signup
    setUser(newUser);
    const sessionData = { ...newUser, password: undefined };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(sessionData));

    return { success: true };
  };

  /**
   * Logout function - clears user session
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

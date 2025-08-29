
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ThemeType, ColorScheme } from '../types';
import { 
  login as apiLogin, 
  register as apiRegister, 
  logout as apiLogout, 
  getCurrentUser as apiGetCurrentUser,
  AuthResponse
} from '@/services/authService';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string, role: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserProfile: (profileData: { name?: string; avatarUrl?: string }) => void;
  updateUserTheme: (theme: ThemeType) => void;
  updateUserColorScheme: (colorScheme: ColorScheme) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  isAuthenticated: false,
  updateUserProfile: () => {},
  updateUserTheme: () => {},
  updateUserColorScheme: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const backendUser = await apiGetCurrentUser();
        const userWithCompat = {
          ...backendUser,
          avatarUrl: backendUser.avatar,
          theme: (backendUser as any).theme || 'light',
          colorScheme: (backendUser as any).colorScheme || 'blue'
        } as User;
        setUser(userWithCompat);
        localStorage.setItem('user', JSON.stringify(userWithCompat));
      } catch (e) {
        console.error('Failed to validate token with backend:', e);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const response = await apiLogin({ email, password });
      
      // Add name and avatarUrl for backward compatibility
      const userWithName = {
        ...response.user,
        name: `${response.user.firstName} ${response.user.lastName}`,
        avatarUrl: response.user.avatar,
        // Default theme values if needed
        theme: 'light' as ThemeType,
        colorScheme: 'blue' as ColorScheme
      };
      
      // Store auth token and user info
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userWithName));
      
      setUser(userWithName);
      console.log("User logged in:", userWithName);
      
      // The redirection will happen in the Login component via useEffect
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    role: string
  ): Promise<void> => {
    try {
      setLoading(true);
      const response = await apiRegister({ email, password, firstName, lastName, role });
      
      // Add name and avatarUrl for backward compatibility
      const userWithName = {
        ...response.user,
        name: `${response.user.firstName} ${response.user.lastName}`,
        avatarUrl: response.user.avatar,
        // Default theme values if needed
        theme: 'light' as ThemeType,
        colorScheme: 'blue' as ColorScheme
      };
      
      // Store auth token and user info
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userWithName));
      
      setUser(userWithName);
      console.log("User registered:", userWithName);
      
      // The redirection will happen in the Login component via useEffect
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
  };

  const updateUserProfile = (profileData: { name?: string; avatarUrl?: string }) => {
    if (!user) return;

    // In a real app, you would call an API to update the user profile
    // For now, we'll just update the local state and localStorage
    const updatedUser = { 
      ...user, 
      ...profileData,
      // Make sure firstName/lastName stay in sync with name
      ...(profileData.name && {
        firstName: profileData.name.split(' ')[0],
        lastName: profileData.name.split(' ').slice(1).join(' ')
      })
    };
    
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const updateUserTheme = (theme: ThemeType) => {
    if (!user) return;

    const updatedUser = { ...user, theme };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const updateUserColorScheme = (colorScheme: ColorScheme) => {
    if (!user) return;

    const updatedUser = { ...user, colorScheme };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    updateUserProfile,
    updateUserTheme,
    updateUserColorScheme,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

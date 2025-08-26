
import api from './api';
import { User } from '@/types';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Demo users for offline mode
const DEMO_USERS = {
  'admin@example.com': {
    password: 'admin123',
    user: {
      id: 'admin-1',
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      role: 'admin',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User',
      isActive: true
    }
  },
  'candidate@example.com': {
    password: 'candidate123',
    user: {
      id: 'candidate-1',
      email: 'candidate@example.com',
      firstName: 'Candidate',
      lastName: 'User',
      role: 'candidate',
      avatar: 'https://ui-avatars.com/api/?name=Candidate+User',
      isActive: true
    }
  },
  'interviewer@example.com': {
    password: 'interviewer123',
    user: {
      id: 'interviewer-1',
      email: 'interviewer@example.com',
      firstName: 'Interviewer',
      lastName: 'User',
      role: 'interviewer',
      avatar: 'https://ui-avatars.com/api/?name=Interviewer+User',
      isActive: true
    }
  }
};

// Check if we're in demo mode
const isInDemoMode = () => {
  // Switchable via env; default to real API
  const flag = import.meta.env.VITE_DEMO_MODE;
  return String(flag).toLowerCase() === 'true';
};

export const login = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  if (isInDemoMode()) {
    return handleDemoLogin(credentials);
  }
  
  const response = await api.post('/auth/login', credentials);
  const data = response.data as any;
  // Backend returns {_id,name,email,role,token}; map to front User
  const [firstName, ...rest] = (data.name || '').split(' ');
  const lastName = rest.join(' ');
  const user: User = {
    id: data._id,
    email: data.email,
    firstName: firstName || data.name || '',
    lastName: lastName || '',
    role: data.role,
    isActive: true,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || data.email)}`,
    name: data.name,
  };
  return { token: data.token, user };
};

const handleDemoLogin = (credentials: LoginCredentials): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email, password } = credentials;
      const demoUser = DEMO_USERS[email];
      
      if (demoUser && demoUser.password === password) {
        const token = `demo-token-${Date.now()}`;
        resolve({ token, user: demoUser.user });
      } else {
        reject(new Error('Invalid email or password'));
      }
    }, 800); // Simulate network delay
  });
};

export const register = async (userData: RegisterData): Promise<AuthResponse> => {
  if (isInDemoMode()) {
    return handleDemoRegister(userData);
  }
  
  // Backend expects {name,email,password,role}
  const payload = {
    name: `${userData.firstName} ${userData.lastName}`.trim(),
    email: userData.email,
    password: userData.password,
    role: userData.role,
  };
  const response = await api.post('/auth/register', payload);
  const data = response.data as any;
  const [firstName, ...rest] = (data.name || '').split(' ');
  const lastName = rest.join(' ');
  const user: User = {
    id: data._id,
    email: data.email,
    firstName: firstName || data.name || '',
    lastName: lastName || '',
    role: data.role,
    isActive: true,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || data.email)}`,
    name: data.name,
  };
  return { token: data.token, user };
};

const handleDemoRegister = (userData: RegisterData): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if email is already used
      if (DEMO_USERS[userData.email]) {
        reject(new Error('User with this email already exists'));
        return;
      }
      
      // Create new demo user
      const newUser = {
        id: `user-${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        avatar: `https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}`,
        isActive: true
      };
      
      const token = `demo-token-${Date.now()}`;
      resolve({ token, user: newUser });
    }, 800); // Simulate network delay
  });
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const getCurrentUser = async (): Promise<User> => {
  if (isInDemoMode()) {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');
      const userInfo = localStorage.getItem('user');
      if (!userInfo) throw new Error('No user information found');
      return JSON.parse(userInfo);
    } catch (error) {
      throw new Error('Failed to get current user');
    }
  }
  const response = await api.get('/auth/me');
  const data = response.data as any;
  const [firstName, ...rest] = (data.name || '').split(' ');
  const lastName = rest.join(' ');
  const user: User = {
    id: data._id,
    email: data.email,
    firstName: firstName || data.name || '',
    lastName: lastName || '',
    role: data.role,
    isActive: true,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || data.email)}`,
    name: data.name,
  };
  return user;
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

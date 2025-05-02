import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState, UserType } from '../types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, userType: UserType) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('AuthProvider内でuseAuthを使用する必要があります');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });
  const navigate = useNavigate();

  // ユーザーが既にログインしているか確認
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setState({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } else {
          setState({
            ...state,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('認証チェックに失敗しました:', error);
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: '認証に失敗しました',
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      // 実際のアプリケーションではAPI呼び出しになります
      // デモ用のモックレスポンス
      const mockUser: User = {
        id: '123',
        email,
        name: email.split('@')[0],
        userType: email.includes('company') ? 'company' : 'student',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // 永続化のためにユーザーをlocalStorageに保存
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // ユーザータイプに基づいてリダイレクト
      if (mockUser.userType === 'student') {
        navigate('/学生/ダッシュボード');
      } else if (mockUser.userType === 'company') {
        navigate('/企業/ダッシュボード');
      }
    } catch (error) {
      console.error('ログインに失敗しました:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'メールアドレスまたはパスワードが正しくありません',
      });
    }
  };

  const register = async (email: string, password: string, name: string, userType: UserType) => {
    try {
      setState({ ...state, isLoading: true, error: null });
      
      // 実際のアプリケーションではAPI呼び出しになります
      // デモ用のモックレスポンス
      const mockUser: User = {
        id: '123',
        email,
        name,
        userType,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      // 永続化のためにユーザーをlocalStorageに保存
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      setState({
        user: mockUser,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });

      // ユーザータイプに基づいてリダイレクト
      if (userType === 'student') {
        navigate('/学生/プロフィール');
      } else if (userType === 'company') {
        navigate('/企業/プロフィール');
      }
    } catch (error) {
      console.error('登録に失敗しました:', error);
      setState({
        ...state,
        isLoading: false,
        error: '登録に失敗しました',
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
    navigate('/');
  };

  const updateUser = async (userData: Partial<User>) => {
    try {
      setState({ ...state, isLoading: true });
      
      // 実際のアプリケーションではAPI呼び出しになります
      const updatedUser = { ...state.user, ...userData, updatedAt: new Date().toISOString() } as User;
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setState({
        ...state,
        user: updatedUser,
        isLoading: false,
      });
    } catch (error) {
      console.error('ユーザー情報の更新に失敗しました:', error);
      setState({
        ...state,
        isLoading: false,
        error: 'ユーザー情報の更新に失敗しました',
      });
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
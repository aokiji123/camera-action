import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  fetchCurrentUser,
  isAuthenticated,
  logout as logoutService,
} from "../api/authService";

type User = {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuth: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    if (!isAuthenticated()) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const userData = await fetchCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    logoutService();
    setUser(null);
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const value = {
    user,
    isLoading,
    isAuth: !!user,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

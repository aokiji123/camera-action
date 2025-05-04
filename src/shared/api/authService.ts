const NETFLIX_TEST_API_BASE_URL = "https://netflix-api.test/api/v1";

// Types
type RegisterData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type LoginData = {
  email: string;
  password: string;
  remember?: boolean;
};

type User = {
  id: number;
  name: string;
  email: string;
  // Add other user properties as needed
};

type AuthResponse = {
  token: string;
  user?: User;
};

// Token management
const TOKEN_KEY = "auth_token";

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

// API functions
export const register = async (data: RegisterData): Promise<User> => {
  try {
    const response = await fetch(`${NETFLIX_TEST_API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Registration failed");
    }

    const result: AuthResponse = await response.json();

    if (result.token) {
      setToken(result.token);
    }

    return result.user as User;
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};

export const login = async (data: LoginData): Promise<User> => {
  try {
    const response = await fetch(`${NETFLIX_TEST_API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Login failed");
    }

    const result: AuthResponse = await response.json();

    if (result.token) {
      setToken(result.token);
    }

    return result.user as User;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const fetchCurrentUser = async (): Promise<User> => {
  try {
    const token = getToken();

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await fetch(`${NETFLIX_TEST_API_BASE_URL}/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        removeToken();
      }
      throw new Error("Failed to fetch user data");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch user error:", error);
    throw error;
  }
};

export const logout = (): void => {
  removeToken();
};

import { useState } from "react";
import { useData } from "../hooks/useData";
import { fetchRandomContacts } from "../services/api";
import { AuthContext } from "./AuthContextDef";

const MOCK_USERS = [
  { username: "admin", password: "123", role: "admin" },
  { username: "user", password: "123", role: "user" },
];

/**
 * AuthProvider Component
 * * Manages the global authentication state of the application.
 * Provides the user object, login, and logout functions to the context.
 * * @param {ReactNode} children - The child components that require access to the auth context.
 */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const { initContacts } = useData();

  /**
   * login Function
   * * Authenticates a user against the hardcoded MOCK_USERS list.
   * If successful, sets the user state and fetches initial contact data.
   * * @param {string} username - The username input.
   * @param {string} password - The password input.
   * @returns {Promise<Object>} Object containing success boolean and optional message.
   */
  const login = async (username, password) => {
    const foundUser = MOCK_USERS.find(
      (u) => u.username === username && u.password === password,
    );

    if (foundUser) {
      setUser(foundUser);
      // Fetch data on login
      const contacts = await fetchRandomContacts();
      initContacts(contacts);
      return { success: true };
    } else {
      return { success: false, message: "Invalid Credentials" };
    }
  };

  /**
   * logout Function
   * * Clears the authenticated user state and resets the contacts data.
   */
  const logout = () => {
    setUser(null);
    initContacts([]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  signIn(email: string, password: string): Promise<void>;
  isLogging: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLogging, setIsLogging] = useState(false);

  async function signIn(email: string, password: string) {
    try {
      setIsLogging(true);

      if (!email || !password) {
        return Alert.alert("Login", "O e-mail e senha é obrigatório!");
      }

      const response = await auth().signInWithEmailAndPassword(email, password);
      console.log(response);
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        return Alert.alert("Login", "O e-mail e/ou senha é inválido!");
      } else {
        return Alert.alert(
          "Login",
          "Não foi possível fazer o login, tente novamente"
        );
      }
    } finally {
      setIsLogging(false);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isLogging }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider };

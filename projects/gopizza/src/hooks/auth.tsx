import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

type User = {
  id: string;
  name: string;
  isAdmin: boolean;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  signIn(email: string, password: string): Promise<void>;
  isLogging: boolean;
  user: User | null;
}

const AuthContext = createContext({} as AuthContextProps);

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLogging, setIsLogging] = useState(false);

  async function signIn(email: string, password: string) {
    try {
      setIsLogging(true);

      if (!email || !password) {
        return Alert.alert("Login", "O e-mail e senha é obrigatório!");
      }

      const account = await auth().signInWithEmailAndPassword(email, password);
      const profile = await firestore()
        .collection("users")
        .doc(account.user.uid)
        .get();

      const { name, isAdmin } = profile.data();

      if (profile.exists) {
        setUser({ id: account.user.uid, name, isAdmin });
      }
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
    <AuthContext.Provider value={{ signIn, isLogging, user }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider };

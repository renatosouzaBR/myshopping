import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  signOut(): Promise<void>;
  forgotPassword(email: string): Promise<void>;
  isLogging: boolean;
  user: User | null;
}

const AuthContext = createContext({} as AuthContextProps);

const USER_COLLECTION = "@gopizza:users";

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
        const userData = { id: account.user.uid, name, isAdmin };
        await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData));
        setUser(userData);
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

  async function loadStoragedUserData() {
    try {
      setIsLogging(true);

      const storedUser = await AsyncStorage.getItem(USER_COLLECTION);
      if (storedUser) {
        const userData = JSON.parse(storedUser) as User;
        setUser(userData);
        console.log(storedUser);
      }
    } finally {
      setIsLogging(false);
    }
  }

  async function signOut() {
    await auth().signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    try {
      if (!email) {
        return Alert.alert("Redefinir senha", "Informe o e-mail.");
      }

      await auth().sendPasswordResetEmail(email);

      Alert.alert(
        "Redefinir senha",
        "Enviamos um link no seu e-mail para redefinir a senha"
      );
    } catch (error) {
      Alert.alert(
        "Redefinir senha",
        "Não foi possível redefinir a senha, tente novamente"
      );
    }
  }

  useEffect(() => {
    loadStoragedUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, forgotPassword, isLogging, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { useAuth, AuthProvider };

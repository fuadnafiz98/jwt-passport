import React, { useState, createContext } from "react";
const AuthContext = createContext<AuthContextType | undefined>(undefined);
const { Provider } = AuthContext;

type UserType = {
  _id?: string | undefined;
  name?: string;
  role?: string;
  email?: string;
};

type AuthContextType = {
  authState: { token: string; userInfo: UserType };
  isAuthenticated: () => boolean;
  logout: () => void;
  setAuthState: (authInfo: { token: string; userInfo: UserType }) => void;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  //TODO: put this in useEffect
  const userInfo = localStorage.getItem("userInfo");

  const [authState, setAuthState] = useState({
    token: "",
    userInfo: userInfo ? JSON.parse(userInfo) : null,
  });

  const setAuthInfo = ({
    token,
    userInfo,
  }: {
    token: string;
    userInfo: UserType;
  }) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("isAuthenticated", "true");
    setAuthState({
      token,
      userInfo,
    });
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userInfo");
    setAuthState({
      token: "",
      userInfo: null,
    });
  };

  const isAuthenticated = () => {
    console.log(authState.userInfo);
    if (!authState.userInfo) return false;
    return true;
  };

  return (
    <Provider
      value={{
        authState,
        isAuthenticated,
        logout,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

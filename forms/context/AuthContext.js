import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";


export const AuthContext = createContext({
  token: null,
  setToken: (token) => {},
});


// 2) Create the provider
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Check if a token exists in SecureStore when the app starts
  useEffect(() => {
    (async () => {
      const savedToken = await SecureStore.getItemAsync("token");
      if (savedToken) {
        setToken(savedToken);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

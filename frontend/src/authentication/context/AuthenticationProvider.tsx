import {createContext, ReactNode, useState} from "react";
import {AuthenticationDto} from "../dto/AuthenticationDto.ts";
import {IAuthenticationContext} from "./IAuthenticationContext.ts";

interface AuthenticationProviderProps {
  children: ReactNode;
}

export const AuthenticationContext = createContext<IAuthenticationContext>({
  authenticate: () => {
  },
  logout: () => {
  },
  getUsername: () => undefined,
  getEmail: () => undefined,
  getRole: () => undefined,
  getBearerToken: () => undefined
});

export function AuthenticationProvider({children}: AuthenticationProviderProps) {
  const [authentication, setAuthentication] = useState<AuthenticationDto>({});

  const authenticate = (authentication: AuthenticationDto) => {
    if (!authentication.bearerToken || !authentication.user
      || !authentication.user.email?.length
      || !authentication.user.username?.length
      || !authentication.user.role) {
      throw new Error("The received authentication is invalid");
    }
    setAuthentication(authentication);
  };

  const logout = () => {
    setAuthentication({});
  };

  const getUsername = () => {
    return authentication.user?.username;
  };

  const getEmail = () => {
    return authentication.user?.email;
  };

  const getRole = () => {
    return authentication.user?.role;
  };

  const getBearerToken = () => {
    return authentication.bearerToken;
  };

  return (
    <AuthenticationContext.Provider
      value={{
        authenticate,
        logout,
        getUsername,
        getEmail,
        getRole,
        getBearerToken
      }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

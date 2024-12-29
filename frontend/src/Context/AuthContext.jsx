import React, { createContext, useContext, useEffect, useState } from 'react';
import { ClerkProvider, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const { user, isSignedIn, isLoaded, signOut } = useAuth();
  const [authStatus, setAuthStatus] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/login'); // Redirect to login if not signed in
    }
  }, [isLoaded, isSignedIn, navigate]);

  useEffect(() => {
    if (isSignedIn) {
      setAuthStatus(user);
    }
  }, [isSignedIn, user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login'); // Redirect to login after signing out
  };

  return (
    <AuthContext.Provider value={{ authStatus, handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

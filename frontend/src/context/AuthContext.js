import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('tm_user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user && user.token) {
      localStorage.setItem('tm_user', JSON.stringify(user));
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      localStorage.removeItem('tm_user');
      delete api.defaults.headers.common['Authorization'];
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

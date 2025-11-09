import React, { useState, createContext, useEffect } from 'react';

export const Authcontext = createContext();

const Authprovider = ({ children }) => {
  const [user, setuser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });


  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <Authcontext.Provider value={{ user, setuser }}>
      {children}
    </Authcontext.Provider>
  );
};

export default Authprovider;

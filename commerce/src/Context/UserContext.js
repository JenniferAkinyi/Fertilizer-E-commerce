import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
          if (userDoc.exists()) {
            setUser({ uid: currentUser.uid, ...userDoc.data() });
          } else {
            console.error('User document does not exist');
            setUser(null);
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const login = (userInfo) => {
    setUser(userInfo);
  };

  const clearProfile = () => {
    setUser(null);
  };

  const logout = () => {
    auth.signOut().then(() => {
      setUser(null);
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <UserContext.Provider value={{ user, login, logout, clearProfile }}>
      {children}
    </UserContext.Provider>
  );
};

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, hasFirebaseConfig } from "../firebase";

const AuthContext = createContext(null);

const defaultProfile = {
  role: "Operator",
  name: "Operator",
  assignedMachines: [],
  assignedTools: []
};

const demoUser = {
  uid: "demo-admin",
  email: "demo@avishkar.local"
};

const demoProfile = {
  role: "Admin",
  name: "Demo Admin",
  assignedMachines: [],
  assignedTools: []
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(defaultProfile);
  const [authLoading, setAuthLoading] = useState(true);
  const authResolvedRef = useRef(false);
  const localSessionRef = useRef(false);

  useEffect(() => {
    if (!hasFirebaseConfig) {
      setAuthLoading(false);
      return undefined;
    }

    const fallbackTimer = setTimeout(() => {
      if (authResolvedRef.current) return;
      authResolvedRef.current = true;
      localSessionRef.current = true;
      setUser(demoUser);
      setProfile(defaultProfile);
      setAuthLoading(false);
    }, 1200);

    const unsubscribe = onAuthStateChanged(auth, async (nextUser) => {
      authResolvedRef.current = true;
      clearTimeout(fallbackTimer);

      if (!nextUser && localSessionRef.current) {
        setAuthLoading(false);
        return;
      }

      localSessionRef.current = false;
      setUser(nextUser);

      if (!nextUser) {
        setProfile(defaultProfile);
        setAuthLoading(false);
        return;
      }

      setProfile({
        ...defaultProfile,
        name: nextUser.email?.split("@")[0] || "Operator"
      });
      setAuthLoading(false);

      try {
        const profileSnap = await getDoc(doc(db, "users", nextUser.uid));
        if (profileSnap.exists()) {
          setProfile({ ...defaultProfile, ...profileSnap.data() });
        } else {
          setProfile({
            ...defaultProfile,
            name: nextUser.email?.split("@")[0] || "Operator"
          });
        }
      } catch {
        setProfile({
          ...defaultProfile,
          name: nextUser.email?.split("@")[0] || "Operator"
        });
      } finally {
        setAuthLoading(false);
      }
    });

    return () => {
      clearTimeout(fallbackTimer);
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      profile,
      authLoading,
      isAdmin: profile.role === "Admin",
      demoLogin: () => {
        localSessionRef.current = true;
        setUser(demoUser);
        setProfile(demoProfile);
      },
      logout: () => {
        if (localSessionRef.current || !auth) {
          localSessionRef.current = false;
          setUser(null);
          setProfile(defaultProfile);
          return Promise.resolve();
        }
        setUser(null);
        setProfile(defaultProfile);
        return signOut(auth);
      }
    }),
    [authLoading, profile, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

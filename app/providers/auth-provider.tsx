'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';

interface Auth {
  user: User | null;
  session: Session | null;
  isLoadingUser: boolean;
}

const AuthContext = createContext<Auth | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [user, setUser] = useState<User | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const supabase = createClient();
    const getUser = async (): Promise<void> => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.log('error in getSession inside context');
      }
      if (data && data.session) {
        setUser(data.session.user);
      }
      setIsLoadingUser(false);
      // console.log('below is the getUser() data');
      // console.log(data.user);
    };

    void getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('inside onAuthStateChange');
      console.log(event);
      console.log(session);
      if (event === 'SIGNED_OUT') {
        setSession(null);
        setUser(null);
      } else if (session) {
        setUser(session?.user ?? null);
        setSession(session);
      }
      // console.log('below is teh session info');
      // console.log(session);
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, session, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): Auth | null => useContext(AuthContext);

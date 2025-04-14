'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface Auth {
  user: User | null;
  isLoadingUser: boolean;
}

const AuthContext = createContext<Auth | null>(null);

export default function AuthProvider({
  children,
  initialSession,
}: {
  children: React.ReactNode;
  initialSession: User | null;
}): React.ReactNode {
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [user, setUser] = useState<User | null>(initialSession);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();
    const getUser = async (): Promise<void> => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        router.push(
          `/error?message=${encodeURIComponent('There was an error trying to retrieve your session. Please try again.')}`
        );
      }
      if (data) setUser(data.session?.user ?? null);
      setIsLoadingUser(false);
    };

    if (!initialSession) void getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setUser(session.user);
    });

    return (): void => {
      subscription.unsubscribe();
    };
  }, [initialSession]);

  return (
    <AuthContext.Provider value={{ user, isLoadingUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): Auth | null => useContext(AuthContext);

"use client"
import { createClient } from "@/utils/supabase/client";
import { createContext, useContext, useEffect, useState } from "react";


export const AuthContext = createContext({});

export function useUserContext() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: any }) => {
    const [userConnected, setUserConnected] = useState(null);
    const [loading, setLoading] = useState(false);

    const supabase = createClient();

    useEffect(() => {
        console.log('begin in useefectt')
        setLoading(true)
        const getSession = async () => {
            const { data, error } = await supabase.auth.getSession()
            setUserConnected(data?.session?.user as any);
        }
        getSession();
        setLoading(false)
        console.log('end in useefectt')
    }, [])

    supabase.auth.onAuthStateChange((event, session: any) => {
        if (event == "SIGNED_IN") {
            setUserConnected(session.user);
        }
        if (event == "SIGNED_OUT") {
            setUserConnected(null);
        }
    });

    return <AuthContext.Provider value={{ userConnected, setUserConnected, loading }}>{children}</AuthContext.Provider>;
};
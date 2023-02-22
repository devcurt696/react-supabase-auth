import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const passwordReset = (email) => {
    supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "http://localhost:5173/update-password"
    });
};

const updatePassword = (updatedPassword) => supabase.auth.updateUser({ password: updatedPassword });

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            const { user: currentUser } = data;
            setUser(currentUser ?? null);
            setLoading(false);
        };
        getUser();
    }, []);

    useEffect(() => {
        const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === "SIGNED_IN") {
                setUser(session.user);
                setAuth(true);
            } else if (event === "SIGNED_OUT") {
                setUser(null);
                setAuth(false);
            } else if (event === "PASSWORD_RECOVERY") {
                setAuth(false);
            }
        });
        return () => {
            data.subscription.unsubscribe();
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, user, login, signOut, passwordReset, updatePassword }}>{!loading && children}</AuthContext.Provider>
    );
};

export default AuthProvider;
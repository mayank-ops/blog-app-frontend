import React, { useState, useEffect } from "react";
import { auth, provider } from "../Firebase";
export const AuthContext = React.createContext();

export function AuthProvider({ children })
{
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    function login()
    {
        return auth.signInWithPopup(provider);
    }

    function logout()
    {
        return auth.signOut();
    }

    useEffect(() =>
    {
        const res = auth.onAuthStateChanged((user) =>
        {
            setUser(user);
            setLoading(false);
        })
        return () =>
        {
            res();
        }
    }, [])

    const store = {
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={store}>
            {
                !loading && children
            }
        </AuthContext.Provider>
    )
}
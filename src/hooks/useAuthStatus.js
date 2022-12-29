
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export function useAuthStatus() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const { setAuthUser } = useAuth();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setLoggedIn(true);
            setAuthUser(user);
            setCheckingStatus(false);
        });
    }, []);

    return {
        loggedIn, checkingStatus
    }
}
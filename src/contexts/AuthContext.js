import { createContext, useContext, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db, provider } from '../utils/firebase';
import { doc, serverTimestamp, setDoc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const initialContext = {
    currentUser: null,
    error: null,
    loading: false,
    signIn: (email, password) => { },
    logIn: (email, password, name) => { },
    logOut: () => { },
    resetPassword: (email) => { },
    signInWithGoogle: () => { },
    setAuthUser: (user) => { }
}

const AuthContext = createContext(initialContext);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isError, setIsError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const value = {
        currentUser,
        error: isError,
        isLoading: isLoading,
        signIn,
        logIn,
        logOut,
        resetPassword,
        signInWithGoogle,
        setAuthUser
    };

    function setAuthUser(user) {
        setCurrentUser(user);
    }

    async function signInWithGoogle() {

        setIsLoading(true);

        try {
            const result = await signInWithPopup(auth, provider);
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;
            const referenceToDatabase = doc(db, 'users', user.uid);
            const isUserInDatabase = await getDoc(referenceToDatabase);

            if (isUserInDatabase.exists() && location.pathname === '/login') {
                console.log('have acc');
                toast.warning('It looks like you already have an account');
                return navigate('/signin');
            }

            if (!isUserInDatabase.exists() && location.pathname === '/login') {
                console.log('reg acc');
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                });

                setCurrentUser(user);
                setIsLoading(false);
                return navigate('/');
            }

            if (!isUserInDatabase.exists() && location.pathname === '/signin') {
                console.log('need acc');
                toast.warning('It looks like you need to register first');
                return navigate('/login');
            }

            if (isUserInDatabase.exists()) {
                setCurrentUser(user);
                console.log('continue');
                return navigate('/');
            }

            setIsError('');
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            toast.error('An error occurred when trying to sing in with Google');
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        }
    }

    async function logIn(email, password, name) {
        setIsLoading(true);

        try {
            if (!name || !email || !password) {
                setIsError(true);
                setIsLoading(false);
                return toast.error('Please fill all the required fields');
            }

            const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, {
                displayName: name
            });
            const user = userCredentials.user;

            if (!user) throw new Error('Something went wrong on the server side');
            console.log(name);
            await setDoc(doc(db, 'users', user.uid), {
                email: email,
                name: name,
                timestamp: serverTimestamp()
            });

            setIsError(null);
            setIsLoading(false);
            navigate('/signin');
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            toast.error('Fill all the required fields or email already in use');
        }
    }

    async function signIn(email, password) {
        setIsLoading(true);

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            if (!userCredentials.user) {
                toast.error('Register first');
                return navigate('/');
            }

            navigate('/');
            setCurrentUser(userCredentials.user);
            setIsError(null);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);
            toast.error('Check your credentials');
        }
    }

    async function logOut() {
        signOut(auth).then(() => {
            setCurrentUser(null);
            return navigate('/signin');
        }).catch(console.error);
    }

    async function resetPassword(email) {
        setIsLoading(true);

        try {
            await sendPasswordResetEmail(auth, email);
            logOut();
            toast.success('Request was sent. Check your email');

            setIsError(null);
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setIsLoading(false);

            toast.error('Your email address was not found');
            navigate('/login');
        }
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
import { createContext, useContext, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateEmail, updatePassword } from "firebase/auth";


const initialContext = {
    currentUser: null,
    id: null,
    token: null,
    name: null,
    email: null,
    signUp: () => { },
    logIn: () => { },
    logOut: () => { },
    resetPassword: () => { },
    updateUserEmail: () => { },
    updateUserPassword: () => { },
}

const AuthContext = createContext(initialContext);

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    const value = {
        currentUser,
        signUp,
        logIn,
        logOut,
        resetPassword,
        updateUserEmail,
        updateUserPassword
    };

    function signUp(email, password) {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                setCurrentUser(user);
            })
            .catch(console.error);
    }

    function logIn(email, password) {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(({ user }) => {
                console.log(user);
                setCurrentUser(user);
            })
            .catch(() => alert('Invalid user!'))
    }

    function logOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            setCurrentUser(null);
        }).catch(console.error);
    }

    function resetPassword(email) {
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorCode, errorMessage);
            });
    }

    function updateUserEmail(email) {
        const auth = getAuth();
        updateEmail(auth.currentUser, email).then((data) => {
            console.log(data);
        }).catch((error) => {
            // An error occurred
            // ...
        });

    }

    function updateUserPassword(password) {
        const auth = getAuth();

        updatePassword(auth.currentUser, password).then(() => {
            // Update successful.
        }).catch((error) => {
            // An error ocurred
            // ...
        });
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
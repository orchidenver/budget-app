import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, provider, db } from '../utils/firebase';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GoogleAuth() {
    const location = useLocation();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function onSignInWithGoogle(e) {
        e.preventDefault();

        setIsLoading(true);
        console.log(location);
        try {
            const result = await signInWithPopup(auth, provider);
            // const credential = GoogleAuthProvider.credentialFromResult(result);
            // const token = credential.accessToken;
            const user = result.user;
            const referenceToDatabase = doc(db, 'users', user.uid);
            const isUserInDatabase = await getDoc(referenceToDatabase);

            if (isUserInDatabase.exists()) {
                navigate('/');
            }

            if (!isUserInDatabase.exists() && location.pathname === '/login') {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                });
                navigate('/');
            }

            if (!isUserInDatabase.exists()) toast.warning('It looks like you need to register first');

            setError('');
            setIsLoading(false);
        } catch (error) {
            setError(true);
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

    return (
        <Button className='w-100 mt-4' type='submit' disabled={isLoading}
            onClick={onSignInWithGoogle}>Continue with Google</Button>
    )
}

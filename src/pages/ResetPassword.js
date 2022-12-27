import { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
// import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider, db } from '../utils/firebase';
import { signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth";
import { doc, serverTimestamp, setDoc, docRef, getDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuth from '../components/GoogleAuth';

export default function ResetPassword() {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    // const { logIn, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmitHandler(e) {
        e.preventDefault();

        try {
            const reset = await sendPasswordResetEmail(auth, emailRef.current.value);
            toast.success('Request was sent. Check your email');
            navigate('/signin');
        } catch (error) {
            toast.error('Your email address was not found');
            navigate('/login');
        }
    }

    async function onSignInWithGoogle(e) {
        e.preventDefault();

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

            if (!isUserInDatabase.exists()) toast.warning('It looks like you need to register first');
        } catch (error) {
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
        <div className='min-vh-100 min-vw-100 d-flex justify-content-center align-items-center flex-column'>
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Reset password</h2>
                    {error && <Alert variant='danger'>{'Please fill all the required fields'}</Alert>}
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Button className='w-100 mt-4' type='submit' disabled={isLoading}>Reset</Button>
                        <GoogleAuth />
                    </Form>
                </Card.Body>
            </Card>
            <div className="w100 text-center mt-2">Have you recalled your password? <Link to='/signin'>Sign In</Link></div>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    )
}

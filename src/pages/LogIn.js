import { useRef, useState } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
// import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../utils/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuth from '../components/GoogleAuth';

export default function LogIn() {
    const navigate = useNavigate();
    const emailRef = useRef();
    const passwordRef = useRef();
    const nameRef = useRef();
    // const { logIn, currentUser } = useAuth();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmitHandler(e) {
        e.preventDefault();

        setIsLoading(true);
        try {
            if (!nameRef.current.value) {
                setError(true);
                setIsLoading(false);
                return toast.error('Please fill all the required fields');
            }

            const userCredentials = await createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
            updateProfile(auth.currentUser, {
                displayName: nameRef.current.value
            });
            const user = userCredentials.user;

            await setDoc(doc(db, 'users', user.uid), {
                email: emailRef.current.value,
                name: nameRef.current.value,
                timestamp: serverTimestamp()
            });

            setError('');
            setIsLoading(false);
            navigate('/');
        } catch (error) {
            setError(true);
            setIsLoading(false);
            toast.error('Please fill all the required fields');
        }
    }

    return (
        <div className='min-vh-100 min-vw-100 d-flex justify-content-center align-items-center flex-column'>
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Log In</h2>
                    {error && <Alert variant='danger'>{'Please fill all the required fields'}</Alert>}
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group id='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control type='text' ref={nameRef} required />
                        </Form.Group>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Button className='w-100 mt-4' type='submit' disabled={isLoading}>Log In</Button>
                        <GoogleAuth />
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/reset-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w100 text-center mt-2">Already have an account? <Link to='/signin'>Sign In</Link></div>
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

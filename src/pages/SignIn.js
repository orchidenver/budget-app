import { useRef } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleAuth from '../components/GoogleAuth';
import { useAuth } from '../contexts/AuthContext';


export default function SignIn() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { signIn, error, isLoading } = useAuth();

    function onSubmitHandler(e) {
        e.preventDefault();

        signIn(emailRef.current.value, passwordRef.current.value);
    }

    return (
        <div className='max-vh-100 min-vw-95 d-flex justify-content-center align-items-center flex-column mt-5'>
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign In</h2>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Button className='w-100 mt-4' type='submit' disabled={isLoading}>Sign In</Button>
                        <GoogleAuth />
                    </Form>
                    <div className="w-100 text-center mt-3">
                        <Link to="/reset-password">Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className="w100 text-center mt-2">Don't have an account? <Link to='/login'>Register</Link></div>
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
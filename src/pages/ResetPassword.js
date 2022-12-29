import { useRef } from 'react';
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';

export default function ResetPassword() {
    const emailRef = useRef();
    const { resetPassword, error, isLoading, currentUser } = useAuth();

    function onSubmitHandler(e) {
        e.preventDefault();

        resetPassword(emailRef.current.value);
    }

    return (
        <div className='max-vh-100 min-vw-95 d-flex justify-content-center align-items-center flex-column mt-5'>
            <Card style={{ width: '20rem' }}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Reset password</h2>
                    <Form onSubmit={onSubmitHandler}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' defaultValue={currentUser?.email} ref={emailRef} required />
                        </Form.Group>
                        <Button className='w-100 mt-4' type='submit' disabled={isLoading}>Reset</Button>
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

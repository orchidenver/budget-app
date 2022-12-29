import { Button } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../contexts/AuthContext';

export default function GoogleAuth() {
    const { signInWithGoogle, error, isLoading } = useAuth();

    function onSignInWithGoogle(e) {
        e.preventDefault();

        signInWithGoogle();
    }

    return (
        <Button className='w-100 mt-4' type='submit' disabled={isLoading}
            onClick={onSignInWithGoogle}>Continue with Google</Button>
    )
}
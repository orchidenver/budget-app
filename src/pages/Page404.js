import svg from '../assets/page404.svg';

export default function Page404() {
    return (
        <div className='min-vh-100 min-vw-100 d-flex justify-content-center align-items-center'>
            <img className='img-fluid w-25' src={svg} alt='page not found' />
        </div>
    )
}

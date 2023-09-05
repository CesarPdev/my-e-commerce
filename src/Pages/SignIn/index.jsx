import { useContext, useState, useRef } from "react";
import { Link, Navigate } from "react-router-dom";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from '../../Context';

function SigIn() {

    const context = useContext(ShoppingCartContext);
    const [view, setView] = useState('user-info');
    const form = useRef(null);

    // Account
    const accountInLocalStorage = localStorage.getItem('account');
    const parsedAccount = JSON.parse(accountInLocalStorage);

    // Has an Account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAnAccount = !noAccountInLocalState || !noAccountInLocalStorage;

    const handleSignIn = () => {
        const stringifiedSignOut = JSON.stringify(false);
        localStorage.setItem('sign-out', stringifiedSignOut);
        context.setSignOut(false);
        return <Navigate replace to={'/'} />
    };

    // Create an Account
    const createAnAccount = () => {
        const formData = new FormData(form.current);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        const stringifiedAccount = JSON.stringify(data);
        localStorage.setItem("account",stringifiedAccount);
        context.setAccount(data);
        handleSignIn();
    };


    const renderLogin = () => {
        return (
            <div className='flex flex-col w-80'>
                <p className="mb-1">
                    <span className='font-light text-sm'>{context.lang === 'en' ? 'User Name' : 'Nombre'}: </span>
                    <span>{parsedAccount?.name}</span>
                </p>
                <p className="mb-4">
                    <span className='font-light text-sm'>Email: </span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <Link
                    to="/">
                    <button
                        className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3'
                        onClick={() => handleSignIn()}
                        disabled={!hasUserAnAccount}>
                        {context.lang === 'en' ? 'Log In' : 'Ingresar'}
                    </button>
                </Link>
                <div className='text-center mt-4'>
                    <a className='font-light text-xs underline underline-offset-4 cursor-pointer'>
                    {context.lang === 'en' ? 'Forgot my password' : 'Olvidé mi contraseña'}
                    </a>
                </div>
                <button
                className='border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3'
                onClick={() => setView('create-user')}
                disabled={hasUserAnAccount}>
                {context.lang === 'en' ? 'Sign Up' : 'Crear cuenta'}
                </button>
            </div>
        )
    };

    const renderCreateUserInfo = () => {
        return (
            <form ref={form} className="flex flex-col gap-4 w-80">
                <div className="flex flex-col gap-1">
                    <label htmlFor="name" className="font-light text-sm">{context.lang === 'en' ? 'Name' : 'Nombre'}:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={parsedAccount?.name}
                        placeholder="Name"
                        className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="font-light text-sm">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        defaultValue={parsedAccount?.email}
                        placeholder="mail@mail.com"
                        className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="font-light text-sm">{context.lang === 'en' ? 'Password' : 'Contraseña'}:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        defaultValue={parsedAccount?.password}
                        placeholder="******"
                        className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
                    />
                </div>
                <Link to="/">
                    <button
                        className="bg-black text-white w-full rounded-lg py-3"
                        onClick={() => createAnAccount()}
                    >
                        {context.lang === 'en' ? 'Create an account' : 'Crear cuenta'}
                    </button>
                </Link>
            </form>
        )
    };

    const renderView = () => view === 'create-user' ? renderCreateUserInfo() : renderLogin();

    return (
        <Layout>
            <h1 className='font-medium text-xl text-center m-6 w-80'>
            {context.lang === 'en' ? 'Welcome' : 'Bienvenido'}
            </h1>
            {renderView()}
        </Layout>
    )
}

export default SigIn
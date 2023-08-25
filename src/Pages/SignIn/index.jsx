import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from '../../Context';

function SigIn() {

    const context = useContext(ShoppingCartContext);
    const [view, setView] = useState('user-info');

    // Account
    const accountInLocalStorage = localStorage.getItem('account');
    const parsedAccount = JSON.parse(accountInLocalStorage);

    // Has an Account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true;
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true;
    const hasUserAnAccount = !noAccountInLocalState || !noAccountInLocalStorage;

    const renderLogin = () => {
        return (
            <div className='flex flex-col w-80'>
                <p>
                <span className='font-light text-sm'>Email: </span>
                <span>{parsedAccount?.email}</span>
                </p>
                <p className="mb-4">
                <span className='font-light text-sm'>Password: </span>
                <span>{parsedAccount?.password}</span>
                </p>
                <Link
                    to="/">
                    <button
                        className='bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3'
                        disabled={!hasUserAnAccount}>
                        Log In
                    </button>
                </Link>
                <div className='text-center mt-4'>
                    <a className='font-light text-xs underline underline-offset-4 cursor-pointer'>
                        Forgot my Password
                    </a>
                </div>
                <button
                className='border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3'
                onClick={() => setView('create-user')}
                disabled={hasUserAnAccount}>
                Sign Up
                </button>
            </div>
        )
    }

    const renderCreateUserInfo = () => {
        //TODO: create render view
    }

    const renderView = () => view === 'create-user' ? renderCreateUserInfo() : renderLogin();

    return (
        <Layout>
            <h1 className='font-medium text-xl text-center mb-6 w-80'>
                Welcome
            </h1>
            {renderView()}
        </Layout>
    )
}

export default SigIn
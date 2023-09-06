import { useContext, useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';

function MyAccount() {
    const context = useContext(ShoppingCartContext);
    const [view, setView] = useState('user-info');
    const account = localStorage.getItem('account');
    const parsedAccount = JSON.parse(account);
    const form = useRef(null);

    const editAccount = () => {
        const formData = new FormData(form.current);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        // Update account
        const stringifiedAccount = JSON.stringify(data);
        localStorage.setItem('account', stringifiedAccount);
        context.setAccount(data);
    };

    const deleteAccount = () => {
        localStorage.removeItem('account');
        context.setAccount({});
        context.setOrder([]);
    }

    const renderUserInfo = () => {
        return (
            <div className='flex flex-col w-80'>
                <p>
                    <span className='font-light text-sm'>{context.lang === 'en' ? 'Name' : 'Nombre'}: </span>
                    <span>{parsedAccount?.name}</span>
                </p>
                <p>
                    <span className='font-light text-sm'>Email: </span>
                    <span>{parsedAccount?.email}</span>
                </p>
                <button
                    className='border border-black rounded-lg mt-6 py-3'
                    disabled={!account}
                    onClick={() => setView('edit-user-info')}
                >
                    {context.lang === 'en' ? 'Edit account' : 'Editar cuenta'}
                </button>
                <button
                    className='border border-black rounded-lg mt-6 py-3'
                    disabled={!account}
                    onClick={() => deleteAccount('account')}
                >
                    <NavLink to='/sign-in'>
                    {context.lang === 'en' ? 'Delete account' : 'Eliminar cuenta'}
                    </NavLink>
                </button>
            </div>
        )
    };

    const renderEditUserInfo = () => {
        return (
        <form ref={form} className='flex flex-col gap-4 w-80'>
            <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='font-light text-sm'>{context.lang === 'en' ? 'Your name' : 'Tu nombre'}:</label>
            <input
                type="text"
                id="name"
                name="name"
                defaultValue={parsedAccount.name}
                placeholder="Peter"
                className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
            </div>
            <div className='flex flex-col gap-1'>
            <label htmlFor="email" className='font-light text-sm'>{context.lang === 'en' ? 'Your ' : 'Tu '}email:</label>
            <input
                type="text"
                id="email"
                name="email"
                defaultValue={parsedAccount.email}
                placeholder="email@mail.com"
                className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
            </div>
            <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='font-light text-sm'>{context.lang === 'en' ? 'Your password' : 'Tu contraseña'}:</label>
            <input
                type="text"
                id="password"
                name="password"
                defaultValue={parsedAccount.password}
                placeholder="******"
                className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4'
            />
            </div>
                <button
                className='bg-black text-white w-full rounded-lg py-3'
                onClick={() => {setView('user-info'), editAccount()}}>
                {context.lang === 'en' ? 'Edit' : 'Editar'}
                </button>
        </form>
        )
    };

    const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

    return (
        <Layout>
            <h1 className="font-medium text-xl text-center m-6 w-80">{context.lang === 'en' ? 'My account' : 'Mi cuenta'}</h1>
            {renderView()}
        </Layout>
    )
};
export default MyAccount;
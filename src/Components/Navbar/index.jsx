import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { ShoppingBagIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'

const Navbar = () => {
    const context = useContext(ShoppingCartContext)
    const activeStyle = 'underline underline-offset-4'

    const openCheckoutMenu = () => {
        context.openCheckoutSideMenu()
    };

    // Sign Out
    const signOut = localStorage.getItem('sign-out')
    const parsedSignOut = JSON.parse(signOut)
    const isUserSignOut = context.signOut || parsedSignOut
    // Account
    const account = localStorage.getItem('account')
    const parsedAccount = JSON.parse(account)
    // Has an account
    const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
    const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true)
        localStorage.setItem('sign-out', stringifiedSignOut)
        context.setSignOut(true)
}

const renderView = () => {
    if (hasUserAnAccount && !isUserSignOut) {
        return (
            <ul className='flex flex-row gap-3'>
                <li className='text-black/60'>
                {parsedAccount?.email}
                </li>
                <li>
                    <NavLink
                    to='/my-orders'
                    className={({ isActive }) => isActive ? activeStyle : undefined}>
                    {context.lang === 'en' ? 'My Orders' : 'Mis Compras'}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/my-account'
                    className={({ isActive }) => isActive ? activeStyle : undefined}>
                    {context.lang === 'en' ? 'My Account' : 'Mi Cuenta'}
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to='/sign-in'
                    className={({ isActive }) => isActive ? activeStyle : undefined}
                    onClick={() => handleSignOut()}>
                    {context.lang === 'en' ? 'Sign out' : 'Salir'}
                    </NavLink>
                </li>
            </ul>
        )
    } else {
        return (
            <li>
                <NavLink
                    to="/sign-in"
                    className={({ isActive }) => isActive ? activeStyle : undefined }
                    onClick={() => handleSignOut()}>
                    Sign in
                </NavLink>
            </li>
        )
    }
}

    return (
        <nav className='bg-white flex justify-between items-center fixed z-10 top-0 w-full py-5 px-8 text-sm font-light'>
            <ul className='flex items-center gap-3'>
                <li className='font-semibold text-lg'>
                <NavLink to={`${isUserSignOut ? '/sign-in' : '/'}`}>
                    Shopi
                </NavLink>
                </li>
                <li>
                <NavLink
                    to='/'
                    onClick={() => context.setSearchByCategory()}
                    className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                    {context.lang === 'en' ? 'All' : 'Todo'}
                </NavLink>
                </li>
                <li>
                <NavLink
                    to='/clothes'
                    onClick={() => context.setSearchByCategory('clothing')}
                    className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                    {context.lang === 'en' ? 'Clothes' : 'Indumentaria'}
                </NavLink>
                </li>
                <li>
                <NavLink
                    to='/electronics'
                    onClick={() => context.setSearchByCategory('electronics')}
                    className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                    {context.lang === 'en' ? 'Electronics' : 'Electrónica'}
                </NavLink>
                </li>
                <li>
                <NavLink
                    to='/jewelery'
                    onClick={() => context.setSearchByCategory('jewelery')}
                    className={({ isActive }) =>
                    isActive ? activeStyle : undefined
                    }>
                    {context.lang === 'en' ? 'Jewelery' : 'Joyería'}
                </NavLink>
                </li>
            </ul>
            <ul className='flex items-center gap-3'>
                {renderView()}
                <li>
                    <select
                        className='rounded-lg'
                        id='lang'
                        value={context.lang}
                        onChange={(e) => context.setLang(e.target.value)}
                    >
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </li>
                <li
                    className='flex items-center cursor-pointer'
                    onClick={() => openCheckoutMenu()}>
                    <ShoppingBagIcon className='h-6 w-6 text-black' />
                    <div>{context.cartProducts.length}</div>
                </li>
            </ul>
        </nav>
    )
};

export default Navbar;
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

function Navbar() {
    const context = useContext(ShoppingCartContext)
    const activeStyle = 'underline underline-offset-4'

    const openCheckoutMenu = () => {
        context.openCheckoutSideMenu()
    }

    const handleSignOut = () => {
        const stringifiedSignOut = JSON.stringify(true);
        localStorage.setItem('sign-out',stringifiedSignOut );
        context.setSignOut(true);
    }
    
    return (
        <nav className='flex justify-between items-center fixed z-10 top-0 w-full py-4 px-8 bg-white text-sm font-light'>
            <ul className='flex items-center gap-3'>
                <li className='font-bold text-lg'>
                    <NavLink to='/'>
                        Shopi
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/'
                        onClick={() => context.setSearchByCategory(null)}
                        className={({ isActive }) =>
                        isActive ? activeStyle : undefined
                        }>
                        All
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/clothes'
                        onClick={() => context.setSearchByCategory('clothes')}
                        className={({ isActive }) => 
                        isActive ? activeStyle : undefined
                        }>
                        Clothes
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/electronics'
                        onClick={() => context.setSearchByCategory('electronics')}
                        className={({ isActive }) => 
                        isActive ? activeStyle : undefined
                        }>
                        Electronics
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/furnitures'
                        onClick={() => context.setSearchByCategory('furnitures')}
                        className={({ isActive }) => 
                        isActive ? activeStyle : undefined
                        }>
                        Furnitures
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/toys'
                        onClick={() => context.setSearchByCategory('toys')}
                        className={({ isActive }) => 
                        isActive ? activeStyle : undefined
                        }>
                        Toys
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/other'
                        onClick={() => context.setSearchByCategory('other')}
                        className={({ isActive }) => 
                        isActive ? activeStyle : undefined
                        }>
                        Others
                    </NavLink>
                </li>
            </ul>

            <ul className='flex items-center gap-3'>
                <li className='text-black/75'>
                    mail@mail.com
                </li>
                <li>
                    <NavLink to='/my-orders' className={({ isActive }) => 
                        isActive ? activeStyle : undefined
                        }>
                        My Orders
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/my-account' className={({ isActive }) => 
                        isActive ? activeStyle : undefined
                        }>
                        My Account
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to='/sign-in'
                        onClick={() => handleSignOut()}
                        className={({ isActive }) => 
                        isActive ? activeStyle : undefined
                        }>
                        Sign Out
                    </NavLink>
                </li>
                <li className='flex cursor-pointer'
                    onClick={() => openCheckoutMenu()}
                >
                    <ShoppingBagIcon className='h-4 w-4 text-black'/> {context.cartProducts.length}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;
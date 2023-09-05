import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import OrderCard from '../OrderCard';
import { XMarkIcon } from '@heroicons/react/24/outline';
import './style.css';
import { totalPrice } from '../../utils';

const CheckoutSideMenu = () => {
    const context = useContext(ShoppingCartContext);

    const handleDelete = (id) => {
        const filteredProducts = context.cartProducts.filter(product => product.id !== id)
        context.setCartProducts(filteredProducts)
    };

    const handleCheckout = () =>{
        const orderToAdd = {
            date: '2023.08.19',
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts)
        }
        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
    };

    return (
        <aside
            className={`${context.isCheckoutSideMenuOpen && context.cartProducts.length ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-2 border rounded-lg bg-white`}>
            <header className='flex justify-between items-center p-3'>
                <h2 className='font-light text-2xl'>
                    {context.lang === 'en' ? 'My Order' : 'Mi Compra'}
                </h2>
                <button className='transition ease-in-out delay-100 hover:scale-150'
                    onClick={() => context.closeCheckoutSideMenu()}
                >
                    <XMarkIcon className='h-6 w-6 text-black'/>
                </button>
            </header>
            <section className='checkout-side-list overflow-y-scroll overflow-x-hidden flex-1'>
                {
                    context.cartProducts.map(product => (
                        <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.image}
                        price={product.price}
                        handleDelete={handleDelete}
                        />
                        ))
                }
            </section>
            <footer className='p-6 flex flex-col'>
                <p className='flex justify-between items-center'>
                    <span className='font-medium text-2xl'>Total: </span>
                    <span className='font-bold text-2xl'>${totalPrice(context.cartProducts)}</span>
                </p>
                <Link to='/my-orders/last'>
                    <div className='flex items-center justify-center'>
                        <button
                            className='m-4 p-2 w-full rounded-lg text-white transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-120 hover:bg-indigo-500 duration-300'
                            onClick={() => handleCheckout()}
                        >
                            {context.lang === 'en' ? 'Checkout Order' : 'Confirmar Compra'}
                        </button>
                    </div>
                </Link>
                
            </footer>
        </aside>
    )
};

export default CheckoutSideMenu;
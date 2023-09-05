import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import './style.css';
import { XMarkIcon } from '@heroicons/react/24/outline';

const ProductDetail = () => {
    const context = useContext(ShoppingCartContext);

    function AddProductToCart() {
        context.setCartProducts([...context.cartProducts, context.productDetail]);
        context.closeDetail();
    };

    function renderIcon(id) {
        const isInCart = context.cartProducts.filter(product => product.id === id).length > 0
    
        if (isInCart) {
            return (
                <button
                className='p-2 rounded-lg text-white bg-blue-300 cursor-default'
                >
                    {context.lang === 'en' ? 'Added to cart' : 'Agregado'}
                </button>
        )
        } else {
            return (
                <button
                className='p-2 rounded-lg text-white transition ease-in-out delay-100 bg-blue-500 hover:-translate-y-1 hover:scale-120 hover:bg-indigo-500 duration-300'
                onClick={() => AddProductToCart()}
                >
                    {context.lang === 'en' ? 'Add to Cart' : 'Agregar'}
                </button>
            )
        }
        };

    return (
        <aside
            className={`${context.isDetailOpen ? 'flex' : 'hidden'} product-detail flex-col fixed right-2 border rounded-lg bg-white overflow-y-scroll overflow-x-hidden`}>
            <div className='flex justify-between items-center p-3'>
                <h2 className='font-light text-2xl'>{context.lang === 'en' ? 'Product Details' : 'Detalle'}</h2>
                <button className='transition ease-in-out delay-100 hover:scale-150'
                    onClick={() => context.closeDetail()}
                >
                    <XMarkIcon className='h-6 w-6 text-black'/>
                </button>
            </div>
            <figure className='m-2'>
                <img
                    src={context.productDetail.image}
                    alt={context.productDetail.title}
                    className='w-full h-full rounded-lg'
                />
            </figure>
            <h1 className='text-xl font-medium p-2'>
                {context.productDetail.title}
            </h1>
            <p className='m-2 text-sm font-light'>
                {context.productDetail.description}
            </p>
            <div className='flex justify-between m-4'>
                <h1 className='text-2xl font-medium p-2'>
                    {context.lang === 'en' ? 'Price' : 'Precio'} ${context.productDetail.price}
                </h1>
                {renderIcon(context.productDetail.id)}
            </div>
            
        </aside>
    )
};

export default ProductDetail;
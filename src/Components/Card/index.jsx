import { useContext } from 'react';
import { ShoppingCartContext } from '../../Context';
import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline';

function Card(data) {

  const context = useContext(ShoppingCartContext);
  
  const showProductDetail = (productData) => {
    context.openDetail()
    context.closeCheckoutSideMenu()
    context.setProductDetail(productData)
  };

  function AddProductToCart(event, productData) {
    event.stopPropagation()
    context.closeDetail()
    context.setCartProducts([...context.cartProducts, productData])
  };

  function renderIcon(id) {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

    if (isInCart) {
      return (
        <button
        className='absolute top-0 right-0 flex justify-center items-center bg-slate-700 w-6 h-6 rounded-full m-2'
        >
        <CheckIcon className='h-5 w-5 text-slate-400'/>
      </button>
    )
  } else {
      return (
        <button
        className='absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 transition ease-in-out delay-150 hover:scale-150 duration-200'
        onClick={(event) => AddProductToCart(event, data.data)}>
        <PlusIcon className='h-6 w-6 text-black'/>
      </button>
      )
    }
  };

  return (
    <div
      className='bg-slate-100 cursor-pointer w-56 h-60 rounded-lg transition ease-in-out delay-100 hover:scale-110 hover:-translate-y-2 duration-300'
      onClick={() => showProductDetail(data.data)}
    >
        <figure className='relative mb-2 w-full h-4/5'>
            <span className='absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5'>{data.data.category}</span>
            <img className='w-full h-full object-cover rounded-lg' src={data.data.image} alt={data.data.description} />
            {renderIcon(data.data.id)}
        </figure>
        <p className='flex justify-between'>
            <span className='text-md font-light truncate mr-2'>{data.data.title}</span>
            <span className='text-md font-bold'>${data.data.price}</span>
        </p>
    </div>
  )
}

export default Card;
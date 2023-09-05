import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Layout from "../../Components/Layout";
import OrderCard from '../../Components/OrderCard';

function MyOrder() {

    const context = useContext(ShoppingCartContext);
    const currentPath = window.location.pathname;
    let index = currentPath.substring(currentPath.lastIndexOf('/')+1);

    if (index === 'last') index = context.order?.length - 1;

    return (
        <>
        <Layout>
            <div className="flex gap-2 justify-between items-center mb-4">
                <Link to='/my-orders'>
                    <ChevronLeftIcon className="h-6 w-6 text-black cursor-pointer"/>
                </Link>
                <h1 className="font-medium text-xl m-6">{context.lang === 'en' ? 'My Order' : 'Mi Compra'}</h1>
            </div>
            <section>
                {
                    context.order?.[index]?.products.map(product => (
                        <OrderCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        imageUrl={product.image}
                        price={product.price}
                        />
                        ))
                }
            </section>
        </Layout>
        </>
    )
}

export default MyOrder
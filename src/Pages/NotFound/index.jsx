import { useContext } from "react";
import Layout from "../../Components/Layout";
import { ShoppingCartContext } from '../../Context';

function NotFound() {

    const context = useContext(ShoppingCartContext);

    return (
        <>
        <Layout>
            <h1 className="font-medium text-xl text-center m-6 w-80">
                {context.lang === 'en' ? 'Not Found' : 'Página no encontrada'}
            </h1>
        </Layout>
        </>
    )
}

export default NotFound
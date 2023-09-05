import Layout from "../../Components/Layout";

function NotFound() {

    return (
        <>
        <Layout>
            {context.lang === 'en' ? 'Page Not Found' : 'Página no encontrada'}
        </Layout>
        </>
    )
}

export default NotFound
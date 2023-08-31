import { useContext } from "react";
import Layout from "../../Components/Layout";
import Card from "../../Components/Card";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";

function Home() {
    const context = useContext(ShoppingCartContext);

    const renderView = () => {
        if (context.filteredItems) {
                return (
                    <section className="grid gap-4 grid-cols-4 w-full max-w-screen-lg">
                    {
                        context.filteredItems.map(item => (
                        <Card key={item.id} data={item}/>
                        ))
                    }
                    </section>
                )
            } else {
                return (
                    <h1 className="font-medium text-2xl mt-8 pt-8">Nothing here...</h1>
                )
            }
        
    };

    return (
        <>
            <Layout>
                <h1 className="font-medium text-2xl m-6">
                    Shopi - Exclusive Products
                </h1>
                <input
                    name='searchField'
                    type="text"
                    placeholder="Search"
                    className="w-80 h-10 mb-4 pl-4 border rounded-full focus:outline-none"
                    onChange={(e) => context.setSearchByTitle(e.target.value)}
                />
                {renderView()}
                <ProductDetail/>
            </Layout>
        </>
    )
}

export default Home
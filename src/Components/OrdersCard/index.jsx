import { ChevronRightIcon } from "@heroicons/react/24/outline";

function OrdersCard(props) {
    
    const { totalPrice, totalProducts } = props;

    let date = new Date();
    let day = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    
    return (
        <div className="flex items-center mb-4 p-4 w-80 border border-black rounded-lg">
            <div className="flex justify-between w-full">
                <p className="flex flex-col font-light">
                    <span>{day}</span>
                    <span>{totalProducts} {totalProducts === 1 ? 'article' : 'articles'}</span>
                </p>
                <p className="flex items-center gap-2">
                    <span className="font-medium text-2xl">$ {totalPrice}</span>
                    <ChevronRightIcon className="h-6 w-6 text-black"/>

                </p>
            </div>
        </div>
    )
};

export default OrdersCard;
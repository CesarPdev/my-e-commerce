import { XMarkIcon } from "@heroicons/react/24/outline";

function OrderCard(props) {
    
    const { id, title, imageUrl, price, handleDelete } = props
    let renderDeleteIcon
    if (handleDelete) {
        renderDeleteIcon = <button onClick={() => handleDelete(id)}><XMarkIcon className='h-6 w-6 text-black'/></button>
    }
    
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center justify-start gap-2 p-2">
                <figure className="w-16 h-16">
                    <img
                        className="w-full h-full rounded-lg object-cover"
                        src={imageUrl} alt={title} />
                </figure>
                <p className="text-md font-light w-40 truncate">
                    {title}
                </p>
            </div>
            <div className="flex items-center gap-2 p-2">
                <p className="text-lg font-medium">
                    ${price}
                </p>
                {renderDeleteIcon}
            </div>
        </div>
    )
};

export default OrderCard;
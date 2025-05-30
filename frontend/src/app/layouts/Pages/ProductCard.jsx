import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleCheckout } from "../../services/ProductService";
import { authToken } from "../../utils/Tokenverify"


const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    let Token = authToken()

    let CreatePayment = (data) => {
        console.log("data", data)
        handleCheckout(data, Token)
    }

    return (
        <div

            className="flex flex-col items-start gap-0.5 max-w-[200px] w-full cursor-pointer"
        >
            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                {product?.image_url?.[0] && (
                    <img
                        src={product.image_url[0]}
                        alt={product?.name || 'product image'}
                        className="group-hover:scale-105 transition object-contain w-full h-full rounded-lg"
                    />
                )}
                <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <img
                        className="h-3 w-3"
                        src="ass"
                        alt="heart_icon"
                    />
                </button>
            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">
                {product?.name}
            </p>

            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">
                {product?.description}
            </p>



            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">
                    Rs
                    {product?.offer_price}
                </p>
                <button className="max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition" onClick={(e) => CreatePayment(product)}>
                    Buy now
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

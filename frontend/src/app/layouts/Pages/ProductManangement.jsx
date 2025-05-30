import React, { useEffect, useState } from "react";
import ProductCard from "../Pages/ProductCard";
// import { useAppContext } from "@/context/AppContext";
import { getTopRatedProducts } from "../../services/ProductService";

const HomeProducts = () => {
    const [topRatedProducts, setTopRatedProducts] = useState([]);

 
    useEffect(() => {
        fetchTopRatedProducts();
    }, []);

    // Function to fetch top rated products
    const fetchTopRatedProducts = async () => {
        const req = { limit: 20 };
        try {
            const res = await getTopRatedProducts(req);
            if (res.status) {
                setTopRatedProducts(res.data); // Agar status true hai to data set karo
            } else {
                setTopRatedProducts([]); // Agar error hai to empty array
            }
        } catch (error) {
            console.error("Error while fetching top products", error);
        }
    };

    return (
        <div className="flex flex-col items-center pt-14">
            <p className="text-2xl font-medium text-left w-full">Popular products</p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                {topRatedProducts?.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>

            <button
                onClick={() => router.push("/all-products")}
                className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition"
            >
                See more
            </button>
        </div>
    );
};

export default HomeProducts;

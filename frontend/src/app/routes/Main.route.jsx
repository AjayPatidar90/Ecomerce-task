import React from 'react';
import { Route, Routes, useLocation } from "react-router-dom";

import Header from '../extraComponent/Header';
import Banner from '../extraComponent/Banner';
import HomeProducts from '../layouts/Pages/ProductManangement';
import Products from "../layouts/Products/Products";

const Routing = () => {
    const location = useLocation();

    // Check if Banner should be hidden
    const hideBanner = location.pathname.includes("products");

    return (
        <>
            <div className="admin-container">
                <Header />
                <div className="admin-content">
                    {!hideBanner && <Banner />}
                    <main
                        id="main"
                        className={`main ${hideBanner ? "mt-20" : ""}`} // margin-top if banner is hidden
                    >
                        <div className="admin-main">
                            <Routes>
                                <Route path="/" element={<HomeProducts />} />
                                <Route path="/products" element={<Products />} />
                            </Routes>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Routing;

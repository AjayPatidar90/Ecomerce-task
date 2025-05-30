import axios from "axios";
import { base_url } from "../utils/Config";
import { loadStripe } from "@stripe/stripe-js";



export const addProduct = async (data) => {
    try {
        const response = await axios.post(`${base_url}add-product`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error);
        throw error;
    }
};

export const getAllProducts = async (data) => {
    try {
        const response = await axios.get(`${base_url}get-all-products`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};


export const updateProduct = async (data) => {
    try {
        const response = await axios.post(`${base_url}update-product`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating product:", error);
        throw error;
    }
};
export const deleteProduct = async (data) => {
    try {
        const response = await axios.post(`${base_url}delete-product`, data);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error);
        throw error;
    }
};


export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("upload_preset", "my_unsigned_preset");
    // formData.append("cloud_name", "dlpeqbowx");
    formData.append("upload_preset", "my_unsigned_preset");
    formData.append("cloud_name", "dsuvis7qq");


    try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/dsuvis7qq/image/upload`, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.secure_url) {
            return data.secure_url;
        } else {
            console.error("Cloudinary error response: ", data);
            return null;
        }
    } catch (error) {
        console.error("Upload failed", error);
        return null;
    }
};

const stripePromise = loadStripe("pk_test_51RUZcNB0Dx8BNsL2c4JCGBlhSwRSc8TT3jrhoSw1TfT21AVLBw2s5VzGKgEoOg560aoIPxfpQMuNqi1RU9nfDxoO00JuuH0brt"); // Your publishable key


export const handleCheckout = async (data, Token) => {
    console.log("Token", Token)
    const response = await axios.post("http://localhost:8080/create-checkout-session", {
        items:
            { id: data._id, user_id: Token.id, quantity: 1 },

    });
    console.log("response", response)

    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: response.data.id });
};





export const getTopRatedProducts = async (data) => {
    try {
        const response = await axios.get(`${base_url}get-all-products`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching top rated products:", error);
        throw error;
    }
};

export const getProductById = async (data) => {
    try {
        const response = await axios.post(`${base_url}get-product-byId`, data);
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
};

export const addToCart = async (data) => {
    try {
        const response = await axios.post(`${base_url}addToCart`, data);
        return response.data;
    } catch (error) {
        console.error("Error registering:", error);
        throw error;
    }
};






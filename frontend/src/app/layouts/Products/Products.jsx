import React, { useEffect, useState } from "react";
import axios from "axios";
import { addProduct, getAllProducts, uploadToCloudinary, updateProduct, deleteProduct } from "../../services/ProductService"

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [currentProduct, setCurrentProduct] = useState({
        _id: null,
        name: "",
        description: "",
        price: "",
        stock: "",
        offer_price: "",
        image_url: "",
    });

    const fetchProducts = async () => {
        try {
            const res = await getAllProducts();
            setProducts(res.data || []);
        } catch (err) {
            console.error("Error fetching products", err);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const openAddModal = () => {
        setCurrentProduct({
            _id: null,
            name: "",
            price: "",
            stock: "",
            description: "",
            offer_price: "",
            image_url: "",
        });
        setImageFile(null);
        setIsEdit(false);
        setModalOpen(true);
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setIsEdit(true);
        setImageFile(null);
        setModalOpen(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct({ ...currentProduct, [name]: value });
    };


    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(currentProduct)

            const imageUrl = imageFile ? await uploadToCloudinary(imageFile) : currentProduct.image_url
            console.log("imageUrl", imageUrl)
            const productData = { ...currentProduct, image_url: imageUrl };

            if (isEdit) {
                await updateProduct(productData);
            } else {
                await addProduct(productData);
            }

            fetchProducts();
            setModalOpen(false);
        } catch (err) {
            console.error("Error saving product", err);
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        try {
            await deleteProduct(id)
            fetchProducts();
        } catch (err) {
            console.error("Error deleting product", err);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Product Management</h2>
                <button
                    onClick={openAddModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add Product
                </button>
            </div>

            <table className="w-full border text-left">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Price</th>
                        <th className="p-2 border">Stock</th>
                        <th className="p-2 border">Image</th>
                        <th className="p-2 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((prod) => (
                        <tr key={prod._id} className="hover:bg-gray-50">
                            <td className="p-2 border">{prod.name}</td>
                            <td className="p-2 border">{prod.price}</td>
                            <td className="p-2 border">{prod.stock}</td>
                            <td className="p-2 border">
                                {prod.image_url && (
                                    <img
                                        src={prod.image_url}
                                        alt={prod.name}
                                        className="w-16 h-16 object-cover"
                                    />
                                )}
                            </td>
                            <td className="p-2 border">
                                <button
                                    onClick={() => openEditModal(prod)}
                                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(prod._id)}
                                    className="bg-red-600 text-white px-2 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                        <h2 className="text-lg font-semibold mb-4">
                            {isEdit ? "Edit Product" : "Add Product"}
                        </h2>
                        <form onSubmit={handleFormSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                value={currentProduct.name}
                                onChange={handleInputChange}
                                className="w-full border p-2"
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                value={currentProduct.price}
                                onChange={handleInputChange}
                                className="w-full border p-2"
                                required
                            />
                            <input
                                type="number"
                                name="offer_price"
                                placeholder="Offer Price"
                                value={currentProduct.offer_price}
                                onChange={handleInputChange}
                                className="w-full border p-2"
                            />
                            <select
                                name="stock"
                                value={currentProduct.stock}
                                onChange={handleInputChange}
                                className="w-full border p-2"
                                required
                            >
                                <option value="">Select Stock Status</option>
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>
                            <textarea
                                name="description"
                                placeholder="Short Description"
                                value={currentProduct.description}
                                onChange={handleInputChange}
                                className="w-full border p-2"
                                required
                            ></textarea>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setImageFile(e.target.files[0])}
                                className="w-full"
                            />
                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded"
                                >
                                    {isEdit ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductTable;

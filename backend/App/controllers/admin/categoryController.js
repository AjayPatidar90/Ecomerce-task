
const db = require("../../models");
const CategoryDb = db.category;

class CategoryController {
    async addCategory(req, res) {
        const { name } = req.body;

        if (!name) {
            return res.send({ status: false, data: [], message: "Category name is required" });
        }

        try {
            const newCategory = new CategoryDb({ name });
            await newCategory.save();
            return res.send({ status: true, message: "Category added successfully", data: newCategory });
        } catch (error) {
            return res.status(500).send({ status: false, message: "Error adding category", error: error.message });
        }
    }

    async getAllCategory(req, res) {
        try {
            const categories = await CategoryDb.find().sort({ createdAt: -1 });
            if (categories.length === 0) {
                return res.send({ status: false, data: [], message: "No categories found" });
            }
            return res.send({ status: true, data: categories, message: "Categories fetched successfully" });
        } catch (error) {
            return res.status(500).send({ status: false, message: "Error fetching categories", error: error.message });
        }
    }

    async getCategoryById(req, res) {
        const { id } = req.params;
        try {
            const category = await CategoryDb.findOne(id);
            if (!category) {
                return res.send({ status: false, data: [], message: "Category not found" });
            }
            return res.send({ status: true, data: category, message: "Category fetched successfully" });
        } catch (error) {
            return res.status(500).send({ status: false, message: "Error fetching category", error: error.message });
        }
    }

    async updateCategory(req, res) {
        const { id, name } = req.body;

        if (!name) {
            return res.send({ status: false, data: [], message: "Category name is required" });
        }

        try {
            const category = await CategoryDb.findById(id);
            if (!category) {
                return res.send({ status: false, data: [], message: "Category not found" });
            }

            const updatedCategory = await CategoryDb.findByIdAndUpdate(id, { name }, { new: true });
            return res.send({ status: true, data: updatedCategory, message: "Category updated successfully" });
        } catch (error) {
            return res.status(500).send({ status: false, message: "Error updating category", error: error.message });
        }
    }

    async deleteCategory(req, res) {
        const { id } = req.body;

        try {
            const category = await CategoryDb.findById(id);
            if (!category) {
                return res.send({ status: false, data: [], message: "Category not found" });
            }

            await CategoryDb.findByIdAndDelete(id);
            return res.send({ status: true, data: [], message: "Category deleted successfully" });
        } catch (error) {
            return res.status(500).send({ status: false, message: "Error deleting category", error: error.message });
        }
    }
}

module.exports = new CategoryController();

import { imageUploadUtil } from "../../helper/cloudinary.js";
import Product from "../../models/Product.js";

export const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error occured",
    });
  }
};

// add multiple products 
// ...existing code...

export const addProductsBulk = async (req, res) => {
  try {
    // accept either an array in body or { products: [...] }
    const productsPayload = Array.isArray(req.body) ? req.body : req.body.products;
    if (!productsPayload || !Array.isArray(productsPayload) || productsPayload.length === 0) {
      return res.status(400).json({ success: false, message: "No products provided" });
    }

    // normalize and coerce types
    const docs = productsPayload.map((p) => {
      const {
        image = "",
        title = "",
        description = "",
        category = "",
        brand = "",
        price = 0,
        salePrice = 0,
        totalStock = 0,
      } = p || {};

      return {
        image,
        title,
        description,
        category,
        brand,
        price: Number(price) || 0,
        salePrice: Number(salePrice) || 0,
        totalStock: Number(totalStock) || 0,
      };
    });

    const inserted = await Product.insertMany(docs);

    return res.status(201).json({
      success: true,
      message: "Products added",
      count: inserted.length,
      data: inserted,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while adding products",
    });
  }
};

// ...existing code...

// add new product
export const addProduct = async (req, res) => {
  try {
    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreateProduct = new Product({
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    });

    await newlyCreateProduct.save();

    res.status(201).json({
      success: true,
      data: newlyCreateProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while add product",
    });
  }
};

// fetch product
export const fetchAllProduct = async (req, res) => {
  try {
    const listOfProducts = await Product.find();
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while  fetch all product",
    });
  }
};

// edit product

export const editProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      image,
      title,
      description,
      category,
      brand,
      price,
      salePrice,
      totalStock,
    } = req.body;

    let findProduct = await Product.findById(id);
    if (!findProduct) {
      return res.status(404).json({
        success: false,
        message: "product not found for that id",
      });
    }

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price === "" ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === "" ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while edit product",
    });
  }
};

// delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deleteProduct = await Product.findByIdAndDelete(id);

    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "product not found for that id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      deleteProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error while delete product",
    });
  }
};

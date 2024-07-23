// import { Product } from "../models/product";
import Product from "../models/product";
import { productValidattion } from "../schemas/product";

export const getAllProduct = async (request, response) => {
  try {
    const data = await Product.find().limit(2);
    response.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (request, response) => {
  try {
    // const data = await Product.findById(request.params.id);
    const data = await Product.findOne({ _id: request.params.id });
    response.status(200).json(data);
  } catch (error) {}
};

export const createProduct = async (request, response) => {
  // console.log("Create a product");
  // console.log(request.body);
  // Product.create(request.body);

  try {
    const { error } = productValidattion.validate(request.body, {
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details.map((message) => message.message);
      return response.status(400).json(errorMessages);
    }
    const data = await Product(request.body).save();
    response.status(201).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (request, response) => {
  try {
    const data = await Product.findOneAndUpdate(
      { _id: request.params.id },
      request.body,
      { new: true }
    );
    response.json(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (request, response) => {
  try {
    const data = await Product.findOneAndDelete({ _id: request.params.id });
    response.status(200).json({ data, message: "Delete success" });
  } catch (error) {}
};

// export {getAllProduct, getProductById, createProduct, updateProduct, deleteProduct}

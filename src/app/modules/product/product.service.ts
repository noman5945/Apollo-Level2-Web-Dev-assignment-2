import { Types } from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

/**
 * Method to insert new product into Database
 * @param {TProduct} productData Which is the newly created product
 * @returns Object of inserted data
 */
const createNewProductIntoDB = async (productData: TProduct) => {
  const product = new Product(productData);
  if (await product.isExists(product._id)) {
    throw new Error("Product already exists");
  }
  const result = await product.save();
  return result;
};

/**
 * Method to get all data from database
 * @returns {Array} Array of all data
 */
const getAllProductFromDB = async () => {
  const result = await Product.find({});
  return result;
};

/**
 * Method to get Product by ID
 * @param id ID of the quering Product
 * @returns The product object
 */
const getProductByIDfromDB = async (id: string) => {
  const query = { _id: id };
  const product = new Product();
  product._id = new Types.ObjectId(id);
  if (!(await product.isExists(product._id))) {
    throw new Error("Product with that ID doesent exist");
  }
  const result = await Product.findOne(query);
  return result;
};
/**
 * Method to update then insert updated data by ID.This method employes 'PUT' method
 * @param id ID of the product to be updated
 * @param newData Data of type TProduct having the updated property
 * @returns Updated data
 */
const upsertProductByIDfromDB = async (id: string, newData: TProduct) => {
  const filter = { _id: new Types.ObjectId(id) };
  const updatedData: TProduct = newData;
  const result = await Product.findOneAndUpdate(filter, updatedData, {
    upsert: true,
  });
  return result;
};

/**
 * Method to delete product by ID
 * @param id
 * @returns
 */
const deleteProductByIDfromDB = async (id: string) => {
  const filter = { _id: new Types.ObjectId(id) };
  const result = await Product.findOneAndDelete(filter);
  return result;
};

/**
 * Method to search items by 'searchTerm' (keyword) given as query in the request.The method serches the 'tags' Array of the data and fetches the datas almost matching the tags.Here '$regex' is used for searching and '$options:i' to ignore case sensitivity..
 * @param keyword - keyword to search
 * @returns
 */
const searchProductByKeywordfromDB = async (keyword: string) => {
  const query = {
    tags: {
      $regex: keyword,
      $options: "i",
    },
  };
  const result = await Product.find(query);
  return result;
};

export const ProductServices = {
  createNewProductIntoDB,
  getAllProductFromDB,
  getProductByIDfromDB,
  upsertProductByIDfromDB,
  deleteProductByIDfromDB,
  searchProductByKeywordfromDB,
};

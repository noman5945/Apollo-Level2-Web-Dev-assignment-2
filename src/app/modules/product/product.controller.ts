import { Request, Response } from "express";
import productValidatorSchema from "./product.validator";
import { ProductServices } from "./product.service";

/**
 * Controller Method to Insert Product into DB
 * @param req is a body containing product data
 * @param res result object after Inserting data into database
 */
const createNewProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    const { error, value } = productValidatorSchema.validate(product, {
      allowUnknown: true,
    });
    if (error) {
      res.status(500).send({
        succsess: false,
        messege:
          "Error occured while creating new product(Joi).Some fields maybe missing",
        error: error.details,
      });
    } else {
      const result = await ProductServices.createNewProductIntoDB(value);
      res.status(200).send({
        succsess: true,
        messege: "Product created successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).send({
      succsess: false,
      messege: error.message || "Error occured while creating new product",
      error: error,
    });
  }
};

/**
 * COntroller Method to get all products from database.If there is a query value passed then it fetches that specific value
 * @param req No input needed since this method fetches everything if no query given.
 * @param res Returns a result object
 */
const getAllProducts = async (req: Request, res: Response) => {
  try {
    if (typeof req.query.searchTerm !== "undefined") {
      const keyword = req.query.searchTerm;
      const result = await ProductServices.searchProductByKeywordfromDB(
        keyword as string
      );
      res.status(200).send({
        success: true,
        message: `Products matching search term '${keyword}' fetched successfully!`,
        data: result,
      });
    } else {
      const result = await ProductServices.getAllProductFromDB();
      res.status(200).send({
        success: true,
        messege: "Products fetched successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).send({
      succsess: false,
      messege: error.message || "Error occured while fetching all products",
      error: error,
    });
  }
};

const getProductByID = async (req: Request, res: Response) => {
  try {
    const queryID = req.params.productId;
    const result = await ProductServices.getProductByIDfromDB(queryID);
    res.status(200).send({
      success: true,
      messege: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      succsess: false,
      messege: error.message || "Error occured while fetching the product",
      error: error,
    });
  }
};

/**
 * Method to update product by ID. This method takes whole product info as request body and ID of the product as request param.
 * @param req Body:TProduct type data to update, param:productID
 * @param res update then inserted data
 */
const upsertProductByID = async (req: Request, res: Response) => {
  try {
    const updateID = req.params.productId;
    const updatedData = req.body;
    const { error, value } = productValidatorSchema.validate(updatedData);
    if (error) {
      res.status(500).send({
        succsess: false,
        messege:
          "Error occured while updating product(Joi).Some fields maybe missing",
        error: error.details,
      });
    } else {
      const result = await ProductServices.upsertProductByIDfromDB(
        updateID,
        value
      );
      res.status(200).send({
        success: true,
        message: "Product updated successfully!",
        data: result,
      });
    }
  } catch (error: any) {
    res.status(500).send({
      succsess: false,
      messege: error.message || "Error occured while updating the product",
      error: error,
    });
  }
};

const deleteProductByID = async (req: Request, res: Response) => {
  try {
    const deleteID = req.params.productId;
    const result = await ProductServices.deleteProductByIDfromDB(deleteID);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).send({
      succsess: false,
      messege: error.message || "Error occured while deleting the product",
      error: error,
    });
  }
};

const searchProductByKeyword = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.searchTerm;
    const result = await ProductServices.searchProductByKeywordfromDB(
      keyword as string
    );
    res.status(200).send({
      success: true,
      message: `Products matching search term '${keyword}' fetched successfully!`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      succsess: false,
      messege: error.message || "Error occured while fetching the product",
      error: error,
    });
  }
};

export const ProductControllers = {
  createNewProduct,
  getAllProducts,
  getProductByID,
  upsertProductByID,
  deleteProductByID,
  searchProductByKeyword,
};

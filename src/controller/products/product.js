const productModule = require('../../model/productModule');
const mongoose = require('mongoose');
const mongodbConnection = require('../../connectionDB/mongodbConnection');
// Create a new product     
exports.createProduct = async(req,res) => {
try{
  await mongodbConnection();
const insertProduct = await productModule.insertMany(req.body); 
res.status(200).json({message:'Product created sucessfully',data : insertProduct})
}catch(err) {
console.log('Error creating product:', err);
res.status(500).json({message: 'Internal server error'});
}
}

//update Product by ID
exports.updateProduct = async(req,res) => {
try{
  await mongodbConnection();
  const productId = req.params.id;
  const updateData = req.body;
  const updateProduct = await productModule.findByIdAndUpdate(productId, updateData);
  res.status(200).json({message:'Product updated successfully', data: updateProduct});
}catch(err) {
  console.log(`Error updating product: ${err}`);
  res.status(500).json({message: 'Internal server error'});  
}
}
// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    await mongodbConnection();
    const products = await productModule
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await productModule.countDocuments();

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};
//Get Single Product by ID
exports.getProductById = async(req,res) =>{
 try{
 const productId = req.params.id;
 await mongodbConnection();
 const getProduct = await productModule.findById(productId);
 res.status(200).json({message:'Product fetched successfully', data: getProduct});
 }catch(err) {
console.log(`Error fetching product: ${err}`);
res.status(500).json({message: 'Internal server error'});
 }          
}


exports.getUserProductDetails = async (req, res) => {
  try {
    await mongodbConnection();
    const page = parseInt(req.query.page) || 1;          
    const limit = parseInt(req.query.limit) || 10;       
    
 
    const skip = (page - 1) * limit;

    // Build the aggregation pipeline
    const pipeline = [
      // 1. Lookup user details
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      
      {
        $sort: { createdAt: -1 }
      },
      // 4. Skip documents for pagination
      {
        $skip: skip
      },
      // 5. Limit the number of documents
      {
        $limit: limit
      },
      // 6. Project only needed fields
      {
        $project: {
          _id: 1,
          productName: 1,
          price: 1,
          quantity: 1,
          purchaseDate: 1,
          createdAt: 1,
          userId: 1,
          "userDetails.name": 1,
          "userDetails.email": 1,
          "userDetails.role": 1
        }
      }
    ];

    // Execute the aggregation for the paginated results
    const userProductDetails = await productModule.aggregate(pipeline);

    // Get total count for pagination
    const totalCountPipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      { $count: "total" }
    ];

    const countResult = await productModule.aggregate(totalCountPipeline);
    const total = countResult.length > 0 ? countResult[0]?.total : 0;

    // Calculate pagination metadata
    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.status(200).json({
      message: userProductDetails.length > 0 
        ? "User product details fetched successfully" 
        : "No products found",
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage,
        hasPrevPage,
        countOnThisPage: userProductDetails.length
      },
      data: userProductDetails
    });

  } catch (err) {
    console.error("Error in getUserProductDetails:", err);
    console.error("Stack trace:", err.stack);
    res.status(500).json({
      message: "Internal server error",
      error: err.message
    });
  }
};
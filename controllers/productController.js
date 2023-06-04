import productModel from "../models/products.js";
import mongoose from "mongoose";

// export const getAll = async (req, res) => {
//     try{
//         const projects = await projectModel.find().populate('user').exec();
//         res.status(200).json(projects);
//     }catch(err){
//         console.log(err);
//         res.status(500).json({
//             message: "Couldn't get projects"
//         })
//     }
// }
// export const getOne = async (req, res) => {
//     try{
//         const projectId = req.params.id;

//         projectModel.findByIdAndUpdate({
//             _id: projectId,
//         },{
//             $inc: {
//                 viewsCount: 1
//             }
//         },
//         {
//             returnDocument: 'after',
//         },
//         (err, doc) =>
//             {
//                 if(err){
//                     console.log(err);
//                     return res.status(500).json({
//                         message: "Couldn't get project"
//                     })
//                 }
//                 if(!doc){
//                     return res.status(404).json({
//                         message: "Project not found"
//                     })
//                 }
//                 res.json(doc);
//             })

//     }catch(err){
//         console.log(err);
//         res.status(500).json({
//             message: "Couldn't get projects"
//         })
//     }
// }
// export const remove = async (req, res) => {
//     try{
//         const projectId = req.params.id;

//         projectModel.findOneAndDelete({
//             _id: projectId,
//         }, (err, doc)=>{
//             if(err){
//                 console.log(err);
//                     return res.status(500).json({
//                         message: "Couldn't delete project"
//                     })
//             }
//             if(!doc){
//                 return res.status(404).json({
//                     message: "Project not found"
//                 })
//             }
//             res.status(200).json({
//                 message: "Project deleted"
//             })
//         });

//     }catch(err){
//         console.log(err);
//         res.status(500).json({
//             message: "Couldn't get projects"
//         })
//     }
// }
export const getAll = async (req, res) => {
  try {
    const products = await productModel.find().exec();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get projects",
    });
  }
};
export const getCompanyProducts = async (req, res) => {
  try {
    const products = await productModel
      .find({ companyId: req.params.companyId })
      .exec();
    res.status(201).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get company products",
    });
  }
};
export const getCompanies = async (req, res) => {
  try {
    const products = await await productModel
      .aggregate([
        {
          $group: {
            _id: "$companyId",
            name: {
              $max: "$companyName",
            },
          },
        },
      ])
      .exec();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get products",
    });
  }
};
export const create = async (req, res) => {
  try {
    // const doc = new productModel({
    //     name: "Burn",
    //     imageUrl: "https://content.silpo.ua/sku/ecommerce/73/480x480wwm/735014_480x480wwm_41235bcf-04df-cfe2-8f33-897aad1e89a2.png",
    //     description: "Burn energy",
    //     unitPrice: 50,
    //     companyId:"e2a52676-22d3-41c4-a70f-aa9037b3e94f",
    //     companyName:"ATB",
    // })
    const doc = new productModel({
      name: req.body.name,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      unitPrice: req.body.unitPrice,
      companyId: req.body.companyId,
      companyName: req.body.companyName,
     
    });

    const product = await doc.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't create project",
    });
  }
};

export const getProductsByIds = async (req, res) => {
  try {
    const obj_ids = req.body.map(function (id) {
      // return {"$oid": `${id}`};
      return mongoose.Types.ObjectId(id);
    });
    const products = await productModel.find({ _id: { $in: obj_ids } }).exec();
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Couldn't get products",
    });
  }
};

// export const update = async (req, res) => {
//     try{
//         const projectId = req.params.id;

//         await projectModel.updateOne({
//             _id: projectId,
//         },{
//             title: req.body.title,
//             description: req.body.description,
//             technology: req.body.technology,
//             imageUrl: req.body.imageUrl,
//             user: req.userId,
//         });
//         res.status(200).json({
//             message: "Project updated"
//         })
// }catch{
//     console.log(err);
//     res.status(500).json({
//         message: "Couldn't update project"
//     })
// }
// }

const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const UploadModel = require('../models/image.model');
const product = require('../models/product.model');
const fs = require('fs');
var mongoose = require('mongoose');



class productController {
    show = async(req, res) => {
        try {

            let products = await product.find();
            res.render('product/show', { products: multipleMongooseToObject(products), layout: 'main' });
        } catch (error) {
            res.json({
                'status': 'error',
                'message': 'Something went wrong!!!' + error
            })
        }
    }

    showOne = async(req, res) => {
        let id = req.params.slug;
        let objectId = mongoose.Types.ObjectId(id);
        console.log(mongoose.Types.ObjectId.isValid(id));
        console.log(id);
        try {
            let showedProduct = await product.findById(id);
            let images = await UploadModel.find({ productId: objectId });
            res.render('product/detailnedit', { product: mongooseToObject(showedProduct), images: images, layout: 'main' });
        } catch (error) {
            res.json({
                'status': 'error',
                'message': 'Something went wrong when getting data' + error
            })
        }
    }

    edit = async(req, res) => {
        let id = req.query.id;
        try {
            let product = await product.findOne({ _id: new ObjectId(id) });
            res.render('product/add', { product: mongooseToObject(product), layout: 'main' });
        } catch (error) {
            res.json({
                'status': 'error',
                'message': 'Something went wrong!!!' + error
            })
        }
    }

    add = (req, res) => {
        res.render('product/add', { layout: 'main' });
    }


    createProduct = async(req, res) => {
        let { name, description, price, quantity } = req.body;
        let newProduct = {
            name: name,
            price: price,
            description: description,
            quantity: quantity
        };
        try {
            let addedProduct = await product.create(newProduct);
            console.log(addedProduct._id);
            return addedProduct;
        } catch (error) {
            res.json({
                "status": "error",
                "message": 'Something went wrong!!!'
            });
        }
    }

    uploadProduct = async(req, res) => {
        const files = req.files;

        let count = 0;

        let savedProduct;
        let { name, description, price, quantity } = req.body;
        let fimg = fs.readFileSync(files[1].path)
        let fencode_image = fimg.toString('base64')
        let firstImg = {
            filename: files[1].originalname,
            contentType: files[1].mimetype,
            imageBase64: fencode_image
        }
        let newProduct = {
            name: name,
            price: price,
            description: description,
            quantity: quantity,
            image: firstImg

        };
        try {
            savedProduct = await product.create(newProduct);
        } catch (error) {
            return res.json({
                "status": "error",
                "message": 'Something went wrong!!!' + "loi cai con cac"
            });
        }
        // convert images into base64 encoding
        let imgArray = files.map((file) => {
            let img = fs.readFileSync(file.path)
            let encode_image = img.toString('base64')
            return encode_image;
        })

        let result = imgArray.map(async(src, index) => {
            // create object to store data in the collection
            let finalImg = {
                productId: savedProduct._id,
                filename: files[index].originalname,
                contentType: files[index].mimetype,
                imageBase64: src
            }

            let newUpload = new UploadModel(finalImg);

            return newUpload
                .save()
                .then(() => {
                    return { msg: `${files[index].originalname} Uploaded Successfully...!` }
                })
                .catch(error => {
                    if (error) {
                        if (error.name === 'MongoError' && error.code === 11000) {
                            return Promise.reject({ error: `Duplicate File Name! ` });
                        }
                        return Promise.reject({ error: error.message || `Cannot Upload Image, Something went wrong!` })
                    }
                })
        });
        Promise.all(result)
            .then(msg => {
                // res.json(msg);
                res.json({
                    status: 'success',
                    message: 'Upload product successfully!'
                })
            })
            .catch(err => {
                res.json({
                    status: 'error',
                    message: err.message
                });
                res.end();
            })
    }

    update = async(req, res) => {
        let id = req.query.id;
        console.log(id);

        let { name, description, price, quantity, image } = req.body;
        let editedProduct = new product({
            name: name,
            price: price,
            description: description,
            quantity: quantity,
            image: image
        });
        try {
            let updatedProduct = await product.updateOne({ _id: new ObjectId(id) }, editedProduct);
            res.redirect('/products').status(200).json(updatedProduct);
        } catch (error) {
            res.json({
                "status": "error",
                "message": 'Something went wrong when performing update' + error
            });
        }
    }

    delete = async(req, res) => {
        let id = req.query.id;
        console.log(id);
        let objectId = mongoose.Types.ObjectId(id);
        try {
            let deletedImages = await UploadModel.deleteMany({ productId: objectId })
            let deletedProduct = await product.deleteOne({ _id: objectId });

            res.json({
                'message': 'Product deleted successfully'
            })
        } catch (error) {
            res.json({
                "status": "error",
                "message": 'Something went wrong when performing delete' + error
            });
        }
    }

    searchShowing = (req, res) => {
        let hint = "";
        let response = "";
        let searchQ = "";
        if (req.body != null)
            searchQ = req.body.search.toLowerCase();
        let filterNum = 1;

        if (searchQ.length > 0) {
            product.find(function(err, results) {
                if (err) {
                    console.log(err);
                } else {
                    results.forEach(function(sResult) {
                        if (sResult.name.indexOf(searchQ) != -1) {
                            if (hint === "") {
                                hint = `<a class='hint' href='edit/${sResult._id}' target='_blank'>  ${sResult.name}  </a>`;
                            } else if (filterNum < 6) {
                                hint = hint + `<br><a class='hint' href='edit/${sResult._id}' target='_blank'>  ${sResult.name}  </a>`;
                                filterNum++;
                            }
                        }
                    })
                }
                if (hint === "") {
                    response = "no suggestion"
                } else {
                    response = hint;
                }

                res.send({ response: response });
            });

        }
    }
}

module.exports = new productController;
const { BaseError, fn, col, Op} = require('sequelize');
const sequelize = require('sequelize');
const { Product, Image } = require('../../models');
const { validationResult, matchedData } = require('express-validator');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dxqhz3pif",
    api_key: "833198787996494",
    api_secret: "vYdX-J1wYpfnAiIv-QgOSqvEJoU"
  });

exports.findAllActive = (req, res) => {
    const offset = req.query.offset ? parseInt(req.query.offset) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    Product.findAll({ where: { status: '1' }, offset: offset, limit: limit, include: Image })
    .then(async data => {
        if (data) {
            await Promise.allSettled(data.map(async (product) => {
                const images = await product.getImages();
                product.dataValues.listeImage = images;
            }));
            res.status(200).json({ data });
        } else {
            res.status(500).send({
                message: `Cannot find Products.`
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: `Error retrieving Products.`
        });
    });
};

exports.findAll = (req, res) => {

    const offset = req.query.offset ? parseInt(req.query.offset) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    Product.findAll({ offset: offset, limit: limit, include: Image })
        .then(async data => {
            if (data) {

                await Promise.allSettled(data.map(async (product) => {
                    const images = await product.getImages();
                    product.dataValues.listeImage = images;
                }));

                res.status(200).json({ data });
            } else {
                res.status(500).send({
                    message: `Cannot find Products.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Products.`
            });
        });
    // Product.findAll({ offset: offset, limit: limit, include: Image })
    //     .then(async data => {

    //         if (data) {
    //             const array = data.forEach(product => {
    //                 product.getImages().then((images) => {
    //                     product.listeImage = images
    //                     console.log("-------------image product " + product.id, images);
    //                 });
    //             });

    //             res.status(200).json({ message: "Find Products", data })
    //         } else {
    //             res.status(500).send({
    //                 message: `Cannot find Products .`
    //             });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).send({
    //             message: `Error retrieving Products.`
    //         });
    //     });
};

exports.findTop = (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    Product.findAll({ order: [['top', 'DESC'], ['quantity', 'DESC']], limit: limit, include: Image })
        .then(async data => {
            if (data) {

                await Promise.allSettled(data.map(async (product) => {
                    const images = await product.getImages();
                    product.dataValues.listeImage = images;
                }));

                res.status(200).json({ data });
            } else {
                res.status(500).send({
                    message: `Cannot find Products.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Products.`
            });
        });
}

exports.findById = (req, res) => {
    const id = req.params.id;
    Product.findOne({ where: { id }, include: Image })
        .then(data => {
            if (data) {
                res.status(200).json({ data })
            } else {
                res.status(204).send({ message: `Cannot find product with id=${id}.` });
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error retrieving product with id=" + id });
        });
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.findByCategory = (req, res) => {
    const category_id = req.query.category_id ? parseInt(req.query.offset) : [1, 2, 3, 4];
    const offset = req.query.offset ? parseInt(req.query.offset) : null;
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    Product.findAll({ where: { category_id }, offset: offset, limit: limit })
        .then(data => {
            if (data) {
                res.status(200).json({ message: "Find Product", data })
            } else {
                res.status(401).send({
                    message: `Cannot find Product with category_id=${category_id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving Product with category_id=${category_id}.`
            });
        });
}

exports.create = (req, res) => {
    // todo : il faut valider image...
    //valider ou non le formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    //recuperer le body nettoyé
    const newProduct = matchedData(req);
    // Récupérer le fichier envoyé via req.file.buffer
    const fileBuffer = req?.file?.buffer??null;
    //create product to get the product_id   
        //if image exists:
        //create image first, to get the image_id
            //send image to Cloudinary, with image_id as id
                //update image with url of Cloudinary
                    //send res to front
                    //if any error, delete image created if exists, and product created if exists     
    Product.create(newProduct).then((product) => {
        if(!fileBuffer){
            return res.status(201).json({ message: `Produit "${product.title}" ajouté`, product })
        }
        Image.create({ product_id: product.dataValues.id, title: newProduct.image_title??'', url: 'pending', type: newProduct.image_type??'max' })
        .then(image=>{
            // Convertir le Buffer en flux (stream)
            const bufferStream = streamifier.createReadStream(fileBuffer);
            const uploadStream = cloudinary.uploader.upload_stream({ folder: 'bioshop-product-images', public_id: 'default'/*image.dataValues.id*/ },
                (error, result) => {
                    if (error) {
                        //défaire la création de l'image
                        Image.destroy( { where:{id:image.dataValues.id} }
                            ).then((data) => { throw new Error(error) }  
                            ).catch(err => { throw new Error(err) } ); 
                    } else {
                        // Récupérer l'URL de l'image dans result.secure_url
                        const imageUrl = result.secure_url;
                        // enregistrer l'URL de l'image dans la base de données)
                        Image.update(
                            { url:imageUrl },
                            { where: { id:image.dataValues.id } }
                        ).then(()=>
                            res.status(201).json({ message: `Produit "${product.title}" ajouté`, product })
                        ).catch(err=>{
                            //console.log(err)
                            throw new Error(err)
                        })
                    }
                }
            )
            // Piping du flux du buffer vers le flux d'envoi à Cloudinary
            bufferStream.pipe(uploadStream);
        })
        .catch(err=>{
            console.log("err image",err)
            //défaire l'insertion du produit
            Product.destroy(
                { where:{id:product.dataValues.id} }
            ).then((data) => res.status(500).send({ message: `erreur avec l'image` })    
            ).catch(err => res.status(500).send({ message: "Erreur base de données" }) ); 
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err.message || "Erreur base de données." })
    })
}



exports.update = (req, res) => {
    //valider ou non le formulaire
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const msg = errors.array().map(e=>e.msg).join(' - ')
        return res.status(400).json({ error: msg });
    }
    const id = req.params.id;
    //body nettoyé
    const {category_id, title, description, price_ht, tva, quantity, status, top}=matchedData(req)
    Product.update(
        { category_id, title, description, price_ht, tva, quantity, status, top },
        { where: { id } }
    ).then(() => {
        res.status(200).send({ message: `Produit ${title} mis à jour` });
    }).catch(err => {
        res.status(500).send({ message: `Erreur modification du produit ${title}` });
    });
}

exports.sum = (a, b)=>{
    return a+b
}



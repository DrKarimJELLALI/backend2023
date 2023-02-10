const express = require('express');
const router = express.Router();
const article = require("../models/article")
// afficher la liste des articles.
router.get('/liste', async (req, res,) => {
    try {
        const cat = await article.find().populate("scategorieID").exec()
        res.status(200).json(cat)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// créer un nouvelle catégorie
router.post('/creat', async (req, res) => {
    const { reference, designation, prix, marque, qtestock, imagearticle, scategorieID } = req.body
    //const cat1=new article ({nomarticle:nomarticle,imagescat:imagescat})
    //une 2 eme possibilité d'écriture 
    const art = new article(req.body)
    try {
        await art.save();
        res.status(200).json(art)                      
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// chercher une catégorie
router.get('/:articleId', async (req, res) => {
    try {
        const art = await article.findById(req.params.articleId);
        res.status(200).json(art);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// modifier une catégorie
router.put('/:articleId', async (req, res) => {
    const { reference, designation, prix, marque, qtestock, scategorieID } = req.body;
    const id = req.params.articleId;
    try {
        const art = {
            reference: reference, designation:designation, prix: prix, marque:marque, qtestock:qtestock, scategorieID: scategorieID
        };
        console.log(art)
        await article.findByIdAndUpdate(id, art);
        res.json(art);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer une catégorie
router.delete('/:articleId', async (req, res) => {
        const id = req.params.articleId;
        await article.findByIdAndDelete(id);
        res.json({ message: "article deleted successfully." });
});
module.exports = router;
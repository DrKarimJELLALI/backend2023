const express = require('express');
const router = express.Router();
const scategorie = require("../models/scategorie")
// afficher la liste des scategories.
router.get('/liste', async (req, res,) => {
    try {
        const cat = await scategorie.find().populate("categorieID").exec()
        res.status(200).json(cat)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// créer un nouvelle catégorie
router.post('/creat', async (req, res) => {
    const { nomscategorie, imagescat,categorieID } = req.body
    //const cat1=new scategorie ({nomscategorie:nomscategorie,imagescat:imagescat})
    //une 2 eme possibilité d'écriture 
    const scat = new scategorie(req.body)
    try {
        await scat.save();
        res.status(200).json(scat)                      
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// chercher une catégorie
router.get('/:scategorieId', async (req, res) => {
    try {
        const scat = await scategorie.findById(req.params.scategorieId); 
        res.status(200).json(scat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// modifier une catégorie
router.put('/:scategorieId', async (req, res) => {
    const { nomscategorie, imagescat, categorieID } = req.body;
    const id = req.params.scategorieId;
    try {
        const scat = {
            nomscategorie: nomscategorie, imagescat: imagescat, categorieID: categorieID
        };
        console.log(scat)
        await scategorie.findByIdAndUpdate(id, scat);
        res.json(scat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer une catégorie
router.delete('/:scategorieId', async (req, res) => {
        const id = req.params.scategorieId;
        await scategorie.findByIdAndDelete(id);
        res.json({ message: "scategorie deleted successfully." });
});
module.exports = router;
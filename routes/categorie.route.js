const express = require('express');
const router = express.Router();
const categorie = require("../models/categorie")
// afficher la liste des categories.
router.get('/liste', async (req, res,) => {
    try {
        const cat = await categorie.find()
        res.status(200).json(cat)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// créer un nouvelle catégorie
router.post('/creat', async (req, res) => {
    const { nomcategorie, imagecategorie } = req.body
    //const cat1=new categorie ({nomcategorie:nomcategorie,imagecategorie:imagecategorie})
    //une 2 eme possibilité d'écriture 
    const cat1 = new categorie(req.body)
    try {
        await cat1.save();
        res.status(200).json(cat1)                      //on peut ajouter (.send) entr res. et status (res.send.status)
    }
    catch (error) {
        res.status(404).json({ message: error.message })
    }
});
// chercher une catégorie
router.get('/:categorieId', async (req, res) => {
    try {
        const cat = await categorie.findById(req.params.categorieId);
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
});
// modifier une catégorie
router.put('/:categorieId', async (req, res) => {
    const { nomcategorie, imagecategorie } = req.body;
    const id = req.params.categorieId;
    try {
        const cat1 = {
            nomcategorie: nomcategorie, imagecategorie: imagecategorie, _id: id
        };
        console.log(cat1)
        await categorie.findByIdAndUpdate(id, cat1);
        res.json(cat1);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
// Supprimer une catégorie
router.delete('/:categorieId', async (req, res) => {
        const id = req.params.categorieId;
        await categorie.findByIdAndDelete(id);
        res.json({ message: "categorie deleted successfully." });
});
module.exports = router;
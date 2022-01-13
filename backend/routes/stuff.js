const express = require('express');

const router = express.Router();

//-------------------------- model -----------------------------------
const Sauce = require('../models/sauce');   // model sauce
const User = require('../models/user');     // model user



//----------------------- gestion des users -------------------------------
// requete POST , Ajout d'un utilisateur dans la base de données
router.post('/api/auth/signup', (req, res, next) => {
    //delete req.body._id;  // supression de l'id créé par node
    const User = new User({
        ...req.body   // spread  // title: req.body.title
    });
    User.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});

// requete POST , verification d'un utilisateur dans la base de données,retourne l'id + token signé
router.post('/api/auth/login', (req, res, next) => {
    //delete req.body._id;  // supression de l'id créé par node
    const User = new User({
        ...req.body   // spread  // title: req.body.title
    });
    User.save()
        .then(() => res.status(201).json({ 
            message: 'Objet enregistré !',

        }))
        .catch(error => res.status(400).json({ error }));
});



//------------------------------ gestion des sauces -------------------------------
// requete POST
router.post('/', (req, res, next) => {
    //delete req.body._id;  // supression de l'id créé par node
    const Sauce = new Sauce({
        ...req.body   // spread  // title: req.body.title
    });
    Sauce.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});


// requete GET ( cherche un objet par son ID)
router.get('/:id', (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(Sauce => res.status(200).json(Sauce))
      .catch(error => res.status(404).json({ error }));
  });
// requete PUT ( modifier un objet par son ID)
router.put('/:id', (req, res, next) => {
    Sauce.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

// requete DELETE ( supprime un objet par son ID)
router.delete('/:id', (req, res, next) => {
    Sauce.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

// requete ( renvoi toutes les sauces)
router.use('/api/sauces', (req, res, next) => {
    Sauce.find()
        .then(Sauces => res.status(200).json(Sauces))
        .catch(error => res.status(400).json({ error }));
  });




module.exports = router;
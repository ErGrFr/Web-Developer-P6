const express = require('express');

const router = express.Router();

//-------------------------- model -----------------------------------
const Thing = require('../models/thing');



// requete POST

router.post('/', (req, res, next) => {
    delete req.body._id;  // supression de l'id créé par node
    const thing = new Thing({
        ...req.body   // spread  // title: req.body.title
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
        .catch(error => res.status(400).json({ error }));
});


// requete GET ( cherche un objet par son ID)
router.get('/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });
// requete PUT ( modifier un objet par son ID)
router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

// requete DELETE ( supprime un objet par son ID)
router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

// requete ( renvoi tous les objets)
router.use('/', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
  });




module.exports = router;
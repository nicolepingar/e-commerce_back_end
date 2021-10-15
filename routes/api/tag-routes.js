const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
// The /api/tags endpoint
// find all tags
router.get('/', (req, res) => {
  Tag.findAll({
    include: [{
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    },
    ],
  })
    .then(tagData => res.json(tagData))
    .catch(error => {
      res.status(500).json(error);
    })
});
// find a single tag by id number
router.get('/:id', (req, res) => {
  Tag.findByPk(req.params.id, {
    include: [{
      model: Product,
      attributes: ['product_name', 'price', 'stock', 'category_id']
    },
    ],
  })
    .then(tagData => res.json(tagData))
    .catch(error => {
      res.status(500).json(error);
    })
});
// create a new tag
router.post('/', (req, res) => {
  Tag.create({ tag_name: req.body.tag_name })
    .then((newTag) => {
      res.json(newTag);
    })
    .catch((err) => {
      res.json(err);
    });
});
// update a tag's name by id number
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id,
      }
    }
  )
    .then((updatedTag) => {
      // Sends the updated book as a json response
      res.json(updatedTag);
    })
    .catch((err) => res.json(err));
});
// delete a tag by id number
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id,
    }
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});
module.exports = router;

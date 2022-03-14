const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll().then()((tags) => {
    res.json(tags);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Product.findOne({
    where: {
      id: req.params.id
    },
  })
  .then((tags) => {
    res.json(tags);
  });
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.bulkCreate([
    {
      id: req.params.id,
      product_id: req.params.product_id,
      tag_id: req.params.tag_id
    }
  ])
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id: req.body.id,
      tag_name: req.body.tag_name
    },
    {
      where: {
        tag_id: req.params.tag_id,
      },
    }
  )
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      category_id: req.params.tag_id,
    },
  })
  .then((deletedTag) => {
    res.json(deletedTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;

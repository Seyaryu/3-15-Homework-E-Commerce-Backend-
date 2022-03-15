const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then((categoryData) => {
    res.json(categoryData);
  })
  .catch((err) => {
    res.json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({message: 'No categories found'});
      return;
    }
  })
  .catch((categoryData) => {
    res.json(categoryData);
  }); 
});

router.post('/', (req, res) => {
  // create a new category
  Category.create([
    {
      category_name: req.params.category_name,
    }
  ])
  .then(categoryData => {
    res.json(categoryData);
  })
  .catch((err) => {
    console.log;
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    req.body, 
    {
      where: {
        category_id: req.params.id,
      },
    })
    .then((categoryData) => {
      if (!categoryData) {
        res.status(404).json({message: 'No categories found with this id'});
        return;
      }
    })
    .catch((categoryData) => {
      res.json(categoryData);
    }); 
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      category_id: req.params.category_id,
    },
  })
  .then((categoryData) => {
    if (!categoryData) {
      res.status(404).json({message: 'No categories found with this id'});
      return;
    }
  })
  .catch((categoryData) => {
    res.json(categoryData);
  }); 
});

module.exports = router;

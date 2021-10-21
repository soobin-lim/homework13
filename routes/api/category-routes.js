const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  const allcategories = await Category.findAll(
    {
      include: [Product] //, through: Trip, as: 'location_travellers'
    }
  )
  // be sure to include its associated Products
  res.json(allcategories);
});

router.get('/:id', async (req, res) => {
  const find_one_category = await Category.findByPk(req.params.id);
  // find one category by its `id` value
  // be sure to include its associated Products
  res.json(find_one_category);
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const result = await Category.create({
      category_name: req.body.category_name,
    })
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const result = await Category.update(
      {
        category_name: req.body.category_name
      }
      ,
      {
        where: {
          id: req.params.id
        }
      }
    )
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryData = await Category.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
  res.status(200).json(categoryData);
});

module.exports = router;

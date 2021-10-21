const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll(
    {
      include:
        [{
          model: Product
        }]
    }
  );
  res.status(200).json(tagData);
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  const tagData = await Tag.findByPk(req.params.id, { include: { model: Product } });
  // find a single tag by its `id`
  // be sure to include its associated Product data
  res.status(200).json(tagData);
});

router.post('/', async (req, res) => {
  const result = await Tag.create({
    tag_name: req.body.tag_name
  })
  // create a new tag
  res.json(result);
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const result = await Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(result);
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const result = await Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  res.status(200).json(result);

});

module.exports = router;

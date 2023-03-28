//require
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

//GET one route
router.get('/:id', async (req, res) => {
  // find one category b-y its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      //JOIN with product
      //
      include: [Product]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'no data found with this ID' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

//GET HELP i dont know if i did this right(below)
//CREATE CATEGORY
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  }
});

//GET HELP
router.put('/:id', (req, res) => {
  // update product data
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      // find all associated tags from ProductTag
      res.status(200).json(category);
    }).catch((err) => res.status(400).json(err));
  // .then((categoryTags) => {
  //   // get list of current tag_ids
  //   const categoryTagIds = categoryTags.map(({ tag_id }) => tag_id);
  //   // create filtered list of new tag_ids
  //   const newCategoryTags = req.body.tagIds
  //     .filter((tag_id) => !categoryTagIds.includes(tag_id))
  //     .map((tag_id) => {
  //       return {
  //         category_id: req.params.id,
  //         tag_id,
  //       };
  //     });
  // figure out which ones to remove
  // const productTagsToRemove = productTags
  //   .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
  //   .map(({ id }) => id);

  // run both actions
  // return Promise.all([
  //   ProductTag.destroy({ where: { id: productTagsToRemove } }),
  //   ProductTag.bulkCreate(newProductTags),
  // ]);
  // })
  // .then((updatedProductTags) => res.json(updatedProductTags))
  // .catch((err) => {
  //   // console.log(err);
  //   res.status(400).json(err);
  // });
});

//DELETE CATEGORIES
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  // Category.destroy({ where: { id: req.params.id } }).then(category => res.status(200).json(category))
  try {
    const categoryData = await Category.destroy({ where: { id: req.params.id } });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(200).json(categoryData);
  }
});

module.exports = router;

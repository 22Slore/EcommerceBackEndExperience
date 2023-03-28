// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category

Product.belongsTo(Category, {
  //define the thrid table needed to store foreign keys
  foreignKey: "category_id",
  onDelete: "SET null",
});

// Categories have many Products

Category.hasMany(Product, {
  foreignKey: "category_id",
  onDelete: "SET null",
});

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: "product_id",
});

// Tags belongToMany Products (through ProductTag)

Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false,
  },
  foreignKey: "tag_id",
});



module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};

//i completed
const Plants = require('./plants');
const Post = require('./post');
const Comment = require('./comment');
const User = require('./User');
const Category = require('./category');
const Collection = require('./collection');
//dropping db leaving comment to commit TEST"
// TO DO change associations for plants belong to Users
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})
Post.belongsTo(Category, {
  foreignKey: 'type',
  onDelete: 'CASCADE'
})

Category.hasMany(Post, {
  foreignKey: 'type',
  onDelete: 'CASCADE'
})

Plants.hasMany(Collection, {
  foreignKey: 'plant_id',
  onDelete: 'CASCADE'
})
Collection.belongsTo(Plants)

module.exports = {
  Plants,
  Post,
  Comment,
  User,
  Category,
  Collection
}

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth.js");
//item model
const Item = require("../../models/item.js");

//@route GET api/item
//@description get all items
//@access public
router.get("/", (req, res) => {
  Item.find()
    .sort({
      date: -1
    })
    .then(items => res.json(items));
});
//@route POST api/item
//@description create a post
//@access private
router.post("/", auth, (req, res) => {
  const newItem = new Item({
    name: req.body.name
  });
  newItem.save().then(item => res.json(item));
});
//@route DELETE api/item/:id
//@description delete an item
//@access private
router.delete("/:id", auth, (req, res) => {
  Item.findById(req.params.id)
    .then(item =>
      item.remove().then(() => res.json({ msg: "item successfully removed" }))
    )
    .catch(err => res.status(404).json({ msg: "item not found" }));
});

module.exports = router;

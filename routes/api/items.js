const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Item Model
const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public
router.get("/", auth, async(req, res) => {
  try {
    const items = await Item.find({ user: req.user.id }).populate("user", ["name", "email"]).sort({ date: -1 });
    return res.json(items);
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  } 
});

// @route   POST api/items
// @desc    Create An Item
// @access  Private
router.post("/", auth, async(req, res) => {
  if(!req.body.name) return res.status(400).json({ message: "Please add an item!" });
  
  const newItem = new Item({
    user: req.user.id,
    name: req.body.name,
  });
  
  try {
    const item = await newItem.save();
    return res.json(item);
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

// @route   DELETE api/items
// @desc    Delete An Item
// @access  Private
router.delete("/:id", auth, async(req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (item.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await item.remove();
    
    res.json({msg: 'Contact removed'});
  } catch(err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

const router = require("express").Router();
const {checkLogin} = require("../../middleware/auth.middleware")
const fileUploader = require("../../config/cloudinary.config");
const UserModel = require("../../models/User.model");

/* GET home page */
router.get("/", checkLogin, (req, res, next) => {
  res.render("profile");
});

router.route("/edit")
.get((req, res)=>{
  res.render("users/edit-profile")
})
.post(fileUploader.single("imgUrl"), (req, res)=>{
  const id = req.session.currentUserId
  const username = req.body.username

  const imgUrl = req.file.path //cloudinary URL in path

  UserModel.findByIdAndUpdate(id, {username, imgUrl}, { new: true })
  .then(user =>res.render("users/user-profile", { userInSession: user }))
})

module.exports = router;
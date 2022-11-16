const express = require("express");
const {
  adminLogin,
  addNewMarkList,
  getStudentsMarkInfo,
  deleteMarkList,
  getMarkInfoForEdit,
  editingMark,

} = require("../controllers/admin/admin");
const { authAdmin } = require("../middlewares/adminAuth");

const router = express.Router();

router.post("/adminLogin", adminLogin);
router.post("/addNewMarkList", authAdmin, addNewMarkList);
router.get("/getStudentsInfo", authAdmin, getStudentsMarkInfo);
router.delete("/deleteMarkList/:enrollNum", authAdmin, deleteMarkList);
router.get("/getMarkInfoForEdit/:enrollNum" ,authAdmin,getMarkInfoForEdit)
router.put("/editingMark/:enrollNum" ,authAdmin,editingMark)

module.exports = router;

const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/auth-controller");

router.get("/signup", authControllers.getSignup);
router.post("/signup", authControllers.postSignup);
router.get("/login", authControllers.getSignin);
router.post("/login", authControllers.postSignin);

module.exports = router;

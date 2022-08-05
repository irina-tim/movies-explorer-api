const router = require('express').Router();
const celebrate = require('celebrate');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', celebrate.celebrate({
  body: celebrate.Joi.object().keys({
    name: celebrate.Joi.string().min(2).max(30).required(),
    email: celebrate.Joi.string().email().required(),
  }),
}), updateUserInfo);

module.exports = router;

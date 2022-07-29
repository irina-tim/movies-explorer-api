const router = require('express').Router();
const celebrate = require('celebrate');
const usersRoutes = require('./users');
const moviesRoutes = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', celebrate.celebrate({
  body: celebrate.Joi.object().keys({
    email: celebrate.Joi.string().email().required(),
    password: celebrate.Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate.celebrate({
  body: celebrate.Joi.object().keys({
    name: celebrate.Joi.string().min(2).max(30).required(),
    email: celebrate.Joi.string().email().required(),
    password: celebrate.Joi.string().required(),
  }),
}), createUser);

router.use(auth);
router.use('/', usersRoutes);
router.use('/', moviesRoutes);

router.all('*', (req, res, next) => {
  next(new NotFoundError('Ошибка 404. Путь не найден.'));
});

module.exports = router;

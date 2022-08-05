const router = require('express').Router();
const celebrate = require('celebrate');
const { getUserMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { urlMatchRegExp } = require('../utils/constants');

router.get('/movies', getUserMovies);
router.post('/movies', celebrate.celebrate({
  body: celebrate.Joi.object().keys({
    country: celebrate.Joi.string().required(),
    director: celebrate.Joi.string().required(),
    duration: celebrate.Joi.number().required(),
    year: celebrate.Joi.string().required(),
    description: celebrate.Joi.string().required(),
    image: celebrate.Joi.string().pattern(urlMatchRegExp).required(),
    trailerLink: celebrate.Joi.string().pattern(urlMatchRegExp).required(),
    thumbnail: celebrate.Joi.string().pattern(urlMatchRegExp).required(),
    movieId: celebrate.Joi.number().required(),
    nameRU: celebrate.Joi.string().required(),
    nameEN: celebrate.Joi.string().required(),
  }),
}), createMovie);

router.delete('/movies/:_id', celebrate.celebrate({
  params: celebrate.Joi.object().keys({
    _id: celebrate.Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;

import { celebrate, Segments, Joi } from 'celebrate';

const authenticateValidation = celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    },
});

const refreshValidation = celebrate({
    [Segments.BODY]: {
        token: Joi.string().required(),
    },
});

export { authenticateValidation, refreshValidation };

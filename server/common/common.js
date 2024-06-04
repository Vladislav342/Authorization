const userService = require('../service/userService');
const { validationResult } = require('express-validator');
const ApiError = require('../exceptions/apiError');


class CommonUtils {
    async incomingData(req, res, nameOfReq) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(ApiError.BadRequest('Validation Error', errors.array()));
        }
        const { email, password } = req.body;
        const userData = await userService[`${nameOfReq}`](email, password);
        res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 1000, httpOnly: true });
        return res.json(userData);
    }

}


module.exports = new CommonUtils();
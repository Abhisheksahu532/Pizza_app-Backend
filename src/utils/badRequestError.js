const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParams){
        //invalidParams: []

        let message = '';
        invalidParams.forEach(params => message += `${params}\n `);

        super(`The request has the following inavlid parameters \n${invalidParams} `, 400);

    }
}

module.exports = BadRequestError;
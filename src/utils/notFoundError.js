const AppError = require("./appError");

class NotFoundError extends AppError{
    constructor(properties, resource){
        //properties: []
        // properties = [];

        let notFoundProperties = "";
        properties.forEach(property => notFoundProperties += `${property}, `);

        super(`Not able to find properties: ${notFoundProperties} for the resource ${resource} `, 404);

    }

}

module.exports = NotFoundError;
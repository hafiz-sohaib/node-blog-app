exports.errorHandler = (error, model_name) => {
    let errors = {};

    if (error.code === 11000) {
        Object.keys(error.keyValue).forEach(elem=> {
            errors[elem] = `This ${elem} already exists`
        })
        return errors;
    }

    if (error.message.includes(`${model_name} validation failed`)) {
        Object.values(error.errors).map(({properties})=> {
            errors[properties.path] = properties.message;
        })
        return errors;
    }
}
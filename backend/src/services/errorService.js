const mongoose = require("mongoose");

class ErrorService {
  error = {
    message: "Sorry! Something went wrong. Please try again!",
    status: 500,
  };

  handleError(error) {
    if (error instanceof mongoose.Error.ValidationError || error?.code) {
      this.handleMongooseError(error);
    } else if (error instanceof Error) {
      console.log("Inside Custom error: ");
      this.handleCustomError(error);
    }
    return this.error;
  }

  handleCustomError(error) {
    this.error.message = error.message;
    this.error.status = 400;
    return this.error;
  }

  handleMongooseError(mongooseError) {
    if (mongooseError.errors) {
      this.error.message =
        mongooseError.errors[Object.keys(mongooseError.errors)[0]].message;
      this.error.status = 400;
    } else if (mongooseError.code === 11000) {
      const [[field, value]] = Object.entries(mongooseError.keyValue);
      if (field.includes("email")) {
        this.error.message = `An account with '${value}' already exists.`;
      }
      this.error.status = 409;
    }
    console.log("Error in errorService (handleMongooseError)", this.error);
    return this.error;
  }
}

module.exports = ErrorService;

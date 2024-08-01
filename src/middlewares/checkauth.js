import jwt from "jsonwebtoken";

export const checkAuth = (request, response, next) => {
  if (request.headers.authorization) {
    const token = request.headers.authorization.split(" ")[1];
    jwt.verify(token, "123456", (error, data) => {
      if (error) {
        console.log(error);
        if (error.name == "TokenExpiredError") {
          return response.status(400).json({ message: "Token het han" });
        } else if (error.name == "JsonWebTokenError") {
          return response.status(400).json({ message: "Token khong hop le" });
        }
      }
      next();
    });
  }
  //   next();
};

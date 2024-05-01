import jwt from "jsonwebtoken";
import User from "../model/users.model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const [scheme, token] = req.headers.authorization.split(" ");
    console.log(token);

    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No token provided" });
    }

    switch (scheme) {
      case "Bearer":
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decodedToken.userId;

        const user = await User.findById(userId);

        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
        req.user = user;
        break;
      default:
        return res
          .status(403)
          .json({ error: "Unsupported authorization scheme" });
    }

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

export default authMiddleware;

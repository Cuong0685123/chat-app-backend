import authService from "../service/auth.service.js";

class AuthController {
  async signup(req, res) {
    try {
      const { phoneNumber, password, displayName, avatar } = req.body;

      const result = await authService.signup({
        phoneNumber,
        password,
        displayName,
        avatar,
      });

      res.status(201).json(result);
    } catch (error) {
      console.error("Error registering user:", error);
      res
        .status(500)
        .json({ error: "Error registering user", details: error.message });
    }
  }

  async login(req, res) {
    try {
      const { phoneNumber, password } = req.body;
      const result = await authService.login(phoneNumber, password);

      res.status(200).json(result);
    } catch (error) {
      console.error("Error logging in:", error);
      res
        .status(500)
        .json({ error: "Error logging in", details: error.message });
    }
  }
}
const authController = new AuthController();
export default authController;

import authService from "../services/auth.services.js";

class AuthController{

  async signup  (req, res)  {
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
      res.status(500).json({ error: "Error registering user", details: error.message });
    }
  };



// export const login = async (req, res) => {
//   try {
//     if (!req.body.phoneNumber || !req.body.password) {
//       return res
//         .status(400)
//         .json({ error: "Phone number and password are required" });
//     }

//     const user = await User.findOne({ phoneNumber: req.body.phoneNumber });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const isPasswordValid = bcrypt.compare(req.body.password, user.password);
//     if (!isPasswordValid) {
//       return res
//         .status(401)
//         .json({ error: "Invalid phone number or password" });
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     return res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     return res.status(500).json({ error: "Error logging in" });
//   }
// };


}
const authController = new AuthController();
export default authController;

import UserModel from "../models/users.js";

// export const register = async (req, res) => {
//   try {
//     const password = req.body.password;
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     const doc = new UserModel({
//       fullname: req.body.fullname,
//       email: req.body.email,
//       companyName: req.body.companyName,
//       passwordHash: hash,
//       avatarUrl: req.body.avatarUrl,
//     });

//     const user = await doc.save();

//     const token = jwt.sign(
//       {
//         _id: user._id,
//       },
//       "secret",
//       { expiresIn: "30d" }
//     );

//     const { passwordHash, ...userData } = user._doc;

//     res.json({
//       ...userData,
//       token,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       massage: "Registration error",
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const user = await UserModel.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).json({
//         massage: "User not found",
//       });
//     }
//     const isValonPass = await bcrypt.compare(
//       req.body.password,
//       user._doc.passwordHash
//     );

//     if (!isValonPass) {
//       return res.status(404).json({
//         massage: "Wrong login or password",
//       });
//     }
//     const token = jwt.sign(
//       {
//         _id: user._id,
//       },
//       "secret",
//       { expiresIn: "30d" }
//     );

//     const { passwordHash, ...userData } = user._doc;

//     res.json({
//       ...userData,
//       token,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       massage: "Authorization error",
//     });
//   }
// };

// export const getMe = async (req, res) => {
//   try {
//     const user = await UserModel.findById(req.userId);
//     if (!user) {
//       return res.status(404).json({
//         massage: "User not found",
//       });
//     }
//     const { passwordHash, ...userData } = user._doc;

//     res.json({
//       ...userData,
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       massage: "err",
//     });
//   }
// };

export const createUser = async (req, res) => {
  try {
    const userEntity = await UserModel.findOne({
      phone: req.body.phone,
      email: req.body.email,
    }).exec();

    if (userEntity == null) {
      const doc = new UserModel(req.body);

      const user = await doc.save();
      res.status(201).json(user);
      return;
    }
    res.status(200).json(userEntity);

  } catch (err) {
    if (err.status === 404) {
      return res.status(404).json({
        massage: "err 404",
      });
    }
    console.log(err);
    return res.status(500).json({
      massage: "Registration error",
    });
  }
};


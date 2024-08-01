import { registerSchema, signinSchema } from "../schemas/auth";
import User from "../models/auth";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (request, response) => {
  // lay du lieu user gui len
  //   console.log(request.body.username);
  const { username, email, password } = request.body;
  // kiem tra tinh hop le cua du lieu

  const { error } = registerSchema.validate(request.body, {
    abortEarly: false,
  });

  // neu du lieu khong hop le thi thong bao loi
  if (error) {
    const errorMessage = error.details.map((message) => message.message);
    return response.status(400).json({ message: errorMessage });
  }
  // kiem tra xem user da ton tai hay chua
  const existUser = await User.findOne({ email: email });
  if (existUser) {
    return response.status(400).json({ message: "Email da ton tai" });
  }
  // ma hoa mat khau
  const hashedPassword = await bcryptjs.hash(password, 10);
  //   console.log(hashedPassword);
  // luu thong tin user dang ky vao DB
  const user = await User({ username, email, password: hashedPassword }).save();
  // tra ve thong bao dang ky thanh cong va thong tin dang ky (khong bao gom password)
  user.password = undefined;
  response.status(201).json({
    message: "Dang ky thanh cong",
    data: user,
  });
};
export const signin = async (request, response) => {
  //nhận dữ liệu từ client gửi lên
  const { email, password } = request.body;
  //kiểm tra tính hợp lệ của dữ liệu
  const { error } = signinSchema.validate(request.body, { abortEarly: false });
  //nếu dữ liệu không hợp lệ thì trả về thông báo lỗi
  if (error) {
    const errorMessage = error.details.map((message) => message.message);
    return response.status(400).json({ message: errorMessage });
  }
  //kiểm tra xem user có tồn tại hay không
  const existUser = await User.findOne({ email: email });
  //nếu user không tồn tại thì trả về thông báo lỗi
  if (!existUser) {
    return response.status(400).json({ message: "Email không tồn tại" });
  }
  //kiểm tra mật khẩu có đúng với mật khẩu đã lưu trong db không
  const validPassword = await bcryptjs.compare(password, existUser.password);
  //nếu mật khẩu không đúng thì trả về thông báo lỗi
  if (!validPassword) {
    return response.status(400).json({ message: "Mật khẩu không đúng" });
  }

  //tạo token
  const token = jwt.sign({ id: existUser._id }, "123456", { expiresIn: "30s" });
  response.cookie("token", token, { httpOnly: true });

  //nếu đúng trả về thông báo đăng nhập thành công và thông tin user đăng nhập
  existUser.password = undefined;
  response.status(200).json({
    message: "Đăng nhập thành công",
    data: existUser,
    token,
  });
};

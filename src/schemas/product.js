import Joi from "joi";

export const productValidattion = Joi.object({
  name: Joi.string().required().min(6).messages({
    "any.required": "Ten san pham la truong bat buoc",
    "string.empty": "Ten san pham khong duoc de trong",
    "string.min": " Ten san pham phai co it nhat 6 ky tu",
  }),
  price: Joi.number().required().messages({
    "any.required": "Gia san pham la truong bat buoc",
    "number.base": "Gia san pham phai la so",
  }),
});

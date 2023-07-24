import * as yup from "yup"

export const categorySchema = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  title: yup.string().required("Title is required"),
  // image: yup.string().url("Image must be url").required(),
  description: yup.string().required(),
  createdAt: yup.date().required("please add your date "),
});

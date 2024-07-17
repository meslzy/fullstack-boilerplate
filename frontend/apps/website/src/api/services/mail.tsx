import xior from "xior";

import { InferType, object, string } from "yup";

import { errorInterceptor } from "~api/shared/interceptors";

const mailApi = xior.create({
  baseURL: "/api/mail",
});

mailApi.interceptors.response.use(null, errorInterceptor);

const contactMail = {
  schema: object({
    name: string().required(),
    email: string().email().required(),
    message: string(),
  }),
  async send(data: InferType<typeof this.schema>) {
    return mailApi.post("/contact", data);
  },
};

export {
  contactMail,
};

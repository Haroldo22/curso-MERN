import { ENV } from "../utils";

export class Auth {
  baseApi = ENV.BASE_API;

  async register(data = {}) {
    try {
      const url = `${ENV.BASE_API}/${ENV.API_ROUTES.REGISTER}`;
      const params = {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      };

      console.log(params);
      console.log(params.body);

      const response = await fetch(url, params);
      const result = await response.json();

      if (response.status !== 200) throw result;

      return result;
    } catch (error) {
      throw error;
    }
  }
}

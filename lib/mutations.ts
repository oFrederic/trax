import fetcher from "./fetcher";

export const auth = (
  target: "signin" | "signup",
  body: { email: string; password: string }
) => {
  return fetcher(`/${target}`, body);
};

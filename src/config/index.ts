export const config = {
  port: process.env.PORT || 3000,
  environment: process.env.NODE_ENV || "development",
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || "************",
  SENDER_EMAIL: process.env.SENDER_EMAIL || "fake-email@example.com",
  OTP_SECRET_KEY: process.env.OTP_SECRET_KEY || "############",
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || "############",
};

export const cookieKeys = {
  AUTH_COOKIE_NAME: "atkn",
};

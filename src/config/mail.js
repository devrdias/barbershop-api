// Amazon SES / Malingun - production env
// Mailtrap (https://mailtrap.io/) - development env

export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
  default: {
    from: 'BarberShop <noreply@barbershop.com>',
  },
};

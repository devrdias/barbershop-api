// Amazon SES / Malingun - production env
// Mailtrap (https://mailtrap.io/) - development env

export default {
  host: 'smtp.mailtrap.io',
  port: 2525,
  secure: false,
  auth: {
    user: '620bd610326ab8',
    pass: '2058e58c097176',
  },
  default: {
    from: 'BarberShop <noreply@barbershop.com>',
  },
};

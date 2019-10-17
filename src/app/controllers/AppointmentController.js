import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import Appointment from '../models/Appointment';
import Notification from '../schemas/Notification';
import User from '../models/User';
import File from '../models/File';
import Queue from '../../lib/Queue';

import CancellationMail from '../jobs/CancellationMail';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      limit: 20,
      offset: (page - 1) * 20,
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.status(200).json(appointments);
  }

  async store(req, res) {
    console.debug(req.body);
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;
    /**
     * Check if provider_id is a provider
     */
    const { provider } = await User.findOne({
      where: { id: provider_id, provider: true },
    });
    if (!provider) {
      return res
        .status(401)
        .json({ error: 'You need a valid Provider to create an appointment.' });
    }
    /**
     * Check if appointment is not created by same user
     */
    if (provider_id === req.userId) {
      return res
        .status(401)
        .json({ error: 'You cant create an appointment for yourself' });
    }
    /**
     * Check for past dates
     */
    const hourStart = startOfHour(parseISO(date));
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not permitted.' });
    }
    /**
     * Check date/hour availability
     */
    const checkAvailability = await Appointment.findOne({
      where: {
        provider_id,
        canceled_at: null,
        date: hourStart,
      },
    });
    if (checkAvailability) {
      return res
        .status(400)
        .json({ error: 'Appointment date/hour is not available.' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date: hourStart,
    });

    /**
     * Notify appointment provider
     */
    const user = await User.findByPk(req.userId);
    const formatedDate = format(hourStart, "dd'th' MMMM ' - ' H:mm'h", {
      locale: enUS,
    });
    await Notification.create({
      content: `You have a new appointment! Customer ${user.name} scheduled to ${formatedDate}`,
      user: provider_id,
    });

    return res.status(200).json(appointment);
  }

  async delete(req, res) {
    const appointment = await Appointment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });

    if (appointment.user_id !== req.userId) {
      return res
        .status(401)
        .json({ error: 'You dont have permission to cancel this appointment' });
    }

    const dateWithSub = subHours(appointment.date, 2);
    if (isBefore(dateWithSub, new Date())) {
      return res
        .status(401)
        .json({ error: 'Canot cancel appointment with 2 hours to go ' });
    }

    appointment.canceled_at = new Date();
    await appointment.save();

    /**
     * Send cancellation  email
     */
    Queue.add(CancellationMail.key, {
      appointment,
    });

    return res.status(200).json(appointment);
  }
}

export default new AppointmentController();

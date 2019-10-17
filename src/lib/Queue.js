import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }

  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee
        .on('failed', this.handleFailure)
        .on('succeeded', this.handleSucceeded)
        .on('ready', this.handleReady)
        .process(handle);
    });
  }

  handleFailure(job, error) {
    console.log(`Queue ${job.queue.name}: FAILED`, error.message);
  }

  handleSucceeded(job, result) {
    console.log(`Job ${job.queue.name} succeeded with result: ${result}`);
  }

  handleReady() {
    console.log('Queue now ready to start doing things');
  }
}

export default new Queue();

const cron = require('node-cron');
const { Op } = require('sequelize'); // Make sure you import Op from Sequelize
const JobPost = require('../models/jobPostModel'); // Adjust path according to your structure

cron.schedule('0 0 * * *', async () => {
    try {
        const expiredJobs = await JobPost.update(
            { status: 'Closed' },
            {
                where: {
                    status: 'Open',
                    expirationDate: {
                        [Op.lt]: new Date() // Check if expiration date is past today
                    }
                }
            }
        );
        console.log(`${expiredJobs.length} jobs marked as closed.`);
    } catch (error) {
        console.error('Error updating job statuses:', error);
    }
});
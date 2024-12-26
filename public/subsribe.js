const cron = require('node-cron');
const db = require('./king');

cron.schedule('0 0 * * *', async () => {
    const today = new Date();
    const fiveDaysLater = new Date(today);
    fiveDaysLater.setDate(today.getDate() + 5);


    const subscriptions = await db.query(`
        SELECT * FROM subscriptions
        WHERE subscription_end_date = ?
          AND status = 'active'
    `, [fiveDaysLater]);

    subscriptions.forEach(subscription => {
        sendUserNotification(subscription.user_id);


        addToAdminList(subscription);
    });
});




function sendUserNotification(userId) {
    const user = getUserDetails(userId);
    sendEmail(user.email, 'your gym subscription is about to expire!');
}

function addToAdminList(subscription) {
    console.log(`subscription expiring: user ID ${subscription.user_id}`);
}
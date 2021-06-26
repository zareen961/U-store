const asyncHandler = require('express-async-handler')

const NotificationClient = require('../models/NotificationClient')

// to add a user's new client to NotificationClient
const notificationAddClient = asyncHandler(async (req, res) => {
    const { notificationClientToken } = req.body

    const foundUser = await NotificationClient.countDocuments({ user: req.authUser._id })
    if (foundUser > 0) {
        await NotificationClient.updateOne(
            { user: req.authUser._id },
            {
                $push: {
                    tokens: {
                        $each: [notificationClientToken],
                        $position: 0,
                    },
                },
            }
        )
    } else {
        const newNotificationClient = new NotificationClient({
            user: req.authUser._id,
            tokens: [notificationClientToken],
        })

        await newNotificationClient.save()
    }

    res.status(200).json({ message: 'New notification client token added!' })
})

module.exports = {
    notificationAddClient,
}

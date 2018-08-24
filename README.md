# CONVO_HISTORY + Pub/Sub + SNS + IoT + SQS for Push Notifications
This serverless service handles the pub/sub and push notifications for messages being saved into DYN:CONVO_HISTORY table.
It works like this:


0. AgentCRMs are all registered with AWS IoT for web push notifications, and in SQL we manage who is concerned about what messages from which senders

1. DYN:CONVO_HISTORY onInsert() triggers a lambda function (fn:dynConvoHistoryOnInsert) which publishes the new message to a AWS Pub/Sub Topic.
        - Topics may differ depending on who the message is intended for (which is what the lambda checks before publishing)
2. AWS Pub/Sub Topic triggers a lambda function (fn:checkRecipientsFor<TOPIC>) that queries SQL for intended recipients, and checks if those recipient client IoT devices are online
        - 2a. Online client devices are sent an IoT push notification
        - 2b. Offline client devices are ignored. Instead a notification is sent to AWS SQS (if there are no offline devices, we still send the notification to SQS)
3. AWS SQS (Simple Queue Service) will hold onto the notifications for up to 4 days (or a specified duration)
        - 3a. Client devices (eg. AgentCRMs) can query SQS when the come online
        - 3b. SQS is a queued list of notifications, so a future notification can signal that a message has been handled by another agent, which will prevent duplicate message handling
4. Online client devices that receive the IoT push notification will handle the logic on the frontend
        - In the case of the AgentCRM, the subscribed agents would get a "NEW MESSAGE" on their dashboard, which they can respond to
        - The first agent who responds to the message will trigger an UPDATE to DYN:CONVO_HISTORY for that db record, indicating that a message has been handled. This triggers a DYN onUpdate()

5. DYN:CONVO_HISTORY onUpdate() triggers a lamdbda function (fn:dynConvoHistoryOnUpdate) which publishes the handled message to a AWS Pub/Sub Topic.
        - Again, Topics may differ depending on who the message is intended for
6. AWS Pub/Sub Topic triggers a lambda function (fn:checkRecipientsFor<TOPIC>) that queries SQL for intended recipients, and checks if those recipient client IoT devices are online
        - 2a. Online client devices are sent an IoT push notification
        - 2b. Offline client devices are ignored. Instead a notification is sent to the same AWS SQS (if there are no offline devices, we still send the notification to SQS)
7. AWS SQS will add the notification to the same queue
8. When offline client devices query SQS, they will find a chronological history of notifications
        - The onUpdate() notification of a message matches with a onInsert() notification. Seeing both, the client will know that the first message does not need to show as "NEW".
        - For AgentCRM, that means other agents know someone else has handled a message, so there is no duplicate responding

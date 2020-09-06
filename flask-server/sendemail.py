from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
import ssl
from decouple import config

sendgrid_key = config('SENDGRID_API_KEY')


def sendEmail(address, subject, content):
    message = Mail(
        from_email='charlesliu205@gmail.com',
        to_emails=address,
        subject=subject,
        html_content=content)
    try:
        sg = SendGridAPIClient(sendgrid_key)
        ssl._create_default_https_context = ssl._create_unverified_context
        response = sg.send(message)
        print(response.status_code)
        print(response.body)
        print(response.headers)
    except Exception as e:
        print(e.with_traceback)

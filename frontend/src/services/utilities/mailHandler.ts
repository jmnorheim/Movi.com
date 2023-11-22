// Declare the Email object provided by smtp.js
declare const Email: any;

export async function sendEmail(to: string) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "prometheus.gruppe41@gmail.com",
    Password: "EBBEEA44C1463CC77DB0F689A27091B933E0",
    From: "prometheus.gruppe41@gmail.com",
    To: to,
    Subject: "This is the subject",
    Body: "And this is the body for jens to see if it works :) ",
    Port: 2525,
  }).then((message: any) => {
    Promise.resolve();
  });
}

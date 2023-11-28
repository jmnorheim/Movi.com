// Declare the Email object provided by smtp.js
declare const Email: any;

export async function sendEmail(to: string) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "moviincorporated@gmail.com",
    Password: "georgeadrianstoica123",
    From: "moviincorporated@gmail.com",
    To: to,
    Subject: "The Møvi teams' top movie picks for this christmas!",
    Body: "Here is our list of must-watch movies for the Christmas season 2024!",
    Port: 2525,
  }).then((message: any) => {
    Promise.resolve();
  });
}

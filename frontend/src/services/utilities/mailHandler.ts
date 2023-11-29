// Declare the Email object provided by smtp.js
declare const Email: any;

export async function sendEmail(to: string) {
  Email.send({
    Host: "smtp.elasticemail.com",
    Username: "moviincorporated@gmail.com",
    Password: "8E45E1A3D85763F013ECDC5A2987D3DE4321",
    From: "moviincorporated@gmail.com",
    To: to,
    Subject: "Møvi's christmas present to you!",
    Body: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Møvi's Christmas Picks</title>
    </head>
    <body>
        <h1>Møvi's Christmas Picks for 2024</h1>
        <div>
            <h2>Sharknado (2013)</h2>
            <p>When nature goes bonkers, you get sharks in a tornado. Yes, flying sharks terrorizing Los Angeles. It's as if the ocean got so excited, it threw its sharks at us. It's the kind of film that makes you question both meteorology and marine biology.</p>
        </div>
        <div>
            <h2>The Room (2003)</h2>
            <p>This movie is a masterpiece of how-not-to-make-a-movie. Tommy Wiseau writes, directs, and stars in this drama that's so bad, it's good. It's filled with bizarre dialogue, inexplicable subplots, and acting so wooden you could build a shelf with it.</p>
        </div>
        <div>
            <h2>Attack of the Killer Tomatoes! (1978)</h2>
            <p>A cult classic where tomatoes turn evil and attack people. Yes, your salad's main ingredient just got a villainous upgrade. It's the sort of movie that makes you eye your ketchup suspiciously.</p>
        </div>
        <div>
    <h2>Plan 9 from Outer Space (1959)</h2>
    <p>Hailed as the worst movie ever made, it's about aliens resurrecting the dead to stop humans from creating a doomsday weapon. It's as if someone threw sci-fi concepts into a blender and went, "Yeah, that'll do."</p>
    </div>
    <div>
        <h2>Birdemic: Shock and Terror (2010)</h2>
        <p>Imagine birds suddenly start dive-bombing humans with explosive vengeance. The special effects are so low-budget, they make paper planes look high-tech. It's an avian apocalypse with the drama of a nature documentary gone rogue.</p>
    </div>
    <div>
        <h2>The Adventures of Sharkboy and Lavagirl (2005)</h2>
        <p>A kid dreams up a shark-kid and a lava-girl who come to life to save their planet. It's a psychedelic trip into a child's imagination with CGI that looks like it was made on a 90s screensaver.</p>
    </div>
    <div>
        <h2>Troll 2 (1990)</h2>
        <p>Notoriously known for being horrendously bad, this film involves a family fighting off vegetarian goblins. The acting is so hilariously awful, it's like watching a school play gone terribly wrong.</p>
    </div>
    <div>
        <h2>Santa Claus Conquers the Martians (1964)</h2>
        <p>Mars needs Christmas too, apparently. So Martians kidnap Santa to spread holiday cheer. It's as if someone thought, “What's more bizarre than Santa? Aliens, obviously.”</p>
    </div>
    <div>
        <h2>Rubber (2010)</h2>
        <p>A tire comes to life and gains telepathic powers, then goes on a killing spree. It's like watching a car tire's existential crisis turn into a horror movie. Wheelie strange.</p>
    </div>
    <div>
        <h2>Snakes on a Plane (2006)</h2>
        <p>Samuel L. Jackson dealing with venomous snakes on a flight - the title is the plot. It's as if someone thought airline food wasn't terrifying enough, so they added snakes.</p>
    </div>

    <footer>
        <p>The Møvi.com-team would like to wish you a Merry Christmas and a Happy New Year!</p>
    </footer>
</body>
</html>
    `,
    Port: 2525,
  }).then((message: any) => {
    Promise.resolve();
  });
}

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
    Body: `Here are the Møvi teams' top movie picks for the Christmas season 2024:

    Sharknado" (2013): When nature goes bonkers, you get sharks in a tornado. Yes, flying sharks terrorizing Los Angeles. It's as if the ocean got so excited, it threw its sharks at us. It's the kind of film that makes you question both meteorology and marine biology.

    "The Room" (2003): This movie is a masterpiece of how-not-to-make-a-movie. Tommy Wiseau writes, directs, and stars in this drama that's so bad, it's good. It's filled with bizarre dialogue, inexplicable subplots, and acting so wooden you could build a shelf with it.
    
    "Attack of the Killer Tomatoes!" (1978): A cult classic where tomatoes turn evil and attack people. Yes, your salad's main ingredient just got a villainous upgrade. It's the sort of movie that makes you eye your ketchup suspiciously.
    
    "Plan 9 from Outer Space" (1959): Hailed as the worst movie ever made, it's about aliens resurrecting the dead to stop humans from creating a doomsday weapon. It's as if someone threw sci-fi concepts into a blender and went, "Yeah, that'll do."
    
    "Birdemic: Shock and Terror" (2010): Imagine birds suddenly start dive-bombing humans with explosive vengeance. The special effects are so low-budget, they make paper planes look high-tech. It's an avian apocalypse with the drama of a nature documentary gone rogue.
    
    "The Adventures of Sharkboy and Lavagirl" (2005): A kid dreams up a shark-kid and a lava-girl who come to life to save their planet. It's a psychedelic trip into a child's imagination with CGI that looks like it was made on a 90s screensaver.
    
    "Troll 2" (1990): Notoriously known for being horrendously bad, this film involves a family fighting off vegetarian goblins. The acting is so hilariously awful, it's like watching a school play gone terribly wrong.
    
    "Santa Claus Conquers the Martians" (1964): Mars needs Christmas too, apparently. So Martians kidnap Santa to spread holiday cheer. It's as if someone thought, “What's more bizarre than Santa? Aliens, obviously.”
    
    "Rubber" (2010): A tire comes to life and gains telepathic powers, then goes on a killing spree. It's like watching a car tire's existential crisis turn into a horror movie. Wheelie strange.
    
    "Snakes on a Plane" (2006): Samuel L. Jackson dealing with venomous snakes on a flight - the title is the plot. It's as if someone thought airline food wasn't terrifying enough, so they added snakes.
    
    The Møvi.com-team would like to wish you a Merry Christmas and a Happy New Year!`,
    Port: 2525,
  }).then((message: any) => {
    Promise.resolve();
  });
}

# Movi.com

This project was the product of our three contributors for and under the NTNU subject IT2810 (Web Development).

Movi.com is a interactive and responsive website made for almost all devices. The website focuses on being a movie database site with the ability of making an account and making your own Libraries and liking movies. The website has a lot of different features, which can be read more about in our [WIKI](https://github.com/Jensern1/Movi.com/wiki) page. Setup and startup guid is under the website pictures.

## Pictures from the website:

![Home Page](backend/docs/HomePage.png)
![Movies](backend/docs/Movies.png)
![Filters](backend/docs/Filters.png)
![Movie Page](backend/docs/Movie.png)
![Library Page](backend/docs/Library.png)
![Classics Page](backend/docs/Classics.png)
![Profile](backend/docs/Profile.png)

## Setup & Startup

1. **Prerequisites**:

   - Install Node.js v20.5+ and npm v9.8+.
   - Ensure Vite 4.4+ is set up.

2. **Installation**:

   - Clone the repo: `git clone https://github.com/Jensern1/Movi.com.git`
   - Navigate to the project directory: `cd .\Movi.com\`
   - Install dependencies: `npm run setup`

All following commands should be run from the outer folder (not inside frontend or backend)

3. **Starting the Project**:

   - Run server: `npm run server`
   - Run client: `npm run dev`

4. **Testing**:

   - Run backend-tests: `npm run test:backend`
   - Run frontend-tests: `npm run test:frontend`
   - Run Cypress: `npx cypress open`, then chose E2E testing, then chose Electron. You need to be on the NTNU network or VPN to conduct the cypress tests.

5. **Code formatting**:

   - Run both linting (ESLint) and Prettier: `npm run lint:fix`
   - Run only linting: `npm run lint`

Note: If you want to test the project on mobile while running it locally, you need to navigate into interfaces.ts and modify the SERVER_URL to "http://" followed by the IP-address displayed after the "Network:"-text in the terminal and then append ":4000" at the end. Example: If the terminal contains: "Network: http://192.168.0.105:5173/project2", the SERVER_URL should be "http://192.168.0.105:4000".

## Contributors

<table align="center">
  <tr>
    <td align="center">
        <a href="https://github.com/Spiderpig02">
            <img src="https://github.com/Spiderpig02.png?size=100" width="100px;" alt="Daniel Neukirch Hansen"/><br />
            <sub><b>Daniel Neukirch Hansen</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/Jensern1">
            <img src="https://github.com/Jensern1.png?size=100" width="100px;" alt="Jens Martin Norheim Berget"/><br />
            <sub><b>Jens Martin Norheim Berget</b></sub>
        </a>
    </td>
    <td align="center">
        <a href="https://github.com/bjorneme">
            <img src="https://github.com/bjorneme?size=100" width="100px;"/><br />
            <sub><b>Bjørn Melaaen</b></sub>
        </a>
    </td>
  </tr>
</table>

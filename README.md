# Project 2 IT2810

## Link to the project hosted by our virtual machine (must be on NTNU network)

http://it2810-29.idi.ntnu.no/project2/

The backend server is run by our virtual machine, and is ready at http://it2810-29.idi.ntnu.no:4000/

## Students

| Name                       | Age | Study program          | Email                 |
| -------------------------- | --- | ---------------------- | --------------------- |
| Bjørn Eirik Melaaen        | 22  | M.Sc. Computer Science | bjorneme@stud.ntnu.no |
| Daniel N. Hansen           | 21  | M.Sc. Computer Science | danielnh@stud.ntnu.no |
| Jens Martin Norheim Berget | 21  | M.Sc. Computer Science | jmberget@stud.ntnu.no |

### Setup & Startup

1. **Prerequisites**:

   - Install Node.js v20.5+ and npm v9.8+.
   - Ensure Vite 4.4+ is set up.

2. **Installation**:

   - Clone the repo: `git clone https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-29/prosjekt-2.git`
   - Navigate to the project directory: `cd .\prosjekt-2\`
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



### Detailed documentation:

[Here](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-29/prosjekt-2/-/wikis/Documentation-Overview)

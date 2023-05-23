// Import the required modules.
import express from "express";
import fetch from "node-fetch";
import { createServer } from "http";
import { Server } from "socket.io";

// Create a new Express app.
const app = express();
const server = createServer(app);
const io = new Server(server);

// The API's.
const url = "https://raw.githubusercontent.com/fdnd-agency/ultitv/main/ultitv-api";

const postUrl = "https://api.ultitv.fdnd.nl/api/v1/players?first=100";
const apiUrl = "https://api.ultitv.fdnd.nl/api/v1/questions";

// All different url's for the API.
const urls = [
  url + "/game/943.json",
  url + "/game/943/statistics.json",
  url + "/facts/Player/8607.json",
  postUrl,
  apiUrl
];

// Set EJS as the template engine and specify the views directory.
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory.
app.use(express.static("public"));

// Create a route for the index page.
app.get('/', async function (request, response) {
  // Fetch the data from the API.
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };

  // Render the index page with the data from the API.
  response.render('index', {...data, active: '/'});
});

// Create a route for the styleguide page
app.get('/loading', async function (request, response) {
  // Fetch the data from the API.
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };

  response.render('loading', {...data, active: '/'});
});

// Create a route for the styleguide page
app.get('/styleguide', async function (request, response) {
  // Fetch the data from the API.
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };

  response.render('styleguide', {...data, active: '/'});
});

// Create a route for the styleguide page
app.get('/teams', async function (request, response) {
  // Fetch the data from the API.
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };

  response.render('teams', {...data, active: '/teams'});
});

// Handle form submission
app.post('/newPlayer', async function (request, response) {
  // Extract the form data from the request body
  const { name, gender, jerseyNumber, image, team, question, content } = request.body;

  // Construct the request body in the desired format
  const requestBody = {
    "name": name,
    "gender": gender,
    "jerseyNumber": jerseyNumber,
    "image": image,
    "team": team,
    "answers": [
      {
        "content": content,
        "questionId": question
      }
    ]
  };

  // Make a POST request to the API endpoint
  const postResponse = await fetch(postUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  // Wait for the post request to complete before fetching the updated data
  await postResponse.json();

  // Fetch the updated data from the API
  const [newData1, newData2, newData3, newData4, newData5] = await Promise.all(urls.map(fetchJson));
  const newData = { data1: newData1, data2: newData2, data3: newData3, data4: newData4, data5: newData5 };

  // Redirect the user to the teams route
  response.redirect('/teams');
});

// Define an array to store the score history
const scoreHistory = [];

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("User connected");

  // Send the score history to the newly connected client
  socket.emit("scoreHistory", scoreHistory);

  // Listen for the player score event
  socket.on("playerScore", (score) => {
    console.log("Player score data:", score); // Log the data being sent

    // Add the score to the score history array
    scoreHistory.push(score);

    // Emit the player score to all connected clients
    io.emit("scoreUpdate", score);
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// Create a route for the stats page
app.get('/stats', async function (request, response) {
  // Fetch the data from the API.
  const [data1, data2, data3, data4, data5] = await Promise.all(urls.map(fetchJson));
  const data = { data1, data2, data3, data4, data5 };

  response.render('stats', {...data, active: '/stats'});
});

// Set the port number and start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Application available on: http://localhost:" + port);
});

// Wait until the data exists and fetches the data.
async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())
    .catch((error) => error);
}

// Wait untill the data exists and posts the data. 
export async function postJson(url, body) {
  return await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => response.json())
    .catch((error) => error)
}
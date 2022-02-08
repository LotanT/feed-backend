const express = require('express')
const cors = require('cors');
const path = require('path');
const expressSession = require('express-session');

// session setup
const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false},
  });

const app = express();
const http = require('http').createServer(app);

app.use(express.json());
app.use(session);
app.use(express.static('public'));

if (process.env.NODE_ENV === 'production') {
    // Express serve static files on production environment
    app.use(express.static(path.resolve(__dirname, 'public')));
  } else {
    // Configuring CORS
    const corsOptions = {
      // Make sure origin contains the url your frontend is running on
      origin: [
        'http://127.0.0.1:8080',
        'http://localhost:8080',
        'http://127.0.0.1:3000',
        'http://localhost:3000',
      ],
      credentials: true,
    };
    app.use(cors(corsOptions));
  }

const feedRoutes = require('./api/task/feed.routes');
const {connectSockets} = require('./services/socket.service');

app.use('/api', feedRoutes);
connectSockets(http, session);

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

const port = process.env.PORT || 3030;

http.listen(port, () => {
  console.log('Server is running on port: ' + port);
});

const express = require('express');
const path = require('path');
const converterRoutes = require('./routes/converterRoutes');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (e.g., CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.ejs for the root route
app.get('/', (req, res) => {
    res.render('index');
});

// Use the converter routes
app.use('/', converterRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
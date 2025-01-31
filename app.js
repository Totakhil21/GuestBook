// Import necessary modules
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Set up __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express app
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Serve static files (like CSS and images) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set the port number for the server
const PORT = 3000;

// Home route - where the contact form will be shown
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'guestbook.html'));
});

// Confirmation page route
app.get('/confirmation', (req, res) => {
    res.send('<h1>Thanks for signing the guestbook!</h1>');
});

// Array to store guestbook submissions in memory
const guestbookEntries = [];

// Handle the form submission
app.post('/submit', (req, res) => {
    const entry = {
        firstName: req.body['first-name'],
        lastName: req.body['last-name'],
        jobTitle: req.body['job-title'],
        company: req.body['company'],
        linkedin: req.body['linkedin'],
        email: req.body['email'],
        meet: req.body['meet'],
        other: req.body['other'],
        message: req.body['message'],
        mailingList: req.body['mailing-list'] ? true : false,
        emailFormat: req.body['email-format'],
        timestamp: new Date(),
    };

    guestbookEntries.push(entry);
    console.log(guestbookEntries); // Just for testing

    // Redirect to confirmation page after submission
    res.redirect('/confirmation');
});

// Admin route to view all guestbook entries
app.get('/admin/guestbook', (req, res) => {
    let html = '<h1>All Guestbook Entries</h1><ul>';
    guestbookEntries.forEach(entry => {
        html += `<li>${entry.firstName} ${entry.lastName} - ${entry.email} (Submitted on: ${entry.timestamp})<br>Message: ${entry.message}</li>`;
    });
    html += '</ul><a href="/">Back to Home</a>';
    res.send(html);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

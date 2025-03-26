const express = require('express');
const cors = require('cors');
const app = express();


app.use(express.json()); 
app.use(cors()); 


app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body; 
    console.log('Form submission received:');
    console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

    
    res.status(200).json({ message: 'Submission received successfully!' });
});


const PORT = process.env.PORT || 3000; 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

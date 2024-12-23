const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const invoiceRoutes = require('./routes/invoices');


const app = express();
app.use(bodyParser.json());
app.use(cors());

// API yolları
app.use('/api/invoices', invoiceRoutes);


const PORT = 5000;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

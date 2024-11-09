const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the ./ directory
app.use(express.static('./'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
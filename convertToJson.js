const mysql = require('mysql2/promise'); // Using the promise-based API
const fs = require('fs');

(async () => {
  try {
    // Create a connection to the database
    const connection = await mysql.createConnection({
      host: 'localhost',    // Change if your database is hosted elsewhere
      user: 'root',         // Your MySQL username
      password: '',         // No password
      database: 'bdword' // Replace with your actual database name
    });

    console.log('Connected to the database.');

    // Define your query
    const [rows, fields] = await connection.execute('SELECT * FROM fill_blank_quiz'); // Replace with your table name

    console.log(`Fetched ${rows.length} records from the database.`);

    // Convert the results to JSON format
    const jsonResults = JSON.stringify(rows, null, 2); // Pretty-print with 2-space indentation

    // Write the JSON data to a file
    fs.writeFile('output.json', jsonResults, 'utf8', (err) => {
      if (err) {
        console.error('Error writing to output.json:', err);
        return;
      }
      console.log('Data successfully written to output.json');
    });

    // Close the database connection
    await connection.end();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

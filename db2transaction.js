const ibmdb = require('ibm_db');
const pool = new ibmdb.Pool();
const connStr = "DATABASE=yourDatabase;HOSTNAME=yourHostname;UID=yourUsername;PWD=yourPassword;PORT=yourPort;PROTOCOL=TCPIP";

pool.init(5, connStr); // Initialize the pool with a certain number of connections

async function executeTransaction(sqlStatements) {
  let conn;
  try {
    conn = await pool.getConnection();
    await conn.beginTransaction();

    for (const sql of sqlStatements) {
      await conn.query(sql);
    }

    await conn.commitTransaction();
    return 'Transaction committed successfully.';
  } catch (err) {
    if (conn) {
      try {
        await conn.rollbackTransaction();
      } catch (rollbackError) {
        console.error('Rollback failed:', rollbackError);
      }
    }
    throw err;  // Re-throw the error after rollback
  } finally {
    if (conn) {
      conn.close();  // Ensure the connection is always returned to the pool
    }
  }
}

// Usage example
const sqlStatements = [
  "YOUR SQL STATEMENT 1",
  "YOUR SQL STATEMENT 2",
  // Add more SQL statements as needed
];

executeTransaction(sqlStatements)
  .then(console.log)
  .catch(console.error);
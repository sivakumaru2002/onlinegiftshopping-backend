const router = require('express').Router();
const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'sql6.freesqldatabase.com',
    database: 'sql6684744',
    user: 'sql6684744',
    password: 'jLIswagWQ8',
});

db.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        throw err; 
    }
    console.log('MySQL connected');
});

function handleDatabaseError(res, err) {
    console.error('Database error:', err);
    return res.status(500).json({ error: 'database server error' });
}


router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = 'SELECT * FROM users WHERE emailid = ?';

    db.query(sql, [email], (err, results) => {
        if (err) {
            return handleDatabaseError(res, err);
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = results[0];

        if (user.password === password) {
            return res.json({ message: 'Login successful' });
        } else {
            return res.status(401).json({ error: 'Incorrect password' });
        }
    });
});


router.post('/signup', (req, res) => {
    const { email, password, cpassword } = req.body;

    

    if (password !== cpassword) {
        return res.status(401).json({ error: 'Password and confirm password do not match' });
    }

    if (password.length < 8) {
        return res.status(401).json({ error: 'Password must be at least 8 characters long' });
    }


    const sql = 'INSERT INTO users (emailid, password) VALUES (?, ?)';
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return handleDatabaseError(res, err);
        }
        return res.status(200).json({ message: 'User registered successfully' });
    }); 
});

module.exports = router;

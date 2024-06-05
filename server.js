const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 5000;

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'stecnimec' // Cambia esto al nombre de tu base de datos
});

// Conexión a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conectado a la base de datos MySQL');
    }
});

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para manejar el registro de usuarios
app.post('/api/usuarios', (req, res) => {
    console.log('Datos recibidos:', req.body); // Agregar esta línea para verificar los datos recibidos
    const { Usu_Id, Usu_Nombre, Usu_Apellido, Usu_Numero_Telefono, Usu_Direccion, Usu_Correo, Usu_Contraseña } = req.body;
    const sql = 'INSERT INTO tblusuario (Usu_Id, Usu_Nombre, Usu_Apellido, Usu_Numero_Telefono, Usu_Direccion, Usu_Correo, Usu_Contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)';
    
    db.query(sql, [Usu_Id, Usu_Nombre, Usu_Apellido, Usu_Numero_Telefono, Usu_Direccion, Usu_Correo, Usu_Contraseña], (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta SQL:', err); // Registro de error
            return res.status(500).send('Error al crear el usuario en la base de datos.');
        }
        console.log('Resultado de la consulta SQL:', result); // Registro del resultado
        res.json({ Usu_Id, Usu_Nombre, Usu_Apellido, Usu_Numero_Telefono, Usu_Direccion, Usu_Correo, Usu_Contraseña });
    });
});

// Ruta para manejar el inicio de sesión
app.post('/api/login', (req, res) => {
    const { Usu_Correo, Usu_Contraseña } = req.body;
    const sql = 'SELECT * FROM tblusuario WHERE Usu_Correo = ? AND Usu_Contraseña = ?';
    db.query(sql, [Usu_Correo, Usu_Contraseña], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }
        res.json({ message: 'Inicio de sesión exitoso' });
    });
});

app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});

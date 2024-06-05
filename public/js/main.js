document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    // Función para mostrar el nombre de usuario y el botón de cerrar sesión
    function showUserInfo(user) {
        const userNameElement = document.getElementById('userName');
        const logoutBtn = document.getElementById('logoutBtn');

        userNameElement.textContent = `Bienvenido, ${user.nombre}`; // Mostrar el nombre del usuario
        userNameElement.style.display = 'inline-block'; // Mostrar el elemento
        logoutBtn.style.display = 'inline-block'; // Mostrar el botón de cerrar sesión
    }

    // Función para ocultar el nombre de usuario y el botón de cerrar sesión
    function hideUserInfo() {
        const userNameElement = document.getElementById('userName');
        const logoutBtn = document.getElementById('logoutBtn');

        userNameElement.style.display = 'none'; // Ocultar el nombre del usuario
        logoutBtn.style.display = 'none'; // Ocultar el botón de cerrar sesión
    }

    // Lógica para el formulario de registro
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            registerUser(registerForm);
        });
    }

    // Lógica para el formulario de inicio de sesión
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            loginUser(loginForm);
        });
    }

    // Lógica para el botón de cerrar sesión
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Ocultar el nombre del usuario y el botón de cerrar sesión
            hideUserInfo();
        });
    }

    function registerUser(form) {
        // Validar que se ingresen todos los campos requeridos
        const formData = new FormData(form);
        const requiredFields = ['nombre', 'apellido', 'identificacion', 'correo', 'telefono', 'direccion', 'contraseña', 'confirmar_contraseña'];
        const hasEmptyFields = requiredFields.some(field => !formData.get(field));

        if (hasEmptyFields) {
            alert('Por favor, complete todos los campos del formulario.');
            return; // Detener el proceso de envío del formulario
        }

        // Si todos los campos están completos, enviar el formulario
        const data = {
            Usu_Nombre: formData.get('nombre'),
            Usu_Apellido: formData.get('apellido'),
            Usu_ID: formData.get('identificacion'),
            Usu_Numero_Telefono: formData.get('telefono'),
            Usu_Direccion: formData.get('direccion'),
            Usu_Correo: formData.get('correo'),
            Usu_Contraseña: formData.get('contraseña'),
            // Añade otros campos que sean necesarios
        };

        fetch('/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al crear el usuario.');
            }
            return response.json();
        })
        .then(result => {
            alert('Usuario registrado exitosamente');
            form.reset();
        })
        .catch(error => console.error('Error al crear el usuario:', error));
    }

    function loginUser(form) {
        const formData = new FormData(form);
        const usuario = formData.get('usuario');
        const contraseña = formData.get('contraseña');

        if (!usuario || !contraseña) {
            alert('Por favor, ingrese su usuario o correo y contraseña.');
            return;
        }

        const data = {
            Usu_Correo: usuario,
            Usu_Contraseña: contraseña
        };

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Usuario o contraseña incorrectos.');
            }
            return response.json();
        })
        .then(result => {
            alert('Inicio de sesión exitoso');
            // Guardar la información del usuario en el localStorage
            localStorage.setItem('usuario', JSON.stringify(result));
            // Mostrar el nombre de usuario y el botón de cerrar sesión
            showUserInfo(result);
            // Redirigir a la página principal o la página que desees
            window.location.href = 'index.html';
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error);
            alert(error.message);
        });
    }
});

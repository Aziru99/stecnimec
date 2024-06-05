document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            loginUser(loginForm);
        });
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

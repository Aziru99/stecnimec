document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');

    // Lógica para el formulario de registro
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            registerUser(registerForm);
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
});

// Constantes que seleccionan los elementos del HTML
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const biometricPrompt = document.getElementById('biometricPrompt');
const biometricButton = document.getElementById('biometricButton');
const registerButton = document.getElementById('registerButton');
const message = document.getElementById('message');

// Nuevo código para el acceso directo si la credencial ya está registrada
// Verifica si el navegador soporta WebAuthn y si el usuario ya registró su huella
if ('credentials' in navigator && localStorage.getItem('biometric_registered') === 'true') {
    // Si ambas condiciones son verdaderas, redirige al usuario directamente
    // a la página de bienvenida, sin pedir la huella de nuevo.
    window.location.href = 'bienvenido.html';
} else if ('credentials' in navigator) {
    // Si no está registrada, pero el navegador lo soporta, muestra el botón de registro
    registerButton.style.display = 'block';
}

// Maneja el primer paso: usuario y contraseña
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'miler' && password === '1234') {
        // Oculta el formulario de login y muestra el de la verificación biométrica.
        loginForm.style.display = 'none';
        biometricPrompt.style.display = 'block';
        registerButton.style.display = 'none';
        message.textContent = 'Usuario y contraseña correctos. Ahora, verificación biométrica...';
    } else {
        message.textContent = 'Usuario o contraseña incorrectos.';
    }
});

// Maneja el segundo paso: autenticación biométrica
biometricButton.addEventListener('click', async () => {
    try {
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
                rpId: window.location.hostname, // Se usa el dominio actual.
                user: {
                    id: new Uint8Array([1, 2, 3, 4]),
                    name: 'miler',
                    displayName: 'Miler'
                },
                pubKeyCredParams: [{ type: 'public-key', alg: -7 }]
            }
        });
        
        // Si no hay errores, la verificación fue exitosa y se redirige.
        window.location.href = 'bienvenido.html';

    } catch (err) {
        message.textContent = '❌ Verificación biométrica fallida o cancelada.';
        console.error(err);
    }
});

// Maneja el proceso de registro de la credencial biométrica
// Este paso es crucial y solo se debe hacer una vez por dispositivo.
registerButton.addEventListener('click', async () => {
    try {
        const credential = await navigator.credentials.create({
            publicKey: {
                rp: { id: window.location.hostname, name: "Login App" },
                user: {
                    id: new Uint8Array([1, 2, 3, 4]),
                    name: "miler",
                    displayName: "Miler"
                },
                challenge: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
                pubKeyCredParams: [{ type: "public-key", alg: -7 }]
            }
        });

        // Almacena una bandera en localStorage para recordar que el registro fue exitoso
        localStorage.setItem('biometric_registered', 'true');
        message.textContent = "✅ Credencial biométrica registrada con éxito. ¡Ya puedes iniciar sesión!";
    } catch (err) {
        message.textContent = "❌ Fallo al registrar la credencial.";
        console.error(err);
    }
});

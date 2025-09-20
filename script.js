// Constantes que seleccionan los elementos del HTML
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const biometricPrompt = document.getElementById('biometricPrompt');
const biometricButton = document.getElementById('biometricButton');
const registerButton = document.getElementById('registerButton');
const message = document.getElementById('message');

// Muestra el botón de registro solo si el navegador soporta la API de WebAuthn.
if ('credentials' in navigator) {
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
        registerButton.style.display = 'none'; // Oculta también el botón de registro
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
                rpId: window.location.hostname, // Se usa el dominio actual para evitar errores de coincidencia.
                user: {
                    id: new Uint8Array([1, 2, 3, 4]),
                    name: 'miler',
                    displayName: 'Miler'
                },
                pubKeyCredParams: [{ type: 'public-key', alg: -7 }]
            }
        });
        
        // Si no hay errores, significa que la verificación fue exitosa y se redirige.
        window.location.href = 'bienvenido.html';

    } catch (err) {
        // Muestra un mensaje de error si la verificación falla o es cancelada.
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
        message.textContent = "✅ Credencial biométrica registrada con éxito. ¡Ya puedes iniciar sesión!";
    } catch (err) {
        message.textContent = "❌ Fallo al registrar la credencial.";
        console.error(err);
    }
});

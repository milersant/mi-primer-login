// Constantes que seleccionan los elementos del HTML
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const biometricPrompt = document.getElementById('biometricPrompt');
const biometricButton = document.getElementById('biometricButton');
const registerButton = document.getElementById('registerButton');
const message = document.getElementById('message');

// Observación: Muestra el botón de registro solo si el navegador soporta la API de WebAuthn.
// Esto evita que los usuarios vean un botón que no funciona en sus dispositivos.
if ('credentials' in navigator) {
    registerButton.style.display = 'block';
}

// Observación: Esta es la primera etapa del login. Maneja la verificación
// del usuario y la contraseña. Si son correctos, pasa a la etapa de autenticación biométrica.
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'miler' && password === '1234') {
        // Oculta el formulario de login y muestra el de la verificación biométrica.
        // Es crucial que el usuario haga esta etapa primero.
        loginForm.style.display = 'none';
        biometricPrompt.style.display = 'block';
        registerButton.style.display = 'none';
        message.textContent = 'Usuario y contraseña correctos. Ahora, verificación biométrica...';
    } else {
        message.textContent = 'Usuario o contraseña incorrectos.';
    }
});

// Observación: Este es el código que verifica la huella o el rostro del usuario.
// La API `navigator.credentials.get()` busca una credencial (Passkey) guardada en el dispositivo.
// Si la encuentra y la verificación es exitosa, se redirige a la página de bienvenida.
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
        
        // Si no hay errores, significa que la verificación fue exitosa.
        window.location.href = 'bienvenido.html';

    } catch (err) {
        // Muestra un mensaje de error si la verificación falla o es cancelada.
        message.textContent = '❌ Verificación biométrica fallida o cancelada.';
        console.error(err);
    }
});

// Observación: Esta es la pieza clave para solucionar el error.
// El método `navigator.credentials.create()` crea una nueva "llave de acceso"
// (o Passkey) en el dispositivo. Esta es la que se guarda de forma permanente
// y la que el segundo botón (`biometricButton`) buscará después.
// Este proceso solo necesita hacerse una vez por dispositivo.
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

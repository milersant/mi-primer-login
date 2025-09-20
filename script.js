const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const biometricPrompt = document.getElementById('biometricPrompt');
const biometricButton = document.getElementById('biometricButton');
const message = document.getElementById('message');

// Maneja el primer paso: usuario y contraseña
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'miler' && password === '1234') {
        // Redirige a la página principal si las credenciales son correctas
        window.location.href = 'index.html'; // <--- Línea modificada aquí
    } else {
        message.textContent = 'Usuario o contraseña incorrectos.';
    }
});

// Este bloque ya no es necesario si la redirección es inmediata
// Puedes eliminarlo para simplificar el flujo.

/*
biometricButton.addEventListener('click', async () => {
    // Código de autenticación biométrica anterior...
});
*/

// Maneja el segundo paso: autenticación biométrica
biometricButton.addEventListener('click', async () => {
    if ('credentials' in navigator) {
        try {
            // Solicita la autenticación biométrica (Face ID, Touch ID, etc.)
            const credential = await navigator.credentials.get({
                publicKey: {
                    challenge: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]),
                    rpId: window.location.hostname, // El dominio actual
                    user: {
                        id: new Uint8Array([1, 2, 3, 4]),
                        name: 'miler',
                        displayName: 'Miler'
                    },
                    pubKeyCredParams: [{ type: 'public-key', alg: -7 }]
                }
            });

            // Si la autenticación es exitosa
            message.textContent = '🎉 ¡Acceso concedido! Bienvenido, Miler.';
            biometricPrompt.style.display = 'none';

        } catch (err) {
            message.textContent = '❌ Verificación biométrica fallida o cancelada.';
            console.error(err);
        }
    } else {
        message.textContent = 'Tu navegador no soporta autenticación biométrica.';
    }
});

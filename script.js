const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const message = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;

    if (username === 'miler' && password === '1234') {
        message.textContent = 'Usuario y contraseña correctos. Registrando tu huella/rostro...';
        
        if ('credentials' in navigator) {
            try {
                // Inicia el proceso de registro de la credencial biométrica
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

                // Si el registro es exitoso, redirige a la página de bienvenida
                window.location.href = 'bienvenido.html';

            } catch (err) {
                // Si el registro falla o es cancelado, muestra un error
                message.textContent = '❌ Fallo al registrar la credencial biométrica.';
                console.error(err);
            }
        } else {
            // Si el navegador no lo soporta, redirige de todas formas
            window.location.href = 'bienvenido.html';
        }
    } else {
        message.textContent = 'Usuario o contraseña incorrectos.';
    }
});

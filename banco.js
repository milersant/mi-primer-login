document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('user-select');
    const saldoDisplay = document.getElementById('saldo-display');
    const depositForm = document.getElementById('deposit-form');

    // Llena el selector de usuarios
    db.usuarios.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.nombre;
        userSelect.appendChild(option);
    });

    // Muestra el saldo inicial del primer usuario
    updateSaldoDisplay();

    // Actualiza el saldo cuando se cambia de usuario
    userSelect.addEventListener('change', updateSaldoDisplay);

    // Maneja el abono de saldo
    depositForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const usuarioId = parseInt(userSelect.value);
        const cantidad = parseFloat(document.getElementById('cantidad').value);
        const resultado = abonarSaldo(usuarioId, cantidad);
        alert(resultado.mensaje);
        updateSaldoDisplay();
    });

    function updateSaldoDisplay() {
        const usuarioId = parseInt(userSelect.value);
        const saldo = getSaldo(usuarioId);
        saldoDisplay.textContent = saldo !== null ? `$${saldo.toFixed(2)}` : 'N/A';
    }
});
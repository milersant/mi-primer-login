document.addEventListener('DOMContentLoaded', () => {
    const userSelect = document.getElementById('user-select');

    // Llena el selector de usuarios
    db.usuarios.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.nombre;
        userSelect.appendChild(option);
    });
});

function comprar(producto, precio) {
    const usuarioId = parseInt(document.getElementById('user-select').value);
    const resultado = realizarCompra(usuarioId, producto, precio);
    alert(resultado.mensaje);
}
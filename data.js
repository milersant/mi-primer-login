// Este archivo simula una "base de datos" y las operaciones del servidor.
// En una aplicación real, estas operaciones se harían en el backend.
const db = {
    usuarios: [
        { id: 1, nombre: 'Diego' },
        { id: 2, nombre: 'Ana' },
        { id: 3, nombre: 'Luis' }
    ],
    banco: [
        { usuario_id: 1, saldo: 1000.00 },
        { usuario_id: 2, saldo: 1500.00 },
        { usuario_id: 3, saldo: 2000.00 }
    ],
    compras: []
};

function getSaldo(usuario_id) {
    const cuenta = db.banco.find(b => b.usuario_id === usuario_id);
    return cuenta ? cuenta.saldo : null;
}

function abonarSaldo(usuario_id, cantidad) {
    const cuenta = db.banco.find(b => b.usuario_id === usuario_id);
    if (cuenta) {
        cuenta.saldo += cantidad;
        return { mensaje: `Abono exitoso. Nuevo saldo: ${cuenta.saldo}` };
    }
    return { mensaje: "Error: Usuario no encontrado." };
}

function realizarCompra(usuario_id, producto, precio) {
    const cuenta = db.banco.find(b => b.usuario_id === usuario_id);
    if (!cuenta) {
        return { mensaje: "Error: Usuario no encontrado." };
    }
    if (cuenta.saldo >= precio) {
        cuenta.saldo -= precio;
        db.compras.push({ usuario_id, producto, precio, fecha: new Date() });
        return { mensaje: `Compra exitosa. Nuevo saldo: ${cuenta.saldo}` };
    } else {
        return { mensaje: "Saldo insuficiente." };
    }
}
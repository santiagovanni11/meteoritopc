// carrito.js
const botonesComprar = document.querySelectorAll('.boton-comprar');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const comprarCarritoBtn = document.getElementById('comprar-carrito');
const toggleDark = document.getElementById('toggle-dark');

let carrito = [];

// Renderiza el carrito
function renderCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((producto) => {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString('es-AR')}`;
    listaCarrito.appendChild(li);
    total += producto.precio;
  });

  totalCarrito.textContent = total.toLocaleString('es-AR');
}

// Agregar producto
botonesComprar.forEach((btn) => {
  btn.addEventListener('click', () => {
    const productoDiv = btn.parentElement;
    const nombre = productoDiv.getAttribute('data-nombre');
    const precio = parseFloat(productoDiv.getAttribute('data-precio'));

    carrito.push({ nombre, precio });
    renderCarrito();
  });
});

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
  carrito = [];
  renderCarrito();
});

// Comprar por WhatsApp
comprarCarritoBtn.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  const numeroWhatsApp = '5491123456789'; // Cambiar por tu número real

  let mensaje = 'Hola, quiero comprar estos productos:%0A';
  carrito.forEach((p) => {
    mensaje += `- ${p.nombre}: $${p.precio.toLocaleString('es-AR')} ARS%0A`;
  });
  mensaje += `Total: $${carrito.reduce((acc, p) => acc + p.precio, 0).toLocaleString('es-AR')} ARS`;

  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(urlWhatsApp, '_blank');
});

// Dark Mode toggle
toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('modoOscuro', document.body.classList.contains('dark-mode'));
});

// Mantener preferencia Dark Mode
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
  }
});

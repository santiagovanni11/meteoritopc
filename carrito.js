// carrito.js

// Obtener referencias a elementos
const botonesComprar = document.querySelectorAll('.boton-comprar');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const comprarCarritoBtn = document.getElementById('comprar-carrito');

let carrito = [];

// Función para renderizar carrito en HTML
function renderCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - $${producto.precio} USD`;
    listaCarrito.appendChild(li);
    total += producto.precio;
  });

  totalCarrito.textContent = total.toFixed(2);
}

// Agregar producto al carrito
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

// Comprar por WhatsApp (abre chat con resumen)
comprarCarritoBtn.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }

  const numeroWhatsApp = '5491123456789'; // Cambialo por tu número real con código país

  let mensaje = 'Hola, quiero comprar estos productos:%0A';
  carrito.forEach((p) => {
    mensaje += `- ${p.nombre}: $${p.precio} USD%0A`;
  });
  mensaje += `Total: $${carrito.reduce((acc, p) => acc + p.precio, 0).toFixed(2)} USD`;

  const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(urlWhatsApp, '_blank');
});

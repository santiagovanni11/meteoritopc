// carrito.js
const botonesComprar = document.querySelectorAll('.boton-comprar');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');
const toggleDark = document.getElementById('toggle-dark');

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
  const guardado = localStorage.getItem('carrito');
  carrito = guardado ? JSON.parse(guardado) : [];
  renderCarrito();
  if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
  }
});

function renderCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;
  carrito.forEach((p, i) => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} – $${p.precio.toLocaleString('es-AR')}`;
    const btnX = document.createElement('button');
    btnX.textContent = 'X'; btnX.style.marginLeft = '10px';
    btnX.style.background = '#e65c00'; btnX.style.color = '#fff';
    btnX.style.border = 'none'; btnX.style.borderRadius = '4px';
    btnX.style.cursor = 'pointer'; btnX.style.padding = '2px 6px';
    btnX.title = 'Quitar';
    btnX.addEventListener('click', () => {
      carrito.splice(i,1);
      guardarCarrito(); renderCarrito();
    });
    li.appendChild(btnX);
    listaCarrito.appendChild(li);
    total += p.precio;
  });
  totalCarrito.textContent = total.toLocaleString('es-AR');
  guardarCarrito();
}
function guardarCarrito() { localStorage.setItem('carrito', JSON.stringify(carrito)); }

botonesComprar.forEach(btn => {
  btn.addEventListener('click', () => {
    const prod = btn.parentElement;
    const nombre = prod.getAttribute('data-nombre');
    const precio = parseFloat(prod.getAttribute('data-precio'));
    carrito.push({nombre, precio});
    guardarCarrito();
    renderCarrito();
  });
});

vaciarCarritoBtn?.addEventListener('click', () => {
  carrito = [];
  guardarCarrito();
  renderCarrito();
});

finalizarCompraBtn?.addEventListener('click', () => {
  if (!carrito.length) alert('Tu carrito está vacío.');
  else window.location.href = 'finalizar.html';
});

toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('modoOscuro', document.body.classList.contains('dark-mode'));
});

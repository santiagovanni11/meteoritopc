// carrito.js - script compartido para todas las páginas con carrito

const botonesComprar = document.querySelectorAll('.boton-comprar');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const finalizarCompraBtn = document.getElementById('finalizar-compra');
const toggleDark = document.getElementById('toggle-dark');

let carrito = [];

// Cargar carrito desde localStorage al cargar página
document.addEventListener('DOMContentLoaded', () => {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    renderCarrito();
  }
  if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
  }
});

// Renderiza el carrito en pantalla
function renderCarrito() {
  listaCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((producto, index) => {
    const li = document.createElement('li');
    li.textContent = `${producto.nombre} - $${producto.precio.toLocaleString('es-AR')}`;
    
    // Botón para eliminar producto
    const btnEliminar = document.createElement('button');
    btnEliminar.textContent = 'X';
    btnEliminar.style.marginLeft = '10px';
    btnEliminar.style.background = '#e65c00';
    btnEliminar.style.color = '#fff';
    btnEliminar.style.border = 'none';
    btnEliminar.style.borderRadius = '4px';
    btnEliminar.style.cursor = 'pointer';
    btnEliminar.style.padding = '2px 6px';
    btnEliminar.title = 'Quitar producto';

    btnEliminar.addEventListener('click', () => {
      carrito.splice(index, 1);
      guardarCarrito();
      renderCarrito();
    });

    li.appendChild(btnEliminar);
    listaCarrito.appendChild(li);

    total += producto.precio;
  });

  totalCarrito.textContent = total.toLocaleString('es-AR');

  guardarCarrito();
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Agregar producto al carrito
botonesComprar.forEach((btn) => {
  btn.addEventListener('click', () => {
    const productoDiv = btn.parentElement;
    const nombre = productoDiv.getAttribute('data-nombre');
    const precio = parseFloat(productoDiv.getAttribute('data-precio'));

    carrito.push({ nombre, precio });
    guardarCarrito();
    renderCarrito();
  });
});

// Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {
  carrito = [];
  guardarCarrito();
  renderCarrito();
});

// Finalizar compra: redirigir a finalizar.html si hay productos
finalizarCompraBtn.addEventListener('click', () => {
  if (carrito.length === 0) {
    alert('Tu carrito está vacío.');
    return;
  }
  window.location.href = 'finalizar.html';
});

// Dark Mode toggle
toggleDark.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('modoOscuro', document.body.classList.contains('dark-mode'));
});


// carrito.js
document.addEventListener('DOMContentLoaded', () => {
  const botonesComprar = document.querySelectorAll('.boton-comprar');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total');
  const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
  const finalizarCompraBtn = document.getElementById('finalizar-compra');
  const toggleDark = document.getElementById('toggle-dark');

  let carrito = [];

  // Cargar carrito desde localStorage si existe
  const guardado = localStorage.getItem('carrito');
  carrito = guardado ? JSON.parse(guardado) : [];
  renderCarrito();

  // Aplicar modo oscuro si estaba activo
  if (localStorage.getItem('modoOscuro') === 'true') {
    document.body.classList.add('dark-mode');
  }

  // Función para mostrar carrito en pantalla
  function renderCarrito() {
    if (!listaCarrito || !totalCarrito) return;

    listaCarrito.innerHTML = '';
    let total = 0;
    carrito.forEach((p, i) => {
      const li = document.createElement('li');
      li.textContent = `${p.nombre} – $${p.precio.toLocaleString('es-AR')}`;
      
      // Botón quitar
      const btnX = document.createElement('button');
      btnX.textContent = 'X';
      btnX.style.marginLeft = '10px';
      btnX.style.background = '#e65c00';
      btnX.style.color = '#fff';
      btnX.style.border = 'none';
      btnX.style.borderRadius = '4px';
      btnX.style.cursor = 'pointer';
      btnX.style.padding = '2px 6px';
      btnX.title = 'Quitar del carrito';
      btnX.addEventListener('click', () => {
        carrito.splice(i, 1);
        guardarCarrito();
        renderCarrito();
      });

      li.appendChild(btnX);
      listaCarrito.appendChild(li);
      total += p.precio;
    });
    totalCarrito.textContent = total.toLocaleString('es-AR');
    guardarCarrito();
  }

  // Guardar carrito en localStorage
  function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // Añadir producto al carrito al click en botón comprar
  botonesComprar.forEach(btn => {
    btn.addEventListener('click', () => {
      // En algunos HTML el botón está dentro de div.producto o article.producto
      // Se busca el elemento padre que tiene data-nombre y data-precio
      let prod = btn.closest('.producto');
      if (!prod) return;

      const nombre = prod.getAttribute('data-nombre');
      const precio = parseFloat(prod.getAttribute('data-precio'));
      carrito.push({ nombre, precio });
      guardarCarrito();
      renderCarrito();
    });
  });

  // Vaciar carrito
  vaciarCarritoBtn?.addEventListener('click', () => {
    carrito = [];
    guardarCarrito();
    renderCarrito();
  });

  // Finalizar compra
  finalizarCompraBtn?.addEventListener('click', () => {
    if (!carrito.length) alert('Tu carrito está vacío.');
    else window.location.href = 'finalizar.html';
  });

  // Toggle modo oscuro
  toggleDark?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('modoOscuro', document.body.classList.contains('dark-mode'));
  });
});

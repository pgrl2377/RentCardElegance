
// Carrito de reservas
let carrito = [];

// Función para búsqueda de autos
function buscarAutos() {
  const ciudad = document.querySelector('.buscador input[type="text"]').value;
  const fechaInicio = document.querySelectorAll('.buscador input[type="date"]')[0].value;
  const fechaFin = document.querySelectorAll('.buscador input[type="date"]')[1].value;

  if (!ciudad || !fechaInicio || !fechaFin) {
    alert("Por favor completa ciudad y fechas.");
    return;
  }

  alert(`Buscando autos en ${ciudad} desde ${fechaInicio} hasta ${fechaFin}...`);
}

// Función para agregar auto al carrito
function agregarAlCarrito(nombreAuto, precio) {
  carrito.push({ nombre: nombreAuto, precio: precio });
  mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  carritoDiv.innerHTML = "<h2>Carrito de reservas</h2>";

  if (carrito.length === 0) {
    carritoDiv.innerHTML += "<p>No hay autos seleccionados.</p>";
    return;
  }

  let total = 0;
  carrito.forEach((auto, index) => {
    carritoDiv.innerHTML += `<p>${index + 1}. ${auto.nombre} - $${auto.precio}/día</p>`;
    total += auto.precio;
  });

  carritoDiv.innerHTML += `<h3>Total: $${total}/día</h3>`;
  carritoDiv.innerHTML += `<button onclick="confirmarReserva()">Confirmar Reserva</button>`;
}

// Función para confirmar la reserva
function confirmarReserva() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  let nombres = carrito.map(auto => auto.nombre).join(", ");
  alert(`Has reservado: ${nombres}. ¡Gracias por elegirnos!`);
  carrito = []; // vaciar carrito
  mostrarCarrito();
}

// Asignar eventos al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  // Botón de búsqueda
  document.querySelector(".buscador button").addEventListener("click", buscarAutos);

  // Botones de reserva con carrito
  const autos = document.querySelectorAll(".auto");
  autos.forEach(auto => {
    const nombre = auto.querySelector("h3").textContent;
    const precioTexto = auto.querySelector("p").textContent.match(/\$(\d+)/);
    const precio = precioTexto ? parseInt(precioTexto[1]) : 0;

    auto.querySelector("button").addEventListener("click", () => agregarAlCarrito(nombre, precio));
  });


});

 // --- Filtros dinámicos ---
function aplicarFiltros() {
  const tipoFiltro = document.getElementById("tipoFiltro").value;
  const precioFiltro = document.getElementById("precioFiltro").value;

  const autos = document.querySelectorAll(".auto");
  autos.forEach(auto => {
    const tipo = auto.getAttribute("data-tipo");
    const precio = parseInt(auto.getAttribute("data-precio"));

    let mostrar = true;

    if (tipoFiltro && tipo !== tipoFiltro) {
      mostrar = false;
    }

    if (precioFiltro && precio > parseInt(precioFiltro)) {
      mostrar = false;
    }

    auto.style.display = mostrar ? "block" : "none";
  });
}
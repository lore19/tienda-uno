
// carrito
//variables
const carritoButton = document.querySelectorAll('.agregarProducto');

carritoButton.forEach((botonAgregar) => {
  botonAgregar.addEventListener('click', agregarAlCarrito);
});

const comprarButton = document.querySelector('.comprarButton');
  comprarButton.addEventListener('click', comprarButtonClick);

const contenedorItems = document.querySelector('.contenedorItems');

//funciones
function agregarAlCarrito(e) {

    const button = e.target;
    const item = button.closest('.item');

    const imagen = item.querySelector('img').src;
    const titulo = item.querySelector('h3').textContent;
    const precio = item.querySelector('p').textContent;

    agregarItemCarrito(imagen, titulo, precio);
}

function agregarItemCarrito(imagen, titulo, precio) {

    const titulos = contenedorItems.getElementsByClassName('itemTitulo');

    for (let i = 0; i < titulos.length; i++) {
      if (titulos[i].innerText === titulo) {
        let cantidadProductos = titulos[
        i].parentElement.parentElement.parentElement.querySelector(
        '.cantidadProductosCarrito'
        );
        cantidadProductos.value++;
        actualizarCarritoTotal();
        return;
      }
    }

  const carritoRow = document.createElement('div');
  const contenidoCarrito = `
  <div class="row carrItem">
        <div class="col-6">
            <div class="carrito-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${imagen} class="carrito-imagen">
                <h6 class="carrito-item-titulo itemTitulo text-truncate ml-3 mb-0">${titulo}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="carrito-precio d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-precio mb-0 itemPrecio">${precio}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="carrito-cantidad d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="carrito-cantidad-input cantidadProductosCarrito" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete" type="button">X</button>
            </div>
        </div>
    </div>`;
    carritoRow.innerHTML = contenidoCarrito;
    contenedorItems.append(carritoRow);

    carritoRow
      .querySelector('.buttonDelete')
      .addEventListener('click', eliminarItem);

    carritoRow
      .querySelector('.cantidadProductosCarrito')
      .addEventListener('change', cantidadCambiado);

    actualizarCarritoTotal();
}

function actualizarCarritoTotal() {
  let total = 0;
  const carrTotal = document.querySelector('.carrTotal');

  const carritoItems = document.querySelectorAll('.carrItem');

    carritoItems.forEach((carrItem) => {
    const carrItemPrecioElemento = carrItem.querySelector(
      '.itemPrecio'
    );
    const itemPrecio = Number(
      carrItemPrecioElemento.textContent.replace('$', '')
    );
    const carrItemCantidadElemento = carrItem.querySelector(
      '.cantidadProductosCarrito'
    );
    const cantidadProductosCarrito = Number(
      carrItemCantidadElemento.value
    );
    total = total + itemPrecio * cantidadProductosCarrito;
  });
  carrTotal.innerHTML = `${total.toFixed(2)}$`;
}

function eliminarItem(e) {
  const buttonClick = e.target;
  buttonClick.closest('.carrItem').remove();
  actualizarCarritoTotal();
}

function cantidadCambiado(e) {
  const input = e.target;
  input.value <= 0 ? (input.value = 1) : null;
  actualizarCarritoTotal();
}

function comprarButtonClick() {
  contenedorItems.innerHTML = '';
  actualizarCarritoTotal();
}

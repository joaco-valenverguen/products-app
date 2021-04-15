class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
        <div class="card text-center mb-4">
            <div class ="card-body">
                <strong>Product Name</strong>: ${product.name}
                <strong>Product Price</strong>: ${product.price}
                <strong>Product Year</strong>: ${product.year}
                <a href="#" class="btn btn-danger" name="delete">Borrar</a>
            </div>
        </div>
    `;
    productList.appendChild(element);
    this.resetForm();
    this.showMessage("Producto agregado satisfactoriamente", "success");
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
    }
    this.showMessage("Elimina Satisfactoriamente", "danger");
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-4`;
    div.appendChild(document.createTextNode(message));
    //Showingin the DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#app");
    container.insertBefore(div, app);
    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

//DOM Events

document.getElementById("product-form").addEventListener("submit", (e) => {
  const name = document.querySelector("#name").value;
  const price = document.querySelector("#price").value;
  const year = document.querySelector("#year").value;

  console.log(name, price, year);

  const product = new Product(name, price, year);
  const ui = new UI();
  if ((name === "") | (price === "") | (year === "")) {
    ui.showMessage("Complete todos los campos", "danger");
    return;
  }
  ui.addProduct(product);
  e.preventDefault();
});

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();

  ui.deleteProduct(e.target);
});

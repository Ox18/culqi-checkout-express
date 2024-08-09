alertify.set("notifier", "position", "top-right");

const loading = document.getElementById("loading");

const loader = {
  start: () => {
    loading.style.display = "block";
  },
  stop: () => {
    loading.style.display = "none";
  },
};

const btnReset = document.getElementById("btnReset");

btnReset.addEventListener("click", () => {
  location.reload();
});

const btnCreateCharge = document.getElementById("btnCreateCharge");

btnCreateCharge.addEventListener("click", async () => {
  console.log("creando orden");

  loader.start();

  try {
    const order = await createOrder();

    console.log("orden creada: ", order);
    alertify.notify("Se creo la orden", "success", 5);

    applyCheckout(order.id);
  } catch (error) {
    console.error("error al crear la orden", error);
    alertify.notify("Error al crear la orden", "error", 5);
  }

  loader.stop();
});

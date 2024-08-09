window.Culqi3DS.options = {
  showModal: true,
  showLoading: true,
  showIcon: true,
  closeModalAction: () => window.location.reload(true),
};

window.Culqi3DS.publicKey = PUBLIC_KEY;
console.log(PUBLIC_KEY);

var DeviceID = null;

const applyDeviceID = (val) => {
  DeviceID = val;
  console.log("DeviceID", DeviceID);
};

window.addEventListener("DOMContentLoaded", async () => {
  console.log("INYECTADO");
  var deviceId = await window.Culqi3DS.generateDevice();

  applyDeviceID(deviceId);

  if (deviceId) {
    alertify.notify("Se creo el dispositivo 3DS", "success", 5);
  } else {
    alertify.notify("Error al crear el dispositivo 3DS", "error", 5);
  }

  window.addEventListener(
    "message",
    async function (event) {
      if (event.origin !== window.location.origin) {
        return;
      }

      console.log('---- data from message')
      console.log(event.data)

      const { parameters3DS, error } = event.data;

      if (parameters3DS) {
        console.log("parameters3DS", parameters3DS);
      }

      if (error) {
        console.log("Ocurrio un error", error);
      }
    },
    false
  );
});

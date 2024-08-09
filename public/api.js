var createOrder = async () => {
  const url = "https://api.culqi.com/v2/orders";

  const expirateIn10Days = new Date().getTime() + 10 * 24 * 60 * 60 * 1000;

  const orderUnique = Math.floor(Math.random() * 1000000);

  const data = {
    amount: 8000,
    currency_code: "PEN",
    description: " Venta de polo",
    order_number: "#id-" + orderUnique,
    expiration_date: String(expirateIn10Days / 1000).split(".")[0],
    client_details: {
      first_name: "Richard",
      last_name: "Hendricks",
      email: "review@culqi.com",
      phone_number: "999999987",
    },
    confirm: false,
    metadata: {
      dni: "71702999",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + PRIVATE_KEY,
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  return result;
};

var createCharge = async (deviceId, tokenId) => {
  const url = "https://api.culqi.com/v2/charges";

  const payload = {
    amount: 8000,
    currency_code: "PEN",
    email: "review@culqi.com",
    source_id: tokenId,
    capture: true,
    antifraud_details: {
      address: "Avenida Lima 1234",
      address_city: "Lima",
      country_code: "PE",
      first_name: "culqi",
      last_name: "core",
      phone_number: "999777666",
      device_finger_print_id: deviceId,
    },
    metadata: {
      documentNumber: "77723083",
    },
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + PRIVATE_KEY,
    },
    body: JSON.stringify(payload),
  });

  const { status } = response;

  const data = await response.json();

  return {
    data,
    status,
  };
};

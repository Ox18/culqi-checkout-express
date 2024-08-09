var applyCheckout = async (order) => {
  const settings = {
    title: "Culqi  store 2",
    currency: "PEN",
    amount: 8000,
    order: "ord_test_3FOoW9ADUAWz3j0v",
  };

  const paymentMethods = {
    // las opciones se ordenan según se configuren
    tarjeta: true,
    yape: true,
    billetera: true,
    bancaMovil: true,
    agente: true,
    cuotealo: true,
  };

  const options = {
    lang: "auto",
    installments: true,
    modal: true,
    container: "#culqi-container", // Opcional
    paymentMethods: paymentMethods,
    paymentMethodsSort: Object.keys(paymentMethods), // las opciones se ordenan según se configuren en paymentMethods
  };

  const client = {
    email: "review@culqi.com",
  };

  const appearance = {
    theme: "default",
    hiddenCulqiLogo: false,
    hiddenBannerContent: false,
    hiddenBanner: false,
    hiddenToolBarAmount: false,
    menuType: "sidebar", // default/sidebar / sliderTop / select
    buttonCardPayText: "Pagar tal monto", // hexadecimal
    logo: "http://www.childrensociety.ms/wp-content/uploads/2019/11/MCS-Logo-2019-no-text.jpg",
  };

  const handleCulqiAction = async () => {
    if (Culqi.token) {
      const token = Culqi.token.id;
      console.log("Se ha creado un Token: ", token);
    } else if (Culqi.order) {
      const order = Culqi.order;
      console.log("Se ha creado el objeto Order: ", order);
    } else {
      console.log("Errorrr : ", Culqi.error);
    }

    let response = null;

    response = await createCharge(DeviceID, Culqi.token.id);

    handleResponse(response.status, response.data);
  };

  const config = {
    settings,
    client,
    options,
    appearance,
  };

  const Culqi = new CulqiCheckout(PUBLIC_KEY, config);

  Culqi.culqi = handleCulqiAction;

  Culqi.open();

  var handleResponse = (statusCode, objResponse) => {
    let message = "";
    switch (statusCode) {
      case 200:
        if (objResponse.action_code === "REVIEW") {
          validationInit3DS({
            email: client.email,
            statusCode,
            tokenId: Culqi.token.id,
          });
          console.log("revisión con 3ds");
          break;
        }
        message = "ERROR AL REALIZAR LA OPERACIÓN";
        break;
      case 201:
        message = "OPERACIÓN EXITOSA - SIN 3DS";
        window.Culqi3DS.reset();
        break;
      default:
        message = "OPERACIÓN FALLIDA - SIN 3DS";
        window.Culqi3DS.reset();
        break;
    }

    if (message.length > 0) {
      document.querySelector("#cardResponse").innerHTML = message;
    }
  };

  const validationInit3DS = ({ statusCode, email, tokenId }) => {
    window.Culqi3DS.settings = {
      charge: {
        totalAmount: settings.amount,
        returnUrl: "http://localhost:4000/",
      },
      card: {
        email: email,
      },
    };
    window.Culqi3DS.initAuthentication(tokenId);
  };
};

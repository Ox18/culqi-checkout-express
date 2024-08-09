const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar EJS como el motor de plantillas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const datos = {
    publicKey: process.env.CULQI_PUBLIC_KEY,
    privateKey: process.env.CULQI_PRIVATE_KEY,
  };
  res.render("index", datos);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

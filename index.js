const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let clientIdCounter = 1; // Counter variable to track the client IDs
let clientes = [];

// Rota para cadastro de clientes (POST)
app.post("/clientes", (req, res) => {
  const novoCliente = req.body;
  novoCliente.id = clientIdCounter; // Assign the current counter value as the ID
  clientes.push(novoCliente);
  clientIdCounter++; // Increment the counter for the next client
  res.sendStatus(200);
});

// Rota para atualização de clientes (PUT)
app.put("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id); // Parse the ID to an integer
  const dadosAtualizados = req.body;

  clientes = clientes.map((cliente) => {
    if (cliente.id === id) {
      return { ...cliente, ...dadosAtualizados };
    }
    return cliente;
  });

  const clienteAtualizado = clientes.find((cliente) => cliente.id === id);
  res.json(clienteAtualizado);
});

// Rota para remoção de clientes (DELETE)
app.delete("/clientes/:id", (req, res) => {
  const id = parseInt(req.params.id); // Parse the ID to an integer
  clientes = clientes.filter((cliente) => cliente.id !== id);
  res.sendStatus(200);
});

// Rota para listagem de clientes (GET)
app.get("/clientes", (req, res) => {
  res.json(clientes);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000/");
});

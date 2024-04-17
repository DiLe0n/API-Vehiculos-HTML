const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let vehiculos = [];

app.post('/vehiculos', (req, res) => {
  const { placa, marca, modelo } = req.body;
  const nuevoVehiculo = { placa, marca, modelo };
  vehiculos.push(nuevoVehiculo);
  res.json({ vehiculo: nuevoVehiculo });
});

app.get('/vehiculos', (req, res) => {
  res.json({ vehiculos: vehiculos });
});

app.get('/vehiculos/:placa', (req, res) => {
  const placa = req.params.placa;
  const vehiculo = vehiculos.find(v => v.placa === placa);
  if (vehiculo) {
    res.json({ vehiculo: vehiculo });
  } else {
    res.json({ error: 'Vehiculo no encontrado' });
  }
});

app.delete('/vehiculos/:placa', (req, res) => {
  const placa = req.params.placa;
  const index = vehiculos.findIndex(v => v.placa === placa);
  if (index !== -1) {
    vehiculos.splice(index, 1);
    res.json({ mensaje: 'Vehiculo eliminado' });
  } else {
    res.json({ error: 'Vehiculo no encontrado' });
  }
});

app.listen(3000, () => {
  console.log('Escuchando en puerto 3000');
});
const express = require('express');
const path = require('path');
const app = express();
const fetch = require('node-fetch');

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'deletar_memoria.html'));
});

app.post('/deletar', async (req, res) => {
  const { uuid, apikey } = req.body;

  if (!uuid || !apikey) {
    return res.status(400).json({ error: 'UUID ou API Key ausente.' });
  }

  try {
    const resposta = await fetch(`https://gestor-narosweb.weaviate.network/v1/objects/MemoriaGlobal/${uuid}`, {
      method: 'DELETE',
      headers: {
        'Authorization': apikey,
        'Content-Type': 'application/json'
      }
    });

    const resultado = await resposta.text();
    res.status(resposta.status).send(resultado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🧠 Painel rodando em http://localhost:${PORT}`);
});
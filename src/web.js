const express = require('express')
const app = express()

app.get('*', (request, response) => {
  const envia = response.send.bind(response)
  envia('Hello')
});

app.listen(3000, () =>
  console.log('Rodando na porta 3000!'))

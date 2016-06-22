const express = require('express')

const web = () => {
  const app = express()

  return {
    run: run(app),
    stop: stop(app)
  }
}

const run = (app) => (code, options = {}) => {
  const { port = 0 } = options

  app.get('*', handleGet_(code))
  app.listen(port)
}

const handleGet_ = (code) => (request, response)  => {
  const envia = response.send.bind(response)
  eval(code)
}

const stop = (app) => () =>
  app.close()

module.exports = web

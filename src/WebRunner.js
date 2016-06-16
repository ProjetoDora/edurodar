const express = require('express')

class WebRunner {
  constructor() {
    this.app = express()
  }

  run(code, options = {}) {
    const { port = 0 } = options
    this.code = code

    this.app.get('*', this.handleGet_.bind(this))
    this.app.listen(port)

    return this.app;
  }

  handleGet_(request, response) {
    const envia = response.send.bind(response)
    eval(this.code)
  }
}

module.exports = WebRunner

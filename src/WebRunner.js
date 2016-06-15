const express = require('express')

class WebRunner {
  constructor() {
    this.app = express()
  }

  application() {
    return this.app
  }

  run(code, options = {}) {
    const { port = 0 } = options;

    this.app.listen(port)

    return this.app;
  }
}

module.exports = WebRunner;

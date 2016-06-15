const WebRunner = require('../src/web')

const chai = require('chai')
const expect = require('expect')
const express = require('express')

describe('Web Runner', () => {
  describe('run', () => {
    const code = 'envia("Olá")'
    let webRunner, app

    beforeEach(() => {
      webRunner = new WebRunner()
      app = webRunner.application()

      expect.spyOn(app, 'listen')
    })

    describe('porta', () => {
      it('escuta porta indicada', () => {
        webRunner.run(code, {port: 1234})

        expect(app.listen).toHaveBeenCalledWith(1234)
      })

      it('usa porta zero como padrão, utilizando uma porta aleatória', () => {
        webRunner.run(code)

        expect(app.listen).toHaveBeenCalledWith(0)
      })
    })

  })
})

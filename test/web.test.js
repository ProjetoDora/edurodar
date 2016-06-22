const mockery = require('mockery')
const chai = require('chai')
const spies = require('chai-spies')
const expect = chai.expect

chai.use(spies)

describe('ambiente web', () => {
  let web, express
  const code = 'envia("Olá")'

  beforeEach(() => {
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false
    })
    express = chai.spy.object(['listen', 'get', 'close'])
    mockery.registerMock('express', () => express)

    web = require('../src/web')()
  })

  afterEach(() => {
    mockery.disable()
  })

  describe('run', () => {
    describe('porta', () => {
      it('escuta porta indicada', () => {
        web.run(code, {port: 1234})

        expect(express.listen).to.have.been.called.with(1234)
      })

      it('usa porta zero como padrão, utilizando uma porta aleatória', () => {
        web.run(code)

        expect(express.listen).to.have.been.called.with(0)
      })
    })

    describe('processando requisição', () => {
      let handler

      beforeEach(() => {
        eval = chai.spy()
        web.run(code, {port: 1234})

        handler = express.get.__spy.calls[0][1]
        handler({}, {send: () => {}})
      })

      it('executa código', () => {
        expect(eval).to.have.been.called.with(code)
      })

      it('cria um apelido para "send"')
    })
  })

  describe('stop', () => {
    beforeEach(() => {
      web.stop()
    })

    it('encerrar servidor', () => {
      expect(express.close).to.have.been.called();
    })
  })
})

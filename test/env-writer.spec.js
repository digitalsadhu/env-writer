'use strict';

var envWriter = require('../index.js')
  , expect    = require('chai').expect

describe('env-writer module', function () {

  describe('writing env vars', function () {

    it('should accept an object with key and value properties', function () {
      expect(process.env.THING).to.be.an('undefined')
      envWriter.write({
        key: 'THING',
        value: 'stuff'
      });
      expect(process.env.THING).to.equal('stuff')
    })

    it('should accept an object with key and value', function () {
      expect(process.env.OTHER_THING).to.be.an('undefined')
      envWriter.write({'OTHER_THING': 'stuff'});
      expect(process.env.OTHER_THING).to.equal('stuff')
    })

    it('should accept an object with multiple keys and values', function () {
      expect(process.env.OTHER_THING1).to.be.an('undefined')
      expect(process.env.OTHER_THING2).to.be.an('undefined')
      expect(process.env.OTHER_THING3).to.be.an('undefined')
      envWriter.write({
        'OTHER_THING1': 'stuff1',
        'OTHER_THING2': 'stuff2',
        'OTHER_THING3': 'stuff3'
      });
      expect(process.env.OTHER_THING1).to.equal('stuff1')
      expect(process.env.OTHER_THING2).to.equal('stuff2')
      expect(process.env.OTHER_THING3).to.equal('stuff3')
    })

    it('should accept an array with 2 values', function () {
      expect(process.env.SWAMP_THING).to.be.an('undefined')
      envWriter.write(['SWAMP_THING', 'swamp stuff']);
      expect(process.env.SWAMP_THING).to.equal('swamp stuff')
    })

    it('should accept an array of 2 value tuples', function () {
      expect(process.env.SWAMP_THING1).to.be.an('undefined')
      expect(process.env.SWAMP_THING2).to.be.an('undefined')
      expect(process.env.SWAMP_THING3).to.be.an('undefined')
      envWriter.write([
        ['SWAMP_THING1', 'swamp stuff1'],
        ['SWAMP_THING2', 'swamp stuff2'],
        ['SWAMP_THING3', 'swamp stuff3']
      ]);
      expect(process.env.SWAMP_THING1).to.equal('swamp stuff1')
      expect(process.env.SWAMP_THING2).to.equal('swamp stuff2')
      expect(process.env.SWAMP_THING3).to.equal('swamp stuff3')
    })

    it('should accept a valid json string', function () {
      expect(process.env.JSON).to.be.an('undefined')
      envWriter.write(JSON.stringify({
        key: 'JSON',
        value: 'stuff'
      }));
      expect(process.env.JSON).to.equal('stuff')
    })

    it('should accept a valid json string buffer', function () {
      expect(process.env.BUFFER).to.be.an('undefined')
      envWriter.write(new Buffer(JSON.stringify({
        key: 'BUFFER',
        value: 'stuff'
      })), 'utf8');
      expect(process.env.BUFFER).to.equal('stuff')
    })

  })
})

'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var assert = chai.assert;
var DataHelper = require('../data_helper');
// var HandlerHelper = require('../handler_helper');
chai.config.includeStack = true;
var mockData = require('../data_mock');

describe('Data Helper', function() {
    var helper = new DataHelper();

    describe('Extract Logic', function() {
        it('flattens duplicate RSS entries', function() {
            var expected = [
                "Con base en los resultados de la Encuesta Mensual de la Industria Manufacturera (EMIM), el personal ocupado del sector manufacturero mostró un incremento de 0.1% en junio de este año frente al mes que le precede, con datos ajustados por estacionalidad.",
                "El personal ocupado en los establecimientos con programa IMMEX se incrementó 0.6% en el quinto mes de este año respecto al mes que le precede, con cifras desestacionalizadas. Según el tipo de establecimiento en el que labora, en los manufactureros avanzó 0.5% y en los no manufactureros (que llevan a cabo actividades relativas a la agricultura, pesca, comercio y a los servicios) disminuyó (-)0.6% a tasa mensual."
            ];
            var value = helper.flattenItems(mockData.item);
            return assert.deepEqual(value, expected, 'Flatten structure is same');
        });
    });
});
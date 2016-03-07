var expect = require('expect');
var Mocks = require('./mocks');
var Query = require('../Query');
var db = require('../Utils').loadDatabase(__dirname + '/mocks/mock.db');

describe('Query', function () {
  describe('#getUniqueCountries', function (done) {
    it('should return a Promise', function () {
      var promise = Query.getUniqueCountries(db, Mocks.tables[0]);
      expect(promise).toBeA(Promise);
    });

    it('should reject the promise on error', function (done) {
      Query
        .getUniqueCountries(null, null)
        .catch(function (e) {
          expect(e).toBeAn(Error);
          done();
        });
    });

    it('should get the list of unique countries', function (done) {
      Query
        .getUniqueCountries(db, Mocks.tables[0])
        .then(function (countries) {
          expect(JSON.stringify(countries)).toEqual(JSON.stringify(Mocks.uniqueCountries));
          done();
        });
    });
  });
  describe('#getNutrientNames', function (done) {
    it('should return a Promise', function () {
      var promise = Query.getNutrientNames(db, Mocks.tables[0]);
      expect(promise).toBeA(Promise);
    });

    it('should reject the promise on error', function (done) {
      Query
        .getNutrientNames(null, null)
        .catch(function (e) {
          expect(e).toBeAn(Error);
          done();
        });
    });

    it('should get the list of nutrient names', function (done) {
      Query
        .getNutrientNames(db, Mocks.tables[0])
        .then(function (nutrients) {
          expect(JSON.stringify(nutrients)).toEqual(JSON.stringify(Mocks.nutrients));
          done();
        });
    });
  });
});


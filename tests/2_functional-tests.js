const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
      .request(server)
      .get('/hello')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'hello Guest');
        done();
      });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
      .request(server)
      .get('/hello?name=xy_z')
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, 'hello xy_z');
        done();
      });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
      .request(server)
      .put('/travellers')
      .send({
        "surname": "Colombo"
      })
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.name, 'Cristoforo');
        assert.equal(res.body.surname, "Colombo")

        done();
      });
    });
    // #4
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
      .request(server)
      .put('/travellers')
      .send({surname: "da Verrazzano",
        name: "Giovanni"})
      .end(function (err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.type, 'application/json');
        assert.equal(res.body.name, "Giovanni");
        assert.equal(res.body.surname, "da Verrazzano");
        done();
      });
    });
  });
});

const Browser = require("zombie");
Browser.site = "https://quality-assurance-testing-with-chai.raxsonic.repl.co";

suite("Functional Tests with Zombie.js", function() {//a
  const browser = new Browser();

  suiteSetup(function(done) {//b
    return browser.visit("/", done);
  });//b

  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function() {//c
    // #5 Testing 05
    test('Submit the surname "Colombo" in the HTML form', function (done) {//t1
      browser.fill('surname', 'Colombo').then(() => {//t2
        browser.pressButton('submit', () => {//t3
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.elements('span#dates', 1);
          done();
        });//t3
      });//t2
    }); //t1
    // #6
    test('Submit the surname "Vespucci" in the HTML form', function (done) {//t1
      browser.fill('surname', 'Vespucci').then(() => {//t2
        browser.pressButton('submit', () => {//t3
          browser.assert.success();
          browser.assert.text('span#name', 'Amerigo');
          browser.assert.text('span#surname', 'Vespucci');
          browser.assert.elements('span#dates', 1);
          done();
        });//t3
      });//t2
    });//t3
  }); //c

});//a

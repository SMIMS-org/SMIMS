var expect = require("chai").expect;

var Contract = require("../models/contract.model");

describe("contract model", function () {
  it("should be invalid if tenant_id, tenant, room_number, valid_from, valid_until, price, advance are empty", function (done) {
    var c = new Contract();

    c.validate((err) => {
      expect(err.errors.tenant_id).to.exist;
      expect(err.errors.tenant).to.exist;
      expect(err.errors.room_number).to.exist;
      expect(err.errors.valid_from).to.exist;
      expect(err.errors.valid_until).to.exist;
      expect(err.errors.price).to.exist;
      expect(err.errors.advance).to.exist;
      done();
    });
  });

  it("should be invalid if tenant, valid_from, valid_until, advance are empty", function (done) {
    var c = new Contract({ tenant_id: "tenant_id", room_number: 1, price: 1 });

    c.validate((err) => {
      expect(err.errors.tenant_id).to.not.exist;
      expect(err.errors.tenant).to.exist;
      expect(err.errors.room_number).to.not.exist;
      expect(err.errors.valid_from).to.exist;
      expect(err.errors.valid_until).to.exist;
      expect(err.errors.price).to.not.exist;
      expect(err.errors.advance).to.exist;
      done();
    });
  });

  it("should be valid if all input provided", function (done) {
    var c = new Contract({
      tenant_id: "tenant_id",
      tenant: "tenant",
      room_number: 1,
      valid_from: "2/3/2020",
      valid_until: "2/5/2020",
      price: 1,
      advance: 1,
    });

    c.validate((err) => {
      expect(err).to.null;
      done();
    });
  });
});

var expect = require("chai").expect;

var User = require("../models/user.model");

describe("User model", function () {
  it("should be invalid if name, email, phone_no, address, user_type, password are empty", function (done) {
    var u = new User();

    u.validate((err) => {
      expect(err.errors.name).to.exist;
      expect(err.errors.email).to.exist;
      expect(err.errors.phone_no).to.exist;
      expect(err.errors.address).to.exist;
      expect(err.errors.user_type).to.exist;
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it("should be invalid if email, phone_no, user_type, password are empty", function (done) {
    var u = new User({ name: "name", tin: 1, address: "-" });

    u.validate((err) => {
      expect(err.errors.name).to.not.exist;
      expect(err.errors.email).to.exist;
      expect(err.errors.tin).to.not.exist;
      expect(err.errors.phone_no).to.exist;
      expect(err.errors.address).to.not.exist;
      expect(err.errors.user_type).to.exist;
      expect(err.errors.password).to.exist;
      done();
    });
  });

  it("should be valid if all input provided", function (done) {
    var u = new User({
      name: "name",
      email: "email@email.com",
      tin: 1,
      phone_no: 1,
      address: "-",
      user_type: "admin",
      password: "password",
    });

    u.validate((err) => {
      expect(err).to.null;
      done();
    });
  });
});

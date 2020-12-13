var assert = require("chai").assert;
var expect = require("chai").expect;
var should = require("chai").should();

const validateRegisterInput = require("../validators/tenant.v");

describe("Register Validate", function () {
  it("should have content isValid and errors", function () {
    expect(
      validateRegisterInput({
        name: "",
        email: "",
        tin: "",
        comp_name: "",
        phone_no: "",
        address: "",
        password: "",
      })
    ).to.have.property("isValid");
    expect(
      validateRegisterInput({
        name: "",
        email: "",
        tin: "",
        comp_name: "",
        phone_no: "",
        address: "",
        password: "",
      })
    ).to.have.property("errors");
  });

  it("should have no error", function () {
    assert.isEmpty(
      validateRegisterInput({
        name: "name",
        email: "email@email.com",
        tin: 123,
        comp_name: "comp_name",
        phone_no: 03232121,
        address: "-",
        password: "password",
      }).errors
    );
  });

  it("should have error name required error", function () {
    expect(
      validateRegisterInput({
        name: "",
        email: "email@email.com",
        tin: 123,
        comp_name: "comp_name",
        phone_no: 03232121,
        address: "-",
        password: "password",
      }).errors
    ).to.have.property("name");
  });

  it("should have email incorrect format error", function () {
    expect(
      validateRegisterInput({
        name: "name",
        email: "email@email",
        tin: 123,
        comp_name: "comp_name",
        phone_no: 03232121,
        address: "-",
        password: "password",
      }).errors
    ).to.have.property("email");
  });
});

var assert = require("chai").assert;
var expect = require("chai").expect;
var should = require("chai").should();

const validateContractInput = require("../validators/contract.v");

describe("Contract Validate", function () {
  it("Contract validation has content isValid and errors", function () {
    expect(
      validateContractInput({
        tenant: "",
        room_number: "",
        valid_from: "",
        valid_until: "",
        price: "",
        isAdvance: "",
      })
    ).to.have.property("isValid");
    expect(
      validateContractInput({
        tenant: "",
        room_number: "",
        valid_from: "",
        valid_until: "",
        price: "",
        isAdvance: "",
      })
    ).to.have.property("errors");
  });

  it("Contract validation no error", function () {
    assert.isEmpty(
      validateContractInput({
        tenant: "tenant",
        room_number: 1,
        valid_from: "12/4/2020",
        valid_until: "12/4/2020",
        price: 1,
        advance: 1,
      }).errors
    );
  });

  it("Contract validation has error", function () {
    expect(
      validateContractInput({
        tenant: "tenant",
        room_number: "",
        valid_from: "12/4/2020",
        valid_until: "12/4/2020",
        price: 1,
        advance: 1,
      }).errors
    ).to.have.property("room_number");
  });
});

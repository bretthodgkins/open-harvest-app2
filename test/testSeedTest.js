const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TestSeed Smart Contract", function () {
  it("Should mint TestSeed", async function () {
    const TestSeed = await ethers.getContractFactory("TestSeed");
    const testSeed = await TestSeed.deploy();
    await testSeed.deployed();


    let result = await testSeed.mint('0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 100);
    await result.wait();

    balance = await testSeed.balanceOf('0x70997970C51812dc3A010C7d01b50e0d17dc79C8');
    expect(balance).to.equal(100);
  });
});
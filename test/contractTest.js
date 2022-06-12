const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("OpenHarvest Smart Contract", function () {
  it("Should allow green light toggling", async function () {
    const OpenHarvest = await ethers.getContractFactory("OpenHarvest");
    const openHarvest = await OpenHarvest.deploy();
    await openHarvest.deployed();

    let isGreenLightOn = await openHarvest.isGreenLightOn();
    expect(isGreenLightOn).to.equal(false);

    try {
        const result1 = await openHarvest.toggleGreenLight();
        expect(async () => { await result1.wait() }).to.throw();
    } catch (e) {
        expect(e.message).to.have.string('VM Exception');
    }

    const result2 = await openHarvest.toggleGreenLight({
        value: ethers.utils.parseEther('0.05')
    });
    await result2.wait();

    isGreenLightOn = await openHarvest.isGreenLightOn();
    expect(isGreenLightOn).to.equal(true);

    const result3 = await openHarvest.toggleGreenLight({
        value: ethers.utils.parseEther('0.05')
    });
    await result3.wait();

    isGreenLightOn = await openHarvest.isGreenLightOn();
    expect(isGreenLightOn).to.equal(false);
  });
});
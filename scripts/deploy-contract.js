const hre = require("hardhat");

async function main() {

    const OpenHarvest = await hre.ethers.getContractFactory("OpenHarvest");
    const openHarvest = await OpenHarvest.deploy();

    await openHarvest.deployed();

    console.log("OpenHarvest contract deployed to:", openHarvest.address);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

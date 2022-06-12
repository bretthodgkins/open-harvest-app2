const hre = require("hardhat");

async function main() {

    const TestSeed = await hre.ethers.getContractFactory("TestSeed");
    const testSeed = await TestSeed.deploy();

    await testSeed.deployed();

    console.log("TestSeed contract deployed to:", testSeed.address);
}


main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

require("@nomiclabs/hardhat-waffle");

module.exports = {
    solidity: "0.8.4",
    paths: {
        artifacts: './src/artifacts',
    },
    networks: {
        localhost: {
            accounts: ['59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d'],
        },
        matic: {
            url: 'https://polygon-mumbai.g.alchemy.com/v2/0sHJpony1WPQs5zloIKl-m9HxsyLRq5E',
            accounts: ['']
        }
    }
};

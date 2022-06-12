import { useEffect, useState } from 'react'
import { ethers } from 'ethers';

import logo from './logo.svg'
import './App.css'

import Install from './components/Install';
import WalletBalance from './components/WalletBalance';

import OpenHarvest from './artifacts/contracts/OpenHarvest.sol/OpenHarvest.json';

const contractAddress = '0x8613A4029EaA95dA61AE65380aC2e7366451bF2b';

const provider = new ethers.providers.Web3Provider(window.ethereum);

import TestSeed from './artifacts/contracts/TestSeed.sol/TestSeed.json';
const tokenAddress = '0x5C7c905B505f0Cf40Ab6600d05e677F717916F6B';

// get the end user
const signer = provider.getSigner();

// get the smart contract
const contract = new ethers.Contract(contractAddress, OpenHarvest.abi, signer);

// get the token
const token = new ethers.Contract(tokenAddress, TestSeed.abi, signer);


function App() {
  const [count, setCount] = useState(0);
  const [isGreenLightOn, setIsGreenLightOn] = useState(false);

  useEffect(() => {
    getCount();
    getIsGreenLightOn();
  }, []);

  const getCount = async () => {
    const count = await contract.getCount();
    setCount(parseInt(count));
  }

  const getIsGreenLightOn = async () => {
    const isGreenLightOn = await contract.isGreenLightOn();
    setIsGreenLightOn(isGreenLightOn);
  }

  const increment = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    const result = await contract.increment();
    await result.wait();
    getCount();
  }

  const toggleGreenLight = async () => {
    const connection = contract.connect(signer);
    const addr = connection.address;
    await token.approve(contractAddress, "5000000000000000000");
    const result = await contract.toggleGreenLight();
    await result.wait();
    getIsGreenLightOn();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to OpenHarvest! Exciting things will go here!</p>
        {window.ethereum ? <p>MetaMask installed!</p> : <Install /> }
        <WalletBalance />
        <p>Counter: {count}</p>
        <button onClick={increment}>Increment</button>
        <p>Green Light: {isGreenLightOn ? 'ON' : 'OFF'}</p>
        <button onClick={toggleGreenLight}>Toggle Green Light</button>
      </header>
    </div>
  )
}

export default App

import React, { useState, useEffect, useContext } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// INTERNAL IMPORT
import { calamansiTokenAddress, calamansiTokenABI } from './constants';

const fetchContractERC20 = (signerOrProvider) =>
  new ethers.Contract(
    calamansiTokenAddress,
    calamansiTokenABI,
    signerOrProvider
  );

export const ERC20ICOContext = React.createContext();

export const ERC20Provider = ({ children }) => {
  const calamansiToken = 'Calamansi Token';

  //------USER ACCOUNT
  const [holderArray, setHolderArray] = useState([]);
  const [account, setAccount] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [userId, setUserId] = useState('');

  //------TOKEN INFO
  const [NoOfToken, setNoOfToken] = useState('');
  const [TokenName, setTokenName] = useState('');
  const [TokenStandard, setTokenStandard] = useState('');
  const [TokenSymbol, setTokenSymbol] = useState('');
  const [TokenOwner, setTokenOwner] = useState('');
  const [TokenOwnerBal, setTokenOwnerBal] = useState('');

  //------CONNECTING WALLET TO APPLICATION
  const checkConnection = async () => {
    try {
      if (!window.ethereum) return console.log('Please install MetaMask');

      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });
      setAccount(accounts[0]);

      //------CREATING CONNECTION TO CONTRACT AND FETCHING DATA
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      //------GET ALL TOKEN HOLDERS
      const allTokenHolder = await contract.balanceOf(accounts[0]);
      setAccountBalance(allTokenHolder.toNumber());

      const totalHolder = await contract._userId();
      setUserId(totalHolder.toNumber());
    } catch (error) {
      console.log('App is not connected!!');
    }
  };

  //------ERC20 CONTRACT
  const ERC20CalamansiToken = async () => {
    try {
      //------CREATING CONNECTION TO CONTRACT AND FETCHING DATA
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner("0x70997970C51812dc3A010C7d01b50e0d17dc79C8");
      const contract = fetchContractERC20(signer);

      // TOKEN SUPPLY
      const supply = await contract.totalSupply()
      const totalSupply = supply.toNumber()
      setNoOfToken(totalSupply)

      // TOKEN NAME
      const name = await contract.name()
      setTokenName(name)

      //TOKEN SYMBOL
      const symbol = await contract.symbol()
      setTokenSymbol(symbol)

      //TOKEN STANDARD
      const standard = await contract.standard()
      setTokenStandard(standard)

      //TOKEN OWNERCONTRACT
      const ownerOfContract = await contract.ownerOfContract()
      setTokenOwner(ownerOfContract)

      //OWNER TOKEN BALANCE
      const balanceToken = await contract.balanceOf('0x70997970C51812dc3A010C7d01b50e0d17dc79C8')
      setTokenOwnerBal(balanceToken)
      
      
      //TOKEN SYMBOL
      //TOKEN SYMBOL


    } catch (error) {
      console.log('Error in ERC20 token');
    }
  };

  return (
    <ERC20ICOContext.Provider value={{ calamansiToken, checkConnection }}>
      {children}
    </ERC20ICOContext.Provider>
  );
};

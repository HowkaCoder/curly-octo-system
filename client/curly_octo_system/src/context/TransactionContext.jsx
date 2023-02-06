import React , { useEffect , useState } from 'react';
import { ethers } from 'ethers';

import { contractABI , contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window ;

const getethereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);

    const signer = provider.getSigner();
    /** 
     * contractaddress is the result of "npx hardhat run scripts/deploy.js --network goerli" , and this is the main address
     * 
     * contractABI is a data about main valus in our smart-contract " event Transfer(address from , address reciever , uint amount , string message ,  uint256 timestamp , string keyword ); "
     * 
     * signer is a user , I mean all data about user 
    */
    const transactionContract = new ethers.Contract(contractAddress , contractABI , signer); 

    console.log({
        provider,
        signer,
        transactionContract
    });
    return transactionContract;
}

export const TransactionProvider = ({children}) => {
    const [currentAccount, setCurrentAccount] = useState()
    const [formData, setFormData] = useState({addressTo : '' , amount:'' , keyword:'' , message:''})
    const [isLoading, setIsLoading] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
    const handleChange = (e , name) => {
        setFormData((prevState) => ({...prevState , [name]:e.target.value}) ); // dont touch 
    }

    const sendTransaction = async () => {
        try {
        if(!ethereum) alert("Please install metamask");

        const { addressTo , amount , message , keyword} = formData;
        const transactionContract = getethereumContract();
        const parsdAmount = ethers.utils.parseEther(amount)
        await ethereum.request({
            method: 'eth_sendTransaction',
            params: [{
                from:currentAccount,
                to: addressTo,
                gas : '0x5208', // 21000 GWEI
                value: parsdAmount._hex // 0.00001
            }]
        });

        const transactionHash = await transactionContract.addToBlockchain(addressTo , parsdAmount , message , keyword);
        
        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        setIsLoading(false);
        console.log(`Successed - ${transactionHash.hash}`);
        const transactionCount = await transactionContract.getTransactionsCount();
        setTransactionCount(transactionCount.toNumber());
        } catch (error) {
            
            console.log(error)

            throw Error("No ethereum object1")
            
        }
    }

    const checkIfWalletConnected = async () => {
        try {
            
        if(!ethereum) alert("Please install metamask");

        const accounts = await ethereum.request({method : 'eth_accounts'});

        if(accounts.length){
            setCurrentAccount(accounts[0])
        }else {
            console.log("No found account")
        }            
        } catch (error) {
            
            console.log(error)

            throw Error("No ethereum object")
        }

    }
    
    useEffect(()=>{
        checkIfWalletConnected();
    } , []);

    const connectWallet = async () => {
        try {
            if(!ethereum) alert("Please install metamask");

            const accounts = await ethereum.request({method : 'eth_requestAccounts'});
               
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error)

            throw Error("No ethereum object")
        }
    }

    return (
        <TransactionContext.Provider value={{ connectWallet  , currentAccount , formData ,sendTransaction ,handleChange   }} >
            {children}
        </TransactionContext.Provider>
    );
}
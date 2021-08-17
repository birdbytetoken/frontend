import { createContext, useContext, useState } from "react"
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { infuraKey, nodeRpcUrl } from "../config";

const Web3Context = createContext();

const providerOptions = {
    /* See Provider Options Section */
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: infuraKey, // required
            rpc: {
                bsc: nodeRpcUrl
            }
        }
      }
};

export function Web3Provider({ children }) {
    const [web3, setWeb3] = useState(null)
    const [account, setAccount] = useState(null)

    const setData = async (web3) => {
        setWeb3(web3);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    }

    const connectWallet = async () => {
        let web3Connection;
        // Existing connection in state
        if (web3) {
            setData(web3);
        }
        // Modern dapp browsers...
        else if (window.ethereum) {
            web3Connection = new Web3(window.ethereum);
            try {
                // Request account access if needed
                await window.ethereum.enable();
                // Accounts now exposed
                setData(web3Connection);
            } catch (error) {
                console.log(error);
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            // Use Mist/MetaMask's provider.
            web3Connection = window.web3;
            console.log("Injected web3 detected.");
            setData(web3Connection);
        }
        // use web3 modal.
        else {
            const web3Modal = new Web3Modal({
            //   network: "mainnet", // optional
            //   cacheProvider: true, // optional
              providerOptions // required
            });
    
            const provider = await web3Modal.connect();
            web3Connection = new Web3(provider);
            setData(web3Connection)

            provider.on("accountsChanged", (accounts) => {
                setAccount(accounts[0]);
            });
        }
    }

    const disconnectWallet = async () => {
        if (web3 && web3.currentProvider && web3.currentProvider.close) {
            await web3.currentProvider.close();
        }
        
        setWeb3(null);
        setAccount(null)
    }

    return (
        <Web3Context.Provider value={{ account, connectWallet, disconnectWallet, web3 }}>
        {children}
      </Web3Context.Provider>
    );
}


export function useWeb3Context() {
    return useContext(Web3Context);
}
  
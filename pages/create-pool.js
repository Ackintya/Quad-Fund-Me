import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import{
  projectaddress, marketaddress, pooladdress
} from '../config'

import Qfunding from "../artifacts/contracts/Qfunding.sol/Qfunding.json"
import Project from '../artifacts/contracts/Project.sol/Project.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({Seed:'', name: '', Owner: '' })
  const router = useRouter()

  async function CreatePool() {
    const { Seed,name,Owner } = formInput
    if (!Seed||!Owner || !name) return
 
    try {
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)    
      const signer = provider.getSigner()
      const user= await signer.getAddress()
      console.log(user)
      /* next, create the item */
      let contract = new ethers.Contract(marketaddress, Qfunding.abi, signer)
      //let overrides = {
        // To convert Ether to Wei:
        //value: ethers.utils.parseEther(Seed)     // ether in this case MUST be a string
    
        // Or you can use Wei directly if you have that:
        // value: someBigNumber
        // value: 1234   // Note that using JavaScript numbers requires they are less than Number.MAX_SAFE_INTEGER
        // value: "1234567890"
        // value: "0x1234"
    
        // Or, promises are also supported:
        // value: provider.getBalance(addr)
    //};
    
    // Pass in the overrides as the 3rd parameter to your 2-parameter function:
    let transaction = await contract.createPool(name, Owner, {value:ethers.utils.parseEther(Seed)});
      let tx = await transaction.wait()
      console.log(tx)
      router.push('/')
    } catch (error) {
      console.log('Error creating Pool: ', error)
    }  
  }

  

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
      <input
          placeholder="Pool Seed"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, Seed: e.target.value })}
        />
      <input
          placeholder="Pool Name"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        
        <input
          placeholder="Pool Owner"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, Owner: e.target.value })}
        />

        <button onClick={CreatePool} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create a Pool now
        </button>
      </div>
    </div>
  )
}
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Web3Modal from "web3modal"
import EthTipJar from '../Components/contributePool'
import{
  marketaddress
      }
from '../config'

import Qfunding from "../artifacts/contracts/Qfunding.sol/Qfunding.json"
import Pool from '../artifacts/contracts/Pool.sol/Pool.json'

export default function Home() {
  
  const [pools,setPools]= useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  useEffect(() => {
    loadPools()
    document.title="All Pools"
  }, [])
 
  
  async function loadPools() {
    const web3Modal = new Web3Modal({
        network: "sepolia",
        cacheProvider: true,
      })
      const connection = await web3Modal.connect()
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const creator=await signer.getAddress()
    const marketContract = new ethers.Contract(marketaddress, Qfunding.abi, signer)
   
   const data=await marketContract.listPools()
   console.log(data)
   const items = await Promise.all(data.map(async i => {
      
      const poolContract= new ethers.Contract(i,Pool.abi,signer)
      const poolName=await poolContract.name()      
      const poolOwner=await poolContract.poolowner()
      const balance = await provider.getBalance(i);
      const count = await poolContract.projectcount()
      const poolid=await poolContract.id()
      console.log(ethers.utils.formatEther(balance))
      const Items={
      poolName:poolName,
      owner:poolOwner,
      bal:ethers.utils.formatEther(balance),
      projectcount:count.toString(),
      address:i,
      poolID:poolid.toString(),     
    }
    return Items
  }))
  
    setPools(items)
    setLoadingState('loaded') 
  }
  
  if (loadingState === 'loaded' && !pools.length) return (<h1 className="px-20 py-10 text-3xl">No items in this round</h1>)
  return (
    <div className="flex justify-center">
      <div className="px-6" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
              pools.map((pool, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <p style={{ height: '44px' }} className="flex text-l text-blue py-1 justify-center font-semibold">Pool ID: {pool.poolID}  </p>
                <p style={{ height: '40px' }} className="flex text-xl text-blue py-2 justify-center font-semibold"> Name: {pool.poolName}</p>
                <p style={{ height: '40px' }} className="flex text-l text-blue py-1 justify-center font-semibold">Pool Balance: &nbsp;<b> {pool.bal} Ξ</b> </p>
                <p style={{ height: '44px' }} className="flex text-l text-blue py-1 justify-center font-semibold">Projects: {pool.projectcount}  </p>
                <EthTipJar  acc={pool.address}/>
              </div>
             ))
              }
        </div>
      </div>
    </div>
  )
}
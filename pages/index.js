import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Modal from './useModal'
import{
  marketaddress
      }
from '../config'

import Qfunding from "../artifacts/contracts/Qfunding.sol/Qfunding.json"
import Project from '../artifacts/contracts/Project.sol/Project.json'
import Pool from '../artifacts/contracts/Pool.sol/Pool.json'

export default function Home() {
  
  const [pools,setPools]= useState([])
  const [projects, setProjects] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  useEffect(() => {
    loadPools()
    document.title="Menu"

  }, [])

  async function loadPools() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider()
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(marketaddress, Qfunding.abi, signer)
   
   const data=await marketContract.listPools()
    const items = await Promise.all(data.map(async i => {
      
      const poolContract= new ethers.Contract(i,Pool.abi,signer)
      const poolName=await poolContract.name()
      const projdata= await poolContract.listprojects()
      
      const projitems = await Promise.all(projdata.map(async j => {
      const projectContract = new ethers.Contract(j,Project.abi,signer)

      const owner=await projectContract.owner()
      const name=await projectContract.name()
      const imag=await projectContract.image()
      const desc= await projectContract.description()
      const bal = await provider.getBalance(j);
  //    const sqsum=await projectContract.sqsum();
      const item = {
        owner:owner,
        name:name,
        image:imag,
        description:desc,
        address:j,
   //     sqrsum:sqsum.toString(),
        balance:ethers.utils.formatEther( bal ),
      }

      return item
    }))
    const Items={
      poolName:poolName,
      projects:projitems,      
    }
    return Items
  }))
    setPools(items)
    setLoadingState('loaded') 
  }
  
  if (loadingState === 'loaded' && !pools.length) return (<h1 className="px-20 py-10 text-3xl">No items in this round</h1>)
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
              pools.map((pool, i) => (
              pool.projects.map((projs,j)=>(
              <div key={j} className="border shadow  justify-center rounded-xl overflow-hidden">
                <p style={{ height: '30px' }} className="flex text-l justify-center bg-black text-white font-semibold">&nbsp; Pool: {pool.poolName}</p>
                <img style={{height:'210px'}}  src={projs.image} />
                <p style={{ height: '40px' }} className="flex justify-center pt-1 text-xl font-semibold">{projs.name}</p>
                <div className="p-4">
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{projs.description}</p>
                    </div>
                </div>
                <div className="p-4 bg-black text-white">
                <p style={{ height: '40px' }} className="flex text-l justify-center bg-black text-white font-semibold"> Funds Collected: {projs.balance}</p>

                <Modal className="justify-center" project={projs} />
                </div>
              </div>
             ))))
              }
        </div>
      </div>
    </div>
  )
}
import { ethers } from 'ethers'
import { useEffect, useState, componentDidMount } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"
import EthTipJar from "../Components/sendtransaction"

import{
  projectaddress, marketaddress
} from '../config'

import Qfunding from "../artifacts/contracts/Qfunding.sol/Qfunding.json"
import Project from '../artifacts/contracts/Project.sol/Project.json'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  
  useEffect(() => {
    loadProjects()
  }, [])

  async function loadProjects() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider()
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(marketaddress, Qfunding.abi, signer)
    const data=[]
    
    data=await marketContract.listprojects()
    console.log(data)
    const items = await Promise.all(data.map(async i => {
      const projectContract = new ethers.Contract(i,Project.abi,signer)
      const owner=await projectContract.owner()
      const name=await projectContract.name()
      const imag=await projectContract.image()
      const desc= await projectContract.description()
      const item = {
        owner:owner,
        name:name,
        image:imag ,
        description:desc ,
      }
      return item
    }))
    setProjects(items)
    setLoadingState('loaded') 
  }
  
  if (loadingState === 'loaded' && !projects.length) return (<h1 className="px-20 py-10 text-3xl">No items in this round</h1>)
  return (
    <div className="flex justify-center">
      <div className="px-4" style={{ maxWidth: '1600px' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {
             projects.map((project, i) => (
              <div key={i} className="border shadow rounded-xl overflow-hidden">
                <img style={{height:'200px'}} classname= "flex justify-center" src={project.image} />
                <p style={{ height: '60px' }} className="flex justify-center text-2xl font-semibold">{project.name}</p>
                <div className="p-4">
                  <div style={{ height: '70px', overflow: 'hidden' }}>
                    <p className="text-gray-400">{project.description}</p>
                  </div>
                </div>
                <div className="p-4 bg-black">
                  
                  <EthTipJar acc="0xFABB0ac9d68B0B445fB7357272Ff202C5651694a"/>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
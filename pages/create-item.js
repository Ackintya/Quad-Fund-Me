import { useState,useEffect } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import{
  marketaddress, 
} from '../config'

import Pool from '../artifacts/contracts/Pool.sol/Pool.json'
import Qfunding from "../artifacts/contracts/Qfunding.sol/Qfunding.json"


export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({poolID:'', name: '', description: '' })
  const router = useRouter()
  useEffect(() => {
    document.title="Create Project"
  }, [])
  async function onChange(e) {
    const file = e.target.files[0]
    try {
      const added = await client.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      setFileUrl(url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createMarket() {
    const { poolID,description, name } = formInput
    if (!poolID||!description || !fileUrl || !name) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      poolID,description,name, image:fileUrl
    })
    console.log(data)
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createproject(poolID,description,name,fileUrl)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createproject(poolID,description,name,fileUrl) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()
    const user= await signer.getAddress()
    /* next, create the item */
    let marketcontract = new ethers.Contract(marketaddress, Qfunding.abi, signer)
    const data=await marketcontract.listPools()
    let contract = new ethers.Contract(data[poolID-1], Pool.abi, signer)
    let transaction = await contract.createProject(name,fileUrl,description)
    let tx = await transaction.wait()
    console.log(tx)
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
      <input
          placeholder="Pool Number"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, poolID: e.target.value })}
        />
      <input
          placeholder="Project Name"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
        />
        
        <textarea
          placeholder="Project Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        
        <input
          type="file"
          name="Asset"
          className="my-4"
          onChange={onChange}
        />
        {
          fileUrl && (
            <img className="rounded mt-4" width="350" src={fileUrl} />
          )
        }
        <button onClick={createMarket} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
          Create a Project
        </button>
      </div>
    </div>
  )
}
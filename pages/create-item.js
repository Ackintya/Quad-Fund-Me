import { useState } from 'react'
import { ethers } from 'ethers'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { useRouter } from 'next/router'
import Web3Modal from 'web3modal'

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

import{
  projectaddress, marketaddress
} from '../config'

import Qfunding from "../artifacts/contracts/Qfunding.sol/Qfunding.json"
import Project from '../artifacts/contracts/Project.sol/Project.json'

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ owner: '', name: '', description: '' })
  const router = useRouter()

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
    const { owner, description, name } = formInput
    if (!owner || !description || !fileUrl || !name) return
    /* first, upload to IPFS */
    const data = JSON.stringify({
      owner, description,name, image:fileUrl
    })
    console.log(data)
    try {
      const added = await client.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createproject(owner,description,name,fileUrl)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async function createproject(owner,description,name,fileUrl) {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    /* next, create the item */
    let contract = new ethers.Contract(marketaddress, Qfunding.abi, signer)
    let transaction = await contract.createProject(owner,name,fileUrl,description)
    let tx = await transaction.wait()
    console.log(tx)
    router.push('/')
  }

  return (
    <div className="flex justify-center">
      <div className="w-1/2 flex flex-col pb-12">
        <input 
          placeholder="Project Name"
          className="mt-8 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, owner: e.target.value })}
        />
        <textarea
          placeholder="Project Description"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
        />
        <input
          placeholder="Project id"
          className="mt-2 border rounded p-4"
          onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
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
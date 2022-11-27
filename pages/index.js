import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import Modal from './useModal'
import{marketaddress}from '../config'
import Web3Modal from "web3modal"
import Project from '../artifacts/contracts/Project.sol/Project.json'
import Pool from '../artifacts/contracts/Pool.sol/Pool.json'
import Qfunding from "../artifacts/contracts/Qfunding.sol/Qfunding.json"
// import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
// dotenv.config()

export default function Home() {
  
  const [pools,setPools]= useState([])
  //const [projects, setProjects] = useState([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const [chainid,setChainid]= useState([])
  /*const chainId = await ethereum.request({ method: 'eth_chainId' });
  handleChainChanged(chainId);
  
  ethereum.on('chainChanged', handleChainChanged);
  
  function handleChainChanged(_chainId) {
    // We recommend reloading the page, unless you must do otherwise
    window.location.reload();
  }
  */
  useEffect(() => {
    loadPools()
    document.title="Menu"
    
  }, [])

 
  async function loadPools() {
    /* create a generic provider and query for unsold market items */
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const marketContract = new ethers.Contract(marketaddress, Qfunding.abi, signer)
    setChainid(window.ethereum.networkVersion || 11155111);
    console.log(chainid)
    console.log(marketaddress)

    const data=await marketContract.listPools()
    const items = await Promise.all(data.map(async i => {
      
      const poolContract= new ethers.Contract(i,Pool.abi,signer)
      const poolName=await poolContract.name()
      const projdata= await poolContract.listprojects()
      const poolID = await poolContract.id();

      
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
        id:poolID,
   //     sqrsum:sqsum.toString(),
        balance:ethers.utils.formatEther( bal ),
      }

      return item
    }))
    const Items={
      poolName:poolName,
      projects:projitems,
      id:poolID.toString(),      
    }
    return Items
  }))
    setPools(items)
    setLoadingState('loaded') 
  }
  
//replace chainid as 1337 when using locally
  if(chainid!=11155111) return(<h1 className="px-20 py-10 text-3xl">Change to Sepolia (reload)</h1>)

  if (loadingState === 'loaded' && !pools.length) return (<h1 className="px-20 py-10 text-3xl">No items in this round</h1>)
  return (
      <div className="p-15 mx-auto">
        <div className="pb-14 py-3 space-y-5 ">
          {      
                pools.map((pool, i) => (
                <div className="mx-6 shadow-2xl bg-white justify-center rounded-2xl flow-root" >
                <div className="pb-5">
                <h1 className="truncate flex justify-center text-3xl bg-yellow-600 text-white font-semibold p-5 px-5 rounded-md">{pool.poolName}
                </h1>
                </div>
                <div key={i} className="grid mx-3 rounded-2xl space-x-2 flex-row grid-flow-col grid-cols-5 gap-4 p-5">
                {pool.projects.map((projs,j)=>(
                <div key={j} className=" shadow-xl border-2 hover:text-indigo-400 rounded-xl">
                <img className="mx-auto h-60 md:h-40" src={projs.image} />
                <p className="flex justify-center pt-3 text-2xl font-semibold">{projs.name}</p>
                <div className="p-4">
                  <div>
                    <p className="text-gray-400 truncate flex">{projs.description}</p>
                    </div>
                </div>
                <div className="p-2 rounded-xl bg-black text-white ">
                <p className="text-xl p-3 flex-auto bg-black text-white font-semibold"> Funds Collected: {projs.balance}</p>
                <Modal className="justify-center" project={projs} />
                </div>
                </div>
             ))
                }
            </div>
            <p className="border float-right truncate text-2xl bg-blue-400 text-white p-2 px-5 rounded-tl-md" >Pool Id:{pool.id}</p>
            </div>
              ))
                }
        </div>
      </div>
  )
}
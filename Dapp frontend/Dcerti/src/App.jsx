import React, { useState } from 'react'
import {ethers} from 'ethers'
import ABI from './assets/Cirti.json'
import address from './assets/deployed_addresses.json'

const App = () => {

  const [formdata,setformdata]= useState({
    id:0,
    name:" ",
    course:" ",
    grade:" ",
    date:" "

  })
  const  [output,setoutput] = useState('')
  function handleChange(event) {
    console.log(event.target);
    const {name,value} = event.target
    console.log(name);  
    setformdata((preState)=>({...preState,[name]:value}))
  }

  async function connectMetamask() {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const singner =await provider.getSigner()
    console.log(singner);
    alert(`${singner.address}is successfully loggedin`)
    
  }
  
  async function handleSubmit(event) {
    const provider = new ethers.BrowserProvider(window.ethereum)
    const singner =await provider.getSigner()
    const cAbi = ABI.abi;
    const cAddress = address['CirtiModule#Cirti']
    const contractInstance = new ethers.Contract(cAddress,cAbi,singner)
    const txnRecepient = await contractInstance.issue(
      formdata.id,
      formdata.name,
      formdata.course,
      formdata.grade,
      formdata.date
    )
    console.log(txnRecepient);
  }

  return (
    <>
     <div className='flex flex-row-reverse text-lg py-4 bg-slate-200'>
            <p className='text-black p-2 rounded-lg bg-gray-400 mr-6'><a href="/">Home</a></p>
            <button className='bg-yellow-500 p-2 rounded-lg w-52 mr-6' onClick={connectMetamask}>Connect to Metamask</button>

    </div>
    <div className='flex justify-center mt-16 '>
          <img src="/src/images/online-course.png" alt="" className='w-[400px]'/>
    </div>
    <div className='flex justify-center m-4'><input type="text"  placeholder='Enter Certificate Id to View' className='p-2 mr-4 border-solid border-2 border-black rounded-md'/><button className=' bg-blue-500 p-2 rounded-lg w-36'>Get Certificate</button></div>
    <div className='flex justify-center m-10'>
      <form onSubmit={handleSubmit} className='border-2 w-[600px] p-16 border-black rounded-xl'>
        <p className='text-center text-2xl font-bold'>Issue Certificate Form</p>
        <h3 className='mt-6'>Id :</h3><input className='p-2 w-full border-solid border-2 border-black rounded-md' type="number" id='id' name='id' onChange={handleChange}/>
        <p>Name :</p><input className='p-2 w-full border-solid border-2 border-black rounded-md' type="text" id='name' name='name' onChange={handleChange}/>
        <p>Course :</p><input className='p-2 w-full border-solid border-2 border-black rounded-md' type="text" id='course' name='course' onChange={handleChange}/>
        <p>Grade :</p><input className='p-2  w-full border-solid border-2 border-black rounded-md' type="text" id='grade' name='grade' onChange={handleChange}/>
        <p>Date :</p><input className='p-2 w-full border-solid border-2 border-black rounded-md' type="date" id='date' name='date' onChange={handleChange}/>
        <button className='bg-blue-500 p-3 rounded-lg w-full mt-6'>Submit</button>
      </form>
    </div>
    </>


  )
  
}

export default App
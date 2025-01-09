import { Router } from "express";
import {  ethers } from "ethers";
import ABI from './Cirti.json' with {type:"json"}
import address from './deployed_addresses.json' with {type:"json"}

const certRoute = Router()
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545/");
const signer = await provider.getSigner();
console.log(signer.address)


const certInstance = new ethers.Contract(address["CirtiModule#Cirti"],ABI.abi,signer)

certRoute.get('/',(req,res)=>{
    console.log("Hello");
    res.send("Welcome")
    
})

certRoute.post('/issue',async(req,res)=>{
    try {
    console.log(req.body);
    
    const {id,name,course,grade,date} = req.body;
    console.log(id);
    
    const txnRecipient = await certInstance.issue(id,name,course,grade,date)
    console.log(txnRecipient);
    if(txnRecipient){
        res.send(txnRecipient.hash)
    }
    else{
        res.status(400).json({message:"you transaction failed"})
    }
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
    
})

certRoute.get('/getcertificate/:id',async(req,res)=>{    
    try {
        const id = parseInt(req.params.id, 10)       
        console.log(id);
        const txnvalue = await certInstance.certificates(id);
        console.log(txnvalue);
        
    } catch (error) {
        res.status(500).json({message:"Server Error"})
    }
})

export {certRoute};
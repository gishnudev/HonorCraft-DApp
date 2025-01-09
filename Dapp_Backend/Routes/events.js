import { Router } from 'express'
import { id, Interface, JsonRpcProvider } from 'ethers'
import details from '../lib/deployed_addresses.json' assert { type: 'json' }
import Cert from '../lib/Cert.json' assert { type: 'json' }
const router = Router()

const provider = new JsonRpcProvider('http://127.0.0.1:8545')
const eventTopic = id('Issued(string,uint256,string)')
const iface = new Interface(Cert.abi)

router.get('/', async (req, res) => {
  let eventlogs = []

  BigInt.prototype.toJSON = function () {
    return this.toString()
  }

  await provider
    .getLogs({
      fromBlock: 'earliest',
      toBlock: 'latest',
      address: details['CertModule#Cert'],
      topics: [eventTopic],
    })
    .then((logs) => {
      logs.forEach((log) => {
        eventlogs.push(iface.parseLog(log))
      })
    })

  res.json(eventlogs)
})

export default router
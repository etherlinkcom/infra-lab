import { createPublicClient, http } from 'viem'
import { etherlink, etherlinkTestnet } from 'viem/chains'



async function main() {


  const client = createPublicClient({
    chain: etherlink,
    transport: http(),
  })

  const blockNumber = await client.getBlockNumber()
  console.log({ blockNumber })

  const clientTestnet = createPublicClient({
    chain: etherlinkTestnet,
    transport: http(),
  })

  const blockNumberTestnet = await clientTestnet.getBlockNumber()
  console.log({ blockNumberTestnet })

}

main()

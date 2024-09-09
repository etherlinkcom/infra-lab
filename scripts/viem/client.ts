import { createPublicClient, http } from 'viem'
import { etherlink } from 'viem/chains'



async function main() {


  const client = createPublicClient({
    chain: etherlink,
    transport: http(),
  })

  const blockNumber = await client.getBlockNumber()
  console.log({ blockNumber })
}

main()

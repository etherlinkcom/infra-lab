import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PythModule = buildModule("PythModule", (m) => {
  const pyth = m.contract("Pyth", [], {value: BigInt(1)});

  m.call(pyth, "getEthUsdPrice", []);

  return { pyth };
});

export default PythModule;

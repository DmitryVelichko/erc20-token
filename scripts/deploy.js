
const hre = require("hardhat");

async function main() {
  

  const CalamansiToken = await hre.ethers.getContractFactory("CalamansiToken");
  const calamansiToken = await CalamansiToken.deploy();

  await calamansiToken.deployed();

  console.log(
    `CalamansiToken with 1 ETH deployed to: ${calamansiToken.address}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

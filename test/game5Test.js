const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  // generates random address which is lower than threshold;
  async function getAddress(){
    const currentThreshold = 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;
    let addr = currentThreshold;
    
    
    while (true){
    let randWallet = ethers.Wallet.createRandom().connect(ethers.provider);
    addr = await randWallet.getAddress();
      console.log(addr);
      if(addr<currentThreshold){
        return{randWallet, addr};
      }
    }

  }
  
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    const{randWallet, addr} = await getAddress();
    console.log(`get the random address : ${addr}`);
    
    //send some gas to recently made random account. to make it operates
    const signer = ethers.provider.getSigner(0);
    await signer.sendTransaction({
      to : addr,
      value : ethers.utils.parseEther("1")//send 1 ether
    })
    
    // const ethBalance = await ethers.provider.getBalance(randWallet.currentAddr);
    // console.log(`${currentAddr}balance is worth ${ethBalance}`);
    
    //good luck
    const txn = await game.connect(randWallet).win();
    console.log(`Transaction sent from address ${addr}...`);
    await txn.wait();
    // await game.win();
    console.log("Transaction Completed!")

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

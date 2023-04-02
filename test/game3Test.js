const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { ethers } = require('hardhat');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    
    const contractSigner1 = ethers.provider.getSigner(0);
    const contractSigner2 = ethers.provider.getSigner(1);
    const contractSigner3 = ethers.provider.getSigner(2);
    
    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    
    // const address = await signer.getAddress();
    const addr1 = await contractSigner1.getAddress()
    const addr2 = await contractSigner2.getAddress()
    const addr3 = await contractSigner3.getAddress()
        
    return { game,  contractSigner1, contractSigner2, contractSigner3, addr1, addr2, addr3};
  }

  it('should be a winner', async function () {
    const {
      game
      , signer
      , contractSigner1
      , contractSigner2
      , contractSigner3
      , addr1
      , addr2
      , addr3
    } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    
    await game.connect(contractSigner1).buy({ value: '2' });
    await game.connect(contractSigner2).buy({ value: '3' });
    await game.connect(contractSigner3).buy({ value: '1' });

    // TODO: win expects three arguments
    await game.win(addr1,addr2,addr3);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

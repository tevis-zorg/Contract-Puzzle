const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game1', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game1');
    const game = await Game.deploy();

    return { game };
  }

  it('should be a winner', async function () {
    // leave this as-is
    const { game } = await loadFixture(deployContractAndSetVariables);

    // you must call unlock before you can win
    const txn0 = await game.unlock();
    console.log("unlocking game 1...");
    
    await txn0.wait();
    console.log("unlocked!")

    // leave this call to game.win() as-is
    const txn1 = await game.win();
    console.log("Assessing...");
    
    await txn1.wait();
    console.log("You Win!");

    // leave this testing assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

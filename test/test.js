const { expect } = require('chai');
const { BigNumber } = require('ethers');
const { ethers } = require('hardhat');


describe('Betting Game', function () {


    let BettingGameContract;
    let bettingGame;
    let owner;


    function bnToNumber(bn) {
        return bn.toString() / Math.pow(10, 18)
    }

    beforeEach(async function () {
        provider = ethers.getDefaultProvider();
        [owner] = await ethers.getSigners();
        BettingGameContract = await ethers.getContractFactory('BettingGame').catch(console.error);
        bettingGame = await BettingGameContract.deploy().catch(console.error);
    })


    describe('Are variables to be set appropriately?', function () {
        it('Contract deployed', async function () {
            expect(bettingGame).to.not.be.null;
        })

        it('Contract is set', async function () {
            expect(BettingGameContract).to.not.be.null;
        })

        it('Owner is set', async function () {
            expect(owner).to.not.be.null;
        })
    })


    describe('Accounts must have sufficient funds', function () {

        it('Expect owner to have have balance of at least 1', async function () {
            let balanceBN = await owner.getBalance()
            let balance = bnToNumber(balanceBN)
            expect(balance).to.be.greaterThanOrEqual(1)
        })
    })

    describe('Various', function(){
        it('Contract can receive funds', async function(){
            const value = ethers.utils.parseEther('0.2')
            await expect(owner.sendTransaction({ to: bettingGame.address, value }))
            .to.emit(bettingGame, 'Received')
            .withArgs(owner.address, value)
        })
    })

    describe('Test exceptions', function () {

        it('Too low bet is catched', async function () {
            await expect(bettingGame.play(0, {
                value: ethers.utils.parseEther('0.05')
            })).to.be.revertedWith('Bet must be at least 0.1 ONE');
        })

        it('Invalid bet value is catched', async function () {
            await expect(bettingGame.play(2, {
                value: ethers.utils.parseEther('0.1')
            })).to.be.revertedWith('Betting values can be only 0 or 1');
        })

        it('Insufficent funds for game is fetched', async function () {
            await expect(bettingGame.play(0, {
                value: ethers.utils.parseEther('0.1')
            })).to.be.revertedWith('Insufficent vault balance');
        })       
    })

    describe('Betting Game', function () {

        beforeEach(async function () {
            await owner.sendTransaction({ to: bettingGame.address, value: ethers.utils.parseEther('0.2') })
        })
       
        it('Make a bet', async function () {
            const bet = 0
            const value = ethers.utils.parseEther('0.1')

            await expect(bettingGame.play(0, {
                value
            })).to.emit(bettingGame, 'Result');
        })
    })
})


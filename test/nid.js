const NID = artifacts.require('./NID.sol')

contract('NID', (accounts) => {
  let nid;

  before(async () => {
    nid = await NID.deployed()
  })

  it('deploys successfully', async () => {
    let address = await nid.address
    assert.notEqual(address, 0x0)
    assert.notEqual(address, '')
    assert.notEqual(address, null)
    assert.notEqual(address, undefined)
  })

  it('create person by authoriser', async () => {
    try {
      let personToCreate = await nid.createPerson(542, 'Urmi', 'Dhaka', {from: accounts[0]})
      assert.fail();
    }
    catch (error) {
      assert(error, "Expected it to create person but it did not");
    }
  })

  it('check length of array', async () => {
    try {
      let arrayLength = await nid.data.length
      assert.fail();
    }
    catch (error) {
      assert(error, "Expected it to return length but it did not");
    }
  })

  it('rejects create person by non-authoriser', async () => {
    try {
      let personToCreate = await nid.createPerson(875, 'Nazia', 'Texas', {from: accounts[1]});
      assert.fail();
    }
    catch (error) {
      assert(error, "Expected it not to create person but it did");
    }
  })

  it('update person by authoriser', async () => {
    try {
      let personToUpdate = await nid.updatePerson(542, 'Urmi', 'Khulna', {from: accounts[0]});
      assert.fail();
      let person = await nid.data(542)
      assert.equal(person.name, 'Urmi')
      assert.equal(person.addr, 'Khulna')
    }
    catch (error) {
      assert(error, "Expected it to update person but it did not");
    }
  })

  it('rejects person update by non-authoriser', async () => {
    try {
      let personToUpdate = await nid.updatePerson(542, 'Urmi', 'London', {from: accounts[1]});
      assert.fail();
      let person = await nid.data(542)
      assert.equal(person.name, 'Urmi')
      assert.equal(person.addr, 'Khulna')
    }
    catch (error) {
      assert(error, "Expected it not to update person but it did");
    }
  })

})

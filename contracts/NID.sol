pragma solidity ^0.5.0;

contract NID{

  address private authoriser;

  struct person{
    uint id;
    string name;
    string addr;
    // string pict;
    // string fingerprint;
    // string retinascan;
  }

  constructor() public{
    // the genesis block is the only one that can modify data
    authoriser = msg.sender;
  }

  person[] public data;

  function createPerson(uint _id, string memory _name, string memory _addr) public{
    require(msg.sender == authoriser, "Only the authoriser can add data");
    uint totalCount = data.length;
    data.push(person(_id, _name, _addr));
    assert(data.length == totalCount + 1);
  }

  function updatePerson(uint _id, string memory _name, string memory _addr) public{
    require(msg.sender == authoriser, "Only the authoriser can update data");
    require(bytes(data[_id].name).length != 0, "The person has to exist");
    data[_id].name = _name;
    data[_id].addr = _addr;
  }

  function viewPerson(uint _id) view public returns(string memory, string memory){
    require(bytes(data[_id].name).length != 0, "The person has to exist");
    return (data[_id].name, data[_id].addr);
  }
}

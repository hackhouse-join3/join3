// contracts/FactoryERC1155.sol

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ERC1155.sol";
// import "@openzeppelin/contracts@4.7.0/token/ERC721/ERC721.sol";

contract FactoryERC1155 {

    ERC1155Token[] public collections;    // an array that contains different ERC1155 collections deployed
    mapping(uint256 => address) public indexToContract;  //index to contract address mapping
    mapping(uint256 => address) public indexToOwner;     //index to ERC1155 owner address

    event ERC1155Created(address owner, address tokenContract);  //emitted when ERC1155 token is deployed
    event ERC1155Minted(address owner, address tokenContract, uint amount);  //emmited when ERC1155 token is minted

    function deployERC1155(string memory _contractName, string memory _uri, uint[] memory _ids, string[] memory _names) public returns (address) {
        ERC1155Token t = new ERC1155Token(_contractName, _uri, _names, _ids);
        collections.push(t);  // t is contract instance , mayba an address
        indexToContract[collections.length - 1] = address(t);
        indexToOwner[collections.length - 1] = tx.origin;
        emit ERC1155Created(msg.sender,address(t));
        return address(t);
    }

    // _index is collection's index, if you deploy just one contract, that is 0 .
    function mintERC1155(uint _index, string memory _name, uint256 amount) public {
        uint id = getIdByName(_index, _name);
        collections[_index].mint(indexToOwner[_index], id, amount);
        emit ERC1155Minted(collections[_index].owner(), address(collections[_index]), amount);
    }


    /*
    Helper functions below retrieve contract data given an ID or name and index in the collections array.
    */
    // function getCountERC1155byIndex(uint256 _index, uint256 _id) public view returns (uint amount) {
    //     return collections[_index].balanceOf(indexToOwner[_index], _id);
    // }

    // function getCountERC1155byName(uint256 _index, string calldata _name) public view returns (uint amount) {
    //     uint id = getIdByName(_index, _name);
    //     return collections[_index].balanceOf(indexToOwner[_index], id);
    // }

    function getIdByName(uint _index, string memory _name) public view returns (uint) {
        // return collections[_index].nameToId(_name);
        return collections[_index].nameToId(_name);
    }

    // function getNameById(uint _index, uint _id) public view returns (string memory) {
    //     return collections[_index].idToName(_id);
    // }

    // function getERC1155byIndexAndId(uint _index, uint _id)
    //     public
    //     view
    //     returns (
    //         address _contract,
    //         address _owner,
    //         string memory _uri,
    //         uint supply
    //     )
    // {
    //     ERC1155Token token = collections[_index];
    //     return (address(token), token.owner(), token.uri(_id), token.balanceOf(indexToOwner[_index], _id));
    // }
}
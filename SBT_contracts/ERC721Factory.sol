// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./ERC721.sol";

contract ERC721Factory {
    ERC721Token[] public collections;    // an array that contains different ERC1155 collections deployed
    mapping(uint256 => address) public indexToContract;  //index to contract address mapping
    mapping(uint256 => address) public indexToOwner;     //index to ERC1155 owner address
    mapping(string => uint256) private colletNameToId;
    mapping(uint256 => string) private colletIdToName;
    event ERC721Created(address owner, address tokenContract);  //emitted when ERC1155 token is deployed
    event ERC721Minted(address owner, address tokenContract);  //emmited when ERC1155 token is minted

    // return to Frontend:
    string[] public myStrings;

    function initCollection(string memory name, string memory symbol) public returns (address) {
        if(collections.length > 0 ){
            require(colletNameToId[name] == 0, "Collection has already Existed!");
        }
        ERC721Token t = new ERC721Token(name, symbol);
        collections.push(t);  // t is contract instance , mayba an address
        indexToContract[collections.length ] = address(t); // - 1
        indexToOwner[collections.length ] = tx.origin;  // - 1
        colletNameToId[name] = collections.length  ;  // No.1 Contract is 0  // - 1
        colletIdToName[collections.length ] = name;  // - 1
        emit ERC721Created(msg.sender,address(t));
        return address(t);
    }

    // function getCollections() public view returns (address[] memory) {
    //     return collections;
    // }

    // The address of the 2 contracts created by the factory contract (Collection Address)
    // return:  0：address[]: 0x6ab764604F926ba6EE8ADA2D7186AA326259f574,0xcba58Af61c7058f71c58F2aA79BcA89bad0F48a3
    function getCollections() public view returns (address[] memory) {
        address[] memory result = new address[](collections.length);
        for (uint i = 0; i < collections.length; i++) {
            result[i] = address(collections[i]);
        }
        return result;
    }

    function getColAddressByName(string memory colletName) public view returns (address ) {
        uint _index = getContractIdByName(colletName);
        return address(collections[_index - 1]);
    }

    // function getAllContracts() public view returns (string[] memory) {
    //     address[] memory contracts = new address[](address(this).balance);

    //     // 遍历合约存储库并将地址添加到数组中
    //     for (uint i = 0; i < collections.length; i++) {
    //         contracts[i] = address(collections[i]);
    //     }
    //     return contracts;
    // }


    // function isCollectionExist(string memory name) internal returns(bool){
    //     if(colletNameToId[name].) {return true;}
    //     return false;
    // }
        // require(colletIdToName.contains(name), "Exists!");

    // _index is collection's index, if you deploy just one contract, that is 0 .
    function mintNFT(string memory colletName, string memory ipfs_uri, address to) public {
        uint _index = getContractIdByName(colletName);
        collections[_index-1].mintNFT(to, ipfs_uri);
        emit ERC721Minted(address(collections[_index-1]), address(collections[_index-1]));
    }

    function burnToken(string memory colletName, uint256 tokenId) public {
        uint _index = getContractIdByName(colletName);
        collections[_index-1].burnToken(tokenId);
    }

    function getContractIdByName(string memory colletName) public view returns (uint256)  {
        if(colletNameToId[colletName] != 0) {
            return colletNameToId[colletName];
        }
        return 9999;
    }

    function getContractNameById(uint  _id) public view returns (string memory) {
        return colletIdToName[_id];
    }

}
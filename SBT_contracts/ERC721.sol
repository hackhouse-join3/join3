//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.10; // tells the solidity version to the complier

// get the OpenZeppelin Contracts, we will use to creat our own
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC721Token is ERC721, ERC721URIStorage, Ownable {

    // keep count of the tokenId
    using Counters for Counters.Counter; // keep track of the token id's
    Counters.Counter private _tokenIds;
    string public tokentype;
    // uint256 public constant maxSupply = 200; // set the max supply of NFT's for your collection

    // constructor() ERC721(string memory name, string memory symbol) { // construct your token, needs name and symbol
    // }
    constructor( string memory name, string memory symbol) ERC721(name, symbol){  //  string memory _type, string memory baseURI, 
        // tokentype = _type;
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function mintNFT(address to, string memory ipfs_uri) public onlyOwner { //function to create nfts
        uint256 newItemId = _tokenIds.current(); // get the tokenId
        // require(newItemId < maxSupply); // check if the total supply has been reached 
        _mint(to, newItemId);     // mint the nft from the sender account 
        // "https://jsonkeeper.com/b/2KQZ" Like :
        //     {"name":"Eda's NFT","description":"Squid Game","image":"https://i.imgur.com/agDJXWg.jpeg","strengthLevel":78,"bestFriend":"Patrick"}
        _setTokenURI(newItemId, ipfs_uri); 
        // the content of this nft is on the url above. This means that the nft is an off-chain nft
        // if the server with the content changes then the image in the url changes 

        _tokenIds.increment(); // increment the token, so when the next person calls the function it will be the next token in line 
    }

    function burnToken(uint256 tokenId) public {
        // Only allow the owner of the token to burn it
        require(msg.sender == ownerOf(tokenId), "Only the owner can burn this token");

        // Burn the token
        _burn(tokenId);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId, /* firstTokenId */
        uint256 batchSize
    ) internal override virtual {
        require(from == address(0), "Err: token transfer is BLOCKED");   
        super._beforeTokenTransfer(from, to, tokenId,batchSize);  
    }

    // function _beforeTokenTransfer(
    // address from, 
    // address to, 
    // uint256 tokenId
    // ) internal override virtual {
    // require(from == address(0), "Err: token transfer is BLOCKED");   
    // super._beforeTokenTransfer(from, to, tokenId);  
    // }

}
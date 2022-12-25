from pprint import pprint
from moralis import evm_api

api_key = "zLoQROnNOIvwsyZXHhZ0WAQaq1E3C20pUA6QWyoRqbahDbk8ndTcSTQr2Jp22sAW"
params = {
    "address": "0xab6Abd1177a962036DE7EBa695983c284100F61a", 
    "chain": "mumbai", 
    "format": "decimal", 
    "limit": 20, 
    "token_addresses": [], 
    "cursor": "", 
    "normalizeMetadata": True, 
}

result = evm_api.nft.get_wallet_nfts(
    api_key=api_key,
    params=params,
)
pprint(result)

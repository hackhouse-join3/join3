from pprint import pprint
from moralis import evm_api

api_key = "zLoQROnNOIvwsyZXHhZ0WAQaq1E3C20pUA6QWyoRqbahDbk8ndTcSTQr2Jp22sAW"

params = {
    "address": "0x686233DDd38f3bB4a37749e406F2629E6e890825", 
    "token_id": "0", 
    "chain": "mumbai", 
    "format": "decimal", 
    "normalizeMetadata": True, 
}


result = evm_api.nft.get_nft_metadata(
    api_key=api_key,
    params=params,
)

pprint(result)

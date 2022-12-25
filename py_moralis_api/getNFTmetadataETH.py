from pprint import pprint
from moralis import evm_api

api_key = "zLoQROnNOIvwsyZXHhZ0WAQaq1E3C20pUA6QWyoRqbahDbk8ndTcSTQr2Jp22sAW"

params = {
    "address": "0xd9b78a2f1dafc8bb9c60961790d2beefebee56f4", 
    "token_id": "739",
    "chain": "eth", 
    "format": "decimal", 
    "normalizeMetadata": True, 
}


result = evm_api.nft.get_nft_metadata(
    api_key=api_key,
    params=params,
)

pprint(result)

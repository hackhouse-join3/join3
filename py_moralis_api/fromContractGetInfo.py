# from moralis import evm_api
# from pprint import pprint

# api_key = "zLoQROnNOIvwsyZXHhZ0WAQaq1E3C20pUA6QWyoRqbahDbk8ndTcSTQr2Jp22sAW"
# params = {
#     "address": "0x7f3059f663FeA1278D53eb96C2c4D58399A91E7e", 
#     "chain": "mumbai", 
#     "format": "decimal", 
#     "limit": 20, 
#     "cursor": "", 
# }

# result = evm_api.nft.get_nft_contract_transfers(
#     api_key=api_key,
#     params=params,
# )
# pprint(result)

from moralis import evm_api
from pprint import pprint

api_key = "zLoQROnNOIvwsyZXHhZ0WAQaq1E3C20pUA6QWyoRqbahDbk8ndTcSTQr2Jp22sAW"
params = {
    "address": "0x6ab764604F926ba6EE8ADA2D7186AA326259f574",
    # 0x4fb086aa15790868541ee57f652cd419787b3c3b
    "chain": "mumbai", 
    "format": "decimal", 
    "limit": 20,
    "totalRanges": 1, 
    "range": 1, 
    "cursor": "", 
    "normalizeMetadata": True, 
}

result = evm_api.nft.get_contract_nfts(
    api_key=api_key,
    params=params,
)

pprint(result)
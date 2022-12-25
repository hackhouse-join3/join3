### 合约更新

部署的合约地址更新 : 0xd07ea382d9163b9930787a8f8353fb51fe16a3f4

json abi  ( `ERC721.json` ) 在 `./deploy`  文件夹

facuet : 

```
https://faucet.polygon.technology/
https://mumbaifaucet.com/
https://calibration-faucet.filswan.com/#/dashboard
```





### 前端流程?

1/ 组织创建 : 

- 调用 POST /api/org , 传入 name/image/description

2/ 已有组织 , 组织创建 Collection : 

- 调用合约
- 调用 PUT  /api/org  向 Organization 追加部署的合约地址
- 合约地址可以通过 `getColAddressByName`  合约函数获取

3/ 在 Collection 中 mint NFT

- 调用 `mintNFT(string memory colletName, string memory ipfs_uri, address to)`

- >  colletName 需要是全局唯一的

  - >  合约 和 后端都要保持 Collection Name 的唯一性   @me



#### NFTStorage 存储 IPFS & 民NFT : 

> IPFS 上传 NFT 的 js 接口可以看这个 ：
>
> - https://nft.storage/docs/client/js/
> - https://nft.storage/docs/quickstart/  ( 全部划掉 )
> - 
>
> NFT 格式是参考 Opensea 的标准格式 : https://docs.opensea.io/docs/metadata-standards
>
> 太长不看, 直接用下面的格式就 OK ( 以 project 类型为例 ) :

```json
{
  "name": "Join3 Frontend",
  "description": "Dedicated to Muggle and Ayu's front-end development SBT! !", 
  "image":  "应该是上传的 File 类型" ?
  "attributes": [
    {
      "trait_type": "projects", 
      "value": "join3"
    },
  ],
}
```



将 ipfs url 放入 mintNFT 函数即可 : 

- https://ipfs.io/ipfs/bafyreielx4iqn6g6tm74qenqtqfavts33vxqrnvv647xecwxspl6unmx74/metadata.json

- collection应该继承自前面创建的 collection







4/ Organization Profile 展示 : 

- GET  /api/org  获取所有的 Org 信息

5/ 点击 Collection :

- moralis evm_api call : 
- evm_api.nft.get_contract_nfts



6/ User Profile: 

- 方法 1 : 调用 Moralis 的 Wallet Address 下的 NFT 并 filter SBT 的 NFT
- 方法 2 : 调用 get_nft_metadata 输入 Collection_Address + token_id



getColAddressByName



协作图谱:

```bash
type: project 

张三 - dDAO - Join3 - builder
李四 - SEEDAO - React - 
```





### 合约方法 : 

- initCollection(string memory name, string memory _type, string memory symbol)

  - 创建 Collection, 在此 Collection 基础上可以 Mint NFT

- getCollections() 

  - 返回本合约工厂创建的所有 Collection Contract Address : 
  - The address of the 2 contracts created by the factory contract (Collection Address)
  - 0x6ab764604F926ba6EE8ADA2D7186AA326259f574,0xcba58Af61c7058f71c58F2aA79BcA89bad0F48a3
  - 好像没什么卵用 ? 

- getColAddressByName(string memory colletName)

  - 通过 Collection name 获取 Collection Address .

- mintNFT(string memory colletName, string memory ipfs_uri, address to)

  - mint NFT

- burnToken(string memory colletName, uint256 tokenId)

  - burn token
  - 还没测试?

- getContractIdByName(string memory colletName)

  - ```solidity
            if(colletNameToId[colletName] != 0) {
                return colletNameToId[colletName];
            }
            return 9999;
    ```

  - 通过 合约 Name 获取 Address







### 1/ 初始化 Organization

接口功能：

> 本接口 `postInitOrg`  用于初始化一个 Organization 

接口请求地址：

```awk
https: xxx/api/org
```

**请求头 :**

| 请求头       | 请求内容                                         | 说明. |
| ------------ | ------------------------------------------------ | ----- |
| Content-Type | multipart/form-data ( 应该不是 application/json) | /     |

**请求方式: POST**

**参数类型** ：**multipart/form-data**

比如用 `react-hook-form` : 

```js
    const formData = new FormData();
    formData.append("files", data.files[0]);
    formData.append("name", data.name);
    formData.append("description", data.description);
```



#### 请求示例：

json 格式 

```json
{
  "name":"SEEDAO",
  "image": File 类型
  "description":  " ...... "
},
```

#### 请求参数说明

| 字段名      | 字段说明                   | 字段类型                       | 是否必填                     |
| ----------- | -------------------------- | ------------------------------ | ---------------------------- |
| name        | 组织名称                   | string                         | 是                           |
| image       | 组织图片                   | 以 file 的形式传输,而不是 json | 否                           |
| description | 组织简介                   | string                         | 否                           |
| project     | project 类型的合约地址数组 | Array                          | 后端自动初始化, 无需前端传输 |
| event       | event 类型的合约地址数组   | Array                          | 后端自动初始化, 无需前端传输 |
| skill       | skill 类型的合约地址数组   | Array                          | 后端自动初始化, 无需前端传输 |



#### 响应示例

成功响应编码：

```json
{
    "code: "200",
    "message": "请求成功",
    "data": 请求的 JSON 数据, Image 返回 uri
}
```

失败响应编码：

```json
{
    "code: "500",
    "message": "服务器内部错误",
}
```

#### 响应参数说明

| **接口返回码** | **接口返回描述** |
| -------------- | ---------------- |
| 200            | 成功             |
| 500            | 系统异常         |



### 2/ 获取全部 Organizations 信息

接口请求地址：

```awk
GET   https: xxx/api/org
```



返回:

```json
[{
    "_id": "639d390dd4bfa8a156fd2cd6",
    "name": "SEEDAO",
    "image": "http://imagesoda.oss-cn-beijing.aliyuncs.com/1671248141869.jpg",
    "description": "description of SEEDAO....",
    "projects": [{
        "name": "join3",
        "address": "0xab6Abd1177a962036DE7EBa695983c28",
        "_id": "639dd1d5d4bfa8a156fd2cdf"
    }],
    "events": [{
        "name": "event-join3",
        "address": "0xCbad11b677a96Ba695983c282036DE7E",
        "_id": "639dd1d5d4bfa8a156fd2ce1"
    }],
    "skills": [],
    "createdAt": "2022-12-17T03:35:41.879Z",
    "updatedAt": "2022-12-17T14:27:33.334Z",
    "__v": 0
},
 {
   "_id": "639d390dd4bfa8a156fd2cd6",
    "name": "dDAO",
   ....
   ...
   ..
   .
 },
  ... 
]
```

project / event / skill 里面存放的是 collection 的合约地址



#### moralis

 moralis  获取 Contract 地址的 NFT 信息 :





### 3/ 向 Organization 追加部署的合约地址

接口功能：

> 本接口 `putOrgCollection`  用于向已有的 Org 中追加 Contract 的 Address 
>
> - 比如向 `706` 组织的 project Array 中 push 一个 Contract Address : "0xab6Abd1177a962036DE7EBa695983c28"
> - 比如向 `SEEDAO` 组织的 event Array 中 push 一个 Contract Address : "0xab6Abd1177a962036DE7EBa695983c28"

接口请求地址：

```awk
PUT   https: xxx/api/org/{orgID}
```

**请求头 :**

| 请求头       | 请求内容         | 说明. |
| ------------ | ---------------- | ----- |
| Content-Type | application/json | /     |

**请求方式: PUT**

**参数类型** ：**JSON**



#### 请求示例：

- 一般每次 PUT 只请求一个类型的 Collection_type , 比如 projects 类型 或者是 events 类型 , 比如

```json
{
  "projects": {"name": "join3", "address": "0xab6Abd1177a962036DE7EBa695983c28" },
}
```

或

```json
{
  "events": {"name": "event-join3", "address": "0xab6Abd1177a962036DE7EBa695983c28" }
}
```



- 打包请求也可以 : 

```json
{
  "name":"SEEDAO",
  "projects": {"name": "join3", "address": "0xab6Abd1177a962036DE7EBa695983c28" },
  "events": {"name": "event-join3", "address": "0xCbad11b677a96Ba695983c282036DE7E" }
}
```



GET 一下查看 PUT 请求的插入情况 :

- 可以看到 projects 和 events 都插入成功了

```json
[
    {
        "_id": "639c7b3345ceb0042a926fe8",
        "name": "SEEDAO",
        "image": "http://imagesoda.oss-cn-beijing.aliyuncs.com/1671199539638.png",
        "description": "description of SEEDAO ....",
        "projects": [
            {
                "name": "join3",
                "address": "0xab6Abd1177a962036DE7EBa695983c28",
                "_id": "639d1d36693a2769e46cc9e1"
            },
        ],
        "events": [
            {
                "name": "event-join3",
                "address": "0xCbad11b677a96Ba695983c282036DE7E",
                "_id": "639d214214a0e4ed8a75831b"
            },

        ],
        "skills": [],
        "createdAt": "2022-12-16T14:05:39.665Z",
        "updatedAt": "2022-12-17T01:55:40.898Z",
        "__v": 0
    }
]
```



#### 重复的 Collection

出于可视化展示的需要 , 重复的 Collection_name 将不被允许

如果某个 Org 出现重复插入的 Collection , Server 将会报错 : 

```json
status_code: 500
{
    "messages": "join3 Exists! Please choose another name."
}
```





### 4/ 初始化 User 

接口功能：

> 本接口用于初始化一个 User

接口请求地址：

```awk
https: xxx/api/user
```

**请求头 :**

| 请求头       | 请求内容            | 说明. |
| ------------ | ------------------- | ----- |
| Content-Type | multipart/form-data | /     |

**请求方式: POST**

**参数类型** ：**multipart/form-data**



#### 请求示例：

formdata 格式 

```json
{
  "name":"Muggle",
  "wallet_address": "0xadasd...",
  "bio": "我来自...",
  "avatar": File 类型
}
```

#### 请求参数说明

| 字段名         | 字段说明  | 字段类型  | 是否必填                     |
| -------------- | --------- | --------- | ---------------------------- |
| name           | User 昵称 | string    | 是                           |
| wallet_address | 钱包地址  | string    | 是                           |
| bio            | 个人简介  | string    | 否                           |
| avatar         | 头像      | file 类型 | 否                           |
| sbts           | sbts 数组 | Array     | 后端自动初始化, 无需前端传输 |



#### 响应示例

成功响应编码：

```json
{
    "code: "200",
    "message": "请求成功",
    "data": 请求的 JSON 数据, Image 返回 uri
}
```

失败响应编码：

```json
{
    "code: "500",
    "message": "服务器内部错误",
}
```

#### 响应参数说明

| **接口返回码** | **接口返回描述** |
| -------------- | ---------------- |
| 200            | 成功             |
| 500            | 系统异常         |



### 5/ 用户追加 SBT 的 NFT 信息 :  

接口功能：

> 本接口用于想用户追加 sbts 数据的 NFT 信息

接口请求地址：

```html
PUT  https: xxx/api/user/{userID}
```

**请求头 :**

| 请求头       | 请求内容 | 说明. |
| ------------ | -------- | ----- |
| Content-Type | JSON     | /     |

**请求方式: PUT**

**参数类型** ：**JSON**

JSON 格式 : 

```json
{
  "sbts": {
    "org": "SEEDAO",
    "collection_address": "0x....",
    "token_id": 2,
    "collection_type": "project",  // project / event / skill
    "collection_name": "", // 继承自前面
    "nft_name": ""   // 继承自前面的填入 NFT metaDATA 的 name
  }
}
```



### 6/ 用户信息修改

修改 name, bio, wallet_address 

如果无需修改,  则不用传

```
PUT  https: xxx/api/user/edit/{userID}
```

**请求头 :**

| 请求头       | 请求内容 | 说明. |
| ------------ | -------- | ----- |
| Content-Type | JSON     | /     |

**请求方式: PUT**

**参数类型** ：**JSON**

JSON 格式 : 

```json
  { 
    "name": "..",
    "bio": ;
  }
```

如上 , 如果 wallet_address 无需修改, 则不传



### 7/ 社交图谱

#### api:

```bash
GET:
http://47.99.143.186/api/graph/nodes
http://47.99.143.186/api/graph/edges
```



#### 数据类型:

```json
[
  {
    from: "0",
    to: "00",
  },
  {
    from: "1",
    to: "0",
    label: "projects"
  },
  {
    from: "6",
    to: "0",
    label: "projects"
  },
  {
    from: "1",
    to: "2",
    label: "PM"
  },
  {
    from: "1",
    to: "3",
    label: "Solidity"
  },
  {
    from: "1",
    to: "4",
    label: "Frontend"
  },
  {
    from: "1",
    to: "5",
    label: "Frontend"
  },
  {
    from: "6",
    to: "7",
    label: "Solidity"
  },
  {
    from: "6",
    to: "2",
    label: "PM"
  },
];
```



#### 使用方法

 fetch API 后，

将数据注入到 ForceGraph.js 文件的变量 edges 和 nodes 里即可。







产品问题 : 

- 先有 User 还是先有 SBT ? 
- SBT 发给某个地址
- User 来注册后









### Todo

给 Collection 添加 URL ?





### Upload Data

Org

```json
POST. http://47.99.143.186/api/org

{
  "name": "dDAO",
  "description": "social dao"
}

PUT: http://47.99.143.186/api/org/63a06dd7566a4a90ae59d6a1
{
  "projects": {"name": "join3", "address": "0xab6Abd1177a962036DE7EBa695983c28" }
}

	

PUT: http://localhost:8080/api/org/63a06714be79137256a98faa
{
  "name":"SEEDAO",
  "projects": {"name": "join3", "address": "0xab6Abd1177a962036DE7EBa695983c28" }
}

```



User

```json
POST http://47.99.143.186/api/user
{
  "name":"Demian.",
  "wallet_address":  "0xab6Abd1177a962036DE7EBa695983c284100F61a",
  "bio": "普通电吉他手，🥏🏀🏸🛹 攒局运动 every day...."
}     -> id: 63a06e2b566a4a90ae59d6a5
{
  "name":"Kate.",
  "wallet_address": "0xab6Abd1177a962036DE7EBa695983c284100F61c",
  "bio": "【近期在做】一个以伊斯兰几何为素材的解谜游戏；一个帮助理解中华文明脉络的大纲；《人文行游指南》；各个文明和学科视角的综合图谱"
}     -> id: 63a06e40566a4a90ae59d6a8



PUT  http://47.99.143.186/api/user/63a06e40566a4a90ae59d6a8      63a06930b8ab93eeef74bff1

{
  "sbts": {
    "org": "SEEDAO",
    "collection_address": "0x....",
    "token_id": 2,
    "collection_type": "project", 
    "collection_name": "..",
    "nft_name": "nftname"
  }
}
```






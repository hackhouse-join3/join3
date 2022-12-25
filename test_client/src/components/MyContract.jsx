// in jsx 
// require('dotenv').config();
// const ethers = require('ethers');  ??? 为啥不能 require
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
// Get Alchemy App URL , ContractDEC Polygon Mumbai
// const API_KEY = process.env.API_KEY;
const API_KEY = "PUEdlCOjOtkjXJB4Lc97d8gseBNF_QgY"
const provider = new ethers.providers.AlchemyProvider('maticmum', API_KEY)
// Create a contract instance
// const myNftContract = new ethers.Contract(contractAddress, contractABI, signer)
const myNftContract = new ethers.Contract(contractAddress, contractABI, provider);
// Get the NFT Metadata IPFS URL
// 这个 URL 是手动上传到 IPFS 后获得的。
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmYueiuRNmL4MiA2GwtVMm6ZagknXnSpQnB3z2gWbz36hP"

const MyContract = () => {

  const init_collection = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress, contractABI,
          signer
        );
        const res = await contract.initCollection(
          "Join3",  // Collection name
          "symbol"  // ERC721 的 symbol，用户可以不填这个，没啥用
        )
        console.log('init_contract status', res)
      }
    } catch (err) {
      console.log('error: ', err)
    }
  }
  const handle_mint = async () => {
    try {
      const { ethereum } = window;
      // console.log('ethereum', ethereum)
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress, contractABI,
          signer
        );
        console.log('signer.address', signer)
        const nftTxn = await contract.initCollection("dnj", "dla");
        console.log('nftTxn', nftTxn)
        // const nftTxn = await contract.mintNFT(
        //   "Join3",  // Collection Name
        //   "https://gateway.pinata.cloud/ipfs/QmRbQm3H8xHioAP92uPMWy4aX5H8zKCwTgqXQc74FH8H7B",  // ipfs URL 
        //   "0xab6Abd1177a962036DE7EBa695983c284100F61a"  // to, mint 给哪个地址
        // )
        // console.log('click mint , Minting ... waiting ...')
        // await nftTxn.wait()
        // console.log('nftTxn.hash: ', nftTxn.hash);
      }
    } catch (err) {
      console.log('error: ', err)
    }
  }



  // const mintNFT = async () => {
  //   let nftTxn = await myNftContract.mint(signer.address, 2)
  //   console.log('click mint')
  //   await nftTxn.wait()
  //   console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
  // }







  /*
  
  // https://www.tonyvu.co/posts/react-hook-form-tailwind-css
  import React, { useState, useEffect } from "react";
  import { useForm } from "react-hook-form";
  import { useMutation, useQuery } from "react-query";
  import httpClient, { baseURL } from "../api/http-common";
  import { AiOutlineCloudUpload } from "react-icons/ai";
  // import axios from 'axios'
  
  
  
  const MyContract = () => {
    const [postResult, setPostResult] = useState({ 'status': null, 'res': null });
    const [data, setData] = useState();  // set Formdata
    const [image, setImage] = useState("");   // 图片上传
    const { register, handleSubmit, watch, getValues, formState: { errors } } = useForm();
  
    const filevalues = getValues('files')
    const convert2base64 = (file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result.toString());
      };
      reader.readAsDataURL(file)
    }
  
    useEffect(() => {
      if (filevalues && filevalues[0]) {
        convert2base64(filevalues[0])
      }
    }, [filevalues])
  
    const onSubmit = async (data) => {
      const formData = new FormData();
      console.log('data', data)
  
  
      formData.append("files", data.files[0]);
      formData.append("name", data.name);
      formData.append("description", data.description);
  
      setData(formData);
    };
  
    const postFormdata = async (formData) => {
      // const [_, formData] = queryKey    // 解构出 formData
      // console.log('postFormdata 里的 formData', formData)
      const res = await fetch(`${baseURL}/org`, {
        method: "POST",
        headers: {
          Accept: "multipart/form-data",
        },
        body: formData,
      }).then((res) => res.json());
      return res
    }
  
    const { isLoading: isPostingTutorial, mutate: postForm } = useMutation(
      ['postForm', data],
      () => postFormdata(data),
      {
        onSuccess: (res) => { setPostResult({ status: 'success', res: res }) },
        onError: (err) => { setPostResult({ status: 'error', res: err.response?.data || err }); },
      }
    );
  
    const { data: querydata, status, refetch: getForm } = useQuery(
      ['query-form-info'],
      async () => {
        return await httpClient.get(`/form?page=${1}&limit=1000`)
      },
      {
        onSuccess: (res) => {
          setPostResult({ status: 'success', res: res?.data })
          // console.log('res',res)
        },
        onError: (err) => { setPostResult({ status: 'error', res: err.response?.data || err }); },
        enabled: false,
        staleTime: Infinity
        // enabled: false  // 禁用查询自动运行
        // 监听 本地 localStorage 事件
      }
    );
  
    const [offlineN, setOfflineN] = useState();
    useEffect(() => {
      if (querydata) {
        setOfflineN(querydata?.data?.countIsoffline)
      }
    }, [querydata])
  
    // console.log('offlineN ...', offlineN)
  
    useEffect(() => {
      // console.log('useEffect postForm!!!!!!!  data.image', data?.image?.substr(0,10))
      if (data) {
        const token = localStorage.getItem("submittedFlag");
        const s_T = localStorage.getItem("submittedTime");
        let diff = (Date.now() - s_T) / (1000 * 60)
        // console.log(diff)
        if (token && diff < 0.002) {
          alert("您已提交过，请等待 2 分钟后再提交。")
        }
        // else if (!data.image) { console.log('data.image is null ......... ') }
        else {
          localStorage.setItem("submittedFlag", 'submitted');
          localStorage.setItem("submittedTime", Date.now());
          // console.log('Post —— postForm ', data)
          postForm();
          alert("提交成功 ~ ")
        }
      }
    }, [data]);
  
    return (
      <>
        <form
          className='max-w-xl w-screen m-auto py-10 mt-10 px-8 border text-gray-700'  // 
          onSubmit={handleSubmit(onSubmit)}
        >
           {!watch('files') || watch('files').length === 0 ? ( 
          <div className='text-gray-700 font-medium mt-4'>
  
            <label className='text-gray-700 font-medium'>组织名称：</label>
            <input
              className='border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700'
              name=''
              placeholder=''
              autoFocus
              {...register("name", { 'required': "Please enter a your name.", })}
            />
            {errors?.name && (
              <div className='mb-3 text-normal text-red-500'>
                {errors?.name.message}
              </div>
            )}
  
            <label className='text-gray-700 font-medium'>组织介绍：</label>
            <input
              className='border-solid border-gray-300 border py-1 mt-1 px-4 w-full rounded text-gray-700'
              name=''
              placeholder=''
              autoFocus
              {...register("description")}
            />
            {errors?.description && (
              <div className='mb-3 text-normal text-red-500'>
                {errors?.description.message}
              </div>
            )}
  
  
            {image && <img src={image} className='w-48' />}
  
            <input type="file" id='fileupload' {...register('files')} className='hidden' />
            *<label htmlFor='fileupload'
              className='cursor-pointer '>
              <span className='inline'>请上传 </span>
              <AiOutlineCloudUpload className='w-12 h-6 inline mx-2 bg-slate-300 rounded border-b border-r shadow' />
            </label>
            {errors?.files && <div className='mb-3 text-normal text-red-500'> {errors?.files.message}</div>}
          </div>
          {watch('files') && <strong>{watch('files')[0]?.name}</strong>}
  
          <button
            className='mt-4 w-full rounded-md bg-black px-20  py-2 text-white border font-semibold text-md'
            type='submit'
          > 提交
          </button>
        </form>
      </>
    )
  }
  */

  return (
    <>
      <button onClick={init_collection}>init_collection </button>
    </>
  )
}
export default MyContract;
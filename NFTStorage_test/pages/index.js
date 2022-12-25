import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { NFTStorage } from "nft.storage";
import { NFT_STORAGE_API_KEY } from "../constants";
import {convertSvgToFile} from './tool'  // Attention !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// import {SvgBlob} from 'react-svg-blob'; 
// import {cross as crossPattern} from 'react-svg-blob/dist/lib/patterns';


export default function Home() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState([]);
  const [ipfsUri, setIpfsUri] = useState("");
  const [ipfs, setIpfs] = useState("");

  const StoreMetadata = async (image, Name, Description) => {
    console.log('image', image)
    // const nftstorage_key = process.env.NFT_STORAGE_API_KEY;
  
    console.log("Preparing Metadata ....");
    const nft = {
      name: Name,
      description: Description,
      image: convertSvgToFile(Name),  // Attention !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      attributes:[
        {
          "trait_type": "projects",  // projects, skills, events 这边是用户选择的 ( select 下拉)
          "value": "join3" // ( 不需要填写，继承自 colletion，保持一致性)
        },
      ]
    };
    console.log("Uploading Metadata to IPFS ....");
    const client = new NFTStorage({ token: NFT_STORAGE_API_KEY });
    const metadata = await client.store(nft);

    console.log("NFT data stored successfully 🚀🚀");
    return metadata;
  };

  const upload = async () => {
    try {
      const metadata = await StoreMetadata(img, name, description);
      const uri = metadata.url;
      setIpfs(uri);
      const url = `https://ipfs.io/ipfs/${metadata.ipnft}`;
      setIpfsUri(url);
    } catch (err) {
      console.log(err);
    }
  };

  const getNFTipfs = () => {
    alert(ipfs);
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Upload metadata on IPFS</title>
        <meta
          name="description"
          content="Create and Upload metadata to IPFS in just a click"
        />
        <link rel="icon" href="/nfticon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a>NFT3</a>
        </h1>

        <p className={styles.description}>
          Get started by filling the form for Metadata
        </p>

        <div className={styles.form}>
          <div className={styles.firstrow}>
            <input
              className={styles.input}
              type="text"
              value={name}
              placeholder="Name of the NFT"
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className={styles.secondrow}>
            <input
              className={styles.input}
              type="text"
              value={description}
              placeholder="Description for the NFT"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div className={styles.thirdrow}></div>
          <label className={styles.inputLabel}>
            <input
              className={styles.inputBox}
              type="file"
              onChange={(e) => setImg(e.target.files[0])}
            ></input>
          </label>
          <div className={styles.buttonRow}>
            <button onClick={upload} className={styles.button}>
              Upload to IPFS.
            </button>
          </div>
          <button onClick={getNFTipfs}>(等待 upload 完成后) get ipfs_uri for nftMint. </button>

        </div>
      </main>
    </div>
  );
}

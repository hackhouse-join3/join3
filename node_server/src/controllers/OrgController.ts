import { NextFunction, Request, Response } from "express";
import { appendFileSync } from 'node:fs';
import { ServerResponse } from "http";
import { List } from "reselect/es/types";
import Orgnization, { IOrg } from "../models/Organization";
import Collection, { ICol } from "../models/Collection";

import dotenv from 'dotenv';
dotenv.config({ path: "./.env" });

const multer = require('multer'); // multer是一个node.js文件上传中间件,有了他才能读取到文件
let co = require('co'); // co 模块，它基于 ES6 的 generator 和 yield ，让我们能用同步的形式编写异步代码。
let OSS = require('ali-oss'); // oss上传所需模块
let fs = require('fs'); // fs可以对文件进行操作

let client = new OSS({    // 链接 oss 这里面的配置最好是放在单独的文件，引入如果要上传的git的话账号密码最好不要传到git
  region: process.env.Region,   // oss地区，只需要把 hangzhou 改为相应地区即可，可以在oss上随便找一个文件链接就知道是哪个地区的了
  accessKeyId: process.env.AccessKeyID, // oss秘钥
  accessKeySecret: process.env.AccessKeySecret, // oss秘钥的密码
  bucket: process.env.Bucket,  // 存储库名称
});

let ali_oss = {
  endPoint: 'imagesoda.oss-cn-beijing.aliyuncs.com',   // 自己的oss链接名，可以在oss上随便找一个文件链接就知道了
  bucket: 'imagesoda'
}

// 文件暂存本地文件夹-自动生成./tmp/
let upload = multer({
  dest: './public/'
});


const putOrgCollection = async (req: Request, res: Response, next: NextFunction) => {
  console.log('putOrgCollection req.params.id ... ', req.params.id)
  try {
    const { projects, events, skills } = req.body; // event, skill
    console.log('projects, events, skills', projects, events, skills)

    // 将数据存入 Collection
    if (projects) {
      const coll_ = await Collection.findOne({ name: projects.name });
      if (coll_) {
        res.status(500).json({ "messages": `${projects.name} Exists! Please choose another name.` })
      } else {
        const col_: ICol = new Collection({
          name: projects.name, contract_address: projects.address
        });
        const savedCol = await col_.save();

        Orgnization.updateOne({ _id: req.params.id },
          { $push: { projects } },
          function (err: any, result: any) {
            if (err) { res.send(err); }
          })
      }
    }

    if (events) {
      const coll_ = await Collection.find({ name: events.name })
      if (coll_) {
        res.status(500).json({ "messages": `${events.name} Exists! Please choose another name.` })
      } else {
        const col_: ICol = new Collection({
          name: events.name, contract_address: events.address
        });
        const savedCol = await col_.save();

        Orgnization.updateOne({ _id: req.params.id },
          { $push: { events } },
          function (err: any, result: any) {
            if (err) { res.send(err); }
          })
      }
    }

    if (skills) {
      const coll_ = await Collection.find({ name: skills.name })
      if (coll_) {
        res.status(500).json({ "messages": `${skills.name} Exists! Please choose another name.` })
      } else {
        const col_: ICol = new Collection({
          name: skills.name, contract_address: skills.address
        });
        const savedCol = await col_.save();

        Orgnization.updateOne({ _id: req.params.id },
          { $push: { skills } },
          function (err: any, result: any) {
            if (err) { res.send(err); }
          })
      }
    }
    const newOrg_ = await Orgnization.findOne({ _id: req.params.id });
    res.json(newOrg_);

  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
}

const postInitOrg = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    console.log("Controller postInitOrg ", name)
    // 不区分大小写查询:
    const orgExists = await Orgnization.findOne({ "name": { '$regex': name, $options: 'i' } });  // findOne({ 'word': word });
    if (orgExists) { res.status(409).json({ message: `The org ${name} already exists !!!!!` }); }

    else {
      const files = req.files as Express.Multer.File[];
      if (files) {
        /*  图片上传部分/ 文件路径 */
        console.log('files', files)
        const myFirstfile = files[0];
        console.log('myFirstfile', myFirstfile)
        // 文件类型
        let temp = myFirstfile.originalname.split('.');
        let filePath = myFirstfile.path
        let fileType = ''
        if (temp) { fileType = temp[temp?.length - 1]; }
        let lastName = '.' + fileType;

        // 构建图片名
        let fileName = Date.now() + lastName;

        console.log('fileType', fileType)  // jpg
        console.log('fileName', fileName)  // 1666022143598.jpg
        let localFile = './' + fileName;

        // 图片重命名
        fs.rename(filePath, fileName, (err: any) => {
          if (err) {
            res.json({
              code: 403,
              message: '文件写入失败(重命名失败)'
            })
          } else {
            // let localFile = './' + fileName;

            // 上传到指定目录（/imgs/2021-11-27/1637994928002.jpg）
            // 将文件上传到指定目录,需要输入目录名称。
            // 若输入的目录不存在,OSS将自动创建对应的文件目录并将文件上传到该目录中。
            let key = fileName;
            console.log('key', key)

            // 阿里云 上传文件
            co(function* () {
              client.useBucket(ali_oss.bucket);
              let result: ServerResponse = yield client.put(key, localFile);
              // 上传成功返回图片路径域名-域名修改成自己绑定到oss的
              console.log('result', result)
              // let imageSrc = result.requestUrls;
              // 上传之后删除本地文件
              fs.unlinkSync(localFile);

            }).catch(function (err: any) {
              // 上传之后删除本地文件
              fs.unlinkSync(localFile);
            })
          }
        })

        const org_: IOrg = new Orgnization({
          name,
          image: `http://imagesoda.oss-cn-beijing.aliyuncs.com/${fileName}`,
          description,
        });
        const savedOrg = await org_.save();
        if (savedOrg) {
          res.json(org_)
        };
      }
      else {
        console.log("no file upload ...")
        const org_: IOrg = new Orgnization({
          name,
          description,
        });
        const savedOrg = await org_.save();
        if (savedOrg) {
          res.json(org_)
        };
      }
    }
  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
};


const getAllOrgs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('Controller getAllOrgs...');
    const orgs = await Orgnization.find()
      .sort({ createdAt: -1 })
    res.json(orgs);
  } catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
};


/*
// 获取认知度排名最低的 N 个 Master 单词
const getCognitionTopN = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const topWords: any = await Word.find()  // {isInRankList: true}
      .sort({ 'idc.cognition': 1 })
      .select('word')
      .limit(10);
    if (topWords) { console.log('topWords', topWords) }
 
    const promises: List<Promise<any>> = await topWords.map(async (word_: any) => {
      const data: any = await Word.findOne({ 'word': word_?.word })
        .select(wordFields)
        .populate('derivation', wordFields)  // 选择 derivation 里所需要的字段
        .populate('synonym', wordFields)
        .populate('confusion', wordFields)
        .populate('examples', SentFields)
      return data
    });
    const wordsList = await Promise.all(promises);
    if (wordsList) { res.json(wordsList) }
  }
  catch (err) {
    res.json(err)
    //res.status(500).json({message: "Something went wrong"}) 
  }
}
 
 
const putRecogn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const WordById: any = await Word.findOne({'word': req.params.id});   // process
    res.json({
      "test": 'test',
    });
  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
}
 
 
 
const getOneWord = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = req.params.id;  //   `/:id`  用 req.params
    console.log('getOneWordId req.params, name)', req.params, name)
    const word_ = await Word.findOne({ 'word': name }) // {'word': word}
 
    const word = await Word.findById(word_?._id)
      // .select("-password")
      .select(wordFields)
    if (word) {
      console.log('The word : ------------ ', word);
      res.json(word);
    }
 
  } catch (err) {
    console.log(err)
    //res.status(500).json( {message: "Something went wrong"} )
  }
};
 
*/

/*  数据结构设计不好产生的丑陋代码：
const addSentence = async (en1:string,zh1:string, en2:string,zh2:string, en3:string, zh3:string, label:any, _id:any, res: Response) => {
  try{
    const sentenceExists = await Sentence.findOne({ en1 });  // findOne({ 'word': word });
    if (sentenceExists) { 
      res.status(409).json({ message: "Exists! - This sentence already exists !!!!!" });
    }else {
      const sent_: ISent = new Sentence({ en: en1, zh: zh1, label });
      sent_.words?.push(_id);
      const savedSent = await sent_.save();
      if(savedSent){ console.log('savedSent ! One sentence insert successfully!')}
    }
  }
  catch(err){
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
};
if(savedWord){
  addSentence(ex1?.ex1En, ex1?.ex1Zh, ex2?.ex2En, ex2?.ex2Zh, ex3?.ex3En,ex3?.ex3Zh,label, savedWord._id, res)
}
*/

/*
const mapLoop = async (strs: string) => {
  const arrStr = strs.split(",").map((item) => item.trim());
  const promises: List<Promise<any>> = await arrStr.map(async (word_) => {
    return Word.findOne({ word: word_ });
  });
  const wordIds = await Promise.all(promises);
  return wordIds.map((item) => item?._id).filter(i => i) // 不能过早地调 ._id !!!
};
 
 
// PUT - Update
const updateWord = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Controller updateWord req.params.id', req.params.id);
  try {
    const { word, derivation, synonym, confusion, soundmark, definition, label, phrase, isInRankList } = req.body;   // confusionWord 
    const editedWord: any = await Word.findOneAndUpdate({ 'word': req.params.id }, {
      $set: {
        word,
        soundmark,
        definition,
        label,
        phrase,
        isInRankList
      }
    }, { new: true });
  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
}
 
// Put -  对 Extension 拓展信息的补充 'extension'
const addWordExtension = async (req: Request, res: Response, next: NextFunction) => {
  console.log('Controller addWordExtension req.params.id', req.params.id);
 
  try {
    const { word, derivation, synonym, confusion, } = req.body;   // confusionWord 
    const word_: any = await Word.findOne({ word: req.params.id });   // process
    if (!word_) {       // if word exists
      res.status(404).json({ message: "Word Does Not exists !!!!!" });
    } else {
      if (derivation) {
        const derivationIdArr: any = await mapLoop(derivation);
 
        for (let i = 0;i < derivationIdArr.length;i++) {
          if (word_?.derivation.includes(derivationIdArr[i])) {
            res.status(409).json({ message: "derivation already exists !!!!!" })
          }
          console.log('derivationIdArr[i] ... ', derivationIdArr[i])
          word_?.derivation?.push(derivationIdArr[i])  // [ new ObjectId("6304e9c21ef50c540cb0630a"),  ]
        };
      }
      if (synonym) {
        const synonymIdArr: any = await mapLoop(synonym);
 
        for (let i = 0;i < synonymIdArr.length;i++) {
          if (word_?.synonym.includes(synonymIdArr[i])) {
            res.status(409).json({ message: "synonym already exists !!!!!" })
          }
          word_?.synonym?.push(synonymIdArr[i])  // [ new ObjectId("6304e9c21ef50c540cb0630a"),  ]
        };
      }
 
      if (confusion) {
        const confusionArr: any = await mapLoop(confusion);
        for (let i = 0;i < confusionArr.length;i++) {
          if (word_?.confusion.includes(confusionArr[i])) {
            res.status(409).json({ message: "confusion already exists !!!!!" })
          }
          word_?.confusion?.push(confusionArr[i])  // [ new ObjectId("6304e9c21ef50c540cb0630a"),  ]
        };
      }
 
      if (word_) {
        const pushed: any = await word_.save();
        res.status(200).json(pushed)
      }
    }  
  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
}
*/

/*
const getWordById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wordId = req.params.id;
    // populate 用于填充关联的数据，这里是填充 user 对应的 posts （推文，一对多）
    const word = await Word.findById(wordId)
      // .select("-password")
      .populate("words");
    if (word) { res.json(word); }
  }
  catch(err) {
    res.status(404).json({ message: "Word not found" });
  }
}*/

/*
const getExtraInfo = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const WordById: any = await Word.findById(req.params.id);
    console.log('Controller getExtraInfo - req.params.id: `````', req.params.id, '``````')
    const name = req.params.id;  //   `/:id`  用 req.params
    const word_ = await Word.findOne({ 'word': name }) // {'word': word}
 
    const wordInfo_derivation = await Word.find(
      { _id: { $in: word_?.derivation } }
    );
    const wordInfo_synonym = await Word.find(
      { _id: { $in: word_?.synonym } }
    );
    const wordInfo_confusion = await Word.find(
      { _id: { $in: word_?.confusion } }
    );
    res.json({
      mainWord: word_,
      derivation: wordInfo_derivation,
      synonym: wordInfo_synonym,
      confusion: wordInfo_confusion,
    });
 
  } catch (err) {
    console.log(err)
    //res.status(500).json( {message: "Something went wrong"} )
  }
};
 
 
//  query a sentence. checkWordsExistence
const checkWordsExistence = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Controller checkWordsExistence... ", req.body.sen)
  try {
    const { sen } = req.body;   // 后面要赋值， 所以用 let
    let resList = []
    for (const word of sen.split(' ')) {   // ['i', 'love', 'you', '']
      const res = await Word.findOne({ word })
      if (res) { resList.push(res.word) }
    }
    if (resList.length > 0) {
      res.status(200).json(resList)
    } else (
      res.status(500).json({ message: "Something went wrong" })
    )
  }
  catch (err) { }
}
*/


export {
  postInitOrg, getAllOrgs, putOrgCollection
};
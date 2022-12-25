import { NextFunction, Request, Response } from "express";
import { appendFileSync } from 'node:fs';
import { ServerResponse } from "http";
import User, { IUser } from "../models/User";
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

const postInitUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, wallet_address, bio } = req.body;
    console.log("Controller postInitUser username ", name, wallet_address)
    const addrExists = await User.findOne({ wallet_address });  // findOne({ 'word': word });
    if (addrExists) { res.status(409).json({ message: `The User Address ${wallet_address} already exists !!!!!` }); }

    else {
      /*  图片上传部分/ 文件路径 */
      const files = req.files as Express.Multer.File[];
      console.log('files', files)
      if (files) {
        const myFirstfile = files[0];
        // console.log('myFirstfile', myFirstfile)
        // 文件类型
        let temp = myFirstfile.originalname.split('.');
        let filePath = myFirstfile.path
        let fileType = ''
        if (temp) { fileType = temp[temp?.length - 1]; }
        let lastName = '.' + fileType;

        // 构建图片名
        let fileName = Date.now() + lastName;

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
        const user_: IUser = new User({
          name,
          bio,
          wallet_address,
          avatar: `http://imagesoda.oss-cn-beijing.aliyuncs.com/${fileName}`,
        });
        const savedUser = await user_.save();
        if (savedUser) {
          res.json(user_)
        };
      }
      else {
        console.log('No file upload ..')
        const user_: IUser = new User({
          name,
          bio,
          wallet_address,
        });
        const savedUser = await user_.save();
        if (savedUser) {
          res.json(user_)
        };
      }
    }
  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
};


const putUserSBT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sbts } = req.body; // event, skill
    console.log('wallet_address sbts', sbts)

    if (sbts) {
      console.log('sbts .... ', sbts)
      User.updateOne({ _id: req.params.id },
        { $push: { sbts } },
        function (err: any, result: any) {
          if (err) { res.send(err); }
        })
    }
    const new_ = await User.findOne({ _id: req.params.id });
    res.json(new_);

  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
}

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // dont display current user in list, 不包括当前用户，因为当前用户已经在前端显示了
    // 字段中也不包括密码，不需要密码。
    const users = await User.find()
      .sort({ createdAt: -1 })
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" })
  }
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.id;
    // populate 用于填充关联的数据，这里是填充 user 对应的 posts （推文，一对多）
    const user = await User.findById(userId)
      .select("-password")
    if (user) { res.json(user); }
  }
  catch (err) {
    res.status(404).json({ message: "User not found" });
  }
}

const putEditUser = async (req: Request, res: Response) => {
  try {
    let { name, bio, wallet_address } = req.body;   // 后面要赋值， 所以用 let
    // update user info
    const editedUser: any = await User.findOneAndUpdate({ _id: req.params.id }, {
      $set: {
        name,
        bio,
        wallet_address
      }
    }, { new: true });
    res.status(200).json(editedUser);
  }
  catch (err) {
    res.status(500).json({ message: "Error while trying to edit user" })
  }
}

export {
  postInitUser,
  putUserSBT,
  putEditUser,
  getAllUsers,
  getUserById,
};
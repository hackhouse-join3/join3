"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.putEditUser = exports.putUserSBT = exports.postInitUser = void 0;
var User_1 = __importDefault(require("../models/User"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
var multer = require('multer'); // multer是一个node.js文件上传中间件,有了他才能读取到文件
var co = require('co'); // co 模块，它基于 ES6 的 generator 和 yield ，让我们能用同步的形式编写异步代码。
var OSS = require('ali-oss'); // oss上传所需模块
var fs = require('fs'); // fs可以对文件进行操作
var client = new OSS({
    region: process.env.Region,
    accessKeyId: process.env.AccessKeyID,
    accessKeySecret: process.env.AccessKeySecret,
    bucket: process.env.Bucket, // 存储库名称
});
var ali_oss = {
    endPoint: 'imagesoda.oss-cn-beijing.aliyuncs.com',
    bucket: 'imagesoda'
};
// 文件暂存本地文件夹-自动生成./tmp/
var upload = multer({
    dest: './public/'
});
var postInitUser = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, wallet_address, bio, addrExists, files, myFirstfile, temp, filePath, fileType, lastName, fileName_1, localFile_1, user_, savedUser, user_, savedUser, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                _a = req.body, name_1 = _a.name, wallet_address = _a.wallet_address, bio = _a.bio;
                console.log("Controller postInitUser username ", name_1, wallet_address);
                return [4 /*yield*/, User_1.default.findOne({ wallet_address: wallet_address })];
            case 1:
                addrExists = _b.sent();
                if (!addrExists) return [3 /*break*/, 2];
                res.status(409).json({ message: "The User Address ".concat(wallet_address, " already exists !!!!!") });
                return [3 /*break*/, 6];
            case 2:
                files = req.files;
                console.log('files', files);
                if (!files) return [3 /*break*/, 4];
                myFirstfile = files[0];
                temp = myFirstfile.originalname.split('.');
                filePath = myFirstfile.path;
                fileType = '';
                if (temp) {
                    fileType = temp[(temp === null || temp === void 0 ? void 0 : temp.length) - 1];
                }
                lastName = '.' + fileType;
                fileName_1 = Date.now() + lastName;
                localFile_1 = './' + fileName_1;
                // 图片重命名
                fs.rename(filePath, fileName_1, function (err) {
                    if (err) {
                        res.json({
                            code: 403,
                            message: '文件写入失败(重命名失败)'
                        });
                    }
                    else {
                        // let localFile = './' + fileName;
                        // 上传到指定目录（/imgs/2021-11-27/1637994928002.jpg）
                        // 将文件上传到指定目录,需要输入目录名称。
                        // 若输入的目录不存在,OSS将自动创建对应的文件目录并将文件上传到该目录中。
                        var key_1 = fileName_1;
                        console.log('key', key_1);
                        // 阿里云 上传文件
                        co(function () {
                            var result;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        client.useBucket(ali_oss.bucket);
                                        return [4 /*yield*/, client.put(key_1, localFile_1)];
                                    case 1:
                                        result = _a.sent();
                                        // 上传成功返回图片路径域名-域名修改成自己绑定到oss的
                                        console.log('result', result);
                                        // let imageSrc = result.requestUrls;
                                        // 上传之后删除本地文件
                                        fs.unlinkSync(localFile_1);
                                        return [2 /*return*/];
                                }
                            });
                        }).catch(function (err) {
                            // 上传之后删除本地文件
                            fs.unlinkSync(localFile_1);
                        });
                    }
                });
                user_ = new User_1.default({
                    name: name_1,
                    bio: bio,
                    wallet_address: wallet_address,
                    avatar: "http://imagesoda.oss-cn-beijing.aliyuncs.com/".concat(fileName_1),
                });
                return [4 /*yield*/, user_.save()];
            case 3:
                savedUser = _b.sent();
                if (savedUser) {
                    res.json(user_);
                }
                ;
                return [3 /*break*/, 6];
            case 4:
                console.log('No file upload ..');
                user_ = new User_1.default({
                    name: name_1,
                    bio: bio,
                    wallet_address: wallet_address,
                });
                return [4 /*yield*/, user_.save()];
            case 5:
                savedUser = _b.sent();
                if (savedUser) {
                    res.json(user_);
                }
                ;
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _b.sent();
                console.log("error: ------- ", err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.postInitUser = postInitUser;
var putUserSBT = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var sbts, new_, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                sbts = req.body.sbts;
                console.log('wallet_address sbts', sbts);
                if (sbts) {
                    console.log('sbts .... ', sbts);
                    User_1.default.updateOne({ _id: req.params.id }, { $push: { sbts: sbts } }, function (err, result) {
                        if (err) {
                            res.send(err);
                        }
                    });
                }
                return [4 /*yield*/, User_1.default.findOne({ _id: req.params.id })];
            case 1:
                new_ = _a.sent();
                res.json(new_);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                console.log("error: ------- ", err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.putUserSBT = putUserSBT;
var getAllUsers = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, User_1.default.find()
                        .sort({ createdAt: -1 })];
            case 1:
                users = _a.sent();
                res.json(users);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.status(500).json({ message: "Something went wrong" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllUsers = getAllUsers;
var getUserById = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                userId = req.params.id;
                return [4 /*yield*/, User_1.default.findById(userId)
                        .select("-password")];
            case 1:
                user = _a.sent();
                if (user) {
                    res.json(user);
                }
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(404).json({ message: "User not found" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getUserById = getUserById;
var putEditUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, bio, wallet_address, editedUser, err_5;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_2 = _a.name, bio = _a.bio, wallet_address = _a.wallet_address;
                return [4 /*yield*/, User_1.default.findOneAndUpdate({ _id: req.params.id }, {
                        $set: {
                            name: name_2,
                            bio: bio,
                            wallet_address: wallet_address
                        }
                    }, { new: true })];
            case 1:
                editedUser = _b.sent();
                res.status(200).json(editedUser);
                return [3 /*break*/, 3];
            case 2:
                err_5 = _b.sent();
                res.status(500).json({ message: "Error while trying to edit user" });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.putEditUser = putEditUser;

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
exports.getEdges = exports.getNode = void 0;
var Organization_1 = __importDefault(require("../models/Organization"));
var User_1 = __importDefault(require("../models/User"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./.env" });
var getNode = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var nodes, org_, i, j, j, j, user_, i, err_1;
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log('getNode ... ');
                _c.label = 1;
            case 1:
                _c.trys.push([1, 4, , 5]);
                nodes = [];
                return [4 /*yield*/, Organization_1.default.find({})];
            case 2:
                org_ = _c.sent();
                // console.log('org_', org_)
                for (i = 0; i < org_.length; i++) {
                    nodes.push({
                        id: org_[i]._id,
                        label: org_[i].name
                    });
                    for (j = 0; j < org_[i].projects.length; j++) {
                        nodes.push({
                            id: org_[i].projects[j].address,
                            label: org_[i].projects[j].name,
                        });
                    }
                    for (j = 0; j < org_[i].events.length; j++) {
                        nodes.push({
                            id: org_[i].events[j].address,
                            label: org_[i].events[j].name,
                        });
                    }
                    for (j = 0; j < org_[i].skills.length; j++) {
                        nodes.push({
                            id: (_a = org_[i].skills[j]) === null || _a === void 0 ? void 0 : _a.address,
                            label: (_b = org_[i].skills[j]) === null || _b === void 0 ? void 0 : _b.name,
                        });
                    }
                }
                return [4 /*yield*/, User_1.default.find({})];
            case 3:
                user_ = _c.sent();
                for (i = 0; i < user_.length; i++) {
                    nodes.push({
                        id: user_[i]._id,
                        label: user_[i].name
                    });
                }
                res.json(nodes);
                return [3 /*break*/, 5];
            case 4:
                err_1 = _c.sent();
                console.log("error: ------- ", err_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getNode = getNode;
var getEdges = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var edges, org_, i, j, j, j, user_, i, j, err_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log('getNode ... ');
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                edges = [];
                return [4 /*yield*/, Organization_1.default.find({})];
            case 2:
                org_ = _b.sent();
                for (i = 0; i < org_.length; i++) {
                    for (j = 0; j < org_[i].projects.length; j++) {
                        edges.push({
                            from: org_[i]._id,
                            to: org_[i].projects[j].address,
                        });
                    }
                    for (j = 0; j < org_[i].events.length; j++) {
                        edges.push({
                            from: org_[i]._id,
                            to: org_[i].events[j].address,
                        });
                    }
                    for (j = 0; j < org_[i].skills.length; j++) {
                        edges.push({
                            from: org_[i]._id,
                            to: (_a = org_[i].skills[j]) === null || _a === void 0 ? void 0 : _a.address,
                        });
                    }
                }
                return [4 /*yield*/, User_1.default.find({})];
            case 3:
                user_ = _b.sent();
                for (i = 0; i < user_.length; i++) {
                    for (j = 0; j < user_[i].sbts.length; j++) {
                        edges.push({
                            from: user_[i].sbts[j].collection_address,
                            to: user_[i]._id,
                            label: user_[i].sbts[j].nft_name
                        });
                    }
                }
                res.json(edges);
                return [3 /*break*/, 5];
            case 4:
                err_2 = _b.sent();
                console.log("error: ------- ", err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.getEdges = getEdges;

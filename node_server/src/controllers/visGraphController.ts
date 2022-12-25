import { NextFunction, Request, Response } from "express";
import Orgnization, { IOrg } from "../models/Organization";
import User, { IUser } from "../models/User";

import dotenv from 'dotenv';
import { isLabeledStatement } from "typescript";
dotenv.config({ path: "./.env" });


const getNode = async (req: Request, res: Response, next: NextFunction) => {
  console.log('getNode ... ')
  try {
    let nodes = [];
    const org_ = await Orgnization.find({});
    // console.log('org_', org_)
    for (let i = 0;i < org_.length;i++) {
      nodes.push({
        id: org_[i]._id,
        label: org_[i].name
      })
      for (let j = 0;j < org_[i].projects.length;j++) {
        nodes.push({
          id: org_[i].projects[j].address,
          label: org_[i].projects[j].name,
        })
      }
      for (let j = 0;j < org_[i].events.length;j++) {
        nodes.push({
          id: org_[i].events[j].address,
          label: org_[i].events[j].name,
        })
      }
      for (let j = 0;j < org_[i].skills.length;j++) {
        nodes.push({
          id: org_[i].skills[j]?.address,
          label: org_[i].skills[j]?.name,
        })
      }
    }

    const user_ = await User.find({});
    for (let i = 0;i < user_.length;i++) {
      nodes.push({
        id: user_[i]._id,
        label: user_[i].name
      })
    }
    res.json(nodes);

  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
}






const getEdges = async (req: Request, res: Response, next: NextFunction) => {
  console.log('getNode ... ')
  try {
    let edges: any = [];
    const org_ = await Orgnization.find({});

    for (let i = 0;i < org_.length;i++) {
      for (let j = 0;j < org_[i].projects.length;j++) {
        edges.push({
          from: org_[i]._id,
          to: org_[i].projects[j].address,
        })
      }
      for (let j = 0;j < org_[i].events.length;j++) {
        edges.push({
          from: org_[i]._id,
          to: org_[i].events[j].address,
        })
      }
      for (let j = 0;j < org_[i].skills.length;j++) {
        edges.push({
          from: org_[i]._id,
          to: org_[i].skills[j]?.address,
        })
      }
    }

    const user_ = await User.find({});
    for (let i = 0;i < user_.length;i++) {
      for (let j = 0;j < user_[i].sbts.length;j++) {
        edges.push({
          from: user_[i].sbts[j].collection_address,
          to: user_[i]._id,
          label: user_[i].sbts[j].nft_name
        })
      }
    }

    res.json(edges);

  }
  catch (err) {
    console.log("error: ------- ", err);
    // res.status(500).json( {message: "Something went wrong"} )
  }
}
export {
  getNode,
  getEdges
}
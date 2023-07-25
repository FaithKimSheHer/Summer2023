import express from 'express';
const router = express.Router();  
import path from 'path';
import { usersFuncs } from '../data/index.js';

router.route('/')
  .get(async (req, res) => {
    res.sendFile(path.resolve('static/userRegiSite.html'));   
  })
  .post(async (req, res) => {  
  newUser = req.body;
  try {  
      // Error handlings
      if(newUser.firstName === undefined)           throw 'You must provide your first name';
      if(typeof newUser.firstName !== 'string')     throw 'First name must be a string'; 
      else                                          newUser.firstName = newUser.firstName.trim();
      if(newUser.firstName.length === 0)            throw 'First name cannot be an empty string or just spaces'; 
      console.log("firstName: ", newUser.firstName);

      if(newUser.lastName === undefined)            throw 'You must provide your last name';
      if(typeof newUser.lastName !== 'string')      throw 'Last name must be a string';  
      else                                          newUser.lastName = newUser.lastName.trim(); 
      if(newUser.lastName.length === 0)             throw 'Last name cannot be an empty string or just spaces'; 
      console.log("lastName: ", newUser.lastName);

      if(newUser.userName === undefined)            throw 'You must provide your user name';
      if(typeof newUser.userName !== 'string')      throw 'User name must be a string';  
      else                                          newUser.userName = newUser.userName.trim();
      if(newUser.userName.length === 0)             throw 'User name cannot be an empty string or just spaces'; 
      console.log("userName: ", newUser.userName);
    
      if(newUser.email === undefined)               throw 'You must provide your email address';
      if(typeof newUser.email !== 'string')         throw 'Email address must be a string';  
      else                                          newUser.email = newUser.email.trim();
      if(newUser.email.length === 0)                throw 'Email address cannot be an empty string or just spaces';   
      if(newUser.email.substring(0, newUser.indexOf('@')).length === 0)   throw 'Email address address error'; 

      if(newUser.age === undefined)                 throw 'You must provide your age';
      if(typeof newUser.age !== 'number')           throw 'Age must be a number'; 
      if(newUser.age <=0 )                          throw 'Age must be a positive number';  
      console.log("age: ", newUser.age); 

      if(hnewUser.ashedPassword === undefined)          throw 'You must provide your hashedPassword';
      if(typeof newUser.hashedPassword !== 'string')    throw 'hashedPassword must be a string';  
      else                                              newUser.hashedPassword = newUser.hashedPassword.trim();
      if(newUser.hashedPassword.length === 0)           throw 'hashedPassword cannot be an empty string or just spaces';  
      console.log("hashedPassword: ", newUser.hashedPassword);
      
      if(newUser.city === undefined)                    throw 'You must provide your city';
      if(typeof newUser.city !== 'string')              throw 'city must be a string';  
      else                                              newUser.city = newUser.city.trim();
      if(newUser.city.length === 0)                     throw 'city cannot be an empty string or just spaces';  
      console.log("city: ", newUser.city);

      if(newUser.state === undefined)                   throw 'You must provide your state';
      if(typeof newUser.state !== 'string')             throw 'state must be a string';  
      else                                              newUser.state = newUser.state.trim();
      if(newUser.state.length === 0)                    throw 'state cannot be an empty string or just spaces';  
      console.log("state: ", newUser.state);   
    } catch (e) {
      return res.status(404).json({error: e});
    }
    try {
      const userInfo = await usersFuncs.create(newUser); 
      return res.status(200).json(userInfo);
    } catch (e) {
        res.status(404).json({error: e});
    }
});

router.route('/:userName').get(async (req, res) => {  
    
  try {  
      if (!req.params.userName)                     return res.status(400).json({error: "UserId does not exist"});
      if (typeof req.params.userName !== 'string')  return res.status(400).json({error: "UserId Must be a string"});
      req.params.userName = req.params.userName.trim();
      if (req.params.userName.length === 0)         return res.status(400).json({error: "UserId can't be empty string"})    
    } catch (e) {
      return res.status(404).json({error: e});
    }
    try {
      const userInfo = await usersFuncs.get(req.params.userName); 
      return res.status(200).json(userInfo);
    } catch (e) {
        res.status(404).json({error: e});
    }
});

export default router; 
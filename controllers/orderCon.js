import {postorderDb} from '../models/orderDb.js'

export const postorderCon = async (req,res) => {

    try {
        const {sub_id,amount,order_status} = req.body;
        
        const data = await postorderDb({
            sub_id,
            amount,
            order_status
        });

        res.json({ message: "Order created!!", data});

    } catch (err) {
        res.status (500).json({ error: err.message});
    }
};

// import { Request, Response } from "express";

// export const getDrinks = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {

//     const drinks = ["Coke", "Fanta"];

//     res.json(drinks);

//   } catch (err: any) {

//     res.status(500).json({
//       error: err.message
//     });

//   }
// };
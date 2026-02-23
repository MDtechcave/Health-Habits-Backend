import {postusersDb} from '../models/usersDb.js'

export const postusersCon = async (req,res) => {
    console.log("BODY:", req.body); 
    try {

        const {name, email, password,address} = req.body;

        const data = await postusersDb({
            name,
            email,
            password,
            address
        });


        res.json({message: "User created!!", data});

        }catch(err) {
            res.status(500).json({error: err.message});
        }
};



// export {
//     postusersCon
// }
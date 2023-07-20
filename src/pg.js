const { Client } = require("pg");

var client;
const connectDb = async () => {
    try {
         client = new Client({
            user: process.env.POSTGRES_USER,
            host: process.env.POSTGRES_HOST,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
            port: process.env.POSTGRES_PORT
        })
 
        await client.connect()
        // const res = await client.query('SELECT * FROM some_table')
        // console.log(res)
        // await client.end()
    } catch (error) {
        console.log(error)
    }
}

const queryNow = async(query)=>{
    const res = await client.query(query);
    return res;
}
 
module.exports={connectDb,queryNow}
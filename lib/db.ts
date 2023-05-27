import mysql from "mysql2/promise"

export async function query({query,values=[]}:{query:string,values:string[]}){
    const dbConnection = await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'root',
        database:'lms'
    })

    try {
        const [results] = await dbConnection.execute(query,values);
        dbConnection.end();
        return results;
    } catch(error:any){
        throw Error(error.message);
        return {error}
    }
}
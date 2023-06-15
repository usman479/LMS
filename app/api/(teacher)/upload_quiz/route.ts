import { query } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

    // const {data:session} = useSession();

    // console.log('name: ',session?.user.s_name);

    const {topic,desc,dueDate,selectedCourse,duration,questions } = await request.json();
    // const accessToken = request.headers.get('authorization');
    // console.log('Token: ', accessToken);
    // console.log("payload: ", JSON.stringify(jwt.decode(accessToken!)));


    if(questions.length < 1){
        return NextResponse.json(false);
    }

    for(let i=0; i<selectedCourse.length; i++){
        try{
            const insertQuery = await query({ query: `insert into quiz (q_topic,q_desc,q_upload_date,q_due_date,q_time,c_id) values (?,?,current_timestamp(),?,?,?);`, values: [topic,desc,dueDate,duration,selectedCourse[i]]});
            const q_id = await query({query:'select q_id from quiz order by q_id desc limit 1;',values:[]});
            let quiz_id = q_id[0].q_id;
            let myQuery = 'insert into questions (question,ques_opt_A,ques_opt_B,ques_opt_C,ques_opt_D,ques_correct_opt,q_id) values';
            for(let i=0; i<questions.length; i++) {
                myQuery += `('${questions[i].question}','${questions[i].optA}','${questions[i].optB}','${questions[i].optC}','${questions[i].optD}',${questions[i].correctOpt},${quiz_id})`;
                if(i !== questions.length-1){
                    myQuery += ','
                }  
            }
            const res = await query({query:myQuery,values:[]});
        } catch(e){
            return NextResponse.json(false)
        }
    }

    return NextResponse.json(true);
}
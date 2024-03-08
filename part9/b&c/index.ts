import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get('/hello', (_req, res)=>{
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res)=>{
    const reqHeight:number =Number(req.query.height);
    const reqWeight:number = Number(req.query.weight);
    if(!reqHeight || !reqWeight){
        return res.status(404).send({error:"malformatted parameters"});
    }
    const returnObj = {
        weight:reqWeight,
        height: reqHeight,
        bmi: calculateBmi(reqHeight, reqWeight),
    };
    return res.json(returnObj);
});

app.post('/exercises', (req, res)=>{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {daily_exercises, target} = req.body;
    if(!daily_exercises || !target){
        return res.status(404).send({error:'parameters missing'});
    }
    else if(isNaN(Number(target))){
        return res.status(404).send({error:'malformatted parameters'});
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(daily_exercises, target) ;
    return res.json(result);
});

const PORT = 3002;
app.listen(PORT, ()=>{
    console.log(`App listening on PORT ${PORT}`);
});
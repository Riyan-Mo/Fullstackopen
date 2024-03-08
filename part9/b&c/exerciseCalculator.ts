interface Result{
  periodLength:number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const trainingDaysCalculator = (arr: number[]):number => {
  return arr.reduce((prev, current)=>{
    return Number(current)===0?prev:prev+1;},0);
};

const averageHoursCalculator = (arr: number[]):number => {
  const totalHours = arr.reduce((prev, current)=>prev+current,0);
  return totalHours/arr.length;
};

const calculateRating = (averageHours:number, targetHours: number):number => {
  if(averageHours!=targetHours){
    if(averageHours/targetHours>=0.5){
      return 2;
    }
    return 1;
  }
  return 3;
};

export const calculateExercises = (arr: number[], targetHours:number):Result => {
  const average = averageHoursCalculator(arr);
  const periodLength = arr.length;
  const trainingDays = trainingDaysCalculator(arr);
  const success = Number(average)===Number(targetHours);
  const rating = calculateRating(average, targetHours);

  let ratingDescription: string;
  if(rating===1){
    ratingDescription = 'You need to improve.';
  }
  else if(rating === 2){
    ratingDescription = 'Not too bad but could be better';
  }
  else{
    ratingDescription = "Excellent! Good job";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

export const displayResult = () =>{
  const targetHours:number = Number(process.argv[process.argv.length-1]);
  const arr:number[] = [];
  for(let i = 2; i<process.argv.length-1; i++){
    if(!isNaN(Number(process.argv[i]))){
      arr.push(Number(process.argv[i]));
    }
    else{
      throw new Error("All of the arguments are not numbers");
    }
  }
  const result = calculateExercises(arr, targetHours);
  console.log(JSON.parse(JSON.stringify(result)));
};

export const runFunction = () => {
  try {
    displayResult();
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      console.log("Error in the program. " + error.message);
    }
  }
};
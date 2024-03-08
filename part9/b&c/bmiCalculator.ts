export interface Details{
    height: number;
    weight: number;
}
  
export const calculateBmi = (height: number, weight: number): string => {
      const heightInMetres: number = height/100;
      const bmi:number = weight/(heightInMetres*heightInMetres);
      if(bmi>=30){
        return 'Obese (unhealthy weight)';
      }
      else if(bmi>=25){
        return 'Overweight';
      }
      else if(bmi>=18.5){
        return 'Normal (healthy weight)';
      }
      else{
        return 'Underweight';
      }
  };
  
  const parseArguments = (args: string[]):Details=> {
    if(args.length>3) throw new Error("Too many arguments");
    if(args.length<2) throw new Error("Not enough arguments");
  
    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
      const height:number = Number(args[2]);
      const weight:number = Number(args[3]);
      return {height, weight};
    }
    else{
      throw new Error("Provided values were not numbers");
    }
  };
  
  export const runFunction = () => {
  try {
      const { height, weight } = parseArguments(process.argv);
      calculateBmi(height, weight);
  } catch (error: unknown) {
      let errorMessage = "Something bad happened";
      if (error instanceof Error) {
        errorMessage += "Error: " + error.message;
      }
      console.log(errorMessage);
  }
};
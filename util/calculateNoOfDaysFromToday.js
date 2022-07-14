export const calculateNoOfDaysFromToday = (date1) => {
  const dueDate = new Date(date1);
  const today = new Date();

  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays + " days");
  switch(diffDays){
    case 0: return { message: "due Today", diffDays: diffDays};
    case 1: return { message: "due Tomorrow", diffDays: diffDays};
    case -1: return { message:"due Yesterday", diffDays: diffDays};
    default: 
      if(diffDays > 0) return {message:`due in ${diffDays} days`, diffDays: diffDays};
      else return {message:`due ${-1*diffDays} days ago`, diffDays: diffDays};
  }
};
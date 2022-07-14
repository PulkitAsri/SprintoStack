export const calculateNoOfDaysFromToday = (date1) => {
  const dueDate = new Date(date1);
  const today = new Date();

  const diffTime = dueDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays + " days");
  switch(diffDays){
    case 0: return "due Today";
    case 1: return "due Tomorrow";
    case -1: return "due Yesterday";
    default: 
      if(diffDays > 0) return `due in ${diffDays} days`;
      else return `due ${-1*diffDays} days ago`;
  }
};
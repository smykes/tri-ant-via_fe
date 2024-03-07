import { MONTHS } from "../../Constants/constants";
function getMonthByString(monthNumber: string | undefined): string {
  const monthNumberIndex = monthNumber ? parseInt(monthNumber) : 0;
  return MONTHS[monthNumberIndex - 1];
}

function getNextMonthNormalized(monthNumber: number): string {
  let nextMonthNormalized = "01";
  switch (monthNumber) {
    case 0:
      nextMonthNormalized = "01";
      break;
    case 1:
      nextMonthNormalized = "02";
      break;
    case 2:
      nextMonthNormalized = "03";
      break;
    case 3:
      nextMonthNormalized = "04";
      break;
    case 4:
      nextMonthNormalized = "05";
      break;
    case 5:
      nextMonthNormalized = "06";
      break;
    case 6:
      nextMonthNormalized = "07";
      break;
    case 7:
      nextMonthNormalized = "08";
      break;
    case 8:
      nextMonthNormalized = "09";
      break;
    case 9:
      nextMonthNormalized = "10";
      break;
    case 10:
      nextMonthNormalized = "11";
      break;
    case 11:
      nextMonthNormalized = "12";
      break;
    default:
      nextMonthNormalized = "01";
  }
  return nextMonthNormalized;
}

function getPreviousMonthNormalized(monthNumber: number): string {
  let previousMonthNormalized = "01";
  switch (monthNumber) {
    case 0:
      previousMonthNormalized = "01";
      break;
    case 1:
      previousMonthNormalized = "02";
      break;
    case 2:
      previousMonthNormalized = "03";
      break;
    case 3:
      previousMonthNormalized = "04";
      break;
    case 4:
      previousMonthNormalized = "05";
      break;
    case 5:
      previousMonthNormalized = "06";
      break;
    case 6:
      previousMonthNormalized = "07";
      break;
    case 7:
      previousMonthNormalized = "08";
      break;
    case 8:
      previousMonthNormalized = "09";
      break;
    case 9:
      previousMonthNormalized = "10";
      break;
    case 10:
      previousMonthNormalized = "11";
      break;
    case 11:
      previousMonthNormalized = "12";
      break;
    default:
      previousMonthNormalized = "01";
  }
  return previousMonthNormalized;
}
export { getMonthByString, getNextMonthNormalized, getPreviousMonthNormalized };

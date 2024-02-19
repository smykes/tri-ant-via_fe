import { MONTHS } from "../../Constants/constants";
export default function getMonthByString(
  monthNumber: string | undefined
): string {
  const monthNumberIndex = monthNumber ? parseInt(monthNumber) : 0;
  console.log(monthNumber ? MONTHS[monthNumberIndex - 1] : "January");
  return MONTHS[monthNumberIndex - 1];
}

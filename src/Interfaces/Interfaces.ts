export interface IWinPayload {
  all_time_count: number;
  month_count: number;
  today: ICurrentDay[];
}

interface ICurrentDay {
  answer: string;
  clue: string;
  clue_date: number;
  created_at: number;
  updated_at: number;
  url: string;
  winners: IWinnerArray[];
}

interface IWinnerArray {
  country: string;
  flag: string;
  user: string;
}

export interface IFuture {
  futureStatus: number;
}

export interface IMonthNavigation {
  futureStatus: number;
  month: number;
  monthName: string;
  year: number;
  isLoading: boolean;
  hasError: boolean;
}

export interface IWinner {
  name: string;
  count: string;
}

export interface IForm {
  email: string;
  password: string;
}

export interface IDayNavigation {
  winner: IWinPayload;
  previousDay: string;
  nextDay: string;
}

export interface IWinnersWins {
  answer: string;
  clue: string;
  clue_date: number;
  created_at: number;
  updated_at: number;
  url: string;
  winners: IWinnersInfo[];
}

interface IWinnersInfo {
  country: string;
  flag: string;
  user: string;
}

export interface ISearchReturn {
  clue: string;
  answer: string;
  clue_date: number;
}

export enum ReportType {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export interface Report {
  id: string;
  source: string;
  amount: number;
  created_at: Date;
  updated_at: Date;
  type: ReportType;
}

export interface Data {
  report: Report[]
}

export const data: Data = {
  report: [
    {
      id: 'uuid1',
      source: 'youtube',
      amount: 7500,
      created_at: new Date(),
      updated_at: new Date(),
      type: ReportType.INCOME
    }

  ]
}

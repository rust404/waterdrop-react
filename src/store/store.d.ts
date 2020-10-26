type MoneyType = 'income' | 'expenditure'

interface MoneyRecord {
  time: string;
  moneyType: MoneyType;
  categoryId: number;
  id: number;
  amount: number;
  remarks: string;
  [index: string]: number | string | MoneyType | undefined;
}

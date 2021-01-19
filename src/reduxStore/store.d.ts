type MoneyType = 'income' | 'expenditure'

interface MoneyRecord {
  time: string;
  moneyType: MoneyType;
  categoryId: string;
  id: string;
  amount: number;
  remarks: string;
  [index: string]: number | string | MoneyType | undefined;
}

interface Category {
  name: string;
  icon: string;
  id: string;
  moneyType: MoneyType;
}

type Payload<T> = T['payload']

type RecordData = Omit<MoneyRecord, 'id'>

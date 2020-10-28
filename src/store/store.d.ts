type Payload<T> = T['payload']

interface ActionCreator<T> {
  (payload: Payload<T>):T
}

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

type RecordData = Pick<MoneyRecord, "categoryId" | "time" | "moneyType" | "amount" | "remarks">;

interface Category {
  name: string;
  icon: string;
  id: string;
  moneyType: MoneyType;
}

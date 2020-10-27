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

interface CategoryItem {
  name: string;
  icon: string;
  id: string;
  moneyType: MoneyType;
}

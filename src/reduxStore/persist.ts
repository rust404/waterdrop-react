import {CATEGORY_KEY, RECORD_KEY} from "./constants/keys";

const defaultCategoryList: Category[] = [
  {name: "餐饮", icon: "canyin", moneyType: "expenditure", id: "1612b088-3730-429d-ada1-32d726c0593c"},
  {name: "服饰", icon: "fushi", moneyType: "expenditure", id: "ee47c60e-7d7d-4f77-8ea4-aaaed7749631"},
  {name: "读书", icon: "dushu", moneyType: "expenditure", id: "949f55ef-0f57-4bc7-b5bd-93be277d06e4"},
  {name: "交通", icon: "jiaotong", moneyType: "expenditure", id: "8c834353-b727-4039-8e5a-a196058f83db"},
  {name: "旅行", icon: "lvxing", moneyType: "expenditure", id: "ae684aa2-3302-47c0-b1f8-6eeeec5580d3"},
  {name: "日用", icon: "riyongpin", moneyType: "expenditure", id: "05b6a0f9-1e80-4d60-8c59-2ae7ecdcfe3c"},
  {name: "工资", icon: "gongzi", moneyType: "income", id: "1de75225-cf7c-4c34-88aa-ec2591d33909"},
  {name: "兼职", icon: "jianzhi", moneyType: "income", id: "5c04d58b-5112-4f2f-8b90-975833f41cc2"},
  {name: "理财", icon: "licai", moneyType: "income", id: "c6d471fe-4a33-46ac-9e41-f94960abfec2"}
];

export const loadCategories = () => {
  const categoryStr = window.localStorage.getItem(CATEGORY_KEY);
  let category: Category[];
  if (!categoryStr) {
    category = defaultCategoryList
  } else {
    category = JSON.parse(categoryStr);
  }
  return category;
};

export const saveCategories = (newState: Category[]) => {
  const serializedState = JSON.stringify(newState)
  localStorage.setItem(CATEGORY_KEY, serializedState)
}

export const loadRecords = (): MoneyRecord[] => {
  let recordsStr = window.localStorage.getItem(RECORD_KEY);
  if (!recordsStr) {
    return [];
  }
  const records = JSON.parse(recordsStr);
  if (!Array.isArray(records) || records.length === 0) {
    return [];
  }
  return records;
};

export const saveRecords = (newState: MoneyRecord[]) => {
  const serializedState = JSON.stringify(newState)
  localStorage.setItem(RECORD_KEY, serializedState)
}

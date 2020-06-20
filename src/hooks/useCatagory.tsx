import {useState, useEffect, useCallback} from "react";

let cid = 0;
let isBindSaveEvent = false;

export enum MoneyDirectionType {
  INCOME = 'INCOME',
  EXPENDITURE = 'EXPENDITURE'
}

interface ICatagoryItem {
  name: string;
  icon: string;
  id: number;
  direction: MoneyDirectionType
}
const defaultCatagoryList = [
  {name: "餐饮", icon: "canyin", direction: MoneyDirectionType.EXPENDITURE},
  {name: "服饰", icon: "fushi", direction: MoneyDirectionType.EXPENDITURE},
  {name: "读书", icon: "dushu", direction: MoneyDirectionType.EXPENDITURE},
  {name: "交通", icon: "jiaotong", direction: MoneyDirectionType.EXPENDITURE},
  {name: "旅行", icon: "lvxing", direction: MoneyDirectionType.EXPENDITURE},
  {name: "日用", icon: "riyongpin", direction: MoneyDirectionType.EXPENDITURE},
  {name: "工资", icon: "gongzi", direction: MoneyDirectionType.INCOME},
  {name: "兼职", icon: "jianzhi", direction: MoneyDirectionType.INCOME},
  {name: "理财", icon: "licai", direction: MoneyDirectionType.INCOME},
];

let latestCatagory: ICatagoryItem[]

const useCatagory = () => {
  const [catagory, setCatagory] = useState(_initCatagory);
  latestCatagory = catagory
  // useEffect(() => {
  //   if (!isBindSaveEvent) {
  //     window.addEventListener('beforeunload', saveCatagory)
  //     isBindSaveEvent = true
  //   }
  // }, [])
  const addCatagory = useCallback((name: string, direction: MoneyDirectionType) => {
    for (let i = 0; i < catagory.length; i++) {
      if (catagory[i].name === name) return;
    }
    const newList = catagory.concat();
    console.log(cid)
    newList.push({
      name,
      icon: "custom",
      id: cid++,
      direction
    });
    setCatagory(newList);
  }, [])
  const deleteCatagory = useCallback((id: number) => {}, [])
  const modifyCatagory = useCallback((id: number) => {}, [])
  const saveCatagory = useCallback(() => {
    window.localStorage.catagory = JSON.stringify(latestCatagory)
  }, [])
  function _initCatagory() {
    const catagoryStr = window.localStorage.getItem('catagory')
    let catagory: ICatagoryItem[]
    if (!catagoryStr) {
      cid = 0
      catagory = defaultCatagoryList.map(item => {
        return {
          ...item,
          direction: item.direction as MoneyDirectionType,
          id: cid++
        }
      })
    } else {
      catagory = JSON.parse(catagoryStr)
      cid = Math.max(...catagory.map(item => item.id)) + 1
    }
    return catagory
  }
  return {
    catagory,
    addCatagory,
    deleteCatagory,
    modifyCatagory
  };
};

export default useCatagory

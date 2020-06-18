import {useState, useEffect} from "react";

let cid = 0;
let isBindSaveEvent = false;
export type moneyDirectionType = '+' | '-'
interface ICatagoryItem {
  name: string;
  icon: string;
  id: number;
  direction: moneyDirectionType
}
const defaultCatagoryList = [
  {name: "餐饮", icon: "canyin", direction: '-'},
  {name: "服饰", icon: "fushi", direction: '-'},
  {name: "读书", icon: "dushu", direction: '-'},
  {name: "交通", icon: "jiaotong", direction: '-'},
  {name: "旅行", icon: "lvxing", direction: '-'},
  {name: "日用", icon: "riyongpin", direction: '-'},
  {name: "工资", icon: "gongzi", direction: '+'},
  {name: "兼职", icon: "jianzhi", direction: '+'},
  {name: "理财", icon: "licai", direction: '+'},
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
  function addCatagory(name: string, direction: moneyDirectionType) {
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
  }
  function deleteCatagory(id: number) {}
  function modifyCatagory(id: number) {}
  function saveCatagory() {
    window.localStorage.catagory = JSON.stringify(latestCatagory)
  }
  function _initCatagory() {
    const catagoryStr = window.localStorage.getItem('catagory')
    let catagory: ICatagoryItem[]
    if (!catagoryStr) {
      cid = 0
      catagory = defaultCatagoryList.map(item => {
        return {
          ...item,
          direction: item.direction as moneyDirectionType,
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

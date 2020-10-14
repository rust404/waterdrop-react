import {useState, useCallback} from "react";

const useCalcStr = (initNum?: number) => {
  const [left, setLeft] = useState(
    `${typeof initNum === "number" ? initNum : 0}`
  );
  const [right, setRight] = useState("");
  const [op, setOp] = useState("");
  const setInitNum = useCallback((num: number) => {
    setLeft(num + '')
  }, [])
  const add = (value: string) => {
    if ("0123456789".indexOf(value) !== -1) {
      addNumber(value);
    } else if ("+-".indexOf(value) !== -1) {
      addOp(value);
    } else if (value === ".") {
      addDot();
    }
  };
  const addDot = () => {
    if (op) {
      if (right.indexOf(".") !== -1) return;
      if (right.length === 0) {
        setRight("0.");
      } else {
        setRight(right + ".");
      }
    } else {
      if (left.indexOf(".") !== -1) return;
      setLeft(left + ".");
    }
  }
  function addNumber(value: string) {
    // 两位以上小数
    const reg = /\.\d{2,}/;
    if (op) {
      if (reg.test(right)) return;
      if (right === "0") {
        setRight(value);
      } else {
        setRight(right + value);
      }
    } else {
      if (reg.test(left)) return;
      if (left === "0") {
        setLeft(value);
      } else {
        setLeft(left + value);
      }
    }
  }
  function addOp(op: string) {
    if (right.length !== 0) {
      getValue()
    }
    setOp(op);
  }
  const getValue = () => {
    let result:number
    if (op === '+') {
      result = +left + +right
    } else {
      result = +left - +right
    }
    // 如果为.00，则说明为整数，可以去除
    setLeft(result.toFixed(2).replace(/\.00$/, ''))
    setRight('')
    setOp('')
    return result
  };
  const clear = () => {
    if (right) {
      setRight(right.slice(0, -1))
    } else if (op) {
      setOp('')
    } else if (left.length > 1) {
      setLeft(left.slice(0, -1))
    } else {
      setLeft('0')
    }
  };
  const expStr = left + op + right;
  return {expStr, add, clear, getValue, setInitNum};
};

export default useCalcStr;

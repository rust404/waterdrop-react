import {useState} from 'react'

const useCalc = () => {
  const [left, setLeft] = useState("0");
  const [right, setRight] = useState("");
  const [op, setOp] = useState("");
  const add = (value: string) => {
    if ("0123456789".indexOf(value) !== -1) {
      addNumber(value);
    } else if ("+-".indexOf(value) !== -1) {
      addOp(value);
    } else if (value === ".") {
      addDot();
    }
  }
  function addDot() {
    if (op) {
      if (right.indexOf(".") !== -1) return;
      if (right.length === 0) {
        setRight('0.')
      } else {
        setRight(right + '.')
      }
    } else {
      if (left.indexOf('.') !== -1) return;
      setLeft(left + '.')
    }
  }
  function addNumber(value: string) {
    // 两位以上小数
    const reg = /\.\d{2,}/
    if (op) {
      if (reg.test(right)) return
      if (right === "0") {
        setRight(value);
      } else {
        setRight(right + value);
      }
    } else {
      if (reg.test(left)) return
      if (left === "0") {
        setLeft(value);
      } else {
        setLeft(left + value);
      }
    }
  }
  function addOp(op: string) {
    const ret = getValue()
    setLeft(ret + '')
    setRight('')
    setOp(op)
  }
  const getValue = () => {
    let ret
    if (right.length === 0) {
      ret = parseFloat(left)
    } else {
      if (op === "+") {
        ret = parseFloat(left) + parseFloat(right);
      } else if (op === "-") {
        ret = parseFloat(left) - parseFloat(right);
      }
    }
    if (!ret) return 0
    if (/\.\d{2,}/.test(ret.toString())) {
      ret = ret.toFixed(2)
    }
    return ret as number
  }
  const clear = () => {
    setLeft("0");
    setRight("");
    setOp("");
  }
  const expStr = left + op + right
  return {expStr, add, clear, getValue};
};

export default useCalc

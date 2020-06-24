import {useState} from "react";

const useDatePicker = (time?: string) => {
  const [pickerState, setPickerState] = useState({
    time: time ? new Date(time) : new Date(),
    isOpen: false
  });
  const handleClick = () => {
    setPickerState(state => {
      return {
        ...state,
        isOpen: true
      };
    });
  };
  const handleCancel = () => {
    setPickerState(state => {
      return {
        ...state,
        isOpen: false
      };
    });
  };
  const handleSelect = (time: Date) => {
    setPickerState(state => {
      return {
        ...state,
        isOpen: false,
        time
      };
    });
  };
  return {pickerState, handleClick, handleCancel, handleSelect}
}
export default useDatePicker

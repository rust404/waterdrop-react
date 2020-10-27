import {ChangeEvent, createContext} from "react";

interface RadioGroupContextProps {
  value: any
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export const RadioGroupContext = createContext<RadioGroupContextProps | null>(null)

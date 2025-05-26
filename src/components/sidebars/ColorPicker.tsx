import { useEffect, useRef, useState } from "react"
import { HexColorPicker } from 'react-colorful'

const ColorPicker = ({
  value,
  onChange,
  className,
  type
}: {
  value: string,
  onChange: (value: string) => void,
  className?: string,
  type?: string
}) => {

  const [inputValue, setInputValue] = useState(value);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node)
      ) {
        setIsPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [pickerRef])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleCommit = () => {
    if (/^#[0-9a-f]{6}$/i.test(inputValue)) {
      onChange(inputValue)
    }
    else {
      setInputValue(value);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommit();
      (e.currentTarget as HTMLInputElement).blur();
    }
  }

  const handleColorChange = (color: string) => {
    setInputValue(color);
    onChange(color);
  }

  return (
    <div
      ref={pickerRef}
      className={`relative h-fit ${className ?? "w-28"}`}
    >
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={handleCommit}
        onKeyDown={handleKeyDown}
        className={`h-fit w-full rounded-lg border border-[#f5f5f5] bg-[#f5f5f5] px-2 py-1 text-xs hover:border-[#e8e8e8] pl-6`}
      />
      <div
        className="absolute left-1.5 top-[50%] h-3.5 w-3.5 -translate-y-1/2 cursor-pointer rounded"
        onClick={() => setIsPickerOpen(!isPickerOpen)}
        style={{ backgroundColor: inputValue }}
      />

      {isPickerOpen && (
        <div className={`fixed z-20 mt-2 ${type === "stroke" ? "right-[39px]" : "right-5"}`}>
          <HexColorPicker
            color={inputValue}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
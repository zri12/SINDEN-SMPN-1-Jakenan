import { Select, type SelectOption } from "./Select";

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export function FilterDropdown({ value, onChange, options, placeholder = "Semua" }: FilterDropdownProps) {
  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      options={options}
      placeholder={placeholder}
      className="min-w-40"
    />
  );
}

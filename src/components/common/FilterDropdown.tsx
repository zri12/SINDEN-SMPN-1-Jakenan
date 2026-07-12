import { Select, type SelectOption } from "./Select";

interface FilterDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export function FilterDropdown({ value, onChange, options, placeholder = "Semua" }: FilterDropdownProps) {
  return (
    <div className="w-full sm:w-auto">
      <Select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        options={options}
        placeholder={placeholder}
        className="w-full sm:min-w-40"
      />
    </div>
  );
}

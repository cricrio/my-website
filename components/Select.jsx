import ReactSelect from "react-select";

export const Select = ({ value, onChange, options, ...props }) => (
  <ReactSelect
    value={options.find((o) => o.value === value)}
    onChange={({ value }) => onChange(value)}
    options={options}
    {...props}
  />
);

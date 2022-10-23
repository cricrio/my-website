import ReactSelect from 'react-select';

const Select = ({ value, onChange, options, ...props }) => (
  <ReactSelect
    value={options.find((o) => o.value === value)}
    onChange={({ value }) => onChange({ target: { value } })}
    options={options}
    {...props}
  />
);

export default Select;

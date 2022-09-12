export const Select = ({name, options, label, onChange, value, fieldClassName}) => {
    return (
        <label className='flex-item'>
            {label}
            <select className={fieldClassName} onChange={onChange} value={value} name={name}>
                {
                    options.map((option, index) =>
                        (<option key={`option-${index}`} value={option}>{option}</option>))
                }
            </select>
        </label>
    );
}
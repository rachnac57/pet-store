import React from 'react';

const Input = (props) => {
    const {
        required, label, type = 'text', usePlaceholder, placeholder, isHidden = false, name, onChange, value,
    } = props;
    let {fieldClassName = 'ds-text'} = props;

    return (
        <label className='flex-item'>
            {label}
            <input
                name={name}
                required={required}
                placeholder={usePlaceholder ? (placeholder || label) : ''}
                type={type}
                className={fieldClassName}
                onChange={onChange}
                value={value}
                hidden={isHidden}
            />
        </label>
    );
};

export default Input;

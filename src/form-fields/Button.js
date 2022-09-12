import Button from '@mui/material/Button';

const CustomButton = (props) => {
    const {buttonLabel, onSubmit, variant, size} = props;
    return (
        <Button variant={variant} size={size} onClick={onSubmit}>{buttonLabel}</Button>
    )
}

export default CustomButton;

import Input from '../form-fields/Input';
import {buttonProps} from '../app-layout/layout-data';
import { Select } from '../form-fields/Select';
import Button from '../form-fields/Button';
import { connect } from 'react-redux';
import {postData} from '../redux-store/action-creators';
import {useState} from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// Render a Re-usable form with: a submit handler, a submit button & decorated/filled with the provided (reusable) input components
export function Form(props) {
    const { setData, tableDataSource, formComponents = []} = props;

    const initialState = {};
    formComponents.forEach((component) => {initialState[component.props.name] = ''});
    const [formState, setFormState] = useState({
        ...initialState
    });

    const onSubmit = () => {
        const dataSource = {};
        Object.keys(formState).forEach((key) => {
            dataSource[key] = formState[key] || 'Favorite pet';
        })
        setData({tableName: tableDataSource, dataSource});
        setFormState(initialState);
    };

    // eslint-disable-next-line no-undef
    const handleFormStateChange = (event) => {
        event.preventDefault();
        setFormState({
            ...formState,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form method="POST" className="d-flex flex-wrap align-items-center w-100">
            <Box sx={{ flexShrink: 0, mt:2.5, p: 2}}>
                <Stack direction='row' spacing={2}>
                    {formComponents.map((component, index) => {
                        const {type, name} = component.props;
                        switch(type) {
                            case 'Input':
                                return (<Input value={formState[name]} onChange={handleFormStateChange} key={`input-${index}`} {...component.props} />);
                            case 'Select':
                                return (<Select value={formState[name]} {...component.props} key={`select-${index}`} onChange={handleFormStateChange} />);
                            // We can add more common component & add corresponding cases here
                            default:
                                return (<div />);
                        }
                    })}
                    <Button {...buttonProps} onSubmit={onSubmit} />
                </Stack>
            </Box>
        </form>
    );
}

  
const mapDispatchToProps = (dispatch) => ({
    setData: ({tableName, dataSource}) => {
        dispatch(postData({
            tableName,
            dataSource
        }));
    }
});
  
export const ConnectedForm = connect(null, mapDispatchToProps)(Form);

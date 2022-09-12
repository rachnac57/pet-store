import Input from '../form-fields/Input';
import {Select} from '../form-fields/Select';

export const nameFieldProps = {
    label: 'Name *',
    name: 'name',
    required: true,
    fieldClassName: 'ml'
  };

export const tagFieldProps = {
      label: 'Tag',
      name: 'tag',
      options: ['Puppy', 'Rescue dog', 'Fluffy cat', 'Hamster'],
      fieldClassName: 'ml tag-style'
};

export const chocolateTagFieldProps = {
    label: 'Tag',
    name: 'tag',
    options: ['Jelly', 'Nutties', 'Marshmallow', 'Cadbury'],
    fieldClassName: 'ml tag-style'
};

export const buttonProps = {
    buttonLabel: "Submit",
    variant: "contained",
    size: 'small'
};
  
const petStoreFormFields = [
    <Input type='Input' {...nameFieldProps} />,
    <Select type='Select' {...tagFieldProps} />,
];

const chocolateStoreFormFields = [
    <Input type='Input' {...nameFieldProps} />,
    <Select type='Select' {...chocolateTagFieldProps} />,
];

 // One may add as many layouts as desired; it will render an accordion based layout on the same page
// without disrupting the layout & responsiveness of the entire page/ app
export const layouts = {
    petStore: {expanded: true, componentTitle: 'Pet data', 
            formComponents: petStoreFormFields, tableDataSource: 'pets', dataTitle: 'Pets'},
    chocolateStore: {componentTitle: 'Chocolate Data', formComponents: chocolateStoreFormFields, dataTitle: 'Chocolates', tableDataSource: 'chocolates'}
}

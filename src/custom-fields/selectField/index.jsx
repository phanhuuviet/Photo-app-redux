import PropType from 'prop-types';
import React from 'react';
import { FormGroup, Label } from 'reactstrap';
import Select from 'react-select';

SelectField.propTypes = {
    field: PropType.object.isRequired,
    form: PropType.object.isRequired,

    label: PropType.string,
    placeholder: PropType.string,
    disable: PropType.bool,
    options: PropType.array,
};

SelectField.defaultProps = {
    label: '',
    placeholder: '',
    disable: false,
    options: [],
};

function SelectField(props) {
    const { field, options, label, placeholder, disable } = props;
    const { name, value } = field;
    const selectedOption = options.find((option) => option.value === value);

    const handleSelectedOptionChange = (selectedOption) => {
        const selectedValue = selectedOption ? selectedOption.value : selectedOption;

        const changeEvent = {
            target: {
                name: name,
                value: selectedValue,
            },
        };

        field.onChange(changeEvent);
    };

    return (
        <FormGroup>
            {label && <Label for="categoryId">Category</Label>}
            <Select
                id={name}
                {...field}
                onChange={handleSelectedOptionChange}
                value={selectedOption}
                placeholder={placeholder}
                options={options}
            />
        </FormGroup>
    );
}

export default SelectField;

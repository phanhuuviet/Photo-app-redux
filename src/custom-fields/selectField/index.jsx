import PropType from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Label } from 'reactstrap';
import Select from 'react-select';
import { ErrorMessage } from 'formik';

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
    // eslint-disable-next-line
    const { field, form, options, label, placeholder, disable } = props;
    const { name, value } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

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
                className={showError ? 'is-invalid' : ''}
            />
            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
}

export default SelectField;

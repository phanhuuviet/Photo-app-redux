import PropType from 'prop-types';
import React from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

InputField.propTypes = {
    field: PropType.object.isRequired,
    form: PropType.object.isRequired,

    type: PropType.string,
    label: PropType.string,
    placeholder: PropType.string,
    disable: PropType.bool,
};

InputField.defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    disable: false,
};

function InputField(props) {
    const { field, type, label, placeholder, disable } = props;
    const { name } = field;
    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <Input id={name} {...field} placeholder={placeholder} type={type} />
        </FormGroup>
    );
}

export default InputField;

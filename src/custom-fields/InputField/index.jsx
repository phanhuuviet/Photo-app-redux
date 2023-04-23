import { ErrorMessage } from 'formik';
import PropType from 'prop-types';
import React from 'react';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';

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
    console.log(props);
    // eslint - disable - next - line;
    const { field, form, type, label, placeholder, disabled } = props;
    const { name } = field;
    const { errors, touched } = form;
    const showError = errors[name] && touched[name];

    return (
        <FormGroup>
            {label && <Label for={name}>{label}</Label>}
            <Input id={name} {...field} disabled={disabled} invalid={showError} placeholder={placeholder} type={type} />
            <ErrorMessage name={name} component={FormFeedback} />
        </FormGroup>
    );
}

export default InputField;

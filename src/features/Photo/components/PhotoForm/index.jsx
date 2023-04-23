import { PHOTO_CATEGORY_OPTIONS } from 'constants/global';
import PropTypes from 'prop-types';
import React from 'react';
import { Button, FormGroup, Spinner } from 'reactstrap';
import { Formik, Form, FastField } from 'formik';
import * as Yup from 'yup';

import InputField from 'custom-fields/InputField';
import SelectField from 'custom-fields/selectField';
import RandomPhotoField from 'custom-fields/RandomPhotoField';

PhotoForm.propTypes = {
    onSubmit: PropTypes.func,
};

PhotoForm.defaultProps = {
    onSubmit: null,
};

function PhotoForm(props) {
    const { initialValues, isAddMode } = props;

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('This field is required!'),
        categoryId: Yup.number().nullable().required('This field is required!'),
        photo: Yup.string().required('This field is required.'),
    });

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={props.onSubmit}>
            {(formikProps) => {
                const { isSubmitting } = formikProps;

                return (
                    <Form>
                        <FastField name="title" component={InputField} label="Title" placeholder="Eg: Wow nature..." />
                        <FastField
                            name="categoryId"
                            component={SelectField}
                            options={PHOTO_CATEGORY_OPTIONS}
                            label="categoryId"
                            placeholder="What's your photo category?"
                        />

                        <FastField name="photo" component={RandomPhotoField} label="photo" />

                        <FormGroup>
                            <Button type="submit" color={isAddMode ? 'primary' : 'success'}>
                                {isSubmitting && <Spinner size="sm" />}
                                {isAddMode ? 'Add to album' : 'Update photo'}
                            </Button>
                        </FormGroup>
                    </Form>
                );
            }}
        </Formik>
    );
}

export default PhotoForm;

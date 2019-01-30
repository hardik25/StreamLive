import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {

  renderError({ error, touched }) {
      if (touched && error) {
        return (
          <div className="ui error message">
            <div className="header">{error}</div>
          </div>
        );
      }
  }

  renderInput = (formProps) => {
      const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error': ''}`;
      return (
        <div className={className}>
          <label>{formProps.label}</label>
          <input {...formProps.input} />
          {this.renderError(formProps.meta)}
        </div>
      );
  }

  onSubmit = (formVal) => {
      this.props.onSubmit(formVal);
  }

  render() {
    return (
      <div className="ui container">
        <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
            <Field label="Enter Title" name="title" component={this.renderInput} />
            <Field label="Enter Description" name="description" component={this.renderInput} />
            <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "Title cannot be empty";
  }
  if (!formValues.description) {
    errors.description = "Description cannot be empty";
  }
  return errors;

};

export default reduxForm({
  form: 'StreamForm',
  validate: validate
})(StreamForm);

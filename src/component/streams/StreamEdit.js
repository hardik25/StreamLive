import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { getStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  }

  render() {

    if (!this.props.stream) {
      return <div>Loading data... </div>;
    }

    return (
      <div>
        <h3>Edit a stream</h3>
        <StreamForm
          initialValues={_.pick(this.props.stream, 'title', 'description')}
          onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { getStream, editStream })(StreamEdit);

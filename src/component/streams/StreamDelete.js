import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import history from '../../history';
import { getStream, deleteStream } from '../../actions';

class StreamDelete extends React.Component {

  componentDidMount() {
    this.props.getStream(this.props.match.params.id);
  }

  renderContent() {
      if (!this.props.stream) {
        return 'Are you sure you want to delete the stream?';
      }

      return `Are you sure you want to delete ${this.props.stream.title}?`;
  }

  renderActions() {
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={() => this.props.deleteStream(id)}>Delete</button>
        <Link className="ui button" to="/">Cancel</Link>
      </React.Fragment>
    );
  }

  render() {
    return (
        <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push('/')} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
};

export default connect(mapStateToProps, { getStream, deleteStream })(StreamDelete);

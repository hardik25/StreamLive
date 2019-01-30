import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllStreams } from '../../actions';

class StreamList extends React.Component {

  componentDidMount() {
    this.props.getAllStreams();
  }

  renderButtons(stream) {
    if (stream.userID === this.props.currentUserID) {
      return (
        <div className="right floated content">
          <div className="ui buttons">
            <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>Edit</Link>
              <div className="or"></div>
            <Link className="ui negative button" to={`/streams/delete/${stream.id}`}>
              Delete
            </Link>
          </div>
        </div>
      );
    }
  }

  renderList() {
    return this.props.streams.map((stream) => {
      return (
        <div className="item" key={stream.id}>
          {this.renderButtons(stream)}
          <i className="large middle aligned icon camera" />
          <div className="content">
          <Link to={`/streams/${stream.id}`} className="header">
            {stream.title}
          </Link>
            <div className="description">{stream.description}</div>
          </div>
        </div>
      );
    });
  }

  renderCreate() {
    if (this.props.isSignedIn) {
      return (
        <div style={{textAlign: 'right'}}>
          <Link to="/streams/new" className="ui button positive">
            Create New Stream
          </Link>
        </div>
      );
    }
  }

  render() {

    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreate()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { streams: Object.values(state.streams),
           currentUserID: state.auth.userID,
           isSignedIn: state.auth.isSignedIn
         };
};

export default connect(mapStateToProps, {
  getAllStreams: getAllStreams
})(StreamList);

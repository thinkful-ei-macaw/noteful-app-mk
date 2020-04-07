import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Note extends React.Component {
  render() {
    let modified = new Date(this.props.modified).toLocaleDateString()
    return (
      <li>
        <div>
          <h2><Link to={"/note/" + this.props.id} title={this.props.name}>{this.props.name}</Link></h2>
          <p>Date modified {modified}</p>
        </div>
        <button onClick={() => {this.props.onDelete(this.props.id)}}>
          <i className="material-icons">delete</i>
        </button>
      </li>
    )
  }
}

Note.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  modified: PropTypes.string,
  onDelete: PropTypes.func
}

export default Note;
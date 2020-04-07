import React from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import DataContext from '../DataContext';
import api from '../api';

class Folder extends React.Component {
  static contextType = DataContext;

  handleClick = (e, data) => {
    const { id, name } = data;
    if (window.confirm(`Delete the folder '${name}'?\nThis will remove all contained notes.`)) {
      api.deleteFolder(id)
        .then(() => {
          if (this.props.match.params.id === id) {
            this.props.history.goBack();
          }

          // refreshing because folders delete related notes
          // this causes another api call
          this.context.refresh();
        });
    }
  }
  
  render(){
    return (
      <>
        <li className={this.props.active ? 'active' : ''}>
          <ContextMenuTrigger id={this.props.id}>
            <Link to={"/folder/" + this.props.id}>{this.props.name}</Link>
          </ContextMenuTrigger>
        </li>
        

        <ContextMenu id={this.props.id}>
          <MenuItem data={{id: this.props.id, name: this.props.name}} onClick={this.handleClick}>
            Delete folder
          </MenuItem>
        </ContextMenu>
      </>
    );
  }
}

Folder.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string
}

export default Folder;
import React from 'react';

import DataContext from '../DataContext';
import api from '../api';

class AddNote extends React.Component {
  static contextType = DataContext;
  state = {
    name: {
      value: '',
      touched: false
    },
    content: {
      value: '',
      touched: false
    },
    folder_id: {
      value: '',
      touched: false
    },

    hasErrors(){
      let err = false;
      let touchCount = 0;
      let fieldCount = 0;
      Object.keys(this).forEach(key => {
        if (key === 'hasErrors') return false;
        touchCount += this[key].touched ? 1 : 0;
        fieldCount += 1;
        if (this[key].error && this[key].touched) err = true;
      });

      if (fieldCount > touchCount) err = true;

      return touchCount > 0 ? err : true;
    }
  }

  validate = e => {
    let input = e.target;
    let value= input.value.trim()
    this.setState({
      [input.name]: {
        value,
        touched: true,
        error: value === '' ? 'This field is required.' : null
      },
    });
  }
  
  handleSubmit = e => {
    e.preventDefault();
    let note = {
      name: this.state.name.value,
      folder_id: this.state.folder_id.value,
      content: this.state.content.value
    }

    api.addNote(note)
      .then(res => {
        this.context.addNoteSubmit(res);
      })
      .catch((err) => {
        throw new Error(err)
      });
  }

  render() {
    return (
      <form
        onChange={this.validate}
        onSubmit={this.handleSubmit}>
        <h2>Add Note</h2>
        <div>
          <label htmlFor="name">
            Name:
            <span>{this.state.name.error}</span>
          </label>
          <input autoComplete="off" type="text" name="name" id="name" placeholder="A Cool Name..."/>
        </div>
        <div>
          <label htmlFor="content">
            Content:
            <span>{this.state.content.error}</span>
          </label>
          <textarea name="content" id="content" placeholder="Your content goes here." cols="300" rows="4"></textarea>
        </div>
        <div>
          <label htmlFor="folder_id">
            Folder:
            <span>{this.state.folder_id.error}</span>
          </label>
          <select id="folder_id" name="folder_id">
            <option value="">Select a folder</option>
            {
              this.context.data.folders.map(folder => (
                <option key={folder.id} value={folder.id}>{folder.name}</option>
              ))
            }
          </select>
        </div>
        <button disabled={this.state.hasErrors()}>Submit</button>
        <button type="button" onClick={() => this.context.addClick()}>Cancel</button>
      </form>
    )
  }
}

export default AddNote;
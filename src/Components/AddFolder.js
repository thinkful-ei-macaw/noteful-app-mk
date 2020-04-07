import React from 'react';

import DataContext from '../DataContext';
import api from '../api';

class AddFolder extends React.Component {
  static contextType = DataContext;
  state = {
    name: {
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
    let value = input.value.trim();
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
    let folder = {
      name: this.state.name.value
    }

    api.addFolder(folder)
      .then((res) => {
        this.context.addFolderSubmit(res);
      })
      .catch((err) => {
        throw new Error(err)
      });
  }

  render() {
    return (
      <form
        onChange={this.validate}
        onSubmit={this.handleSubmit}
        onClick={e => e.stopPropagation()}>
        <h2>Add Folder</h2>
        <div>
          <label htmlFor="name">
            Name:
            <span>{this.state.name.error}</span>
          </label>
          <input autoComplete="off" type="text" name="name" id="name" placeholder="A Cool Name..."/>
          
        </div>
        <button disabled={this.state.hasErrors()}>Submit</button>
      </form>
    )
  }
}

export default AddFolder;
import React from 'react';
import PropTypes from 'prop-types';

class SelectedNote extends React.Component {
  render() {
    return (
      <article>
        <p
          dangerouslySetInnerHTML={{
            __html: this.props.content.split('\n').join('<br>')
          }}></p>
      </article>
    )
  }
}

SelectedNote.propTypes = {
  content: PropTypes.string
}

export default SelectedNote;
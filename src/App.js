import React from 'react';
import {
  CompositeDecorator,
  convertFromRaw,
  Editor,
  EditorState
} from 'draft-js';

const rawContent = {
  blocks: [
    {
      text: (
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec dapibus,' +
        'felis in sollicitudin vestibulum, velit elit porta tellus,' +
        'sit amet dictum arcu erat nec sem.'
      ),
      type: 'unstyled',
      entityRanges: [{offset: 28, length: 11, key: 'first'}],
    },
    {
      text: '',
      type: 'unstyled',
    },
    {
      text: (
        'Sed sed ex sit amet nunc mollis vulputate et id elit.' +
        'Ut egestas vitae est finibus tempus.'
      ),
      type: 'unstyled',
      entityRanges: [{offset: 25, length: 6, key: 'second'}],
    },
    {
      text: '',
      type: 'unstyled',
    },
    {
      text: (
        'Maecenas non pellentesque nunc, auctor lacinia libero. Maecenas bibendum hendrerit' +
        'mauris, ac lobortis velit condimentum in.'
      ),
      type: 'unstyled',
      entityRanges: [{offset: 32, length: 6, key: 'third'}],
    },
  ],

  entityMap: {
    first: {
      type: 'TOKEN',
      mutability: 'IMMUTABLE',
    },
    second: {
      type: 'TOKEN',
      mutability: 'MUTABLE',
    },
    third: {
      type: 'TOKEN',
      mutability: 'SEGMENTED',
    },
  },
};

export default class App extends React.Component {
  constructor() {
    super();

    const decorator = new CompositeDecorator([
      { strategy: urlStrategy, component: URLSpan }

      /*{
        strategy: getEntityStrategy('IMMUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('MUTABLE'),
        component: TokenSpan,
      },
      {
        strategy: getEntityStrategy('SEGMENTED'),
        component: TokenSpan,
      },*/
    ]);

    this.state = {
      // editorState: EditorState.createWithContent(convertFromRaw(rawContent), decorator),
      editorState: EditorState.createEmpty(decorator),
    }
  }

  _onChange = (editorState) => {
    this.setState({
      editorState
    });
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          onChange={this._onChange}
          spellCheck={true}
        />
      </div>
    );
  }
}

const regex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;

function urlStrategy(contentBlock, callback, contentState) {
  const text = contentBlock.getText();
  
  let matchArr = regex.exec(text),
      start;

  console.log(matchArr);

  if(matchArr) {
    console.log('aeee!');
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

function getEntityStrategy(mutability) {
  return function(contentBlock, callback, contentState) {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        if (entityKey === null) {
          return false;
        }
        return contentState.getEntity(entityKey).getMutability() === mutability;
      },
      callback
    );
  };
}

const URLSpan = (props) => {
  return <span style={styles.url}>{props.children}</span>;
};

const TokenSpan = (props) => {
  const style = getDecoratedStyle(
    props.contentState.getEntity(props.entityKey).getMutability()
  );
  return <span style={style}>{props.children}</span>;
};

function getDecoratedStyle(mutability) {
  switch (mutability) {
    case 'IMMUTABLE': return styles.immutable;
    case 'MUTABLE': return styles.mutable;
    case 'SEGMENTED': return styles.segmented;
    default: return null;
  }
}

const styles = {
  url: {
    backgroundColor: '#F00',
    color: '#FFF',
    fontSize: '20px'
  },
  immutable: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: '2px 0',
  },
  mutable: {
    backgroundColor: 'rgba(204, 204, 255, 1.0)',
    padding: '2px 0',
  },
  segmented: {
    backgroundColor: 'rgba(248, 222, 126, 1.0)',
    padding: '2px 0',
  },
};
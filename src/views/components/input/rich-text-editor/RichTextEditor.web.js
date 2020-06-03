/* eslint-disable max-len */
import React, { Component } from 'react';
import { Editor, EditorState, RichUtils, getDefaultKeyBinding, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { func, string, object, bool } from 'prop-types';
import style from './style.css'; //eslint-disable-line
import { isObject, isArray, isString } from './../../../../utils';

class RichEditor extends Component {
  static defaultProps = {
    editable: true,
  }

  static propTypes = {
    onChangeValue: func,
    testID: string,
    value: string,
    editable: bool,
    showAllOptions: bool,
  };

  constructor( props ) {
    super( props );
    this.editor = React.createRef();
    this.state = { editorState: EditorState.createEmpty() };
    // this.state = { editorState: EditorState.createWithContent( ContentState.createFromText( plcaeholder)) };
    this.handleFocus = () => {
      this.editor.current.focus();
      // this.setState({ isFocused: true });
    };
    this.handleChange = editorState => {
      this.setState({ editorState });
    };
    this.onKeyCommand = this._handleKeyCommand.bind( this );
    this.mapKeyToEditorCommand = this._mapKeyToEditorCommand.bind( this );
    this.handleToggleBlockType = this._toggleBlockType.bind( this );
    this.handleToggleInlineStyle = this._toggleInlineStyle.bind( this );
    this.handleBlur = this.handleBlur.bind( this );
  }

  state = {
    // isFocused: false,
  }

  componentDidMount() {
    if ( this.props.value )
      this.settingStateFromHtml( this.props.value );
  }

  componentDidUpdate( prevProps, prevState ) {
    if (
      ((
        prevProps.value !== this.props.value &&
        this.state.value !== this.props.value
      ) ||
        prevState.value !== this.state.value
      )
    ) {
      this.settingStateFromHtml( this.props.value );
    }
  }

  settingStateFromHtml = ( value ) => {
    const text = `${value}`;
    const contentHTML = convertFromHTML( text );

    if (
      isObject( contentHTML, { withProperty: 'contentBlocks' }) &&
      isArray( contentHTML.contentBlocks )
    ) {
      const state = ContentState.createFromBlockArray( contentHTML );
      const test = EditorState.createWithContent( state );

      this.setState({
        editorState: test,
      });
    }
  }

  _handleKeyCommand( command, editorState ) {
    const newState = RichUtils.handleKeyCommand( editorState, command );

    if ( newState ) {
      this.handleChange( newState );

      return true;
    }

    return false;
  }

  _mapKeyToEditorCommand( e ) {
    if ( e.keyCode === 9 /* TAB */ ) {
      const newEditorState = RichUtils.onTab( e, this.state.editorState, 4 /* maxDepth */ );

      if ( newEditorState !== this.state.editorState ) {
        this.handleChange( newEditorState );
      }

      return;
    }

    return getDefaultKeyBinding( e );
  }

  _toggleBlockType( blockType ) {
    this.handleChange( RichUtils.toggleBlockType( this.state.editorState, blockType ));
  }

  _toggleInlineStyle( inlineStyle ) {
    this.handleChange( RichUtils.toggleInlineStyle( this.state.editorState, inlineStyle ));
  }

  handleBlur() {
    const { editorState } = this.state;
    const contentState = editorState.getCurrentContent();

    const htmlOutput = stateToHTML( contentState );

    // when data changes we send the value to the backend as an html
    this.props.onChangeValue( htmlOutput );

    // this.setState({
    //   isFocused: false,
    // });
  }

  render() {
    // console.log( '*****FINAL******', this.state );
    // console.log( '*********AGAIN*******', this.props );
    const { testID, editable, showAllOptions } = this.props;
    const { editorState /* , isFocused */  } = this.state;
    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor';
    var contentState = editorState.getCurrentContent();

    if ( !contentState.hasText()) {
      if (
        contentState
          .getBlockMap()
          .first()
          .getType() !== 'unstyled'
      ) {
        className += ' RichEditor-hidePlaceholder';
      }
    }

    return (
      <div
        className={editable ? 'RichEditor-root' : null}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        { editable ? (
          <div
            style={{ display: 'flex' }}
          >
            <InlineStyleControls
              editorState={editorState}
              onToggle={this.handleToggleInlineStyle}
              showAllOptions={showAllOptions}
            />
            <BlockStyleControls
              editorState={editorState}
              onToggle={this.handleToggleBlockType}
              showAllOptions={showAllOptions}
            />
          </div>
        ) : null }
        <div
          className={editable ? className : null}
          onClick={this.handleFocus}
          testid={`${testID}`}
        >
          <Editor
            // onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={this.onKeyCommand}
            keyBindingFn={this.mapKeyToEditorCommand}
            onChange={this.handleChange}
            // placeholder={isFocused ? null : this.props.placeholder}
            placeholder={null}
            ref={this.editor}
            spellCheck
            readOnly={!editable}
          />
        </div>
      </div>
    );
  }
}
// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle( block ) {
  switch ( block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
}
// eslint-disable-next-line
class StyleButton extends React.Component {
  constructor() {
    super();
    this.onToggle = e => {
      e.preventDefault();
      this.props.onToggle( this.props.style );
    };
  }

  render() {
    const { active, icon, label } = this.props;

    let className = 'RichEditor-styleButton';

    if ( active ) {
      className += ' RichEditor-activeButton';
    }

    const hasIcon = isString( icon, { ofMinLength: 1 });

    return (
      <span
        className={className}
        onMouseDown={this.onToggle} //eslint-disable-line
        style={{ fontSize: hasIcon ? '18px' : null, fontFamily: hasIcon ? 'Material Icons' : null }}

      >
        {
          hasIcon
            ? icon
            : label
        }
      </span>
    );
  }
}

StyleButton.propTypes = {
  onToggle: func,
  label: string,
  icon: string,
  active: bool,
  style: string,
};

const BlockStyleControls = props => {
  const { editorState, showAllOptions } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey( selection.getStartKey())
    .getType();

  const BLOCK_TYPES = [
    ...showAllOptions ? [
      { label: 'H1', style: 'header-one' },
      { label: 'H2', style: 'header-two' },
      { label: 'H3', style: 'header-three' },
      { label: 'H4', style: 'header-four' },
      { label: 'H5', style: 'header-five' },
      { label: 'H6', style: 'header-six' },
    ] : [],
    { label: 'UL', style: 'unordered-list-item', icon: 'format_list_bulleted' },
    { label: 'OL', style: 'ordered-list-item', icon: 'format_list_numbered' },
    { label: 'Blockquote', style: 'blockquote', icon: 'format_quote' },
    ...showAllOptions ? { label: 'Code Block', style: 'code-block' } : {},
  ];

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map( type => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

BlockStyleControls.propTypes = {
  onToggle: func,
  editorState: object,
  showAllOptions: bool,
};

const InlineStyleControls = props => {
  const { editorState, showAllOptions } = props;
  const currentStyle = editorState.getCurrentInlineStyle();

  const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', icon: 'format_bold' },
    { label: 'Italic', style: 'ITALIC', icon: 'format_italic' },
    { label: 'Underline', style: 'UNDERLINE', icon: 'format_underlined' },
    { label: 'Strikethrough', style: 'STRIKETHROUGH', icon: 'strikethrough_s' },
    ...showAllOptions ? { label: 'Monospace', style: 'CODE' } : {},
  ];

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map( type => (
        <StyleButton
          key={type.label}
          active={currentStyle.has( type.style )}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
          icon={type.icon}
        />
      ))}
    </div>
  );
};

InlineStyleControls.propTypes = {
  onToggle: func,
  editorState: object,
  showAllOptions: bool,
};

export default RichEditor;

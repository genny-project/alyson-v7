
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { node, string } from 'prop-types';

class Portal extends Component {
  static defaultProps = {
    type: 'react-portal',
  }

  static propTypes = {
    children: node.isRequired,
    type: string,
    identifier: string,
  }

  constructor( props ) {
    super( props );
    this.element = document.createElement( props.type );
  }

  componentDidMount() {
    this.element.setAttribute( 'id', this.props.identifier );
    document.body.appendChild( this.element );
  }

  componentWillUnmount() {
    const hasNode = document.body.contains( this.element );

    if ( hasNode )
      document.body.removeChild( this.element );
  }

  render() {
    const { children } = this.props;

    return (
      createPortal(
        children,
        this.element,
      )
    );
  }
}

export default Portal;

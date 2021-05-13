import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ComponentErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // console.log('ErrorBoundary constructor');
    this.state = {
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    // console.log('ErrorBoundary componentDidCatch');
    // Catch errors in any child components and re-renders with an error message
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    const { columnModule } = this.props;
    if (this.state.error) {
      // Fallback UI if an error occurs
      return (
        <div>
          <h2>Error loading: {columnModule}</h2>
          <pre className="red">
            {this.state.error && this.state.error.toString()}
          </pre>
          <div>{'Component Stack Error Details: '}</div>
          <pre className="red">{this.state.errorInfo.componentStack}</pre>
        </div>
      );
    }
    // component normally just renders children
    return this.props.children;
  }
}

ComponentErrorBoundary.propTypes = {
  componentData: PropTypes.object,
  columnModule: PropTypes.string,
  children: PropTypes.node,
};

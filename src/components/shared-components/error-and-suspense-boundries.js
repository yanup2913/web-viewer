import React, { Component, Suspense } from "react";
import PropTypes from "prop-types";

export function ErrorBoundaryWithSuspense({ fallback, children}) {
  return (
    <ErrorBoundary {...{ fallback }}>
      <Suspense {...{ fallback }}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.group("=======ErrorBoundary=======");
    console.error(error, errorInfo);
    console.groupEnd();
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
};

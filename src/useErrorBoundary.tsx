import React, { FC, Ref } from 'react';

class DefaultErrorFallback extends React.Component {
  render() {
    return 'error';
  }
}

interface IPropsWrapped {
  forwardRef: Ref<unknown>;
}

const getComponentName = WrapperComponent => {
  return WrapperComponent.displayName || WrapperComponent.name || 'Component';
};

const useErrorBoundary = <P extends Object>(
  ErrorFallback = DefaultErrorFallback
) => (WrappedComponent: FC<P>) => {
  class ErrorBoundary extends React.Component<P & IPropsWrapped, any> {
    state = {
      hasError: false,
    };

    static getDerivedStateFromError(err) {
      console.error(
        `组件 ---> ${getComponentName(WrappedComponent)} 发生如下错误\n`,
        err
      );
      return {
        hasError: true,
      };
    }

    render() {
      const { forwardRef, ...rest } = this.props;
      const { hasError } = this.state;
      return hasError ? (
        <ErrorFallback />
      ) : (
        <WrappedComponent ref={forwardRef} {...(rest as P)} />
      );
    }
  }
  return React.forwardRef((props, ref) => (
    <ErrorBoundary {...(props as P)} forwardRef={ref} />
  ));
};

export default useErrorBoundary;

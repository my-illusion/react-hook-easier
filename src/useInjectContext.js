import React from 'react';

const InjectContext: any = React.createContext({});

export const useInjectContext = (WrappedComponent) => {
  class WrappedInjectContext extends React.Component {
    render() {
      const { forwardRef, ...rest } = this.props;
      return (
        <InjectContext.Consumer>
          {
            context => <WrappedComponent ref={forwardRef} {...rest} {...context} />
          }
        </InjectContext.Consumer>
      )
    }
  }
  return React.forwardRef((props, ref) => <WrappedInjectContext {...props} forwardRef={ref} />)
}

export const InjectProvider = InjectContext.Provider;

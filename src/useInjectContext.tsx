import React, { Ref } from 'react';

const InjectContext: React.Context<any> = React.createContext({});

interface IPropsWrapped {
  forwardRef: Ref<unknown>;
}

export const useInjectContext = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  class WrappedInjectContext extends React.Component<IPropsWrapped & P, {}> {
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
  return React.forwardRef((props, ref) => <WrappedInjectContext {...props as P} forwardRef={ref} />)
}

export const InjectProvider = InjectContext.Provider;

import * as React from 'react';
import {
  ExampleCard,
  IComponentDemoPageProps,
  ComponentPage,
} from '@uifabric/example-app-base';

import A11yManager from './a11yManager/A11yManager';
import ArrowNavigation from './a11yManager/ArrowNavigation';
import Section from './example/Section';

const containerStyles = {
  minHeight: '100%',
  padding: '10px',
  width: '60%',
  float: 'left'
};

export class A11yPage extends React.Component<IComponentDemoPageProps, {}> {
  private _a11yManager: A11yManager | undefined;

  public componentDidMount(): void {
    this._a11yManager = A11yManager.create(document.body, {
      prefix: 'a11y',  // only reads attributes starting with data-a11y-...
      // debug: true
    });
    this._a11yManager!.registerNavigationMode(ArrowNavigation);
  }

  public render(): JSX.Element {
    return (
      <ComponentPage
        title='A11y'
        componentName='A11yExample'
        exampleCards={
          <div>
            <ExampleCard title='Arrow Navigation Simple Example'>
              <div
                style={ containerStyles as any }
                data-a11y-id='mainlist'
                data-a11y-mode='Arrow'
                data-a11y-modeparams='vertical'
                data-a11y-navigateonkey-39='$firstChild' // Right Arrow
                data-a11y-navigateonkey-37='$lastChild'  // Left Arrow
                data-a11y-navigateonkey-27='$parent'     // Escape
                data-a11y-navigateonkey-80-a='#isolated'   // Alt+P
              >
                <h2>List of Sections</h2>
                <Section cols={ 4 } cards={ 4 } />
                <Section cols={ 4 } cards={ 4 } />
                <Section cols={ 4 } cards={ 4 } />
              </div>

              <div
                style={ { float: 'right', width: '30%' } }
                data-a11y-id='isolated'
                data-a11y-navigateonkey-27='#mainlist'
              >
                <h2>Isolated Section</h2>
                <Section cols={ 1 } cards={ 2 } />
              </div>
            </ExampleCard>
          </div>
        }
        /* tslint:disable:max-line-length */
        overview={
          <div>
            <p>
              You can use arrows in the menu to navigate between the items. The whole menu is a single tabstop. This is implemented as a Navigation Mode for our a11y platform.
            </p>
          </div>
        }
        /* tslint:enable:max-line-length */
        related={
          <a href='https://dev.office.com/fabric-js/Components/CommandBar/CommandBar.html'>Fabric JS</a>
        }
        isHeaderVisible={ this.props.isHeaderVisible }
      />
    );
  }

}

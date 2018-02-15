import * as React from 'react';
import Card from './Card';

export interface ISectionProps {
  cols?: number;
  cards?: number;
}

export interface ISectionState {
  collapsed: boolean;
}

const styles = {
  section: {
    border: 'solid 2px black',
    margin: '5px',
    float: 'left',
    height: 'auto',
    clear: 'both'
  },
  sectionTitle: {
    width: 'calc(100% - 4px)',
    background: 'palevioletred',
    padding: '2px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default class Section extends React.Component<ISectionProps, ISectionState> {
  constructor(props: ISectionProps) {
    super(props);

    this.state = {
      collapsed: false
    };
  }

  public render() {
    const { cols, cards } = this.props;
    const w: number = (cols || 2) * 114;
    const h: string = this.state.collapsed ? '20px' : 'auto';
    const overflow = this.state.collapsed ? 'hidden' : 'auto';

    const cardElements = [];
    const count = cards || 4;
    for (let i = 0; i < count; i++) {
      cardElements.push(<Card />);
    }

    return <div
      tabIndex={ 0 }
      className='Section'
      style={ { width: w, height: h, overflow: overflow, ...styles.section } }
      data-a11y-mode='Arrow'
      data-a11y-modeparams='horizontal'
    >
      <div
        className='Section-title'
        style={ styles.sectionTitle as any }
        onClick={ () => this.setState({ collapsed: !this.state.collapsed }) }
      >Section</div>
      <div>
        { cardElements }
      </div>
    </div>;
  }
}

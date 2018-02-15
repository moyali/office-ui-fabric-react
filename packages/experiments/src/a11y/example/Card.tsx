import * as React from 'react';

export interface ICardProps {
  buttons?: number;
}

export interface ICardState {

}

const styles = {
  card: {
    width: '100px',
    height: '150px',
    border: 'solid 2px black',
    margin: '5px',
    float: 'left'
  },
  cardTitle: {
    width: 'calc(100% - 4px)',
    background: '#5aadbb',
    padding: '2px',
    fontWeight: 'bold'
  }
}

export default class Card extends React.Component<ICardProps, ICardState> {
  public render() {
    const buttonElements = [];
    for (let i = 0; i < this.props.buttons!; i++) {
      buttonElements.push(<button>{ `Button ${i}` }</button>)
    }

    return <div tabIndex={ 0 } className='Card' style={ styles.card }>
      <div style={ styles.cardTitle as any }>Card</div>
      <div>{ buttonElements }</div>
    </div>;
  }
}
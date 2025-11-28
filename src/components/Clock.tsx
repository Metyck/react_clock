import React from 'react';

type Props = {
  name: string;
  time: string;
};

export class Clock extends React.Component<Props> {
  render() {
    return (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>

        {' time is '}

        <span className="Clock__time">{this.props.time}</span>
      </div>
    );
  }
}

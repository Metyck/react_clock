import React from 'react';

type Props = {
  name: string;
};

type State = {
  today: string;
};

export class Clock extends React.Component<Props, State> {
  state: State = {
    today: new Date().toUTCString().slice(-12, -4),
  };

  addIntervalHelper = (event?: MouseEvent) => {
    if (event) {
      event.preventDefault();
    }

    if (!this.clockValueTimerId) {
      this.clockValueTimerId = window.setInterval(() => {
        const initialTime = new Date().toUTCString().slice(-12, -4);

        this.setState({ today: initialTime });
        // eslint-disable-next-line no-console
        console.log(initialTime);
      }, 1000);
    }
  };

  removeIntervalHelper = (event: MouseEvent) => {
    event.preventDefault();

    clearInterval(this.clockValueTimerId);

    this.clockValueTimerId = null;
  };

  clockValueTimerId: number | null | undefined;

  componentDidMount(): void {
    this.addIntervalHelper();

    document.addEventListener('contextmenu', this.removeIntervalHelper);
    document.addEventListener('click', this.addIntervalHelper);
  }

  componentWillUnmount(): void {
    clearInterval(this.clockValueTimerId);

    document.removeEventListener('click', this.addIntervalHelper);
    document.removeEventListener('contextmenu', this.removeIntervalHelper);
  }

  render() {
    return (
      <div className="Clock">
        {' time is '}

        <span className="Clock__time">{this.state.today}</span>
      </div>
    );
  }
}

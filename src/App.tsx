import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  today: string;
  clockPrevName: string;
  clockName: string;
  hasClock: boolean;
  isJustAppeared: boolean;
};

export class App extends React.Component<State> {
  state: State = {
    today: new Date().toUTCString().slice(-12, -4),
    clockName: 'Clock-0',
    clockPrevName: 'Clock-0',
    hasClock: true,
    isJustAppeared: true,
  };

  addIntervalHelper = (event?: MouseEvent) => {
    if (event) {
      event.preventDefault();
    }

    this.setState({ hasClock: true });

    if (!this.clockNameTimerId) {
      this.clockNameTimerId = window.setInterval(() => {
        const newClockName = getRandomName();

        this.setState({ clockName: newClockName });
      }, 3300);
    }

    if (!this.clockValueTimerId) {
      this.clockValueTimerId = window.setInterval(() => {
        const initialTime = new Date().toUTCString().slice(-12, -4);

        this.setState({ today: initialTime });
        // eslint-disable-next-line no-console
        console.log(initialTime);
      }, 1000);

      this.setState({ isJustAppeared: false });
    }
  };

  removeIntervalHelper = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
    clearInterval(this.clockValueTimerId);
    clearInterval(this.clockNameTimerId);
    this.clockNameTimerId = null;
    this.clockValueTimerId = null;
  };

  clockValueTimerId: number | null | undefined;

  clockNameTimerId: number | null | undefined;

  componentDidMount(): void {
    // if (this.state.isFirstlyApeared) {
    // }
    this.addIntervalHelper();

    document.addEventListener('contextmenu', this.removeIntervalHelper);
    document.addEventListener('click', this.addIntervalHelper);
  }

  componentWillUnmount(): void {
    clearInterval(this.clockValueTimerId);

    document.removeEventListener('click', this.addIntervalHelper);
    document.removeEventListener('contextmenu', this.removeIntervalHelper);
  }

  componentDidUpdate(): void {
    const oldName = this.state.clockPrevName;
    const newClockName = this.state.clockName;

    if (this.state.clockName !== this.state.clockPrevName) {
      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${oldName} to ${newClockName}`);
      this.setState({ clockPrevName: newClockName });
    }
  }

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>

        {this.state.hasClock && (
          <Clock name={this.state.clockName} time={this.state.today} />
        )}
      </div>
    );
  }
}

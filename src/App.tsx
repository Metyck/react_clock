import React from 'react';
import './App.scss';
import { Clock } from './components/Clock';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

type State = {
  clockPrevName: string;
  clockName: string;
  hasClock: boolean;
};

export class App extends React.Component<State> {
  state: State = {
    clockName: 'Clock-0',
    clockPrevName: 'Clock-0',
    hasClock: true,
  };

  clockNameTimerId: number | null = null;

  handleRightClick = (event: MouseEvent) => {
    event.preventDefault();
    this.setState({ hasClock: false });
    clearInterval(this.clockNameTimerId);
    this.clockNameTimerId = null;
  };

  handleLeftClick = () => {
    this.setState({ hasClock: true });

    if (!this.clockNameTimerId) {
      this.clockNameTimerId = window.setInterval(() => {
        const newClockName = getRandomName();

        this.setState({ clockName: newClockName });
      }, 3300);
    }
  };

  componentDidMount(): void {
    document.addEventListener('click', this.handleLeftClick);
    document.addEventListener('contextmenu', this.handleRightClick);

    if (!this.clockNameTimerId) {
      this.clockNameTimerId = window.setInterval(() => {
        const newClockName = getRandomName();

        this.setState({ clockName: newClockName });
      }, 3300);
    }
  }

  componentWillUnmount(): void {
    document.removeEventListener('contextmenu', this.handleRightClick);
    document.removeEventListener('click', this.handleLeftClick);
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
          <>
            <strong className="Clock__name">{this.state.clockName}</strong>
            <Clock name={this.state.clockName} />
          </>
        )}
      </div>
    );
  }
}

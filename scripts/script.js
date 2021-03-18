'use strict'

// control ====================================================================

class RollUp extends React.Component {
  render() {
    return <button className="control__button">x</button>
  }
}

class Expand extends React.Component {
  render() {
    return <button className="control__button">x</button>
  }
}

class ControlPanel extends React.Component {
  render() {
    return <div className="control">
      <RollUp />
    </div>
  }
}

// display ====================================================================

class FormulaDisplay extends React.Component {
  render() {
    return <div className="display__formula">{this.props.formula}</div>
  };
}

class MainDisplay extends React.Component {
  render() {
    return <div id="display" className="display__main">{this.props.value}</div>
  };
}

class Display extends React.Component {
  render() {
    return <div className="display">
      <FormulaDisplay formula={this.props.formula} />
      <MainDisplay value={this.props.value} />
    </div>
  };
}

// Keyboard ===================================================================

class Keyboard extends React.Component {
  render() {
    return <div className="keyboard">
      <button type="button"
        id="clear"
        className="keyboard__key keyboard__key--wide keyboard__key--red"
        onClick={this.props.clear}>
        C
      </button>
      <button type="button"
        id="divide"
        className="keyboard__key keyboard__key--green"
        onClick={this.props.operator}
        value="&divide;">
        &divide;
      </button>
      <button type="button"
        id="multiply"
        className="keyboard__key keyboard__key--green"
        onClick={this.props.operator}
        value="&times;">
        &times;
      </button>
      <button type="button"
        id="seven"
        className="keyboard__key"
        onClick={this.props.nember}
        value="7">
        7
      </button>
      <button type="button"
        id="eight"
        className="keyboard__key"
        onClick={this.props.nember}
        value="8">
        8
      </button>
      <button type="button"
        id="nine"
        className="keyboard__key"
        onClick={this.props.nember}
        value="9">
        9
      </button>
      <button type="button"
        id="subtract"
        className="keyboard__key keyboard__key--green"
        onClick={this.props.operator}
        value="&minus;">
        &minus;
      </button>
      <button type="button"
        id="four"
        className="keyboard__key"
        onClick={this.props.nember}
        value="4">
        4
      </button>
      <button type="button"
        id="five"
        className="keyboard__key"
        onClick={this.props.nember}
        value="5">
        5
      </button>
      <button type="button"
        id="six"
        className="keyboard__key"
        onClick={this.props.nember}
        value="6">
        6
      </button>
      <button type="button"
        id="add"
        className="keyboard__key keyboard__key--green"
        onClick={this.props.operator}
        value="+">
        +
      </button>
      <button type="button"
        id="one"
        className="keyboard__key"
        onClick={this.props.nember}
        value="1">
        1
      </button>
      <button type="button"
        id="two"
        className="keyboard__key"
        onClick={this.props.nember}
        value="2">
        2
      </button>
      <button type="button"
        id="three"
        className="keyboard__key"
        onClick={this.props.nember}
        value="3">
        3
      </button>
      <button type="button"
        id="equals"
        className="keyboard__key keyboard__key--green keyboard__key--tall"
        onClick={this.props.operator}
        value="=">
        =
      </button>
      <button type="button"
        id="zero"
        className="keyboard__key keyboard__key--wide"
        onClick={this.props.nember}
        value="0">
        0
      </button>
      <button type="button"
        id="decimal"
        className="keyboard__key keyboard__key--gray"
        //onClick={}
        value=".">
        .
      </button>
    </div>
  };
}

// Calculator =================================================================

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentVal: '0',
      formula: ''
    };

    this.initialize = this.initialize.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
  }

  handleNumber(event) {
    const value = event.target.value;
    const { currentVal, formula } = this.state;
    this.setState({
      currentVal: currentVal != 0 ? currentVal + value : value,
      formula: formula !== '' ? formula + value : value
    });
  }

  handleOperator(event) {
    const value = event.target.value;
    const { currentVal, formula } = this.state;
    console.log(value);
    this.setState({
      currentVal: value,
      formula: formula !== '' ? formula + value : value
    });
  }

  initialize() {
    this.setState({
      currentVal: '0',
      formula: ''
    });
  }
  
  render() {
    return <div className="calculator">
      <ControlPanel />
      <Display value={this.state.currentVal} formula={this.state.formula} />
      <Keyboard 
        nember={this.handleNumber}
        clear={this.initialize}
        operator={this.handleOperator}
      />
    </div>;
  };
}

// Rendering ==================================================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('calculator')
);
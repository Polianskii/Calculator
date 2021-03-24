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
        onClick={this.props.number}
        value="7">
        7
      </button>
      <button type="button"
        id="eight"
        className="keyboard__key"
        onClick={this.props.number}
        value="8">
        8
      </button>
      <button type="button"
        id="nine"
        className="keyboard__key"
        onClick={this.props.number}
        value="9">
        9
      </button>
      <button type="button"
        id="subtract"
        className="keyboard__key keyboard__key--green"
        onClick={this.props.subtract}
        value="−">
        &minus;
      </button>
      <button type="button"
        id="four"
        className="keyboard__key"
        onClick={this.props.number}
        value="4">
        4
      </button>
      <button type="button"
        id="five"
        className="keyboard__key"
        onClick={this.props.number}
        value="5">
        5
      </button>
      <button type="button"
        id="six"
        className="keyboard__key"
        onClick={this.props.number}
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
        onClick={this.props.number}
        value="1">
        1
      </button>
      <button type="button"
        id="two"
        className="keyboard__key"
        onClick={this.props.number}
        value="2">
        2
      </button>
      <button type="button"
        id="three"
        className="keyboard__key"
        onClick={this.props.number}
        value="3">
        3
      </button>
      <button type="button"
        id="equals"
        className="keyboard__key keyboard__key--green keyboard__key--tall"
        onClick={this.props.equal}
        value="=">
        =
      </button>
      <button type="button"
        id="zero"
        className="keyboard__key keyboard__key--wide"
        onClick={this.props.number}
        value="0">
        0
      </button>
      <button type="button"
        id="decimal"
        className="keyboard__key keyboard__key--gray"
        onClick={this.props.decimal}
        value=".">
        .
      </button>
    </div>
  };
}

// Calculator =================================================================

// для вычислений заменить на операторы JS
const operatorOnEnd = /[+×÷−]$/;
const minusInStart = /^−/;

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
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleSubtract = this.handleSubtract.bind(this);
    this.handleEqual = this.handleEqual.bind(this);

  }


  handleNumber(event) {
    const value = event.target.value;
    const { currentVal, formula } = this.state;
    this.setState({
      currentVal: currentVal != "0" && 
                  !operatorOnEnd.test(currentVal) ? 
                  currentVal + value : value,
      formula: formula !== '' && currentVal !== "0" ? formula + value : value
    });
  }

  handleOperator(event) {
    const value = event.target.value;
    const { currentVal, formula } = this.state;
    this.setState({
      currentVal: currentVal == "0" ? currentVal : value,
      formula:  formula == '' ?
                formula : operatorOnEnd.test(formula) ?
                /[+×÷−]−$/.test(formula) ?
                formula.slice(0, formula.length - 2) + value : formula.slice(0, formula.length - 1) + value :
                formula + value
    });
  }

  handleSubtract(event) {
    const value = event.target.value;
    const { currentVal, formula } = this.state;
    this.setState({
      currentVal: currentVal == "0" || 
                  minusInStart.test(currentVal) || 
                  operatorOnEnd.test(currentVal) ||
                  /\d$/.test(currentVal) ? 
                  value : currentVal + value,
      formula: /−$/.test(formula) && formula.length == 1 ? 
                formula : /[+×÷−]−$/.test(formula) ?
                formula : formula == "" ? 
                value : formula + value
    });
  }

  handleDecimal(event) {
    const value = event.target.value;
    const { currentVal, formula } = this.state;
    if (!currentVal.includes(".") && !operatorOnEnd.test(currentVal)) {
      this.setState({
        currentVal: currentVal + value,
        formula: formula !== '' ? formula + value : `0${value}`
      });
    }
  }

  handleEqual() {
    const value = event.target.value;
    const { currentVal, formula } = this.state;
    this.setState({
      currentVal: value,
      formula: formula + value
    });
    console.log(+formula, typeof +formula);
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
        number={this.handleNumber}
        clear={this.initialize}
        operator={this.handleOperator}
        decimal={this.handleDecimal}
        subtract={this.handleSubtract}
        equal={this.handleEqual}
      />
    </div>;
  };
}

// Rendering ==================================================================

ReactDOM.render(
  <Calculator />,
  document.getElementById('calculator')
);
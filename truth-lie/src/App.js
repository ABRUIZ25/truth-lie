
import './App.css';

import React, { Component } from 'react'
//http://ce44-108-53-232-66.ngrok.io
const serverURL = "http://ce44-108-53-232-66.ngrok.io";

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      vote: 0,
      facts: {
        fact1: {
          input: '',
          islie: false
        },
        fact2: {
          input: '',
          islie: false
        },
        fact3: {
          input: '',
          islie: false
        }
      },
      userName: '',
      promptone: '',
      prompttwo: '',
      prompthree: '',
      voteone: Number(),
      votetwo: Number(),
      votethree: Number(),

    }
  }





  //fuctions
  handleUsernameChange = (event) => {
    this.setState({
      username: event.target.value

    })

  }

  handleFact1Change = (event) => {
    console.log(event.target.value)

    this.setState({
      facts: {
        ...this.state.facts,
        fact1: {
          ...this.state.facts.fact1,
          input: event.target.value
        }
      }


    })

  }

  handleFact2Change = (event) => {
    this.setState({
      facts: {
        ...this.state.facts,
        fact2: {
          ...this.state.facts.fact2,
          input: event.target.value
        }
      }
    })

  }

  handleFact3Change = (event) => {
    this.setState({
      facts: {
        ...this.state.facts,
        fact3: {
          ...this.state.facts.fact3,
          input: event.target.value
        }
      }
    })

  }

  handleVoteChange = (event) => {
    this.setState({
      vote: event.target.value

    })

  }

  handleIsCheckedChange1 = () => {
    this.setState((prevState) => {
      console.log(prevState);

      return {
        facts: {
          ...this.state.facts,
          fact1: {
            ...this.state.facts.fact1,
            islie: !prevState.fact1.islie
          }
        }

      };
    });

  }

  handleIsCheckedChange2 = () => {
    this.setState((prevState) => {
      return {
        facts: {
          ...this.state.facts,
          fact2: {
            ...this.state.facts.fact2,
            islie: !prevState.fact2.islie
          }
        }
      }
    })
  }

  handleIsCheckedChange3 = () => {
    this.setState((prevState) => {
      return {
        facts: {
          ...this.state.facts,
          fact3: {
            ...this.state.facts.fact3,
            islie: !prevState.fact3.islie
          }
        }
      }
    })
  }

  sendNewPrompt = () => {
    const body = {
      userName: this.state.username,
      vote: this.state.vote,
      prompts: {
        promptOne: {
          prompt: this.state.facts.fact1.input,
          isLie: this.state.facts.fact1.islie,
        },
        promptTwo: {
          prompt: this.state.facts.fact2.input,
          isLie: this.state.facts.fact2.islie,
        },
        promptThree: {
          prompt: this.state.facts.fact3.input,
          isLie: this.state.facts.fact3.islie,
        },
      }
    }



    postPrompt(body);
  }
  sendPromptVote = () => {
    const body = {
      userName: this.state.username,
      promptVote: Number(this.state.vote)
    }

    postVote(body);
  }

  sendPing = async () => {
    const pingResponse = await ping(this.state.username);
    console.log(pingResponse);
  }

  poll = async () => {
    const PollResponse = await poll();
    console.log(JSON.parse(PollResponse));
  }

  render() {
    return (
      <div className='inputField' >
        <h1>two truths & a lie</h1>
        <label>Name
          <input name="username" value={this.state.username} onChange={this.handleUsernameChange}></input>
        </label>

        <label>Fact1
          <input name="fact1" value={this.state.facts.fact1.input} onChange={this.handleFact1Change}></input>
          Lie
          <input type="checkbox" checked={this.state.facts.fact1.islie} onChange={this.handleIsCheckedChange1} />
        </label>

        <label>Fact2
          <input name="fact2" value={this.state.facts.fact2.input} onChange={this.handleFact2Change}></input>
          Lie
          <input type="checkbox" checked={this.state.facts.fact2.islie} onChange={this.handleIsCheckedChange2} />
        </label>

        <label>Fact3
          <input name="fact3" value={this.state.facts.fact3.input} onChange={this.handleFact3Change}></input>
          Lie
          <input type="checkbox" checked={this.state.facts.fact3.islie} onChange={this.handleIsCheckedChange3} />
        </label>

        <label>Vote
          <input type="number" value={this.state.vote} onChange={this.handleVoteChange} />
        </label>

        <button onClick={this.sendNewPrompt}>Send Prompt</button>
        <button onClick={this.sendPromptVote}>Send Vote</button>
        <button onClick={this.sendPing}>Send Ping</button>
        <div>-----------------------------------------------------------------------------------------</div>

        <div>username:</div>
        <div>prompt1:</div>
        <div>prompt2:</div>
        <div>prompt3:</div>
        <div>vote 1:</div>
        <div>vote 2:</div>
        <div>vote 3:</div>
        <button onClick={this.poll}>Get Poll</button>

      </div>
    )
  }
}

export default App

//getting iformation

async function postPrompt(prompts) {
  const response = await fetch(`${serverURL}/prompt-submit`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: JSON.stringify(
      prompts,
    ),
  });
  console.log(response.text())
  return response;
}

async function postVote(promptVote) {
  const response = await fetch(`${serverURL}/prompt-vote`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: JSON.stringify(
      promptVote,
    ),
  });
  console.log(response.text())
  return response;
}

async function ping(userName) {
  const response = await fetch(`${serverURL}/ping`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },
    body: JSON.stringify({
      userName
    })
  });
  const pingResponse = await response.text();
  return pingResponse;
}

async function poll() {
  const response = await fetch(`${serverURL}/prompt-poll`, {
    method: "Get", // *GET, POST, PUT, DELETE, etc.
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "access-control-request-headers": "content-type",
      "x-Trigger": "CORS",
    },

  });
  const PollResponse = await response.text();
  return PollResponse;
};




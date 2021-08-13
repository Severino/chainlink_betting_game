import React, { Component } from 'react';
import dice from '../logos/dice_logo.png';
import './App.css';

class Main extends Component {

  getAmount(){
    return this.props.amount ? this.props.amount: ""
  }

  render() {
    let loadingClass = (this.props.loading)?'loading': ''

    return (
      <div className="container-fluid mt-5 col-m-4" style={{ maxWidth: '550px' }}>
        <div className="col-sm">
          <main role="main" className="col-lg-12 text-monospace text-center text-white">
            <div className="content mr-auto ml-auto">
              <div id="content" className="mt-3" >
                <div className="card mb-4 bg-dark">
                  <div className="card-body">
                    <div>
                        <img className={loadingClass}  src={dice} width="225" alt="logo" style={{transform: "scale(0.75)"}}/>
                    </div>
                    &nbsp;
                    <p><b>Contract Address: </b> {this.props.contractAddress}</p>
                    <p></p>
                    <div className="input-group mb-4">
                      { !(this.props.web3 )? <span>Loading...</span>: 
                      <input
                        type="number"
                        // Set 0.1 ONE as default. If its below the minValue, set min value. If it's above max value, take max value.
                        value={this.getAmount()}
                        step="0.01"
                        min="0"
                        className="form-control form-control-md"
                        placeholder="bet amount..."
                        onChange={(e) => this.props.onChange(e.target.value)}
                        required
                      />
  }
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <b>ONE</b>
                        </div>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-danger btn-lg"
                      disabled={this.loading}
                      onClick={(event) => {
                        event.preventDefault()
                        //start with digit, digit+dot* or single dot*, end with digit.
                        var reg = new RegExp("^[0-9]*.?[0-9]+$")    

                        if(reg.test(this.props.amount)){
                          const amount = (this.props.amount).toString()
                          this.props.makeBet(0, this.props.web3.utils.toWei(amount))
                        } else {
                          window.alert('Please type positive interger or float numbers')
                        }
                      }}>
                        Low
                    </button>
                    &nbsp;&nbsp;&nbsp;
                    <button
                      type="submit"
                      className="btn btn-success btn-lg"
                      disabled={this.loading}
                      onClick={(event) => {
                        event.preventDefault()
                        //start with digit, digit+dot* or single dot*, end with digit.

                        var reg = new RegExp("^[0-9]*.?[0-9]+$")
                        var minBet = Number(this.props.web3.utils.fromWei((this.props.minBet).toString())).toFixed(5)
                        if(reg.test(this.props.amount) && parseFloat(this.props.amount)>=minBet){
                          const amount = (this.props.amount).toString()
                          this.props.makeBet(1, this.props.web3.utils.toWei(amount))
                        } else {
                          window.alert('Please make sure that:\n*You typed positive interger or float number\n* Typed value is >= than MinBet (not all ETH decimals visible)\n* You are using Rinkeby network')
                        }
                      }}>
                        High
                    </button>
                  </div>
                  <div>
                    {!this.props.balance ? <div id="loader" className="spinner-border float-right" role="status"></div> :
                      <table style={{ width: "100%" }}>
                      <thead>
                        <tr>
                          <td>Balance</td>
                          <td>Min Bet</td>
                          <td>Max Bet</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        <td>{Number(this.props.web3.utils.fromWei((this.props.balance).toString())).toFixed(5)}</td>
                          <td>{Number(this.props.web3.utils.fromWei((this.props.minBet).toString())).toFixed(5)}</td>
                          <td>{Number(this.props.web3.utils.fromWei((this.props.maxBet).toString())).toFixed(5)}</td>
                        </tr>
                      </tbody>
                    </table>
                    }
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
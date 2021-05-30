import './Button.css'
import { Component } from "react";

export class Button extends Component {
    render(){
        const {text, actionButton,disabled} = this.props;
       return(
       <button
        className="button"
        onClick={actionButton}
        disabled={disabled}>
            {text}
         </button>
       )
    }

}
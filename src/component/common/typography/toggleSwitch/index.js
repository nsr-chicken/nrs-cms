import React, { Component } from "react";
import './toggleSwitch.scss';
export class NormalToggleSwitch extends Component {
    render() {
        let {
            className = "",
            onText = "",
            offText = "",
            name = "",
            onChange,
            checked = false,
            disabled = false
        } = this.props;

        return (
            <label className={`${disabled ? 'disabled' : ''} ${name} switch`}><input name={name} type="checkbox"
                onChange={({ target: { name, checked: Checked, type: radio } }) => {

                    onChange &&
                        onChange({ target: { name, checked: Checked, type: radio } });
                }}
                checked={checked}
                id={name.trim()}
            /><div className="slider round"><span className="on">{!!onText?onText:'ON'}</span><span className="off">{!!offText?offText:'OFF'}</span></div></label>
        );
    }
}

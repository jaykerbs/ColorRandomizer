import React from 'react';
import { withWebRTC } from 'react-liowebrtc';
import './index.css';

class ColorChange extends React.Component {
  constructor(props) {
    super(props);
    window.onkeydown = this.handleOnKeyDown;
  }

  handleOnKeyDown = (event) => {
    const key = event.keyCode;
    if (key === 32) {
      this.generateHue();
    }
  }

  handleOnClick = () => {
    this.generateHue();
  }

  generateHue = () => {
    const first = Math.floor(Math.random() * 256);
    const second = Math.floor(Math.random() * 256);
    const third = Math.floor(Math.random() * 256);
    const hex1 = first.toString(16);
    const hex2 = second.toString(16);
    const hex3 = third.toString(16);
    const hue = `rgb(${first}, ${second}, ${third})`;
    const hex = `#${hex1}${hex2}${hex3}`;
    const color = this.getTextColor({r: first, g: second, b: third });
    this.props.onChangeHue(hue, hex, color);
    this.handleSend(hue, hex, color);
  };

  handleSend = (hue, hex, color) => {
    this.props.webrtc.broadcast('Color', { hue, hex, color });
  }

  getLuminance = (color) => {
      var C = [color.r/255, color.g/255, color.b/255];
      var NC = C.map((c) => {
          if(c <= 0.03928) {
              return (c/12.92);
          }
          return (((c+0.055)/1.055)**2.4);
      });
      return (0.2126 * NC[0] + 0.7152 * NC[1] + 0.0722 * NC[2]);
  };

  getTextColor = (color) => {
      return this.getLuminance(color) > 0.179 ? '#212121' : '#f1f1f1';
  }

  render() {
    const { hue, hex, color } = this.props;
    return (
      <div className="content" id="body" style={{ backgroundColor: hue, color: color }} onClick={this.handleOnClick} onKeyDown={this.handleOnKeyDown}>

        <p id="rgb">{hue}</p>
        <p id="hex">{hex}</p>

      </div>
    );
  }
}

export default withWebRTC(ColorChange);

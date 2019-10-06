import React, { Component } from 'react';
import { LioWebRTC } from 'react-liowebrtc';
import TopNav from './TopNav';
import ColorChange from './ColorChange';
import Footer from './Footer';
import './index.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        debug: true,
        dataOnly: true
      },
      hue: 'rgb(255, 255, 255)',
      hex: '#ffffff',
      color: "#212121"
    }
  }

  join = (webrtc) => webrtc.joinRoom('ColorChangeRoom');

  handlePeerData = (webrtc, type, payload, peer) => {
    console.log('hello');
    switch(type) {
      case 'Color': {
        console.log('hello');
        const { hue, hex, color } = payload;
        this.setState({
          hue,
          hex,
          color
        });
        break;
      }
      default:
        return;
    };
  }

  onChangeHue = (hue, hex, color) => {
    this.setState({ hue, hex, color });
  }

  render() {
    const { options, hue, hex, color } = this.state;
    return (
      <div className="wrapper">
        <TopNav />
        <LioWebRTC
          options={options}
          onReady={this.join}
          onReceivedSignalData={this.handlePeerData}
        >
        <ColorChange
          hue={hue}
          hex={hex}
          color={color}
          onChangeHue={this.onChangeHue}
        />
        </LioWebRTC>
        <Footer />
      </div>
    );
  }
}

export default App;

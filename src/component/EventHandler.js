import React from 'react';
import {TVEventHandler, View} from 'react-native';
import {connect} from 'react-redux';
import {setFocusDirection} from '../Actions';
class EventHandler extends React.Component {
  constructor(props) {
    super(props);
    this.nodeHandle = null;
    this.evtHandler = null;
  }

  enableTVEventHandler() {
    console.log(' tv handler');
    this.evtHandler = new TVEventHandler();
    this.evtHandler.enable(this, this.handleTVRemoteEvent);
  }

  disableTVEventHandler() {
    if (this.evtHandler) {
      this.evtHandler.disable();
      delete this.evtHandler;
    }
  }

  handleTVRemoteEvent = (cmp, event) => {
    const {eventType, tag} = event;

    switch (eventType) {
      case 'select':
        this.props.dispatchDirection('select');
        break;
      case 'left':
        this.props.dispatchDirection('left');
        break;
      case 'right':
        this.props.dispatchDirection('right');
        break;
      case 'up':
        this.props.dispatchDirection('up');
        break;
      case 'down':
        this.props.dispatchDirection('down');
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    this.enableTVEventHandler();
  }

  componentWillUnmount() {
    this.disableTVEventHandler();
  }

  render() {
    return <></>;
  }
}
const dispatchDirection = (direc) => {
  return (dispatch) => {
    dispatch(setFocusDirection(direc));
  };
};

const mapDispatchToProps = {
  dispatchDirection,
};
export default connect(null, mapDispatchToProps)(EventHandler);

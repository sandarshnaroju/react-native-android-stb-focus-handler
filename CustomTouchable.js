import React from 'react';
import {TVEventHandler, TouchableHighlight, findNodeHandle} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class CustomTouchable extends React.Component {
  myRef = React.createRef();
  nodeHandle = null;
  evtHandler = null;

  enableTVEventHandler() {
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
    console.log(' detected');
    const {eventType, tag} = event;
    if (tag !== this.nodeHandle) {
      return;
    }
    if (eventType === 'focus') {
      this.myRef.current.props.onFocus();
    }

    if (eventType === 'blur') {
      this.myRef.current.props.onBlur();
    }

    if (eventType === 'select') {
      this.myRef.current.props.onPress();
    }
    // if (eventType === 'left') {
    //   this.myRef.current.props.onLeft();
    // }

    // if (eventType === 'right') {
    //   this.myRef.current.props.onRight();
    // }

    // if (eventType === 'up') {
    //   this.myRef.current.props.onUp();
    // }
    // if (eventType === 'down') {
    //   this.myRef.current.props.onDown();
    // }
  };

  componentDidMount() {
    this.nodeHandle = findNodeHandle(this.myRef.current);
    this.enableTVEventHandler();
  }

  componentWillUnmount() {
    this.disableTVEventHandler();
  }

  render() {
    const {children, ...props} = this.props;
    return (
      <TouchableOpacity {...props} ref={this.myRef}>
        {children}
      </TouchableOpacity>
    );
  }
}

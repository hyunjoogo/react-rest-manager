import React from 'react';
import classNames from "classnames";
import { createEventBusHelper } from "../utils/EventBusHelper";
import EventTypes from "../consts/EventTypes";

// EventBusHelper라는 새로운 인스턴스를 생성한다.
const EventBusHelper = createEventBusHelper();

export default class DialogManager extends React.Component {
  static push(dialog) {
    EventBusHelper.publish(EventTypes.Dialog.Push, dialog);
  }

  static pushAsync(dialog) {
    return new Promise((resolve, reject) => {
      EventBusHelper.publish(EventTypes.Dialog.Push, React.cloneElement(dialog, {onClose: resolve}));
    });
  }

  static pop() {
    EventBusHelper.publish(EventTypes.Dialog.Pop);
  }

  _isMounted = false;

  state = {
    stack: []
  };

  constructor(props, context) {
    super(props, context);

    // this.push에는 this가 this로 고정된 this.push이 할당
    this.push = this.push.bind(this);
    this.pop = this.pop.bind(this);

    EventBusHelper.addListener(EventTypes.Dialog.Push, this.push);
    EventBusHelper.addListener(EventTypes.Dialog.Pop, this.pop);
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUnMount() {
    this._isMounted = false;
    EventBusHelper.removeAllListeners();
  }

  id() {
    const alpha = 'qwertyuiopasdfghjklzxcvbnm'.split('');
    let id = '';
    while (alpha.length) {
      const i = Math.floor(Math.random() * alpha.length);
      id += alpha[i];
      alpha.splice(i, 1);
    }
    return id;
  }

  push(dialog) {
    if (!this._isMounted) {
      return;
    }
    const newStack = this.state.stack.slice();
    newStack.push({id: this.id(), show: true, dialog});
    this.setState(() => ({stack: newStack}));
  }

  pop() {
    if (!this._isMounted) {
      return;
    }

    let {stack} = this.state;
    let top = null;
    for (let i = stack.length - 1; 0 <= i; i--) {
      const item = stack[i];
      if (item.show === true) {
        top = item;
        break;
      }
    }
    if (!top) {
      return;
    }

    top.show = false;
    this.forceUpdate();

    setTimeout(() => {
      const newStack = stack.reduce((array, value, index) => {
        if (top.id !== value.id) {
          array.push(value);
        }
        return array;
      }, []);
      this.setState({stack: newStack});
    }, 300);
  }

  render() {
    return (
      <>
        {this.state.stack.map((value, index) => {
          const {id, show, dialog} = value;
          const child = React.cloneElement(dialog, {
            show,
            onClose: (result) => {
              this.pop();
              if (dialog.props.onClose) {
                setTimeout(() => {
                  dialog.props.onClose(result);
                }, 300);
              }
            }
          });
          const classes = classNames(
            'c-default-layout', 'c-legacy-theme',
            `dialog-${index}`,
          );
          return <div className={classes} key={id}>{child}</div>;
        })}
      </>
    );
  }
}

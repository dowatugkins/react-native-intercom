

import { NativeModules, NativeEventEmitter } from 'react-native';

const { IntercomWrapper, IntercomEventEmitter } = NativeModules;

/**
 * @class IntercomClient
 */

class IntercomClient {
  static Visibility = {
    VISIBLE: 'VISIBLE',
    GONE: 'GONE',
  };

  Notifications = {
    UNREAD_COUNT: IntercomEventEmitter.UNREAD_CHANGE_NOTIFICATION,
    WINDOW_DID_HIDE: IntercomEventEmitter.WINDOW_DID_HIDE_NOTIFICATION,
    WINDOW_DID_SHOW: IntercomEventEmitter.WINDOW_DID_SHOW_NOTIFICATION
  };

  _eventEmitter;
  _eventHandlers;

  constructor() {
    this._eventHandlers = {
      [IntercomEventEmitter.UNREAD_CHANGE_NOTIFICATION]: new Map(),
      [IntercomEventEmitter.WINDOW_DID_HIDE_NOTIFICATION]: new Map(),
      [IntercomEventEmitter.WINDOW_DID_SHOW_NOTIFICATION]: new Map()
    };

    // the first item in the chain needs to be a succesfull promise
    // so once new promises are added, they are automatically called
    this._promiseChain = Promise.resolve();

    // Unbound methods causing undefined errors
    this._pushIntercomChain = this._pushIntercomChain.bind(this);
    this.displayMessenger = this.displayMessenger.bind(this);
    this.registerIdentifiedUser = this.registerIdentifiedUser.bind(this);
    this.sendTokenToIntercom = this.sendTokenToIntercom.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.registerUnidentifiedUser = this.registerUnidentifiedUser.bind(this);
    this.reset = this.reset.bind(this);
    this.logEvent = this.logEvent.bind(this);
    this.handlePushMessage = this.handlePushMessage.bind(this);
    this.hideMessenger = this.hideMessenger.bind(this);
    this.displayMessageComposer = this.displayMessageComposer.bind(this);
    this.displayMessageComposerWithInitialMessage = this.displayMessageComposerWithInitialMessage.bind(this);
    this.displayConversationsList = this.displayConversationsList.bind(this);
    this.getUnreadConversationCount = this.getUnreadConversationCount.bind(this);
    this.displayHelpCenter = this.displayHelpCenter.bind(this);
    this.setLauncherVisibility = this.setLauncherVisibility.bind(this);
    this.setInAppMessageVisibility = this.setInAppMessageVisibility.bind(this);
    this.setupAPN = this.setupAPN.bind(this);
    this.setUserHash = this.setUserHash.bind(this);
    this.registerForPush = this.registerForPush.bind(this);
    this.setBottomPadding = this.setBottomPadding.bind(this);
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
  }

  registerIdentifiedUser(options) {
    return IntercomWrapper.registerIdentifiedUser(options);
  }

  sendTokenToIntercom(token) {
    return IntercomWrapper.sendTokenToIntercom(token);
  }

  updateUser(options) {
    return IntercomWrapper.updateUser(options);
  }

  registerUnidentifiedUser() {
    return IntercomWrapper.registerUnidentifiedUser();
  }

  logout() {
    return IntercomWrapper.logout();
  }

  logEvent(eventName, metaData) {
    return IntercomWrapper.logEvent(eventName, metaData);
  }

  handlePushMessage() {
    return IntercomWrapper.handlePushMessage();
  }

  displayMessenger() {
    return IntercomWrapper.displayMessenger();
  }

  hideMessenger() {
    return IntercomWrapper.hideMessenger();
  }

  displayMessageComposer() {
    return IntercomWrapper.displayMessageComposer();
  }

  displayMessageComposerWithInitialMessage(message) {
    return IntercomWrapper.displayMessageComposerWithInitialMessage(message);
  }

  displayConversationsList() {
    return IntercomWrapper.displayConversationsList();
  }

  getUnreadConversationCount() {
    return IntercomWrapper.getUnreadConversationCount();
  }

  displayHelpCenter() {
    return IntercomWrapper.displayHelpCenter();
  }

  setLauncherVisibility(visibility: String) {
    return IntercomWrapper.setLauncherVisibility(visibility);
  }

  setInAppMessageVisibility(visibility: String) {
    return IntercomWrapper.setInAppMessageVisibility(visibility);
  }

  setupAPN(deviceToken) {
    return IntercomWrapper.setupAPN(deviceToken);
  }

  registerForPush() {
    return IntercomWrapper.registerForPush();
  }

  setUserHash(userHash) {
    return IntercomWrapper.setUserHash(userHash);
  }

  setBottomPadding(padding) {
    return IntercomWrapper.setBottomPadding(padding);
  }

  addEventListener(type, handler) {
    if (!this._eventEmitter) {
      this._eventEmitter = new NativeEventEmitter(IntercomEventEmitter);
    }

    const listener = this._eventEmitter.addListener(type, rtn => handler(rtn));
    this._eventHandlers[type].set(handler, listener);
  }

  removeEventListener(type, handler) {
    if (!this._eventHandlers[type].has(handler)) {
      return;
    }
    this._eventHandlers[type].get(handler).remove();
    this._eventHandlers[type].delete(handler);
  }
}

module.exports = new IntercomClient();

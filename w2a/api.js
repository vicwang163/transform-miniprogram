/**
 *  1.如果值为null，表示不存在该接口
 *  2.如果有值，
 *    a. 其中有tips，表示给予的建议
 *    b. 有mapping，需要转换相应的接口名
 *    c. 如果有params，则需要转换相应的参数
 * 
 */
module.exports = {
  __transformCtx__: {
    wx: 'my'
  },
  wx: {
    request: {
      mapping: 'httpRequest',
      params: {
        header: 'headers'
      }
    },
    uploadFile: {
      params: {
        name: 'fileName'
      }
    },
    connectSocket: {
      params: {
        header: 'headers',
        protocols: '',
        method: ''
      }
    },
    closeSocket: {
      params: {
        code: '',
        reason: ''
      }
    },
    onSocketClose: null,
    chooseImage: {
      params: {
        sizeType: ''
      }
    },
    getImageInfo: null,
    saveImageToPhotosAlbum: {
      mapping: 'saveImage',
      params: {
        filePath: 'url'
      }
    },
    startRecord: null,
    stopRecord: null,
    getRecorderManager: null,
    getBackgroundAudioPlayerState: null,
    playBackgroundAudio: null,
    pauseBackgroundAudio: null,
    seekBackgroundAudio: null,
    stopBackgroundAudio: null,
    onBackgroundAudioPlay: null,
    onBackgroundAudioPause: null,
    onBackgroundAudioStop: null,
    getBackgroundAudioManager: null,
    createAudioContext: null,
    createInnerAudioContext: null,
    chooseVideo: null,
    saveVideoToPhotosAlbum: null,
    createVideoContext: null,
    createCameraContext: null,
    saveFile: null,
    getSavedFileList: null,
    getSavedFileInfo: null,
    removeSavedFile: null,
    openDocument: null,
    chooseLocation: null,
    onAccelerometerChange: null,
    startAccelerometer: null,
    stopAccelerometer: null,
    onCompassChange: null,
    startCompass: null,
    stopCompass: null,
    makePhoneCall: {
      params: {
        phoneNumber: 'number'
      }
    },
    scanCode: null,
    setClipboardData: {
      mapping: 'setClipboard',
      params: {
        data: 'text'
      }
    },
    getClipboardData: {
      mapping: 'getClipboard'
    },
    createBLEConnection: {
      mapping: 'connectBLEDevice'
    },
    closeBLEConnection: {
      mapping: 'disconnectBLEDevice'
    },
    startBeaconDiscovery: null,
    stopBeaconDiscovery: null,
    getBeacons: null,
    onBeaconUpdate: null,
    onBeaconServiceChange: null,
    setScreenBrightness: null,
    getScreenBrightness: null,
    setKeepScreenOn: null,
    onUserCaptureScreen: null,
    vibrateLong: {
      mapping: 'vibrate'
    },
    vibrateShort: {
      mapping: 'vibrate'
    },
    addPhoneContact: null,
    showToast: {
      params: {
        title: 'content',
        icon: '',
        image: '',
        mask: ''
      }
    },
    showLoading: {
      params: {
        title: 'content',
        mask: ''
      }
    },
    showModal: {
      tips: '请使用支付宝小程序的alert，confirm等接口'
    },
    showActionSheet: {
      itemList: 'items',
      itemColor: ''
    },
    setTopBarText: {
      tips: '请使用支付宝小程序的setNavigationBar'
    },
    setNavigationBarTitle: {
      tips: '请使用支付宝小程序的setNavigationBar'
    },
    setNavigationBarColor: {
      tips: '请使用支付宝小程序的setNavigationBar'
    },
    switchTab: null,
    getExtConfig: null,
    getExtConfigSync: null,
    login: {
      tips: '请查阅支付宝小程序的getAuthCode接口'
    },
    checkSession: {
      tips: '请查阅支付宝小程序的getAuthCode接口'
    },
    authorize: {
      tips: '请查阅支付宝小程序的getAuthCode接口'
    },
    getUserInfo: {
      tips: '请查阅支付宝小程序的getAuthUserInfo接口'
    },
    requestPayment: {
      tips: '请查阅支付宝小程序的tradePay接口'
    },
    showShareMenu: null,
    hideShareMenu: null,
    updateShareMenu: null,
    getShareInfo: null
  },
  app: {
  }
}
// / <reference types="@capacitor/local-notifications" />
// / <reference types="@capacitor/push-notifications" />
// / <reference types="@capacitor/splash-screen" />

import {CapacitorConfig} from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: "com.myBaseApp",
    appName: "myBaseApp",
    webDir: "www",
    cordova: {},
    plugins: {
        SplashScreen: {
            launchShowDuration: 3000,
            launchAutoHide: true,
            backgroundColor: "#ffffffff",
            androidSplashResourceName: "splash",
            androidScaleType: "CENTER_CROP",
            androidSpinnerStyle: "large",
            iosSpinnerStyle: "small",
            spinnerColor: "#999999",
            showSpinner: true,
            splashFullScreen: true,
            splashImmersive: true
        },
        LocalNotifications: {
            smallIcon: 'ic_stat_icon_config_sample',
            iconColor: '#CE0B7C'
        },
        PushNotifications: {
            presentationOptions: ['alert', 'sound']
        }
    }
};

export default config;


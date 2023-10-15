package com.commentafe;

import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;
import java.util.Arrays; 
import java.util.List;
import com.rnfs.RNFSPackage;
import com.facebook.react.shell.MainReactPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.horcrux.svg.SvgPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
import com.zoontek.rnpermissions.RNPermissionsPackage;
import com.dooboolab.audiorecorderplayer.RNAudioRecorderPlayerPackage;
import com.nozbe.watermelondb.jsi.WatermelonDBJSIPackage;
import com.facebook.react.bridge.JSIModulePackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
            new MainReactPackage(), 
            new RNFSPackage(),
            new RNFetchBlobPackage(),
            new SvgPackage(),
            new SafeAreaContextPackage(),
            new com.swmansion.rnscreens.RNScreensPackage(),
            new RNGestureHandlerPackage(),
            new RNPermissionsPackage(),
            new RNAudioRecorderPlayerPackage()
          );  // <-- Close the list and the return statement
        }

        @Override
        protected JSIModulePackage getJSIModulePackage() {
          return new WatermelonDBJSIPackage(); // ⬅️ This!
        }
        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

        @Override
        protected boolean isNewArchEnabled() {
          return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
        }

        @Override
        protected Boolean isHermesEnabled() {
          return BuildConfig.IS_HERMES_ENABLED;
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    // If you're using ReactNativeFlipper, make sure to import it at the top
    // ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
}
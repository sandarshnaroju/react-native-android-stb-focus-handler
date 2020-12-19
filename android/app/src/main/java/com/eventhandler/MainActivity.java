package com.eventhandler;

import android.view.KeyEvent;

import com.facebook.react.ReactActivity;
import com.github.kevinejohn.keyevent.KeyEventModule;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    @Override  // <--- Add this method if you want to react to keyUp
    public boolean onKeyUp(int keyCode, KeyEvent event) {


        System.out.println("pressed key is");
        KeyEventModule.getInstance().onKeyUpEvent(keyCode, event);

        if (keyCode == KeyEvent.KEYCODE_VOLUME_MUTE || keyCode == KeyEvent.KEYCODE_VOLUME_DOWN || keyCode == KeyEvent.KEYCODE_VOLUME_UP || keyCode == KeyEvent.KEYCODE_BACK || keyCode == KeyEvent.KEYCODE_GUIDE || keyCode == KeyEvent.KEYCODE_DPAD_CENTER || keyCode == KeyEvent.KEYCODE_DPAD_LEFT || keyCode == KeyEvent.KEYCODE_DPAD_RIGHT || keyCode == KeyEvent.KEYCODE_DPAD_DOWN || keyCode == KeyEvent.KEYCODE_DPAD_UP) {
            return super.onKeyUp(keyCode, event);
        } else {
            super.onKeyUp(keyCode, event);
            return true;
        }
        // There are 2 ways this can be done:
        //  1.  Override the default keyboard event behavior
        //    super.onKeyUp(keyCode, event);
        //    return true;

        //  2.  Keep default keyboard event behavior
        //    return super.onKeyUp(keyCode, event);

        // Using method #1

    }


    @Override
    protected String getMainComponentName() {
        return "eventhandler";
    }
}

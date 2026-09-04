/*
 * Shadow iPad Controls
 * Eaglercraft 1.8.x
 *
 * Connects the iPad soft mouse-lock system to the game's
 * mouse/camera movement callback.
 */

(function() {
    "use strict";

    window.ShadowIPadControls = {

        sensitivity: 1.0,
        invertY: false,

        initialize: function() {

            window.ShadowEaglerMouseMove = function(dx, dy) {

                dx *= window.ShadowIPadControls.sensitivity;
                dy *= window.ShadowIPadControls.sensitivity;

                if (window.ShadowIPadControls.invertY) {
                    dy = -dy;
                }

                /*
                 * Send the movement to the Eaglercraft integration.
                 */
                if (typeof window.ShadowEaglerCameraMove === "function") {
                    window.ShadowEaglerCameraMove(dx, dy);
                }
            };
        },

        setSensitivity: function(value) {

            value = Number(value);

            if (!isFinite(value)) {
                return;
            }

            this.sensitivity =
                Math.max(0.05, Math.min(5.0, value));
        },

        setInvertY: function(value) {
            this.invertY = !!value;
        },

        enable: function(element) {

            if (!window.ShadowIPadMouseLock) {
                console.error(
                    "ShadowIPadMouseLock.js must be loaded first."
                );
                return false;
            }

            this.initialize();

            return window.ShadowIPadMouseLock.start(element);
        },

        disable: function() {

            if (window.ShadowIPadMouseLock) {
                window.ShadowIPadMouseLock.stop();
            }
        }
    };

})();

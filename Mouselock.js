/*
 * Shadow iPad Mouse Lock
 * Eaglercraft 1.8.x browser integration
 *
 * Provides a soft/relative mouse-lock fallback for iPadOS Safari.
 * Does NOT bypass Safari/iPadOS security restrictions.
 */

(function() {
    "use strict";

    window.ShadowIPadMouseLock = {

        enabled: false,
        sensitivity: 1.0,

        start: function(element) {
            if (!element) {
                element = document.body;
            }

            this.element = element;
            this.enabled = true;

            this._lastX = null;
            this._lastY = null;

            this._moveHandler = this._handleMove.bind(this);

            document.addEventListener(
                "mousemove",
                this._moveHandler,
                { passive: true }
            );

            return true;
        },

        stop: function() {
            this.enabled = false;

            if (this._moveHandler) {
                document.removeEventListener(
                    "mousemove",
                    this._moveHandler
                );
            }

            this._lastX = null;
            this._lastY = null;
        },

        setSensitivity: function(value) {
            value = Number(value);

            if (!isFinite(value)) {
                return;
            }

            this.sensitivity = Math.max(0.05, Math.min(5.0, value));
        },

        _handleMove: function(event) {
            if (!this.enabled) {
                return;
            }

            /*
             * Use movementX/Y when the browser provides them.
             */
            var dx = Number(event.movementX || 0);
            var dy = Number(event.movementY || 0);

            /*
             * Safari/iPadOS may not provide movementX/Y.
             * Fall back to calculating movement from screen position.
             */
            if (dx === 0 && dy === 0) {

                var x = event.clientX;
                var y = event.clientY;

                if (this._lastX !== null && this._lastY !== null) {
                    dx = x - this._lastX;
                    dy = y - this._lastY;
                }

                this._lastX = x;
                this._lastY = y;
            }

            dx *= this.sensitivity;
            dy *= this.sensitivity;

            /*
             * Send movement to Eaglercraft's mouse system.
             *
             * The client integration should replace this callback
             * with its normal MouseHelper/mouse event handler.
             */
            if (typeof window.ShadowEaglerMouseMove === "function") {
                window.ShadowEaglerMouseMove(dx, dy);
            }
        }
    };

})();

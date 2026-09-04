(function () {
    "use strict";

    window.ShadowEaglerCameraMove = function (dx, dy) {
        /*
         * Sends camera movement into the Eaglercraft mouse system.
         *
         * EaglerMobile uses JavaScript-side mouse/pointer handling
         * because iOS Safari doesn't provide normal desktop Pointer Lock.
         */

        if (typeof window.mouseEvent === "function") {
            window.mouseEvent("mousemove", dx, dy);
            return;
        }

        if (typeof window.ShadowEaglerMouseEvent === "function") {
            window.ShadowEaglerMouseEvent(dx, dy);
            return;
        }

        /*
         * Fallback:
         * Store the movement so the Eaglercraft mouse handler
         * can consume it when connected.
         */
        window.ShadowEaglerPendingMouseX =
            (window.ShadowEaglerPendingMouseX || 0) + dx;

        window.ShadowEaglerPendingMouseY =
            (window.ShadowEaglerPendingMouseY || 0) + dy;
    };

    window.ShadowEaglerMouseMove = function (dx, dy) {
        window.ShadowEaglerCameraMove(dx, dy);
    };

    window.ShadowEaglerSetSkin = function (file) {
        window.ShadowEaglerSkinFile = file;

        window.dispatchEvent(
            new CustomEvent("ShadowEaglerSkinSelected", {
                detail: file
            })
        );
    };

    window.ShadowEaglerSetResourcePack = function (file) {
        window.ShadowEaglerResourcePackFile = file;

        window.dispatchEvent(
            new CustomEvent("ShadowEaglerResourcePackSelected", {
                detail: file
            })
        );
    };

    window.ShadowEaglerGetMouseMovement = function () {
        var x = window.ShadowEaglerPendingMouseX || 0;
        var y = window.ShadowEaglerPendingMouseY || 0;

        window.ShadowEaglerPendingMouseX = 0;
        window.ShadowEaglerPendingMouseY = 0;

        return {
            x: x,
            y: y
        };
    };

})();

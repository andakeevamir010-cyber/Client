(function () {
    "use strict";

    var sensitivity = 1.0;
    var invertY = false;

    window.ShadowIPadControls = {
        setSensitivity: function (value) {
            sensitivity = Math.max(0.1, Math.min(5.0, Number(value) || 1.0));
        },

        getSensitivity: function () {
            return sensitivity;
        },

        setInvertY: function (value) {
            invertY = !!value;
        },

        mouseMove: function (dx, dy) {
            dx *= sensitivity;
            dy *= sensitivity;

            if (invertY) {
                dy = -dy;
            }

            if (typeof window.ShadowEaglerCameraMove === "function") {
                window.ShadowEaglerCameraMove(dx, dy);
            }
        },

        enableMouseLock: function () {
            if (window.ShadowIPadMouseLock) {
                window.ShadowIPadMouseLock.enable();
            }
        },

        disableMouseLock: function () {
            if (window.ShadowIPadMouseLock) {
                window.ShadowIPadMouseLock.disable();
            }
        }
    };

    window.ShadowEaglerMouseMove = function (dx, dy) {
        window.ShadowIPadControls.mouseMove(dx, dy);
    };

})();

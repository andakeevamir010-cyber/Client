(function () {
    "use strict";

    var lockedElement = null;

    if (!window.ShadowIPadPointerLock) {
        window.ShadowIPadPointerLock = {};
    }

    Object.defineProperty(document, "pointerLockElement", {
        configurable: true,
        get: function () {
            return lockedElement;
        }
    });

    Element.prototype.requestPointerLock = function () {
        lockedElement = this;

        window.ShadowIPadPointerLock.active = true;

        if (window.ShadowIPadMouseLock) {
            window.ShadowIPadMouseLock.enable();
        }

        document.dispatchEvent(
            new Event("pointerlockchange")
        );
    };

    document.exitPointerLock = function () {
        lockedElement = null;

        window.ShadowIPadPointerLock.active = false;

        if (window.ShadowIPadMouseLock) {
            window.ShadowIPadMouseLock.disable();
        }

        document.dispatchEvent(
            new Event("pointerlockchange")
        );
    };

    window.ShadowIPadPointerLock.isLocked = function () {
        return lockedElement !== null;
    };

})();

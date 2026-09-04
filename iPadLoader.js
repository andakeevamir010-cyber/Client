(function () {
    "use strict";

    var files = [
        "Mouselock.js",
        "iPadBridge.js",
        "iPadPointerLock.js",
        "iPadControl.js",
        "iPadMenu.js"
    ];

    function loadFile(index) {
        if (index >= files.length) {
            start();
            return;
        }

        var script = document.createElement("script");

        script.src = files[index];
        script.onload = function () {
            loadFile(index + 1);
        };

        script.onerror = function () {
            console.error(
                "[Shadow iPad] Failed to load: " + files[index]
            );
        };

        document.head.appendChild(script);
    }

    function start() {
        console.log("[Shadow iPad] Controls loaded");

        if (window.ShadowIPadControls) {
            window.ShadowIPadControls.enableMouseLock();
        }

        document.addEventListener("keydown", function (event) {
            if (event.key === "F8") {
                if (window.ShadowIPadOpenMenu) {
                    window.ShadowIPadOpenMenu();
                }
            }

            if (event.key === "Escape") {
                if (
                    window.ShadowIPadPointerLock &&
                    window.ShadowIPadPointerLock.isLocked()
                ) {
                    document.exitPointerLock();
                }
            }
        });
    }

    loadFile(0);

})();

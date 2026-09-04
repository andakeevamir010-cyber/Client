/*
 * Shadow iPad Loader
 * Eaglercraft 1.8.x
 */

(function () {
    "use strict";

    window.ShadowIPadLoader = {

        loaded: false,

        load: function () {

            if (this.loaded) {
                return;
            }

            this.loaded = true;

            console.log(
                "Shadow iPad integration initialized."
            );

            /*
             * Initialize the bridge.
             */
            if (window.ShadowIPadBridge) {
                window.ShadowIPadBridge.initialize();
            }

            /*
             * Make the iPad menu available.
             */
            window.ShadowIPadOpenMenu = function () {

                if (window.ShadowIPadMenu) {
                    window.ShadowIPadMenu.open();
                }

            };

            /*
             * Keyboard shortcut:
             *
             * Press F8 to open the Shadow iPad menu.
             */
            document.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "F8") {

                        event.preventDefault();

                        window.ShadowIPadOpenMenu();

                    }

                }
            );

            console.log(
                "Press F8 to open Shadow iPad Controls."
            );
        }
    };

    window.ShadowIPadLoader.load();

})();

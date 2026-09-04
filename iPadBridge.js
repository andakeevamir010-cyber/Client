/*
 * Shadow iPad Bridge
 * Eaglercraft 1.8.x
 */

(function () {
    "use strict";

    window.ShadowIPadBridge = {

        initialized: false,

        initialize: function () {

            if (this.initialized) {
                return;
            }

            this.initialized = true;

            /*
             * Mouse / camera bridge.
             *
             * The generated iPad mouse system calls this
             * function whenever the trackpad moves.
             */
            window.ShadowEaglerCameraMove = function (dx, dy) {

                if (
                    window.ShadowIPadBridge
                        .onCameraMove
                ) {
                    window.ShadowIPadBridge
                        .onCameraMove(dx, dy);
                }
            };

            /*
             * Skin bridge.
             */
            window.ShadowEaglerSetSkin = function (
                data,
                filename
            ) {

                if (
                    window.ShadowIPadBridge
                        .onSkinSelected
                ) {
                    window.ShadowIPadBridge
                        .onSkinSelected(
                            data,
                            filename
                        );
                }
            };

            /*
             * Resource-pack bridge.
             */
            window.ShadowEaglerSetResourcePack =
                function (
                    data,
                    filename
                ) {

                    if (
                        window.ShadowIPadBridge
                            .onResourcePackSelected
                    ) {
                        window.ShadowIPadBridge
                            .onResourcePackSelected(
                                data,
                                filename
                            );
                    }
                };
        },

        /*
         * These functions are intentionally empty.
         *
         * The actual Eaglercraft 1.8 implementation
         * should replace them.
         */

        onCameraMove: function (dx, dy) {
            console.log(
                "Eagler camera movement:",
                dx,
                dy
            );
        },

        onSkinSelected: function (
            data,
            filename
        ) {
            console.log(
                "Skin selected:",
                filename
            );
        },

        onResourcePackSelected: function (
            data,
            filename
        ) {
            console.log(
                "Resource pack selected:",
                filename
            );
        }
    };

    window.ShadowIPadBridge.initialize();

})();

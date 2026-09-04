/*
 * Shadow iPad Menu
 * Eaglercraft 1.8.x
 */

(function () {
    "use strict";

    window.ShadowIPadMenu = {

        open: function () {

            if (document.getElementById("shadow-ipad-menu")) {
                return;
            }

            var menu = document.createElement("div");
            menu.id = "shadow-ipad-menu";

            menu.style.position = "fixed";
            menu.style.left = "50%";
            menu.style.top = "50%";
            menu.style.transform = "translate(-50%, -50%)";
            menu.style.background = "rgba(0,0,0,0.90)";
            menu.style.padding = "20px";
            menu.style.borderRadius = "10px";
            menu.style.zIndex = "999999";
            menu.style.fontFamily = "Arial";
            menu.style.color = "white";
            menu.style.textAlign = "center";
            menu.style.minWidth = "260px";

            menu.innerHTML =

                "<h2>Shadow iPad Controls</h2>" +

                "<button id='shadow-lock'>Mouse Lock</button>" +

                "<br><br>" +

                "<label>Mouse Sensitivity</label>" +
                "<br>" +
                "<input id='shadow-sensitivity' " +
                "type='range' min='0.1' max='3' step='0.1' value='1'>" +

                "<br><br>" +

                "<button id='shadow-skin'>" +
                "Choose Skin" +
                "</button>" +

                "<br><br>" +

                "<button id='shadow-pack'>" +
                "Choose Resource Pack" +
                "</button>" +

                "<br><br>" +

                "<button id='shadow-close'>Close</button>";

            document.body.appendChild(menu);

            document
                .getElementById("shadow-lock")
                .addEventListener("click", function () {

                    var canvas =
                        document.querySelector("canvas");

                    if (!canvas) {
                        canvas = document.body;
                    }

                    if (window.ShadowIPadControls) {
                        window.ShadowIPadControls.enable(canvas);
                    }
                });

            document
                .getElementById("shadow-sensitivity")
                .addEventListener("input", function () {

                    var value = Number(this.value);

                    if (window.ShadowIPadControls) {
                        window.ShadowIPadControls
                            .setSensitivity(value);
                    }

                    if (window.ShadowIPadMouseLock) {
                        window.ShadowIPadMouseLock
                            .setSensitivity(value);
                    }
                });

            document
                .getElementById("shadow-skin")
                .addEventListener("click", function () {

                    if (!window.ShadowIPadFilePicker) {
                        alert("File picker is not loaded.");
                        return;
                    }

                    window.ShadowIPadFilePicker.pickSkin(
                        function (skin) {

                            /*
                             * Connect this callback to
                             * Eaglercraft's skin manager.
                             */
                            if (
                                typeof window
                                    .ShadowEaglerSetSkin ===
                                "function"
                            ) {
                                window.ShadowEaglerSetSkin(
                                    skin.data,
                                    skin.name
                                );
                            } else {
                                alert(
                                    "Skin selected: " +
                                    skin.name
                                );
                            }
                        }
                    );
                });

            document
                .getElementById("shadow-pack")
                .addEventListener("click", function () {

                    if (!window.ShadowIPadFilePicker) {
                        alert("File picker is not loaded.");
                        return;
                    }

                    window.ShadowIPadFilePicker
                        .pickResourcePack(
                            function (pack) {

                                /*
                                 * Connect this callback to
                                 * Eaglercraft's resource-pack
                                 * manager.
                                 */
                                if (
                                    typeof window
                                        .ShadowEaglerSetResourcePack ===
                                    "function"
                                ) {
                                    window
                                        .ShadowEaglerSetResourcePack(
                                            pack.data,
                                            pack.name
                                        );
                                } else {
                                    alert(
                                        "Resource pack selected: " +
                                        pack.name
                                    );
                                }
                            }
                        );
                });

            document
                .getElementById("shadow-close")
                .addEventListener("click", function () {

                    menu.remove();

                });
        }
    };

})();

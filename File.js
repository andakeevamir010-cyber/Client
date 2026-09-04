/*
 * Shadow iPad File Picker
 * Eaglercraft 1.8.x
 *
 * Lets Safari/iPadOS open the native Files app to select:
 * - Minecraft skin PNG files
 * - Resource-pack ZIP files
 */

(function() {
    "use strict";

    window.ShadowIPadFilePicker = {

        pickSkin: function(callback) {
            this._pick(
                ".png,image/png",
                function(file) {
                    if (!file) return;

                    if (file.type !== "image/png" &&
                        !file.name.toLowerCase().endsWith(".png")) {
                        alert("Please select a PNG skin file.");
                        return;
                    }

                    var reader = new FileReader();

                    reader.onload = function() {
                        if (typeof callback === "function") {
                            callback({
                                name: file.name,
                                type: file.type,
                                data: reader.result
                            });
                        }
                    };

                    reader.readAsDataURL(file);
                }
            );
        },

        pickResourcePack: function(callback) {
            this._pick(
                ".zip,application/zip,application/x-zip-compressed",
                function(file) {
                    if (!file) return;

                    if (!file.name.toLowerCase().endsWith(".zip")) {
                        alert("Please select a ZIP resource pack.");
                        return;
                    }

                    var reader = new FileReader();

                    reader.onload = function() {
                        if (typeof callback === "function") {
                            callback({
                                name: file.name,
                                type: file.type,
                                data: reader.result
                            });
                        }
                    };

                    reader.readAsArrayBuffer(file);
                }
            );
        },

        _pick: function(accept, callback) {

            var input = document.createElement("input");

            input.type = "file";
            input.accept = accept;
            input.style.display = "none";

            input.addEventListener("change", function() {

                if (!input.files || input.files.length === 0) {
                    return;
                }

                callback(input.files[0]);

                input.remove();

            });

            document.body.appendChild(input);

            /*
             * This must happen from a user action
             * such as tapping a button.
             */
            input.click();
        }
    };

})();

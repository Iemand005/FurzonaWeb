(function () {

	if (typeof window !== "undefined" && window.localStorage) {
        return; 
    }
	
    var shell = new ActiveXObject("WScript.Shell");
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    
    var opslagPad = shell.SpecialFolders("AppData") + "\\hta_localstorage_data.json";

    function leesData() {
        if (!fso.FileExists(opslagPad)) {
            return {};
        }
        try {
            var bestand = fso.OpenTextFile(opslagPad, 1); // 1 = Lezen
            var inhoud = bestand.ReadAll();
            bestand.Close();
            return inhoud ? JSON.parse(inhoud) : {};
        } catch (e) {
            return {}; // Retourneer leeg object bij fouten
        }
    }

    function schrijfData(data) {
        try {
            var bestand = fso.OpenTextFile(opslagPad, 2, true); // 2 = Schrijven, true = Aanmaken
            bestand.Write(JSON.stringify(data));
            bestand.Close();
        } catch (e) {
        }
    }

    var htaLocalStorage = {
        setItem: function (key, value) {
            var data = leesData();
            data[String(key)] = String(value); // Altijd omzetten naar string conform W3C specificatie
            schrijfData(data);
        },

        getItem: function (key) {
            var data = leesData();
            var result = data[String(key)];
            return result === undefined ? null : result; // Return null als sleutel niet bestaat
        },

        removeItem: function (key) {
            var data = leesData();
            if (data.hasOwnProperty(String(key))) {
                delete data[String(key)];
                schrijfData(data);
            }
        },

        clear: function () {
            schrijfData({});
        },

        get length() {
            var data = leesData();
            var teller = 0;
            for (var k in data) {
                if (data.hasOwnProperty(k)) teller++;
            }
            return teller;
        }
    };

    try {
        Object.defineProperty(window, "localStorage", {
            value: htaLocalStorage,
            writable: true,
            configurable: true,
            enumerable: true
        });
    } catch (e) {
        window.localStorage = htaLocalStorage;
    }
})();

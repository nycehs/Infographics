var BrowserDetect = {
    init: function () {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
        for (var i = 0; i < data.length; i++) {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) !== -1) {
                return data[i].identity;
            }
        }
    },
    searchVersion: function (dataString) {
        var index = dataString.indexOf(this.versionSearchString);
        if (index === -1) {
            return;
        }

        var rv = dataString.indexOf("rv:");
        if (this.versionSearchString === "Trident" && rv !== -1) {
            return parseFloat(dataString.substring(rv + 3));
        } else {
            return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
        }
    },

    dataBrowser: [
        { string: navigator.userAgent, subString: "Edge", identity: "MS Edge" },
        { string: navigator.userAgent, subString: "MSIE", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Trident", identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Opera", identity: "Opera" },
        { string: navigator.userAgent, subString: "OPR", identity: "Opera" },

        { string: navigator.userAgent, subString: "Chrome", identity: "Chrome" },
        { string: navigator.userAgent, subString: "Safari", identity: "Safari" }
    ]
};

BrowserDetect.init();
if (BrowserDetect.browser === "Explorer" || BrowserDetect.browser === "Edge")
{
    $(window).scroll(function (event) {
        //alert("hi");
        $.doTimeout('scroll', 50, function () {

            if ($("#introText1").hasClass("show")) {
                $("#g-sources").show();

            }
            else {
                $("#g-sources").hide();
            }

            if ($("#introText2").hasClass("show")) {
                $("#g-anatomy").show();
                $("#g-cluster").show();
                $("#g-cluster2").show();
                $("#g-cluster3").show();
                $("#g-cluster4").show();

            }
            else {
                $("#g-anatomy").hide();
                $("#g-cluster").hide();
                $("#g-cluster2").hide();
                $("#g-cluster3").hide();
                $("#g-cluster4").hide();
            }

            if ($("#introText3").hasClass("show")) {
                $("#g-anatomy2").show();
                $("#anatomyLabel").show();

            }
            else {

                $("#g-anatomy2").hide();
                $("#anatomyLabel").hide();
            }
        });
        
    });
}
//console.log("You are using <b>" + BrowserDetect.browser + "</b> with version <b>" + BrowserDetect.version + "</b>");
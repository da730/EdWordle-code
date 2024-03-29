/*
Product Name: dhtmlxColorPicker 
Version: 5.0 
Edition: Standard 
License: content of this file is covered by GPL. Usage outside GPL terms is prohibited. To obtain Commercial
or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/
if (typeof (window.dhx) == "undefined")
{
    window.dhx = window.dhx4 = 
    {
        version : "5.0", skin : null,
        skinDetect : function (a)
        {
            return {
                10 : "dhx_skyblue", 20 : "dhx_web", 30 : "dhx_terrace", 40 : "material"
            }
            [this.readFromCss(a + "_skin_detect")] || null
        },
        readFromCss : function (c, d, e)
        {
            var b = document.createElement("DIV");
            b.className = c;
            if (document.body.firstChild != null) {
                document.body.insertBefore(b, document.body.firstChild)
            }
            else {
                document.body.appendChild(b)
            }
            if (typeof (e) == "string") {
                b.innerHTML = e
            }
            var a = b[d || "offsetWidth"];
            b.parentNode.removeChild(b);
            b = null;
            return a;
        },
        lastId : 1,
        newId : function ()
        {
            return this.lastId++;
        },
        zim : 
        {
            data : {}, step : 5,
            first : function ()
            {
                return 100;
            },
            last : function ()
            {
                var c = this.first();
                for (var b in this.data) {
                    c = Math.max(c, this.data[b])
                }
                return c;
            },
            reserve : function (a)
            {
                this.data[a] = this.last() + this.step;
                return this.data[a];
            },
            clear : function (a)
            {
                if (this.data[a] != null) {
                    this.data[a] = null;
                    delete this.data[a]
                }
            }
        },
        s2b : function (a)
        {
            if (typeof (a) == "string") {
                a = a.toLowerCase()
            }
            return (a == true || a == 1 || a == "true" || a == "1" || a == "yes" || a == "y" || a == "on");
        },
        s2j : function (s)
        {
            var obj = null;
            dhx4.temp = null;
            try {
                eval("dhx4.temp=" + s)
            }
            catch (e) {
                dhx4.temp = null
            }
            obj = dhx4.temp;
            dhx4.temp = null;
            return obj;
        },
        absLeft : function (a)
        {
            if (typeof (a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).left;
        },
        absTop : function (a)
        {
            if (typeof (a) == "string") {
                a = document.getElementById(a)
            }
            return this.getOffset(a).top;
        },
        _aOfs : function (a)
        {
            var c = 0, b = 0;
            while (a) {
                c = c + parseInt(a.offsetTop);
                b = b + parseInt(a.offsetLeft);
                a = a.offsetParent
            }
            return {
                top : c, left : b
            }
        },
        _aOfsRect : function (d)
        {
            var g = d.getBoundingClientRect();
            var h = document.body;
            var b = document.documentElement;
            var a = window.pageYOffset || b.scrollTop || h.scrollTop;
            var e = window.pageXOffset || b.scrollLeft || h.scrollLeft;
            var f = b.clientTop || h.clientTop || 0;
            var i = b.clientLeft || h.clientLeft || 0;
            var j = g.top + a - f;
            var c = g.left + e - i;
            return {
                top : Math.round(j), left : Math.round(c)
            }
        },
        getOffset : function (a)
        {
            if (a.getBoundingClientRect) {
                return this._aOfsRect(a)
            }
            else {
                return this._aOfs(a);
            }
        },
        _isObj : function (a)
        {
            return (a != null && typeof (a) == "object" && typeof (a.length) == "undefined");
        },
        _copyObj : function (d)
        {
            if (this._isObj(d))
            {
                var c = {};
                for (var b in d) {
                    if (typeof (d[b]) == "object" && d[b] != null) {
                        c[b] = this._copyObj(d[b])
                    }
                    else {
                        c[b] = d[b];
                    }
                }
            }
            else
            {
                var c = [];
                for (var b = 0; b < d.length; b++) {
                    if (typeof (d[b]) == "object" && d[b] != null) {
                        c[b] = this._copyObj(d[b])
                    }
                    else {
                        c[b] = d[b];
                    }
                }
            }
            return c;
        },
        screenDim : function ()
        {
            var a = (navigator.userAgent.indexOf("MSIE") >= 0);
            var b = {};
            b.left = document.body.scrollLeft;
            b.right = b.left + (window.innerWidth || document.body.clientWidth);
            b.top = Math.max((a ? document.documentElement : document.getElementsByTagName("html")[0]).scrollTop, 
            document.body.scrollTop);
            b.bottom = b.top + (a ? Math.max(document.documentElement.clientHeight || 0, document.documentElement.offsetHeight || 0) : window.innerHeight);
            return b;
        },
        selectTextRange : function (d, g, b)
        {
            d = (typeof (d) == "string" ? document.getElementById(d) : d);
            var a = d.value.length;
            g = Math.max(Math.min(g, a), 0);
            b = Math.min(b, a);
            if (d.setSelectionRange) {
                try {
                    d.setSelectionRange(g, b)
                }
                catch (f) {}
            }
            else
            {
                if (d.createTextRange)
                {
                    var c = d.createTextRange();
                    c.moveStart("character", g);
                    c.moveEnd("character", b - a);
                    try {
                        c.select()
                    }
                    catch (f) {}
                }
            }
        },
        transData : null,
        transDetect : function ()
        {
            if (this.transData == null)
            {
                this.transData = {
                    transProp : false, transEv : null
                };
                var c = 
                {
                    MozTransition : "transitionend", WebkitTransition : "webkitTransitionEnd", OTransition : "oTransitionEnd", 
                    msTransition : "transitionend", transition : "transitionend"
                };
                for (var b in c)
                {
                    if (this.transData.transProp == false && document.documentElement.style[b] != null) {
                        this.transData.transProp = b;
                        this.transData.transEv = c[b];
                    }
                }
                c = null
            }
            return this.transData;
        },
        _xmlNodeValue : function (a)
        {
            var c = "";
            for (var b = 0; b < a.childNodes.length; b++)
            {
                c += (a.childNodes[b].nodeValue != null ? a.childNodes[b].nodeValue.toString().replace(/^[\n\r\s]{0,}/, 
                "").replace(/[\n\r\s]{0,}$/, "") : "")
            }
            return c;
        }
    };
    window.dhx4.isIE = (navigator.userAgent.indexOf("MSIE") >= 0 || navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE6 = (window.XMLHttpRequest == null && navigator.userAgent.indexOf("MSIE") >= 0);
    window.dhx4.isIE7 = (navigator.userAgent.indexOf("MSIE 7.0") >= 0 && navigator.userAgent.indexOf("Trident") < 0);
    window.dhx4.isIE8 = (navigator.userAgent.indexOf("MSIE 8.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE9 = (navigator.userAgent.indexOf("MSIE 9.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0);
    window.dhx4.isIE10 = (navigator.userAgent.indexOf("MSIE 10.0") >= 0 && navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled != true);
    window.dhx4.isIE11 = (navigator.userAgent.indexOf("Trident") >= 0 && window.navigator.pointerEnabled == true);
    window.dhx4.isEdge = (navigator.userAgent.indexOf("Edge") >= 0);
    window.dhx4.isOpera = (navigator.userAgent.indexOf("Opera") >= 0);
    window.dhx4.isChrome = (navigator.userAgent.indexOf("Chrome") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isKHTML = (navigator.userAgent.indexOf("Safari") >= 0 || navigator.userAgent.indexOf("Konqueror") >= 0) && !window.dhx4.isEdge;
    window.dhx4.isFF = (navigator.userAgent.indexOf("Firefox") >= 0);
    window.dhx4.isIPad = (navigator.userAgent.search(/iPad/gi) >= 0);
    window.dhx4.dnd = 
    {
        evs : {}, p_en : ((window.dhx4.isIE || window.dhx4.isEdge) && (window.navigator.pointerEnabled || window.navigator.msPointerEnabled)), 
        _mTouch : function (a)
        {
            return (window.dhx4.isIE10 && a.pointerType == a.MSPOINTER_TYPE_MOUSE || window.dhx4.isIE11 && a.pointerType == "mouse" || window.dhx4.isEdge && a.pointerType == "mouse");
        },
        _touchOn : function (a)
        {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "";
            a = null;
        },
        _touchOff : function (a)
        {
            if (a == null) {
                a = document.body
            }
            a.style.touchAction = a.style.msTouchAction = "none";
            a = null;
        }
    };
    if (window.navigator.pointerEnabled == true) {
        window.dhx4.dnd.evs = {
            start : "pointerdown", move : "pointermove", end : "pointerup"
        }
    }
    else
    {
        if (window.navigator.msPointerEnabled == true)
        {
            window.dhx4.dnd.evs = {
                start : "MSPointerDown", move : "MSPointerMove", end : "MSPointerUp"
            }
        }
        else
        {
            if (typeof (window.addEventListener) != "undefined") {
                window.dhx4.dnd.evs = {
                    start : "touchstart", move : "touchmove", end : "touchend"
                }
            }
        }
    }
}
if (typeof (window.dhx4.template) == "undefined")
{
    window.dhx4.trim = function (a)
    {
        return String(a).replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");
    };
    window.dhx4.template = function (b, c, a)
    {
        return b.replace(/#([a-z0-9_-]{1,})(\|([^#]*))?#/gi, function ()
        {
            var g = arguments[1];
            var f = window.dhx4.trim(arguments[3]);
            var h = null;
            var e = [c[g]];
            if (f.length > 0)
            {
                f = f.split(":");
                var d = [];
                for (var i = 0; i < f.length; i++)
                {
                    if (i > 0 && d[d.length - 1].match(/\\$/) != null) {
                        d[d.length - 1] = d[d.length - 1].replace(/\\$/, "") + ":" + f[i]
                    }
                    else {
                        d.push(f[i])
                    }
                }
                h = d[0];
                for (var i = 1; i < d.length; i++) {
                    e.push(d[i])
                }
            }
            if (typeof (h) == "string" && typeof (window.dhx4.template[h]) == "function")
            {
                return window.dhx4.template[h].apply(window.dhx4.template, e)
            }
            if (g.length > 0 && typeof (c[g]) != "undefined") {
                if (a == true) {
                    return window.dhx4.trim(c[g])
                }
                return String(c[g])
            }
            return "";
        })
    };
    window.dhx4.template.date = function (a, b)
    {
        if (a != null)
        {
            if (a instanceof Date) {
                return window.dhx4.date2str(a, b)
            }
            else
            {
                a = a.toString();
                if (a.match(/^\d*$/) != null) {
                    return window.dhx4.date2str(new Date(parseInt(a)), b)
                }
                return a;
            }
        }
        return "";
    };
    window.dhx4.template.maxlength = function (b, a)
    {
        return String(b).substr(0, a);
    };
    window.dhx4.template.number_format = function (d, e, c, a)
    {
        var b = window.dhx4.template._parseFmt(e, c, a);
        if (b == false) {
            return d
        }
        return window.dhx4.template._getFmtValue(d, b);
    };
    window.dhx4.template.lowercase = function (a)
    {
        if (typeof (a) == "undefined" || a == null) {
            a = ""
        }
        return String(a).toLowerCase();
    };
    window.dhx4.template.uppercase = function (a)
    {
        if (typeof (a) == "undefined" || a == null) {
            a = ""
        }
        return String(a).toUpperCase();
    };
    window.dhx4.template._parseFmt = function (h, c, a)
    {
        var d = h.match(/^([^\.\,0-9]*)([0\.\,]*)([^\.\,0-9]*)/);
        if (d == null || d.length != 4) {
            return false
        }
        var b = 
        {
            i_len : false, i_sep : (typeof (c) == "string" ? c : ","), d_len : false, d_sep : (typeof (a) == "string" ? a : "."), 
            s_bef : (typeof (d[1]) == "string" ? d[1] : ""), s_aft : (typeof (d[3]) == "string" ? d[3] : "")
        };
        var g = d[2].split(".");
        if (g[1] != null) {
            b.d_len = g[1].length
        }
        var e = g[0].split(",");
        if (e.length > 1) {
            b.i_len = e[e.length - 1].length
        }
        return b;
    };
    window.dhx4.template._getFmtValue = function (value, fmt)
    {
        var r = String(value).match(/^(-)?([0-9]{1,})(\.([0-9]{1,}))?$/);
        if (r != null && r.length == 5)
        {
            var v0 = "";
            if (r[1] != null) {
                v0 += r[1]
            }
            v0 += fmt.s_bef;
            if (fmt.i_len !== false)
            {
                var i = 0;
                var v1 = "";
                for (var q = r[2].length - 1; q >= 0; q--) {
                    v1 = "" + r[2].charAt(q) + v1;
                    if (++i == fmt.i_len && q > 0) {
                        v1 = fmt.i_sep + v1;
                        i = 0;
                    }
                }
                v0 += v1
            }
            else {
                v0 += r[2]
            }
            if (fmt.d_len !== false)
            {
                if (r[4] == null) {
                    r[4] = ""
                }
                while (r[4].length < fmt.d_len) {
                    r[4] += "0"
                }
                eval("dhx4.temp = new RegExp(/\\d{" + fmt.d_len + "}/);");
                var t1 = (r[4]).match(dhx4.temp);
                if (t1 != null) {
                    v0 += fmt.d_sep + t1
                }
                dhx4.temp = t1 = null
            }
            v0 += fmt.s_aft;
            return v0
        }
        return value;
    }
}
if (typeof (window.dhx4.dateLang) == "undefined")
{
    window.dhx4.dateLang = "en";
    window.dhx4.dateStrings = 
    {
        en : 
        {
            monthFullName : ["January", "February", "March", "April", "May", "June", "July", "August", 
            "September", "October", "November", "December"], monthShortName : ["Jan", "Feb", "Mar", "Apr", 
            "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], dayFullName : ["Sunday", "Monday", 
            "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], dayShortName : ["Su", "Mo", "Tu", 
            "We", "Th", "Fr", "Sa"]
        }
    };
    window.dhx4.dateFormat = {
        en : "%Y-%m-%d"
    };
    window.dhx4.date2str = function (f, d, a)
    {
        if (d == null || typeof (d) == "undefined") {
            d = window.dhx4.dateFormat[window.dhx4.dateLang]
        }
        if (a == null || typeof (a) == "undefined") {
            a = window.dhx4.dateStrings[window.dhx4.dateLang]
        }
        if (f instanceof Date)
        {
            var e = function (g)
            {
                return (String(g).length == 1 ? "0" + String(g) : g);
            };
            var b = function (i)
            {
                switch (i)
                {
                    case "%d":
                        return e(f.getDate());
                    case "%j":
                        return f.getDate();
                    case "%D":
                        return a.dayShortName[f.getDay()];
                    case "%l":
                        return a.dayFullName[f.getDay()];
                    case "%m":
                        return e(f.getMonth() + 1);
                    case "%n":
                        return f.getMonth() + 1;
                    case "%M":
                        return a.monthShortName[f.getMonth()];
                    case "%F":
                        return a.monthFullName[f.getMonth()];
                    case "%y":
                        return e(f.getYear() % 100);
                    case "%Y":
                        return f.getFullYear();
                    case "%g":
                        return (f.getHours() + 11) % 12 + 1;
                    case "%h":
                        return e((f.getHours() + 11) % 12 + 1);
                    case "%G":
                        return f.getHours();
                    case "%H":
                        return e(f.getHours());
                    case "%i":
                        return e(f.getMinutes());
                    case "%s":
                        return e(f.getSeconds());
                    case "%a":
                        return (f.getHours() > 11 ? "pm" : "am");
                    case "%A":
                        return (f.getHours() > 11 ? "PM" : "AM");
                    case "%%":
                        return "%";
                    case "%u":
                        return f.getMilliseconds();
                    case "%P":
                        if (window.dhx4.temp_calendar != null && window.dhx4.temp_calendar.tz != null) {
                            return window.dhx4.temp_calendar.tz
                        }
                        var k = f.getTimezoneOffset();
                        var j = Math.abs(Math.floor(k / 60));
                        var g = Math.abs(k) - j * 60;
                        return (k > 0 ? "-" : "+") + e(j) + ":" + e(g);
                    default:
                        return i;
                }
            };
            var c = String(d || window.dhx4.dateFormat).replace(/%[a-zA-Z]/g, b)
        }
        return (c || String(f));
    };
    window.dhx4.str2date = function (g, s, x)
    {
        if (s == null || typeof (s) == "undefined") {
            s = window.dhx4.dateFormat[window.dhx4.dateLang]
        }
        if (x == null || typeof (x) == "undefined") {
            x = window.dhx4.dateStrings[window.dhx4.dateLang]
        }
        s = s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\\:|]/g, "\\$&");
        var u = [];
        var j = [];
        s = s.replace(/%[a-z]/gi, function (e)
        {
            switch (e)
            {
                case "%d":
                case "%m":
                case "%y":
                case "%h":
                case "%H":
                case "%i":
                case "%s":
                    j.push(e);
                    return "(\\d{2})";
                case "%D":
                case "%l":
                case "%M":
                case "%F":
                    j.push(e);
                    return "([a-zéûä\u0430-\u044F\u0451]{1,})";
                case "%j":
                case "%n":
                case "%g":
                case "%G":
                    j.push(e);
                    return "(\\d{1,2})";
                case "%Y":
                    j.push(e);
                    return "(\\d{4})";
                case "%a":
                    j.push(e);
                    return "([a|p]m)";
                case "%A":
                    j.push(e);
                    return "([A|P]M)";
                case "%u":
                    j.push(e);
                    return "(\\d{1,6})";
                case "%P":
                    j.push(e);
                    return "([+-]\\d{1,2}:\\d{1,2})"
            }
            return e;
        });
        var y = new RegExp(s, "i");
        var l = g.match(y);
        if (l == null || l.length - 1 != j.length) {
            return "Invalid Date"
        }
        for (var b = 1; b < l.length; b++) {
            u.push(l[b])
        }
        var c = 
        {
            "%y" : 1, "%Y" : 1, "%n" : 2, "%m" : 2, "%M" : 2, "%F" : 2, "%d" : 3, "%j" : 3, "%a" : 4, 
            "%A" : 4, "%H" : 5, "%G" : 5, "%h" : 5, "%g" : 5, "%i" : 6, "%s" : 7, "%u" : 7, "%P" : 7
        };
        var m = {};
        var i = {};
        for (var b = 0; b < j.length; b++)
        {
            if (typeof (c[j[b]]) != "undefined") {
                var d = c[j[b]];
                if (!m[d]) {
                    m[d] = [];
                    i[d] = []
                }
                m[d].push(u[b]);
                i[d].push(j[b])
            }
        }
        u = [];
        j = [];
        for (var b = 1; b <= 7; b++) {
            if (m[b] != null) {
                for (var o = 0; o < m[b].length; o++) {
                    u.push(m[b][o]);
                    j.push(i[b][o])
                }
            }
        }
        var a = new Date();
        a.setDate(1);
        a.setHours(0);
        a.setMinutes(0);
        a.setSeconds(0);
        a.setMilliseconds(0);
        var n = function (k, e)
        {
            for (var f = 0; f < e.length; f++) {
                if (e[f].toLowerCase() == k) {
                    return f;
                }
            }
            return - 1;
        };
        for (var b = 0; b < u.length; b++)
        {
            switch (j[b])
            {
                case "%d":
                case "%j":
                case "%n":
                case "%m":
                case "%Y":
                case "%H":
                case "%G":
                case "%i":
                case "%s":
                case "%u":
                    if (!isNaN(u[b]))
                    {
                        a[
                        {
                            "%d" : "setDate", "%j" : "setDate", "%n" : "setMonth", "%m" : "setMonth", "%Y" : "setFullYear", 
                            "%H" : "setHours", "%G" : "setHours", "%i" : "setMinutes", "%s" : "setSeconds", 
                            "%u" : "setMilliseconds"
                        }
                        [j[b]]](Number(u[b]) + (j[b] == "%m" || j[b] == "%n" ?- 1 : 0))
                    }
                    break;
                case "%M":
                case "%F":
                    var h = n(u[b].toLowerCase(), x[ {
                        "%M" : "monthShortName", "%F" : "monthFullName"
                    }
                    [j[b]]]);
                    if (h >= 0) {
                        a.setMonth(h)
                    }
                    break;
                case "%y":
                    if (!isNaN(u[b])) {
                        var t = Number(u[b]);
                        a.setFullYear(t + (t > 50 ? 1900 : 2000))
                    }
                    break;
                case "%g":
                case "%h":
                    if (!isNaN(u[b]))
                    {
                        var t = Number(u[b]);
                        if (t <= 12 && t >= 0) {
                            a.setHours(t + (n("pm", u) >= 0 ? (t == 12 ? 0 : 12) : (t == 12 ?- 12 : 0)))
                        }
                    }
                    break;
                case "%P":
                    if (window.dhx4.temp_calendar != null) {
                        window.dhx4.temp_calendar.tz = u[b]
                    }
                    break;
            }
        }
        return a;
    }
}
if (typeof (window.dhx4.ajax) == "undefined")
{
    window.dhx4.ajax = 
    {
        cache : false, method : "get",
        parse : function (a)
        {
            if (typeof a !== "string") {
                return a
            }
            a = a.replace(/^[\s]+/, "");
            if (window.DOMParser && !dhx4.isIE) {
                var b = (new window.DOMParser()).parseFromString(a, "text/xml")
            }
            else
            {
                if (window.ActiveXObject !== window.undefined) {
                    var b = new window.ActiveXObject("Microsoft.XMLDOM");
                    b.async = "false";
                    b.loadXML(a)
                }
            }
            return b;
        },
        xmltop : function (a, d, c)
        {
            if (typeof d.status == "undefined" || d.status < 400)
            {
                xml = (!d.responseXML) ? dhx4.ajax.parse(d.responseText || d) : (d.responseXML || d);
                if (xml && xml.documentElement !== null)
                {
                    try
                    {
                        if (!xml.getElementsByTagName("parsererror").length) {
                            return xml.getElementsByTagName(a)[0];
                        }
                    }
                    catch (b) {}
                }
            }
            if (c !==- 1) {
                dhx4.callEvent("onLoadXMLError", ["Incorrect XML", arguments[1], c])
            }
            return document.createElement("DIV");
        },
        xpath : function (c, a)
        {
            if (!a.nodeName) {
                a = a.responseXML || a
            }
            if (dhx4.isIE) {
                try {
                    return a.selectNodes(c) || []
                }
                catch (f) {
                    return [];
                }
            }
            else
            {
                var d = [];
                var g;
                var b = (a.ownerDocument || a).evaluate(c, a, null, XPathResult.ANY_TYPE, null);
                while (g = b.iterateNext()) {
                    d.push(g)
                }
                return d;
            }
        },
        query : function (a)
        {
            dhx4.ajax._call((a.method || "GET"), a.url, a.data || "", (a.async || true), a.callback, null, 
            a.headers)
        },
        get : function (a, b)
        {
            return this._call("GET", a, null, true, b);
        },
        getSync : function (a)
        {
            return this._call("GET", a, null, false);
        },
        put : function (b, a, c)
        {
            return this._call("PUT", b, a, true, c);
        },
        del : function (b, a, c)
        {
            return this._call("DELETE", b, a, true, c);
        },
        post : function (b, a, c)
        {
            if (arguments.length == 1) {
                a = ""
            }
            else
            {
                if (arguments.length == 2 && (typeof (a) == "function" || typeof (window[a]) == "function"))
                {
                    c = a;
                    a = ""
                }
                else {
                    a = String(a);
                }
            }
            return this._call("POST", b, a, true, c);
        },
        postSync : function (b, a)
        {
            a = (a == null ? "" : String(a));
            return this._call("POST", b, a, false);
        },
        getLong : function (a, b)
        {
            this._call("GET", a, null, true, b, {
                url : a
            })
        },
        postLong : function (b, a, c)
        {
            if (arguments.length == 2 && (typeof (a) == "function" || typeof (window[a])))
            {
                c = a;
                a = ""
            }
            this._call("POST", b, a, true, c, {
                url : b, postData : a
            })
        },
        _call : function (a, b, c, e, g, j, d)
        {
            var i = (window.XMLHttpRequest && !dhx4.isIE ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP"));
            var f = (navigator.userAgent.match(/AppleWebKit/) != null && navigator.userAgent.match(/Qt/) != null && navigator.userAgent.match(/Safari/) != null);
            if (e == true)
            {
                i.onreadystatechange = function ()
                {
                    if ((i.readyState == 4) || (f == true && i.readyState == 3))
                    {
                        if (i.status != 200 || i.responseText == "") {
                            if (!dhx4.callEvent("onAjaxError", [ {
                                xmlDoc : i, filePath : b, async : e
                            }])) {
                                return
                            }
                        }
                        window.setTimeout(function ()
                        {
                            if (typeof (g) == "function")
                            {
                                g.apply(window, [ {
                                    xmlDoc : i, filePath : b, async : e
                                }])
                            }
                            if (j != null)
                            {
                                if (typeof (j.postData) != "undefined") {
                                    dhx4.ajax.postLong(j.url, j.postData, g)
                                }
                                else {
                                    dhx4.ajax.getLong(j.url, g)
                                }
                            }
                            g = null;
                            i = null;
                        }, 1)
                    }
                }
            }
            if (a == "GET") {
                b += this._dhxr(b)
            }
            i.open(a, b, e);
            if (d != null) {
                for (var h in d) {
                    i.setRequestHeader(h, d[h])
                }
            }
            else
            {
                if (a == "POST" || a == "PUT" || a == "DELETE") {
                    i.setRequestHeader("Content-Type", "application/x-www-form-urlencoded")
                }
                else {
                    if (a == "GET") {
                        c = null;
                    }
                }
            }
            i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            i.send(c);
            if (e != true)
            {
                if ((i.readyState == 4) || (f == true && i.readyState == 3))
                {
                    if (i.status != 200 || i.responseText == "") {
                        dhx4.callEvent("onAjaxError", [ {
                            xmlDoc : i, filePath : b, async : e
                        }])
                    }
                }
            }
            return {
                xmlDoc : i, filePath : b, async : e
            }
        },
        _dhxr : function (a, b)
        {
            if (this.cache != true)
            {
                if (a.match(/^[\?\&]$/) == null) {
                    a = (a.indexOf("?") >= 0 ? "&" : "?")
                }
                if (typeof (b) == "undefined") {
                    b = true
                }
                return a + "dhxr" + new Date().getTime() + (b == true ? "=1" : "")
            }
            return "";
        }
    }
}
if (typeof (window.dhx4._enableDataLoading) == "undefined")
{
    window.dhx4._enableDataLoading = function (g, c, f, e, h)
    {
        if (h == "clear")
        {
            for (var b in g._dhxdataload) {
                g._dhxdataload[b] = null;
                delete g._dhxdataload[b]
            }
            g._loadData = null;
            g._dhxdataload = null;
            g.load = null;
            g.loadStruct = null;
            g = null;
            return
        }
        g._dhxdataload = {
            initObj : c, xmlToJson : f, xmlRootTag : e, onBeforeXLS : null
        };
        g._loadData = function (n, o, p)
        {
            if (arguments.length == 2) {
                p = o;
                o = null
            }
            var m = null;
            if (arguments.length == 3) {
                p = arguments[2]
            }
            if (typeof (n) == "string")
            {
                var l = n.replace(/^\s{1,}/, "").replace(/\s{1,}$/, "");
                var s = new RegExp("^<" + this._dhxdataload.xmlRootTag);
                if (s.test(l.replace(/^<\?xml[^\?]*\?>\s*/, "")))
                {
                    m = dhx4.ajax.parse(n);
                    if (m != null) {
                        m = this [this._dhxdataload.xmlToJson].apply(this, [m]);
                    }
                }
                if (m == null && (l.match(/^[\s\S]*{[.\s\S]*}[\s\S]*$/) != null || l.match(/^[\s\S]*\[[.\s\S]*\][\s\S]*$/) != null)) {
                    m = dhx4.s2j(l)
                }
                if (m == null)
                {
                    this.callEvent("onXLS", []);
                    var j = [];
                    if (typeof (this._dhxdataload.onBeforeXLS) == "function")
                    {
                        var l = this._dhxdataload.onBeforeXLS.apply(this, [n]);
                        if (l != null && typeof (l) == "object")
                        {
                            if (l.url != null) {
                                n = l.url
                            }
                            if (l.params != null) {
                                for (var q in l.params) {
                                    j.push(q + "=" + encodeURIComponent(l.params[q]))
                                }
                            }
                        }
                    }
                    var r = this;
                    var i = function (a)
                    {
                        var k = null;
                        if ((a.xmlDoc.getResponseHeader("Content-Type") || "").search(/xml/gi) >= 0 || (a.xmlDoc.responseText.replace(/^\s{1,}/, 
                        "")).match(/^</) != null) {
                            k = r[r._dhxdataload.xmlToJson].apply(r, [a.xmlDoc.responseXML])
                        }
                        else {
                            k = dhx4.s2j(a.xmlDoc.responseText)
                        }
                        if (k != null) {
                            r[r._dhxdataload.initObj].apply(r, [k, n])
                        }
                        r.callEvent("onXLE", []);
                        if (p != null)
                        {
                            if (typeof (p) == "function")
                            {
                                p.apply(r, [])
                            }
                            else {
                                if (typeof (window[p]) == "function")
                                {
                                    window[p].apply(r, [])
                                }
                            }
                        }
                        i = p = null;
                        k = a = r = null;
                    };
                    j = j.join("&") + (typeof (o) == "string" ? "&" + o : "");
                    if (dhx4.ajax.method == "post") {
                        dhx4.ajax.post(n, j, i)
                    }
                    else
                    {
                        if (dhx4.ajax.method == "get") {
                            dhx4.ajax.get(n + (j.length > 0 ? (n.indexOf("?") > 0 ? "&" : "?") + j : ""), 
                            i)
                        }
                    }
                    return
                }
            }
            else
            {
                if (typeof (n.documentElement) == "object" || (typeof (n.tagName) != "undefined" && typeof (n.getElementsByTagName) != "undefined" && n.getElementsByTagName(this._dhxdataload.xmlRootTag).length > 0)) {
                    m = this [this._dhxdataload.xmlToJson].apply(this, [n])
                }
                else {
                    m = window.dhx4._copyObj(n);
                }
            }
            if (m != null) {
                this [this._dhxdataload.initObj].apply(this, [m])
            }
            if (p != null)
            {
                if (typeof (p) == "function")
                {
                    p.apply(this, [])
                }
                else {
                    if (typeof (window[p]) == "function")
                    {
                        window[p].apply(this, [])
                    }
                }
                p = null;
            }
        };
        if (h != null)
        {
            var d = {
                struct : "loadStruct", data : "load"
            };
            for (var b in h) {
                if (h[b] == true) {
                    g[d[b]] = function ()
                    {
                        return this._loadData.apply(this, arguments);
                    }
                }
            }
        }
        g = null;
    }
}
if (typeof (window.dhx4._eventable) == "undefined")
{
    window.dhx4._eventable = function (a, b)
    {
        if (b == "clear")
        {
            a.detachAllEvents();
            a.dhxevs = null;
            a.attachEvent = null;
            a.detachEvent = null;
            a.checkEvent = null;
            a.callEvent = null;
            a.detachAllEvents = null;
            a = null;
            return
        }
        a.dhxevs = {
            data : {}
        };
        a.attachEvent = function (c, e)
        {
            c = String(c).toLowerCase();
            if (!this.dhxevs.data[c]) {
                this.dhxevs.data[c] = {}
            }
            var d = window.dhx4.newId();
            this.dhxevs.data[c][d] = e;
            return d;
        };
        a.detachEvent = function (f)
        {
            for (var d in this.dhxevs.data)
            {
                var e = 0;
                for (var c in this.dhxevs.data[d]) {
                    if (c == f) {
                        this.dhxevs.data[d][c] = null;
                        delete this.dhxevs.data[d][c]
                    }
                    else {
                        e++
                    }
                }
                if (e == 0) {
                    this.dhxevs.data[d] = null;
                    delete this.dhxevs.data[d]
                }
            }
        };
        a.checkEvent = function (c)
        {
            c = String(c).toLowerCase();
            return (this.dhxevs.data[c] != null);
        };
        a.callEvent = function (d, f)
        {
            d = String(d).toLowerCase();
            if (this.dhxevs.data[d] == null) {
                return true
            }
            var e = true;
            for (var c in this.dhxevs.data[d]) {
                e = this.dhxevs.data[d][c].apply(this, f) && e
            }
            return e;
        };
        a.detachAllEvents = function ()
        {
            for (var d in this.dhxevs.data)
            {
                for (var c in this.dhxevs.data[d]) {
                    this.dhxevs.data[d][c] = null;
                    delete this.dhxevs.data[d][c]
                }
                this.dhxevs.data[d] = null;
                delete this.dhxevs.data[d]
            }
        };
        a = null;
    };
    dhx4._eventable(dhx4)
}
if (!window.dhtmlxValidation)
{
    dhtmlxValidation = function () {};
    dhtmlxValidation.prototype = 
    {
        isEmpty : function (a)
        {
            return a == "";
        },
        isNotEmpty : function (a)
        {
            return (a instanceof Array ? a.length > 0 :!a == "");
        },
        isValidBoolean : function (a)
        {
            return !!a.toString().match(/^(0|1|true|false)$/);
        },
        isValidEmail : function (a)
        {
            return !!a.toString().match(/(^[a-z0-9]([0-9a-z\-_\.]*)@([0-9a-z_\-\.]*)([.][a-z]{3})$)|(^[a-z]([0-9a-z_\.\-]*)@([0-9a-z_\-\.]*)(\.[a-z]{2,5})$)/i);
        },
        isValidInteger : function (a)
        {
            return !!a.toString().match(/(^-?\d+$)/);
        },
        isValidNumeric : function (a)
        {
            return !!a.toString().match(/(^-?\d\d*[\.|,]\d*$)|(^-?\d\d*$)|(^-?[\.|,]\d\d*$)/);
        },
        isValidAplhaNumeric : function (a)
        {
            return !!a.toString().match(/^[_\-a-z0-9]+$/gi);
        },
        isValidDatetime : function (b)
        {
            var a = b.toString().match(/^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/);
            return a && !!(a[1] <= 9999 && a[2] <= 12 && a[3] <= 31 && a[4] <= 59 && a[5] <= 59 && a[6] <= 59) || false;
        },
        isValidDate : function (a)
        {
            var b = a.toString().match(/^(\d{4})-(\d{2})-(\d{2})$/);
            return b && !!(b[1] <= 9999 && b[2] <= 12 && b[3] <= 31) || false;
        },
        isValidTime : function (b)
        {
            var a = b.toString().match(/^(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
            return a && !!(a[1] <= 24 && a[2] <= 59 && a[3] <= 59) || false;
        },
        isValidIPv4 : function (a)
        {
            var b = a.toString().match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
            return b && !!(b[1] <= 255 && b[2] <= 255 && b[3] <= 255 && b[4] <= 255) || false;
        },
        isValidCurrency : function (a)
        {
            return a.toString().match(/^\$?\s?\d+?([\.,\,]?\d+)?\s?\$?$/) && true || false;
        },
        isValidSSN : function (a)
        {
            return a.toString().match(/^\d{3}\-?\d{2}\-?\d{4}$/) && true || false;
        },
        isValidSIN : function (a)
        {
            return a.toString().match(/^\d{9}$/) && true || false;
        }
    };
    dhtmlxValidation = new dhtmlxValidation()
}
if (typeof (window.dhtmlx) == "undefined")
{
    window.dhtmlx = 
    {
        extend : function (d, c)
        {
            for (var e in c) {
                if (!d[e]) {
                    d[e] = c[e];
                }
            }
            return d;
        },
        extend_api : function (a, d, c)
        {
            var b = window[a];
            if (!b) {
                return
            }
            window[a] = function (g)
            {
                if (g && typeof g == "object" && !g.tagName)
                {
                    var f = b.apply(this, (d._init ? d._init(g) : arguments));
                    for (var e in dhtmlx) {
                        if (d[e]) {
                            this [d[e]](dhtmlx[e])
                        }
                    }
                    for (var e in g) {
                        if (d[e]) {
                            this [d[e]](g[e])
                        }
                        else {
                            if (e.indexOf("on") === 0) {
                                this.attachEvent(e, g[e])
                            }
                        }
                    }
                }
                else {
                    var f = b.apply(this, arguments)
                }
                if (d._patch) {
                    d._patch(this)
                }
                return f || this;
            };
            window[a].prototype = b.prototype;
            if (c) {
                dhtmlx.extend(window[a].prototype, c)
            }
        },
        url : function (a)
        {
            if (a.indexOf("?") !=- 1) {
                return "&"
            }
            else {
                return "?";
            }
        }
    }
}
function dhtmlDragAndDropObject()
{
    if (window.dhtmlDragAndDrop) {
        return window.dhtmlDragAndDrop
    }
    this.lastLanding = 0;
    this.dragNode = 0;
    this.dragStartNode = 0;
    this.dragStartObject = 0;
    this.tempDOMU = null;
    this.tempDOMM = null;
    this.waitDrag = 0;
    window.dhtmlDragAndDrop = this;
    return this
}
dhtmlDragAndDropObject.prototype.removeDraggableItem = function (a)
{
    a.onmousedown = null;
    a.dragStarter = null;
    a.dragLanding = null;
};
dhtmlDragAndDropObject.prototype.addDraggableItem = function (a, b)
{
    a.onmousedown = this.preCreateDragCopy;
    a.dragStarter = b;
    this.addDragLanding(a, b)
};
dhtmlDragAndDropObject.prototype.addDragLanding = function (a, b)
{
    a.dragLanding = b;
};
dhtmlDragAndDropObject.prototype.preCreateDragCopy = function (a)
{
    if ((a || window.event) && (a || event).button == 2) {
        return
    }
    if (window.dhtmlDragAndDrop.waitDrag)
    {
        window.dhtmlDragAndDrop.waitDrag = 0;
        document.body.onmouseup = window.dhtmlDragAndDrop.tempDOMU;
        document.body.onmousemove = window.dhtmlDragAndDrop.tempDOMM;
        return false
    }
    if (window.dhtmlDragAndDrop.dragNode) {
        window.dhtmlDragAndDrop.stopDrag(a)
    }
    window.dhtmlDragAndDrop.waitDrag = 1;
    window.dhtmlDragAndDrop.tempDOMU = document.body.onmouseup;
    window.dhtmlDragAndDrop.tempDOMM = document.body.onmousemove;
    window.dhtmlDragAndDrop.dragStartNode = this;
    window.dhtmlDragAndDrop.dragStartObject = this.dragStarter;
    document.body.onmouseup = window.dhtmlDragAndDrop.preCreateDragCopy;
    document.body.onmousemove = window.dhtmlDragAndDrop.callDrag;
    window.dhtmlDragAndDrop.downtime = new Date().valueOf();
    if ((a) && (a.preventDefault)) {
        a.preventDefault();
        return false
    }
    return false;
};
dhtmlDragAndDropObject.prototype.callDrag = function (c)
{
    if (!c) {
        c = window.event
    }
    dragger = window.dhtmlDragAndDrop;
    if ((new Date()).valueOf() - dragger.downtime < 100) {
        return
    }
    if (!dragger.dragNode)
    {
        if (dragger.waitDrag)
        {
            dragger.dragNode = dragger.dragStartObject._createDragNode(dragger.dragStartNode, c);
            if (!dragger.dragNode) {
                return dragger.stopDrag()
            }
            dragger.dragNode.onselectstart = function ()
            {
                return false;
            };
            dragger.gldragNode = dragger.dragNode;
            document.body.appendChild(dragger.dragNode);
            document.body.onmouseup = dragger.stopDrag;
            dragger.waitDrag = 0;
            dragger.dragNode.pWindow = window;
            dragger.initFrameRoute()
        }
        else {
            return dragger.stopDrag(c, true);
        }
    }
    if (dragger.dragNode.parentNode != window.document.body && dragger.gldragNode)
    {
        var a = dragger.gldragNode;
        if (dragger.gldragNode.old) {
            a = dragger.gldragNode.old
        }
        a.parentNode.removeChild(a);
        var b = dragger.dragNode.pWindow;
        if (a.pWindow && a.pWindow.dhtmlDragAndDrop.lastLanding)
        {
            a.pWindow.dhtmlDragAndDrop.lastLanding.dragLanding._dragOut(a.pWindow.dhtmlDragAndDrop.lastLanding)
        }
        if (_isIE)
        {
            var f = document.createElement("Div");
            f.innerHTML = dragger.dragNode.outerHTML;
            dragger.dragNode = f.childNodes[0]
        }
        else {
            dragger.dragNode = dragger.dragNode.cloneNode(true)
        }
        dragger.dragNode.pWindow = window;
        dragger.gldragNode.old = dragger.dragNode;
        document.body.appendChild(dragger.dragNode);
        b.dhtmlDragAndDrop.dragNode = dragger.dragNode
    }
    dragger.dragNode.style.left = c.clientX + 15 + (dragger.fx ? dragger.fx * (-1) : 0) + (document.body.scrollLeft || document.documentElement.scrollLeft) + "px";
    dragger.dragNode.style.top = c.clientY + 3 + (dragger.fy ? dragger.fy * (-1) : 0) + (document.body.scrollTop || document.documentElement.scrollTop) + "px";
    if (!c.srcElement) {
        var d = c.target
    }
    else {
        d = c.srcElement
    }
    dragger.checkLanding(d, c);
};
dhtmlDragAndDropObject.prototype.calculateFramePosition = function (e)
{
    if (window.name)
    {
        var c = parent.frames[window.name].frameElement.offsetParent;
        var d = 0;
        var b = 0;
        while (c) {
            d += c.offsetLeft;
            b += c.offsetTop;
            c = c.offsetParent
        }
        if ((parent.dhtmlDragAndDrop))
        {
            var a = parent.dhtmlDragAndDrop.calculateFramePosition(1);
            d += a.split("_")[0] * 1;
            b += a.split("_")[1] * 1
        }
        if (e) {
            return d + "_" + b
        }
        else {
            this.fx = d
        }
        this.fy = b
    }
    return "0_0";
};
dhtmlDragAndDropObject.prototype.checkLanding = function (b, a)
{
    if ((b) && (b.dragLanding))
    {
        if (this.lastLanding) {
            this.lastLanding.dragLanding._dragOut(this.lastLanding)
        }
        this.lastLanding = b;
        this.lastLanding = this.lastLanding.dragLanding._dragIn(this.lastLanding, this.dragStartNode, 
        a.clientX, a.clientY, a);
        this.lastLanding_scr = (_isIE ? a.srcElement : a.target)
    }
    else
    {
        if ((b) && (b.tagName != "BODY")) {
            this.checkLanding(b.parentNode, a)
        }
        else
        {
            if (this.lastLanding) {
                this.lastLanding.dragLanding._dragOut(this.lastLanding, a.clientX, a.clientY, a)
            }
            this.lastLanding = 0;
            if (this._onNotFound) {
                this._onNotFound()
            }
        }
    }
};
dhtmlDragAndDropObject.prototype.stopDrag = function (b, c)
{
    dragger = window.dhtmlDragAndDrop;
    if (!c)
    {
        dragger.stopFrameRoute();
        var a = dragger.lastLanding;
        dragger.lastLanding = null;
        if (a)
        {
            a.dragLanding._drag(dragger.dragStartNode, dragger.dragStartObject, a, (_isIE ? event.srcElement : b.target))
        }
    }
    dragger.lastLanding = null;
    if ((dragger.dragNode) && (dragger.dragNode.parentNode == document.body)) {
        dragger.dragNode.parentNode.removeChild(dragger.dragNode)
    }
    dragger.dragNode = 0;
    dragger.gldragNode = 0;
    dragger.fx = 0;
    dragger.fy = 0;
    dragger.dragStartNode = 0;
    dragger.dragStartObject = 0;
    document.body.onmouseup = dragger.tempDOMU;
    document.body.onmousemove = dragger.tempDOMM;
    dragger.tempDOMU = null;
    dragger.tempDOMM = null;
    dragger.waitDrag = 0;
};
dhtmlDragAndDropObject.prototype.stopFrameRoute = function (c)
{
    if (c) {
        window.dhtmlDragAndDrop.stopDrag(1, 1)
    }
    for (var a = 0; a < window.frames.length; a++)
    {
        try
        {
            if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
                window.frames[a].dhtmlDragAndDrop.stopFrameRoute(window)
            }
        }
        catch (b) {}
    }
    try
    {
        if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
            parent.dhtmlDragAndDrop.stopFrameRoute(window)
        }
    }
    catch (b) {}
};
dhtmlDragAndDropObject.prototype.initFrameRoute = function (c, d)
{
    if (c)
    {
        window.dhtmlDragAndDrop.preCreateDragCopy();
        window.dhtmlDragAndDrop.dragStartNode = c.dhtmlDragAndDrop.dragStartNode;
        window.dhtmlDragAndDrop.dragStartObject = c.dhtmlDragAndDrop.dragStartObject;
        window.dhtmlDragAndDrop.dragNode = c.dhtmlDragAndDrop.dragNode;
        window.dhtmlDragAndDrop.gldragNode = c.dhtmlDragAndDrop.dragNode;
        window.document.body.onmouseup = window.dhtmlDragAndDrop.stopDrag;
        window.waitDrag = 0;
        if (((!_isIE) && (d)) && ((!_isFF) || (_FFrv < 1.8))) {
            window.dhtmlDragAndDrop.calculateFramePosition()
        }
    }
    try
    {
        if ((parent.dhtmlDragAndDrop) && (parent != window) && (parent != c)) {
            parent.dhtmlDragAndDrop.initFrameRoute(window)
        }
    }
    catch (b) {}
    for (var a = 0; a < window.frames.length; a++)
    {
        try
        {
            if ((window.frames[a] != c) && (window.frames[a].dhtmlDragAndDrop)) {
                window.frames[a].dhtmlDragAndDrop.initFrameRoute(window, ((!c || d) ? 1 : 0))
            }
        }
        catch (b) {}
    }
};
_isFF = false;
_isIE = false;
_isOpera = false;
_isKHTML = false;
_isMacOS = false;
_isChrome = false;
_FFrv = false;
_KHTMLrv = false;
_OperaRv = false;
if (navigator.userAgent.indexOf("Macintosh") !=- 1) {
    _isMacOS = true
}
if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
    _isChrome = true
}
if ((navigator.userAgent.indexOf("Safari") !=- 1) || (navigator.userAgent.indexOf("Konqueror") !=- 1))
{
    _KHTMLrv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Safari") + 7, 5));
    if (_KHTMLrv > 525) {
        _isFF = true;
        _FFrv = 1.9
    }
    else {
        _isKHTML = true;
    }
}
else
{
    if (navigator.userAgent.indexOf("Opera") !=- 1)
    {
        _isOpera = true;
        _OperaRv = parseFloat(navigator.userAgent.substr(navigator.userAgent.indexOf("Opera") + 6, 3))
    }
    else
    {
        if (navigator.appName.indexOf("Microsoft") !=- 1)
        {
            _isIE = true;
            if ((navigator.appVersion.indexOf("MSIE 8.0") !=- 1 || navigator.appVersion.indexOf("MSIE 9.0") !=- 1 || navigator.appVersion.indexOf("MSIE 10.0") !=- 1 || document.documentMode > 7) && document.compatMode != "BackCompat") {
                _isIE = 8;
            }
        }
        else
        {
            if (navigator.appName == "Netscape" && navigator.userAgent.indexOf("Trident") !=- 1) {
                _isIE = 8
            }
            else {
                _isFF = true;
                _FFrv = parseFloat(navigator.userAgent.split("rv:")[1]);
            }
        }
    }
}
if (typeof (window.dhtmlxEvent) == "undefined")
{
    function dhtmlxEvent(b, c, a)
    {
        if (b.addEventListener) {
            b.addEventListener(c, a, false)
        }
        else {
            if (b.attachEvent) {
                b.attachEvent("on" + c, a)
            }
        }
    }
}
if (dhtmlxEvent.touchDelay == null) {
    dhtmlxEvent.touchDelay = 2000
}
if (typeof (dhtmlxEvent.initTouch) == "undefined")
{
    dhtmlxEvent.initTouch = function ()
    {
        var d;
        var e;
        var b, a;
        dhtmlxEvent(document.body, "touchstart", function (f)
        {
            e = f.touches[0].target;
            b = f.touches[0].clientX;
            a = f.touches[0].clientY;
            d = window.setTimeout(c, dhtmlxEvent.touchDelay);
        });
        function c()
        {
            if (e)
            {
                var f = document.createEvent("HTMLEvents");
                f.initEvent("dblclick", true, true);
                e.dispatchEvent(f);
                d = e = null;
            }
        }
        dhtmlxEvent(document.body, "touchmove", function (f)
        {
            if (d)
            {
                if (Math.abs(f.touches[0].clientX - b) > 50 || Math.abs(f.touches[0].clientY - a) > 50) {
                    window.clearTimeout(d);
                    d = e = false;
                }
            }
        });
        dhtmlxEvent(document.body, "touchend", function (f)
        {
            if (d) {
                window.clearTimeout(d);
                d = e = false;
            }
        });
        dhtmlxEvent.initTouch = function () {}
    }
}
function dhtmlXColorPicker(g)
{
    if (!(this instanceof window.dhtmlXColorPicker)) {
        return new dhtmlXColorPicker(g)
    }
    dhx4._eventable(this);
    var e = this, d = undefined, f = null, c, a, b;
    this._nodes = [];
    this.activeNode = null;
    this._inputListenerId = null;
    this.base = null;
    this._globalNode = null;
    this.memory = null;
    this.skin = null;
    this.conf = 
    {
        cp_id : dhx4.newId(), x : 0, y : 0, c : 0, indent : 2, position : "right", customColors : false, 
        selectedColor : null, hide : false, hideOnSelect : false, lang : "en", closeable : true
    };
    this.value = {
        red :- 1, blue :- 1, green :- 1, hue :- 1, sat :- 1, lum :- 1
    };
    this._initMoveSelection = function (h)
    {
        h = h || event;
        if (typeof (window.addEventListener) == "function")
        {
            e._controllerNodes.colorArea.addEventListener("mousemove", e._setMoveSelection, false);
            document.body.addEventListener("mouseup", e._cleanMoveSelection, false)
        }
        else
        {
            e._controllerNodes.colorArea.attachEvent("onmousemove", e._setMoveSelection);
            document.body.attachEvent("onmouseup", e._cleanMoveSelection)
        }
        e._setMoveSelection(h, e._controllerNodes.colorArea);
        return false;
    };
    this._cleanMoveSelection = function ()
    {
        if (typeof (window.removeEventListener) == "function")
        {
            e._controllerNodes.colorArea.removeEventListener("mousemove", e._setMoveSelection, false);
            document.body.removeEventListener("mouseup", e._cleanMoveSelection, false)
        }
        else
        {
            e._controllerNodes.colorArea.detachEvent("onmousemove", e._setMoveSelection);
            document.body.detachEvent("onmouseup", e._cleanMoveSelection)
        }
        return false;
    };
    this._setMoveSelection = function (h)
    {
        h = h || event;
        var i = e._getOffsetPosition(h, e._controllerNodes.colorArea);
        if (e._controllerNodes.fr_cover) {
            setTimeout(function ()
            {
                e._setColorAreaXY(i.x, i.y);
                e._setColorByXYC()
            }, 0)
        }
        else {
            e._setColorAreaXY(i.x, i.y);
            e._setColorByXYC()
        }
        return false;
    };
    this._initMoveContrast = function (h)
    {
        h = h || event;
        if (typeof (window.addEventListener) == "function")
        {
            document.body.addEventListener("mousemove", e._setMoveContrast, false);
            document.body.addEventListener("mouseup", e._cleanMoveContrast, false)
        }
        else
        {
            document.body.attachEvent("onmousemove", e._setMoveContrast);
            document.body.attachEvent("onmouseup", e._cleanMoveContrast)
        }
        e._setMoveContrast(h, e._controllerNodes.contrastArea)
    };
    this._cleanMoveContrast = function ()
    {
        if (typeof (window.removeEventListener) == "function")
        {
            document.body.removeEventListener("mousemove", e._setMoveContrast, false);
            document.body.removeEventListener("mouseup", e._cleanMoveContrast, false)
        }
        else
        {
            document.body.detachEvent("onmousemove", e._setMoveContrast);
            document.body.detachEvent("onmouseup", e._cleanMoveContrast)
        }
    };
    this._setMoveContrast = function (h)
    {
        h = h || event;
        var i = e._getOffsetPosition(h, e._controllerNodes.contrastArea);
        e._setContrastY(i.y);
        e._setColorByXYC(true)
    };
    this._doOnSelectColor = function ()
    {
        var h = e.colorAIP.rgb2hex({
            r : e.value.red, g : e.value.green, b : e.value.blue
        });
        if (e.activeNode != null)
        {
            if (e.activeNode.valueCont) {
                e.activeNode.valueCont.value = h
            }
            if (e.activeNode.valueColor) {
                e.activeNode.valueColor.style.backgroundColor = h;
            }
        }
        if (e.base._dhx_remove || e.conf.hideOnSelect) {
            e.hide()
        }
        e.callEvent("onSelect", [h, ((e.activeNode) ? e.activeNode.node : null)])
    };
    this._doOnCancel = function ()
    {
        if (e.callEvent("onCancel", [((e.activeNode) ? e.activeNode.node : null)]) == true && e.conf.closeable == true) {
            e.hide()
        }
    };
    this._doOnFocusByInput = function ()
    {
        var i = (this != window) ? this : event.srcElement;
        var h = (e.activeNode && e.activeNode.valueCont && e.activeNode.valueCont == i) ? e.activeNode : e._getNodeByValueCont(i);
        e.activeNode = h;
        if (h && h == e.activeNode) {
            e._initListenerInput()
        }
    };
    this._doOnBlurByInput = function ()
    {
        var i = (this != window) ? this : event.srcElement;
        var h = (e.activeNode && e.activeNode.valueCont && e.activeNode.valueCont == i) ? e.activeNode : e._getNodeByValueCont(i);
        if (h && h == e.activeNode) {
            e._removeListenerInput()
        }
    };
    this._doOnClickByNode = function (i)
    {
        i = i || event;
        var h = (this != window) ? this : event.srcElement;
        e.activeNode = (e.activeNode.node != h) ? e._getNodeByElement(h) : e.activeNode;
        if (!e.isVisible()) {
            e.show()
        }
    };
    this.saveColor = function ()
    {
        e.memory.setValue(e.value)
    };
    this._onSelectMemoryEl = function (i)
    {
        var h;
        e._refreshCoordinatesByHSL(i.value.hue, i.value.sat, i.value.lum);
        for (h in i.value) {
            e.value[h] = i.value[h]
        }
        e._refreshContrast();
        e._refreshInputValues();
        e._refreshColorValue()
    };
    this._doOnClickByBody = function (j)
    {
        j = j || event;
        var h = true, i = j.target || j.srcElement;
        if (e._isBaseNode(i)) {
            h = false
        }
        if (h && e.activeNode && (e.activeNode.node == i || e.activeNode.valueCont == i)) {
            h = false
        }
        if (h) {
            e.hide()
        }
    };
    this._doOnChangeHSL = function ()
    {
        var j = parseInt(e._controllerNodes.hue.value), i = parseInt(e._controllerNodes.sat.value), h = parseInt(e._controllerNodes.lum.value), 
        k;
        if (isNaN(j) || j > 359 || j < 0) {
            e._controllerNodes.hue.value = e.value.hue
        }
        else {
            e.value.hue = j
        }
        if (isNaN(i) || i > 100 || i < 0) {
            e._controllerNodes.sat.value = e.value.sat
        }
        else {
            e.value.sat = i
        }
        if (isNaN(h) || h > 100 || h < 0) {
            e._controllerNodes.lum.value = e.value.lum
        }
        else {
            e.value.lum = h
        }
        k = e.colorAIP.hsl2rgb(e.value.hue, e.value.sat / 100, e.value.lum / 100);
        e.value.red = Math.round(255 * k.r);
        e.value.green = Math.round(255 * k.g);
        e.value.blue = Math.round(255 * k.b);
        e._refreshCoordinatesByHSL(e.value.hue, e.value.sat, e.value.lum);
        e._refreshContrast();
        e._refreshInputValues();
        e._refreshColorValue()
    };
    this._doOnChangeRGB = function ()
    {
        var k = parseInt(e._controllerNodes.red.value), j = parseInt(e._controllerNodes.green.value), 
        h = parseInt(e._controllerNodes.blue.value), i;
        if (isNaN(k) || k > 255 || k < 0) {
            e._controllerNodes.red.value = e.value.red
        }
        else {
            e.value.red = k
        }
        if (isNaN(j) || j > 255 || j < 0) {
            e._controllerNodes.green.value = e.value.green
        }
        else {
            e.value.green = j
        }
        if (isNaN(h) || h > 255 || h < 0) {
            e._controllerNodes.blue.value = e.value.blue
        }
        else {
            e.value.blue = h
        }
        i = e.colorAIP.rgb2hsl(e.value.red / 255, e.value.green / 255, e.value.blue / 255);
        e.value.hue = Math.round(i.h);
        e.value.sat = Math.round(i.s * 100);
        e.value.lum = Math.round(i.l * 100);
        e._refreshCoordinatesByHSL(e.value.hue, e.value.sat, e.value.lum);
        e._refreshContrast();
        e._refreshInputValues();
        e._refreshColorValue()
    };
    this._doOnChangeHSV = function ()
    {
        e._controllerNodes.hsv.value = e.setColor(e._controllerNodes.hsv.value);
    };
    this._checkType = function (i)
    {
        var h;
        if (i instanceof Array)
        {
            h = e._checkType(i[0]);
            switch (h)
            {
                case "string":
                    return "array_string";
                    break;
                case "input":
                case "textarea":
                    return "array_input";
                    break;
                case "object":
                    return "array_object";
                    break;
                default:
                    return undefined;
            }
        }
        else
        {
            if (i == undefined) {
                return null
            }
            else
            {
                if (typeof (i) == "string") {
                    return "string"
                }
                else
                {
                    if (i.tagName && i.tagName.toLowerCase() == "input") {
                        return "input"
                    }
                    else
                    {
                        if (i.tagName && i.tagName.toLowerCase() == "textarea") {
                            return "textarea"
                        }
                        else
                        {
                            if (i.tagName) {
                                return "container"
                            }
                            else {
                                if (typeof (i) == "object") {
                                    return "object"
                                }
                                else {
                                    return undefined;
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    this._initByObject = function (h)
    {
        if (h.parent && h.parent.tagName) {
            e.base = h.parent
        }
        else
        {
            if (typeof (h.parent) == "string") {
                e.base = document.getElementById(h.parent)
            }
            else {
                e.base = document.createElement("div");
                e.base._dhx_remove = true;
            }
        }
        if (h.color) {
            e.conf.selectedColor = h.color
        }
        if (typeof (h.closeable) != "undefined") {
            this.conf.closeable = dhx4.s2b(h.closeable)
        }
        if (h.custom_colors)
        {
            this._tempInitCC = function ()
            {
                var k, j;
                this.initMemoryColors();
                this.conf.customColors = true;
                if (h.custom_colors instanceof Array)
                {
                    j = h.custom_colors.length;
                    for (k = 0; k < j; k++) {
                        this.setCustomColors(h.custom_colors[k])
                    }
                }
                if (this.base.parentNode) {
                    this.showMemory()
                }
                delete this._tempInitCC
            }
        }
        if (h.hide) {
            e.conf.hide = true
        }
        if (h.input) {
            e._addNode(h.input, h.target_color, h.target_value)
        }
        var i = h.skin || window.dhx4.skin || (typeof (dhtmlx) != "undefined" ? dhtmlx.skin : null) || window.dhx4.skinDetect("dhxcolorpicker") || "material";
        e.setSkin(i);
        if (h.colors) {
            e.initMemoryColors();
            e.conf.customColors = true
        }
        if (h.link) {
            e._addNode(h.link)
        }
    };
    this.unload = function ()
    {
        var k, h, j;
        if (this.isVisible()) {
            this.hide()
        }
        this.destructMemory();
        h = this._nodes.length;
        for (k = 0; k < h; k++)
        {
            this._detachEventsFromNode(this._nodes[k]);
            for (j in this._nodes[k]) {
                this._nodes[k][j] = null
            }
            delete this._nodes[k]
        }
        this._nodes = null;
        if (!this.base._dhx_remove) {
            this.base.className = this.base.className.replace(/\s?dhtmlxcp_\S*/, "")
        }
        else {
            delete this.base._dhx_remove
        }
        if (typeof (window.addEventListener) == "function")
        {
            this._controllerNodes.colorArea.removeEventListener("mousedown", this._initMoveSelection, 
            false);
            this._controllerNodes.colorArea.removeEventListener("dblclick", this._doOnSelectColor, false);
            this._controllerNodes.contrastArea.removeEventListener("mousedown", this._initMoveContrast, 
            false);
            this._controllerNodes.button_save.removeEventListener("click", this._doOnSelectColor, false);
            this._controllerNodes.button_cancel.removeEventListener("click", this._doOnCancel, false);
            this._controllerNodes.hue.removeEventListener("change", this._doOnChangeHSL, false);
            this._controllerNodes.sat.removeEventListener("change", this._doOnChangeHSL, false);
            this._controllerNodes.lum.removeEventListener("change", this._doOnChangeHSL, false);
            this._controllerNodes.red.removeEventListener("change", this._doOnChangeRGB, false);
            this._controllerNodes.green.removeEventListener("change", this._doOnChangeRGB, false);
            this._controllerNodes.blue.removeEventListener("change", this._doOnChangeRGB, false);
            this._controllerNodes.hsv.removeEventListener("change", this._doOnChangeHSV, false)
        }
        else
        {
            this._controllerNodes.colorArea.detachEvent("onmousedown", this._initMoveSelection);
            this._controllerNodes.colorArea.detachEvent("ondblclick", this._doOnSelectColor);
            this._controllerNodes.contrastArea.detachEvent("onmousedown", this._initMoveContrast);
            this._controllerNodes.button_save.detachEvent("onclick", this._doOnSelectColor);
            this._controllerNodes.button_cancel.detachEvent("onclick", this._doOnCancel);
            this._controllerNodes.hue.detachEvent("onchange", this._doOnChangeHSL);
            this._controllerNodes.sat.detachEvent("onchange", this._doOnChangeHSL);
            this._controllerNodes.lum.detachEvent("onchange", this._doOnChangeHSL);
            this._controllerNodes.red.detachEvent("onchange", this._doOnChangeRGB);
            this._controllerNodes.green.detachEvent("onchange", this._doOnChangeRGB);
            this._controllerNodes.blue.detachEvent("onchange", this._doOnChangeRGB);
            this._controllerNodes.hsv.detachEvent("onchange", this._doOnChangeHSV)
        }
        if (this._controllerNodes.fr_cover)
        {
            if (this._controllerNodes.fr_cover.parentNode)
            {
                this._controllerNodes.fr_cover.parentNode.removeChild(this._controllerNodes.fr_cover)
            }
            delete this._controllerNodes.fr_cover
        }
        dhx4.zim.clear(this.conf.cp_id);
        dhx4._eventable(this, "clear");
        for (j in this) {
            this [j] = null
        }
        e = null, f = null, b = null;
    };
    d = this._checkType(g);
    switch (d)
    {
        case "object":
            e._initByObject(g);
            break;
        case "input":
        case "textarea":
            e._initByObject({});
            this._addNode(g);
            break;
        case "string":
            f = document.getElementById(g);
            return new dhtmlXColorPicker(f);
            break;
        case "container":
            e._initByObject({
                parent : g
            });
            break;
        case null:
            e._initByObject({});
            break;
        case "array_string":
        case "array_input":
            e._initByObject({});
            a = g.length;
            for (c = 0; c < a; c++) {
                this._addNode(g[c])
            }
            break;
        case "array_object":
            e._initByObject({});
            a = g.length;
            for (c = 0; c < a; c++)
            {
                b = this._addNode(g[c].input, g[c].target_color, g[c].target_value).conf;
                b.customColors = (g[c].custom_colors != undefined) ? dhx4.s2b(g[c].custom_colors) : b.customColors;
                b.selectedColor = (g[c].color != undefined) ? g[c].color : b.selectedColor
            }
            break
    }
    this.base.innerHTML = "<div class='dhxcp_g_area'><div class='dhxcp_sub_area'><div class='dhxcp_g_color_area'><div class='dhxcp_color_selector'><div class='dhxcp_v_line'></div><div class='dhxcp_h_line'></div></div><div class='dhxcp_contrast_area'><div class='dhxcp_h_line'></div></div></div><div class='dhxcp_g_input_area'><div class='dhxcp_value_cont'><div class='dhxcp_value_color'></div><input type='text' class='dhxcp_value'/></div><table class='dhxcp_inputs_cont' cellpadding='0' cellspacing='0' border='0'><tr><td class='dhxcp_label_hsl'>" + this.i18n[this.conf.lang].labelHue + "</td><td class='dhxcp_input_hsl'><input type='text' class='dhxcp_input_hsl'/></td><td class='dhxcp_label_rgb'>" + this.i18n[this.conf.lang].labelRed + "</td><td class='dhxcp_input_rgb'><input type='text' class='dhxcp_input_rgb'/></td></tr><tr><td class='dhxcp_label_hsl'>" + this.i18n[this.conf.lang].labelSat + "</td><td class='dhxcp_input_hsl'><input type='text' class='dhxcp_input_hsl'/></td><td class='dhxcp_label_rgb'>" + this.i18n[this.conf.lang].labelGreen + "</td><td class='dhxcp_input_rgb'><input type='text' class='dhxcp_input_rgb'/></td></tr><tr><td class='dhxcp_label_hsl'>" + this.i18n[this.conf.lang].labelLum + "</td><td class='dhxcp_input_hsl'><input type='text' class='dhxcp_input_hsl'/></td><td class='dhxcp_label_rgb'>" + this.i18n[this.conf.lang].labelBlue + "</td><td class='dhxcp_input_rgb'><input type='text' class='dhxcp_input_rgb'/></td></tr></table></div><div class='dhxcp_g_memory_area'></div><div class='dhxcp_buttons_area'><button class='dhx_button_save'>" + this.i18n[this.conf.lang].btnSelect + "</button><button class='dhx_button_cancel'>" + this.i18n[this.conf.lang].btnCancel + "</button></div></div>";
    "</div>";
    this._globalNode = this.base.firstChild;
    this._controllerNodes = 
    {
        colorArea : this._globalNode.firstChild.firstChild.firstChild, v_line : this._globalNode.firstChild.firstChild.firstChild.childNodes[0], 
        h_line : this._globalNode.firstChild.firstChild.firstChild.childNodes[1], contrastArea : this._globalNode.firstChild.firstChild.childNodes[1], 
        contrast_line : this._globalNode.firstChild.firstChild.childNodes[1].firstChild, color : this._globalNode.firstChild.childNodes[1].childNodes[0].firstChild, 
        hsv : this._globalNode.firstChild.childNodes[1].childNodes[0].childNodes[1], hue : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[0].childNodes[1].firstChild, 
        sat : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[1].childNodes[1].firstChild, 
        lum : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[2].childNodes[1].firstChild, 
        red : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[0].childNodes[3].firstChild, 
        green : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[1].childNodes[3].firstChild, 
        blue : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[2].childNodes[3].firstChild, 
        memory_block : this._globalNode.firstChild.childNodes[2], button_save : this._globalNode.firstChild.childNodes[3].firstChild, 
        button_cancel : this._globalNode.firstChild.childNodes[3].childNodes[1]
    };
    this._labelNodes = 
    {
        labelHue : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[0].firstChild, 
        labelSat : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[1].firstChild, 
        labelLum : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[2].firstChild, 
        labelRed : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[0].childNodes[2], 
        labelGreen : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[1].childNodes[2], 
        labelBlue : this._globalNode.firstChild.childNodes[1].childNodes[1].firstChild.childNodes[2].childNodes[2], 
        btnAddColor : null, btnSelect : this._globalNode.firstChild.childNodes[3].firstChild, btnCancel : this._globalNode.firstChild.childNodes[3].childNodes[1]
    };
    if (typeof (this._tempInitCC) == "function")
    {
        this._tempInitCC()
    }
    if (typeof (window.addEventListener) == "function")
    {
        this._controllerNodes.colorArea.addEventListener("mousedown", this._initMoveSelection, false);
        this._controllerNodes.colorArea.addEventListener("dblclick", this._doOnSelectColor, false);
        this._controllerNodes.contrastArea.addEventListener("mousedown", this._initMoveContrast, false);
        this._controllerNodes.button_save.addEventListener("click", this._doOnSelectColor, false);
        this._controllerNodes.button_cancel.addEventListener("click", this._doOnCancel, false);
        this._controllerNodes.hue.addEventListener("change", this._doOnChangeHSL, false);
        this._controllerNodes.sat.addEventListener("change", this._doOnChangeHSL, false);
        this._controllerNodes.lum.addEventListener("change", this._doOnChangeHSL, false);
        this._controllerNodes.red.addEventListener("change", this._doOnChangeRGB, false);
        this._controllerNodes.green.addEventListener("change", this._doOnChangeRGB, false);
        this._controllerNodes.blue.addEventListener("change", this._doOnChangeRGB, false);
        this._controllerNodes.hsv.addEventListener("change", this._doOnChangeHSV, false)
    }
    else
    {
        this._controllerNodes.colorArea.attachEvent("onmousedown", this._initMoveSelection);
        this._controllerNodes.colorArea.attachEvent("ondblclick", this._doOnSelectColor);
        this._controllerNodes.contrastArea.attachEvent("onmousedown", this._initMoveContrast);
        this._controllerNodes.button_save.attachEvent("onclick", this._doOnSelectColor);
        this._controllerNodes.button_cancel.attachEvent("onclick", this._doOnCancel);
        this._controllerNodes.hue.attachEvent("onchange", this._doOnChangeHSL);
        this._controllerNodes.sat.attachEvent("onchange", this._doOnChangeHSL);
        this._controllerNodes.lum.attachEvent("onchange", this._doOnChangeHSL);
        this._controllerNodes.red.attachEvent("onchange", this._doOnChangeRGB);
        this._controllerNodes.green.attachEvent("onchange", this._doOnChangeRGB);
        this._controllerNodes.blue.attachEvent("onchange", this._doOnChangeRGB);
        this._controllerNodes.hsv.attachEvent("onchange", this._doOnChangeHSV)
    }
    this.setColor(this.conf.selectedColor || "#ffffff");
    if (this._nodes.length) {
        for (var c = 0; c < this._nodes.length; c++) {
            this._attachEventsToNode(this._nodes[c])
        }
    }
    if (this.conf.hide) {
        this.hide()
    }
    if (typeof (this._cpInitFRM) == "function")
    {
        this._cpInitFRM()
    }
}
dhtmlXColorPicker.prototype.linkTo = function (b, c, d)
{
    if (arguments.length == 1) {
        c = d = b
    }
    var a;
    b = b || null;
    d = d || null;
    if (typeof (c) == "string") {
        c = document.getElementById(c)
    }
    a = this._addNode(c, b, d);
    if (a) {
        this._attachEventsToNode(a)
    }
    return a;
};
dhtmlXColorPicker.prototype._isBaseNode = function (a)
{
    if (a == this.base) {
        return true
    }
    if (a.parentElement == document.body) {
        return false
    }
    else {
        if (!a.parentElement) {
            return false
        }
        else {
            return this._isBaseNode(a.parentElement);
        }
    }
};
dhtmlXColorPicker.prototype._hasInput = function (c)
{
    var b, a, d = false;
    a = this._nodes.length;
    for (b = 0; b < a; b++) {
        if (this._nodes[b].valueCont == c) {
            d = true;
            break
        }
    }
    return d;
};
dhtmlXColorPicker.prototype._findNodesByArray = function (e)
{
    var c, a, b, d = [];
    a = e.length;
    for (c = 0; c < a; c++)
    {
        if (typeof (e[c]) == "string") {
            b = document.getElementById(e[c])
        }
        else {
            b = e[c]
        }
        if (b) {
            this._addNode(b)
        }
    }
};
dhtmlXColorPicker.prototype._addNode = function (e, g, f)
{
    var b, d, c, a;
    if (typeof (e) == "string") {
        b = document.getElementById(e)
    }
    else {
        b = e
    }
    if (typeof (g) == "string") {
        g = document.getElementById(g)
    }
    if (typeof (f) == "string") {
        f = document.getElementById(f)
    }
    if (!b) {
        return null
    }
    if (dhx4.s2b(b.getAttribute("colorbox")))
    {
        d = document.createElement("div");
        d.style.width = b.offsetWidth + "px";
        d.style.height = b.offsetHeight + "px";
        b.style.width = b.offsetWidth - (b.offsetHeight + 8) + "px";
        b.parentNode.insertBefore(d, b);
        d.style.position = "relative";
        c = document.createElement("div");
        d.appendChild(b);
        d.appendChild(c);
        c.className = "dhxcp_colorBox";
        b.className += " dhxcp_colorInput";
        c.style.width = c.style.height = b.offsetHeight + "px"
    }
    a = 
    {
        node : b, valueColor : (g != undefined) ? g : c || b, valueCont : (f != undefined) ? f : b, conf : 
        {
            customColors : (b.getAttribute("customcolors") != null) ? dhx4.s2b(b.getAttribute("customcolors")) : null, 
            selectedColor : b.getAttribute("selectedcolor")
        }
    };
    this._nodes.push(a);
    if (!this.activeNode) {
        this.activeNode = a
    }
    return a;
};
dhtmlXColorPicker.prototype.getNode = function (c)
{
    var a = null, b = null;
    if (typeof (c) == "string") {
        a = document.getElementById(c)
    }
    else {
        a = c
    }
    if (a.tagName != undefined) {
        b = this._getNodeByElement(a)
    }
    return b;
};
dhtmlXColorPicker.prototype._getNodeByElement = function (c)
{
    var d = null, b, a;
    a = this._nodes.length;
    for (b = 0; b < a; b++) {
        if (this._nodes[b].node == c) {
            d = this._nodes[b];
        }
    }
    return d;
};
dhtmlXColorPicker.prototype._getNodeByValueCont = function (c)
{
    var d = null, b, a;
    a = this._nodes.length;
    for (b = 0; b < a; b++) {
        if (this._nodes[b].valueCont && this._nodes[b].valueCont == c) {
            d = this._nodes[b];
        }
    }
    return d;
};
dhtmlXColorPicker.prototype.initMemoryColors = function ()
{
    var b = this;
    this._controllerNodes.memory_block.innerHTML = "<div class='dhxcp_memory_button_cont'><button class='dhxcp_save_to_memory'><div class='dhxcp_label_bm'>" + this.i18n[this.conf.lang].btnAddColor + "</div></button></div><div class='dhxcp_memory_els_cont'><a class='dhxcp_memory_el'></a><a class='dhxcp_memory_el'></a><a class='dhxcp_memory_el'></a><a class='dhxcp_memory_el'></a><a class='dhxcp_memory_el'></a><a class='dhxcp_memory_el'></a><a class='dhxcp_memory_el'></a><a class='dhxcp_memory_el'></a></div>";
    this.memory = new this.Memory(this._controllerNodes.memory_block.childNodes[1]);
    this.memory.onSelect = this._onSelectMemoryEl;
    this.memory.onSave = function (d)
    {
        var c = b.colorAIP.rgb2hex({
            r : d.red, g : d.green, b : d.blue
        });
        b.callEvent("onSaveColor", [c])
    };
    var a = this._controllerNodes.memory_block.childNodes[0].firstChild;
    this._labelNodes.btnAddColor = this._controllerNodes.memory_block.childNodes[0].firstChild.firstChild;
    if (typeof (window.addEventListener) == "function")
    {
        a.addEventListener("click", this.saveColor, false)
    }
    else {
        a.attachEvent("onclick", this.saveColor)
    }
};
dhtmlXColorPicker.prototype._refreshCoordinatesByHSL = function (f, e, b)
{
    var a, d, c;
    a = Math.round((this.configColorArea.maxX - this.configColorArea.minX) * f / 359) + this.configColorArea.minX;
    d = Math.round((this.configColorArea.maxY - this.configColorArea.minY) * (100 - b) / 100) + this.configColorArea.minY;
    c = Math.round((this.configColorArea.maxY - this.configColorArea.minY) * (100 - e) / 100) + this.configColorArea.minY;
    this._setColorAreaXY(a, d);
    this._setContrastY(c)
};
dhtmlXColorPicker.prototype._parseColor = function (c)
{
    if (c instanceof Array) {
        var b = {
            r : parseInt(c[0]), g : parseInt(c[1]), b : parseInt(c[2])
        }
    }
    else
    {
        if (typeof (c) == "string")
        {
            c = c.replace(/\s/g, "");
            if (/^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i.test(c))
            {
                var a = c.match(/^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i);
                var b = {
                    r : parseInt(a[1]), g : parseInt(a[2]), b : parseInt(a[3])
                }
            }
            else {
                var b = this.colorAIP.hex2rgb(c);
            }
        }
    }
    return b;
};
dhtmlXColorPicker.prototype.setColor = function (f)
{
    var b = this.colorAIP.rgb2hex({
        r : this.value.red, g : this.value.green, b : this.value.blue
    });
    var c = this._parseColor(f);
    var e = (c instanceof Object);
    e = e && (0 <= c.r && c.r <= 255);
    e = e && (0 <= c.g && c.g <= 255);
    e = e && (0 <= c.b && c.b <= 255);
    if (!e) {
        return b
    }
    var d = this.colorAIP.rgb2hex({
        r : c.r, g : c.g, b : c.b
    });
    if (d == b) {
        return b
    }
    this.value.red = c.r;
    this.value.green = c.g;
    this.value.blue = c.b;
    var a = this.colorAIP.rgb2hsl(c.r / 255, c.g / 255, c.b / 255);
    this.value.hue = Math.round(a.h);
    this.value.sat = Math.round(a.s * 100);
    this.value.lum = Math.round(a.l * 100);
    this._refreshCoordinatesByHSL(this.value.hue, this.value.sat, this.value.lum);
    this._refreshContrast();
    this._refreshInputValues();
    this._refreshColorValue();
    return d;
};
dhtmlXColorPicker.prototype.getSelectedColor = function ()
{
    return [this.colorAIP.rgb2hex( {
        r : this.value.red, g : this.value.green, b : this.value.blue
    }), [this.value.red, this.value.green, this.value.blue], [this.value.hue, this.value.sat, this.value.lum]]
};
dhtmlXColorPicker.prototype._attachEventsToNode = function (a)
{
    if (typeof (window.addEventListener) == "function")
    {
        a.node.addEventListener("click", this._doOnClickByNode, false)
    }
    else {
        a.node.attachEvent("onclick", this._doOnClickByNode)
    }
    if (a.valueCont && a.valueCont.tagName.toLowerCase() == "input")
    {
        if (typeof (window.addEventListener) == "function")
        {
            a.valueCont.addEventListener("focus", this._doOnFocusByInput, false);
            a.valueCont.addEventListener("blur", this._doOnBlurByInput, false)
        }
        else
        {
            a.valueCont.attachEvent("onfocus", this._doOnFocusByInput);
            a.valueCont.attachEvent("onblur", this._doOnBlurByInput)
        }
    }
};
dhtmlXColorPicker.prototype._detachEventsFromNode = function (a)
{
    if (typeof (window.addEventListener) == "function")
    {
        a.node.removeEventListener("click", this._doOnClickByNode, false)
    }
    else {
        a.node.detachEvent("onclick", this._doOnClickByNode)
    }
    if (a.valueCont && a.valueCont.tagName.toLowerCase() == "input")
    {
        if (typeof (window.addEventListener) == "function")
        {
            a.valueCont.removeEventListener("focus", this._doOnFocusByInput, false);
            a.valueCont.removeEventListener("blur", this._doOnBlurByInput, false)
        }
        else
        {
            a.valueCont.detachEvent("onfocus", this._doOnFocusByInput);
            a.valueCont.detachEvent("onblur", this._doOnBlurByInput)
        }
    }
};
dhtmlXColorPicker.prototype.show = function (b)
{
    var a = false;
    if (b != undefined) {
        this.activeNode = this.getNode(b) || this.activeNode
    }
    if (this.activeNode && this.activeNode.valueCont && this.activeNode.valueCont.value) {
        this.setColor(this.activeNode.valueCont.value)
    }
    if (this.activeNode)
    {
        a = (this.activeNode.conf.customColors != null ? this.activeNode.conf.customColors : this.conf.customColors);
        this.setColor(this.activeNode.conf.selectedColor)
    }
    else {
        a = this.conf.customColors
    }
    if (a) {
        this.showMemory()
    }
    else {
        this.hideMemory()
    }
    if (this.base._dhx_remove)
    {
        this.base.firstChild.style.zIndex = dhx4.zim.reserve(this.conf.cp_id);
        this.base.style.visibility = "hidden";
        if (document.body.firstChild) {
            document.body.insertBefore(this.base, document.body.firstChild)
        }
        else {
            document.body.appendChild(this.base)
        }
        this._refreshPosition();
        this.base.style.visibility = "visible";
        if (typeof (window.addEventListener) == "function")
        {
            document.body.addEventListener("mousedown", this._doOnClickByBody, false)
        }
        else {
            document.body.attachEvent("onmousedown", this._doOnClickByBody)
        }
    }
    else {
        this.base.appendChild(this._globalNode)
    }
    if (this._controllerNodes.fr_cover) {
        this.base.insertBefore(this._controllerNodes.fr_cover, this._globalNode)
    }
    this.callEvent("onShow", [((this.activeNode) ? this.activeNode.node : null)])
};
dhtmlXColorPicker.prototype.setPosition = function (b, e)
{
    var d = null;
    var a = parseInt(b);
    var c = parseInt(e);
    if (isNaN(a)) {
        d = ({
            right : "right", bottom : "bottom"
        }
        [b.toLowerCase()] ? b : null)
    }
    if (this.base._dhx_remove) {
        if (d == null) {}
        else {
            this.conf.position = d;
            this._refreshPosition(d)
        }
    }
    else
    {
        if (isNaN(a) || isNaN(c)) {}
        else
        {
            this._globalNode.style.left = a + "px";
            this._globalNode.style.top = c + "px";
            if (this._controllerNodes.fr_cover)
            {
                this._controllerNodes.fr_cover.style.left = this._globalNode.style.left;
                this._controllerNodes.fr_cover.style.top = this._globalNode.style.top;
            }
        }
    }
};
dhtmlXColorPicker.prototype._initListenerInput = function ()
{
    var a = this;
    this._inputListenerId = this._inputListenerId || setInterval(function ()
    {
        a._refreshValueByInput()
    }, 70)
};
dhtmlXColorPicker.prototype._removeListenerInput = function ()
{
    if (this._inputListenerId) {
        clearInterval(this._inputListenerId);
        this._inputListenerId = null;
    }
};
dhtmlXColorPicker.prototype._refreshValueByInput = function ()
{
    var b = this.activeNode.valueCont.value, a = this.getSelectedColor()[0];
    if (this._inputListenerId)
    {
        if (/^#[\da-f]{6}$/i.test(b) && b != a) {
            this.setColor(b);
            this.callEvent("onSelect", [b, this.activeNode.node])
        }
    }
};
dhtmlXColorPicker.prototype._refreshPosition = function (b)
{
    if (this.activeNode == null) {
        return
    }
    var h = dhx4.absTop(this.activeNode.node);
    var a = dhx4.absLeft(this.activeNode.node);
    var d = dhx4.screenDim();
    var c = this._globalNode.offsetWidth;
    var e = this._globalNode.offsetHeight;
    var g = 0;
    b = b || this.conf.position;
    switch (b)
    {
        case "bottom":
            var g = h + this.activeNode.node.offsetHeight + this.conf.indent;
            var f = a;
            if (f + c > d.left + d.right) {
                f = a + this.activeNode.node.offsetWidth - c
            }
            if (f < d.left) {
                f = a
            }
            if (g + e > d.top + d.bottom) {
                g = h - e - this.conf.indent
            }
            if (g - d.top < 0) {
                g = d.top + this.conf.indent
            }
            this._globalNode.style.top = g + "px";
            this._globalNode.style.left = f + "px";
            break;
        default:
            var f = a + this.activeNode.node.offsetWidth + this.conf.indent;
            g = h;
            if (b == "right")
            {
                if (f + c > d.left + d.right) {
                    f = a - c - this.conf.indent
                }
                if (f < d.left) {
                    f = a + this.activeNode.node.offsetWidth + this.conf.indent;
                }
            }
            if (d.bottom - (g + e) <= 0) {
                g = h + this.activeNode.node.offsetHeight - e
            }
            if (g - d.top < 0) {
                g = d.top + this.conf.indent
            }
            this._globalNode.style.left = f + "px";
            this._globalNode.style.top = g + "px"
    }
    if (this._controllerNodes.fr_cover)
    {
        this._controllerNodes.fr_cover.style.left = this._globalNode.style.left;
        this._controllerNodes.fr_cover.style.top = this._globalNode.style.top;
    }
};
dhtmlXColorPicker.prototype.isVisible = function ()
{
    var a = false;
    if (this.base._dhx_remove) {
        a = this.base.parentNode == document.body
    }
    else {
        a = this._globalNode.parentNode == this.base
    }
    return a;
};
dhtmlXColorPicker.prototype.hide = function ()
{
    if (this.base._dhx_remove)
    {
        if (this.base.parentNode)
        {
            this.base.parentNode.removeChild(this.base);
            dhx4.zim.clear(this.conf.cp_id);
            if (typeof (window.addEventListener) == "function")
            {
                document.body.removeEventListener("mousedown", this._doOnClickByBody, false)
            }
            else {
                document.body.detachEvent("onmousedown", this._doOnClickByBody)
            }
        }
    }
    else {
        if (this.isVisible() == false) {
            return
        }
        this.base.removeChild(this._globalNode)
    }
    if (this._controllerNodes.fr_cover && this._controllerNodes.fr_cover.parentNode)
    {
        this._controllerNodes.fr_cover.parentNode.removeChild(this._controllerNodes.fr_cover)
    }
    if (this.callEvent != undefined) {
        this.callEvent("onHide", [((this.activeNode) ? this.activeNode.node : null)])
    }
};
dhtmlXColorPicker.prototype.configColorArea = {
    minX : 1, maxX : 209, minY : 1, maxY : 119
};
dhtmlXColorPicker.prototype._skinCollection = {
    dhx_skyblue : true, dhx_web : true, dhx_terrace : true, material : true
};
dhtmlXColorPicker.prototype.i18n = 
{
    en : 
    {
        labelHue : "Hue", labelSat : "Sat", labelLum : "Lum", labelRed : "Red", labelGreen : "Green", 
        labelBlue : "Blue", btnAddColor : "Save the color", btnSelect : "Select", btnCancel : "Cancel"
    }
};
dhtmlXColorPicker.prototype.loadUserLanguage = function (a)
{
    if (typeof (this._mergeLangModules) == "function")
    {
        this._mergeLangModules()
    }
    this.conf.lang = a;
    this._refreshLanguage()
};
dhtmlXColorPicker.prototype._refreshLanguage = function ()
{
    var a, b = this.i18n[this.conf.lang];
    for (a in b) {
        if (this._labelNodes[a]) {
            this._labelNodes[a].innerHTML = b[a];
        }
    }
};
dhtmlXColorPicker.prototype._setColorAreaXY = function (a, c)
{
    var b = this.configColorArea;
    a = parseInt(a);
    if (b.minX > a) {
        this.conf.x = b.minX
    }
    else {
        if (a > b.maxX) {
            this.conf.x = b.maxX
        }
        else {
            if (!isNaN(a)) {
                this.conf.x = a;
            }
        }
    }
    c = parseInt(c);
    if (b.minY > c) {
        this.conf.y = b.minY
    }
    else {
        if (c > b.maxY) {
            this.conf.y = b.maxY
        }
        else {
            if (!isNaN(c)) {
                this.conf.y = c;
            }
        }
    }
    this._refreshLines()
};
dhtmlXColorPicker.prototype._setColorByXYC = function (b)
{
    b = b || false;
    this.value.hue = Math.round((359 * (this.conf.x - this.configColorArea.minX)) / (this.configColorArea.maxX - this.configColorArea.minX));
    this.value.lum = Math.round(100 - (100 * (this.conf.y - this.configColorArea.minY)) / (this.configColorArea.maxY - this.configColorArea.minY));
    this.value.sat = Math.round(100 - (100 * (this.conf.c - this.configColorArea.minY)) / (this.configColorArea.maxY - this.configColorArea.minY));
    var a = this.colorAIP.hsl2rgb(this.value.hue, this.value.sat / 100, this.value.lum / 100);
    this.value.red = Math.round(255 * a.r);
    this.value.green = Math.round(255 * a.g);
    this.value.blue = Math.round(255 * a.b);
    if (!b) {
        this._refreshContrast()
    }
    this._refreshInputValues();
    this._refreshColorValue()
};
dhtmlXColorPicker.prototype._setContrastY = function (b)
{
    var a = this.configColorArea;
    b = parseInt(b);
    if (!isNaN(b)) {
        this.conf.c = Math.min(Math.max(a.minY, b), a.maxY)
    }
    this._refreshContrastLine();
};
dhtmlXColorPicker.prototype._refreshInputValues = function ()
{
    this._controllerNodes.hue.value = this.value.hue;
    this._controllerNodes.sat.value = this.value.sat;
    this._controllerNodes.lum.value = this.value.lum;
    this._controllerNodes.red.value = this.value.red;
    this._controllerNodes.green.value = this.value.green;
    this._controllerNodes.blue.value = this.value.blue;
};
dhtmlXColorPicker.prototype._refreshColorValue = function ()
{
    this._controllerNodes.color.style.backgroundColor = "rgb(" + [this.value.red, this.value.green, this.value.blue].join(", ") + ")";
    var a = this.colorAIP.rgb2hex({
        r : this.value.red, g : this.value.green, b : this.value.blue
    });
    this._controllerNodes.hsv.value = a;
    this.callEvent("onChange", [a])
};
dhtmlXColorPicker.prototype._refreshContrast = function ()
{
    var d = this.colorAIP.hsl2rgb(this.value.hue, 0, this.value.lum / 100);
    var e = this.colorAIP.hsl2rgb(this.value.hue, 1, this.value.lum / 100);
    var c = this._checkIeVersion();
    if (c && c <= 9)
    {
        var g = this._controllerNodes.contrastArea.firstChild;
        if (g == this._controllerNodes.contrast_line)
        {
            g = document.createElement("div");
            g.className += "dhxcp_ie_gradient";
            this._controllerNodes.contrastArea.appendChild(g);
            this._controllerNodes.contrastArea.appendChild(this._controllerNodes.contrast_line)
        }
        var b = this.colorAIP.rgb2hex({
            r : Math.round(255 * d.r), g : Math.round(255 * d.g), b : Math.round(255 * d.b)
        });
        var a = this.colorAIP.rgb2hex({
            r : Math.round(255 * e.r), g : Math.round(255 * e.g), b : Math.round(255 * e.b)
        });
        g.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr='" + a + "', endColorstr='" + b + "', GradientType=0)"
    }
    else
    {
        d = [Math.round(255 * d.r), Math.round(255 * d.g), Math.round(255 * d.b)];
        e = [Math.round(255 * e.r), Math.round(255 * e.g), Math.round(255 * e.b)];
        var f = "linear-gradient(rgb(" + e.join(",") + "), rgb(" + d.join(",") + "))";
        if (window.dhx4.isKHTML == true && navigator.userAgent.match(/Windows/gi) != null) {
            f = "-webkit-" + f
        }
        this._controllerNodes.contrastArea.style.backgroundImage = f;
    }
};
dhtmlXColorPicker.prototype._refreshLines = function ()
{
    this._controllerNodes.v_line.style.left = this.conf.x + "px";
    this._controllerNodes.h_line.style.top = this.conf.y + "px";
};
dhtmlXColorPicker.prototype._refreshContrastLine = function ()
{
    this._controllerNodes.contrast_line.style.top = this.conf.c + "px";
};
dhtmlXColorPicker.prototype._getOffsetPosition = function (d, a)
{
    var b = {
        x : NaN, y : NaN
    },
    c = d.target || d.srcElement;
    if (c == a)
    {
        b.x = (d.offsetX != undefined) ? d.offsetX : d.layerX;
        b.y = (d.offsetY != undefined) ? d.offsetY : d.layerY
    }
    else
    {
        if (c == this._controllerNodes.v_line) {
            b.y = (d.offsetY != undefined) ? d.offsetY : d.layerY
        }
        else {
            b.x = (d.offsetX != undefined) ? d.offsetX : d.layerX
        }
    }
    return b;
};
dhtmlXColorPicker.prototype.colorAIP = 
{
    hex2rgb : function (b)
    {
        var a = b.match(/^(#)([\da-f]{2})([\da-f]{2})([\da-f]{2})$/i);
        if (a != null) {
            return {
                r : parseInt("0x" + a[2]), g : parseInt("0x" + a[3]), b : parseInt("0x" + a[4])
            }
        }
        else {
            return null;
        }
    },
    rgb2hex : function (e)
    {
        var d = parseInt(e.r), c = parseInt(e.g), a = parseInt(e.b);
        d = d || 0, c = c || 0, a = a || 0;
        return "#" + ((d) ? ((d < 16) ? "0" + d.toString(16) : d.toString(16)) : "00") + ((c) ? ((c < 16) ? "0" + c.toString(16) : c.toString(16)) : "00") + ((a) ? ((a < 16) ? "0" + a.toString(16) : a.toString(16)) : "00");
    },
    rgb2hsl : function (j, i, d)
    {
        var h, f, c;
        var a = Math.max(j, i, d), e = Math.min(j, i, d);
        c = 0.5 * (a + e);
        if (a == e) {
            h = 0
        }
        else
        {
            if (a == j) {
                h = 60 * (i - d) / (a - e);
                if (i < d) {
                    h += 360
                }
            }
            else {
                if (a == i) {
                    h = 60 * (d - j) / (a - e) + 120
                }
                else {
                    h = 60 * (j - i) / (a - e) + 240;
                }
            }
        }
        if (c == 0 || a == e) {
            f = 0
        }
        else {
            if (c <= 0.5) {
                f = 0.5 * (a - e) / c
            }
            else {
                f = 0.5 * (a - e) / (1 - c);
            }
        }
        return {
            h : h, s : f, l : c
        }
    },
    hsl2rgb : function (j, c, g)
    {
        var e, f, h;
        var b = [], a = [];
        if (g <= 0.5) {
            e = g * (1 + c)
        }
        else {
            e = g + c - (g * c)
        }
        f = 2 * g - e;
        h = j / 360;
        b.push(h + 1 / 3);
        b.push(h);
        b.push(h - 1 / 3);
        for (var d = 0; d < 3; d++)
        {
            if (b[d] < 0) {
                b[d] += 1
            }
            else {
                if (b[d] > 1) {
                    b[d] -= 1
                }
            }
            if (b[d] < 1 / 6) {
                a.push(f + (e - f) * 6 * b[d])
            }
            else
            {
                if (b[d] < 0.5) {
                    a.push(e)
                }
                else {
                    if (b[d] < 2 / 3) {
                        a.push(f + (e - f) * (2 / 3 - b[d]) * 6)
                    }
                    else {
                        a.push(f)
                    }
                }
            }
        }
        return {
            r : a[0], g : a[1], b : a[2]
        }
    }
};
dhtmlXColorPicker.prototype._checkIeVersion = function ()
{
    var a;
    var b = navigator.userAgent.match(/(MSIE)\s(\d\.\d)/i);
    a = (b && b[2]) ? parseInt(b[2]) : null;
    return a;
};
dhtmlXColorPicker.prototype.setCustomColors = function ()
{
    if (this.memory == null) {
        this.initMemoryColors();
        this.conf.customColors = true
    }
    var d, c, f, b, e, a;
    c = arguments.length;
    for (d = 0; d < c; d++)
    {
        if (arguments[d] instanceof Array)
        {
            f = this._rgb2value(arguments[d][0], arguments[d][1], arguments[d][2]);
            this.memory.setValue(f, null, false);
            continue
        }
        else
        {
            if (typeof (arguments[d]) == "string")
            {
                b = arguments[d].match(/^rgb\((\d{1,3})\,(\d{1,3})\,(\d{1,3})\)$/i);
                if (b instanceof Array) {
                    f = this._rgb2value(b[1], b[2], b[3]);
                    this.memory.setValue(f, null, false);
                    continue
                }
                b = arguments[d].match(/(#[\da-f]{6})/ig);
                if (b instanceof Array)
                {
                    a = b.length;
                    for (e = 0; e < a; e++) {
                        f = this._hex2value(b[e]);
                        this.memory.setValue(f, null, false)
                    }
                }
            }
        }
    }
};
dhtmlXColorPicker.prototype.getCustomColors = function ()
{
    var b = [];
    if (this.memory != null && this.conf.customColors == true)
    {
        for (var c = 0; c < this.memory.controllers.length; c++)
        {
            var a = this.memory.controllers[c].value;
            b.push(this.colorAIP.rgb2hex({
                r : a.red, g : a.green, b : a.blue
            }))
        }
    }
    return b;
};
dhtmlXColorPicker.prototype._rgb2value = function (e, d, a)
{
    var c = this.colorAIP.rgb2hsl(e / 255, d / 255, a / 255);
    return {
        red : e, green : d, blue : a, hue : Math.round(c.h), sat : Math.round(c.s * 100), lum : Math.round(c.l * 100)
    }
};
dhtmlXColorPicker.prototype._hex2value = function (c)
{
    var b, a;
    b = this.colorAIP.hex2rgb(c);
    a = this.colorAIP.rgb2hsl(b.r / 255, b.g / 255, b.b / 255);
    return {
        red : b.r, green : b.g, blue : b.b, hue : Math.round(a.h), sat : Math.round(a.s * 100), lum : Math.round(a.l * 100)
    }
};
dhtmlXColorPicker.prototype.showMemory = function ()
{
    if (this.memory == null) {
        this.initMemoryColors()
    }
    if (!this._globalNode.className.match(/dhxcp_add_memory/)) {
        this._globalNode.className += " dhxcp_add_memory"
    }
    this.conf.customColors = true;
};
dhtmlXColorPicker.prototype.hideMemory = function ()
{
    if (this.memory != null)
    {
        this._globalNode.className = this._globalNode.className.replace(/\sdhxcp_add_memory/, "")
    }
    this.conf.customColors = false;
};
dhtmlXColorPicker.prototype.setSkin = function (e)
{
    if (this._skinCollection[e] != true) {
        return
    }
    var d = "dhtmlxcp_" + (this.skin || "dummy");
    this.base.className = this.base.className.replace(new RegExp(d), "");
    this.base.className += " dhtmlxcp_" + e;
    this.skin = e;
    if (this.skin == "material")
    {
        var c = {
            labelHue : "H", labelSat : "S", labelLum : "L", labelRed : "R", labelGreen : "G", labelBlue : "B"
        };
        for (var b in c) {
            this.i18n.en[b] = c[b];
        }
    }
    if (this.base.className.match(/dhxcp_shadow/) == null && !(dhx4.isIE6 || dhx4.isIE7 || dhx4.isIE8)) {
        this.base.className += " dhxcp_shadow"
    }
};
dhtmlXColorPicker.prototype.hideOnSelect = function (a)
{
    a = dhx4.s2b(a);
    this.conf.hideOnSelect = a;
};
dhtmlXColorPicker.prototype._indexOf = function (a, d)
{
    var c, b, e =- 1;
    b = a.length;
    for (c = b; c >= 0; c--) {
        if (a[c] == d) {
            e = c;
            break
        }
    }
    return e;
};
dhtmlXColorPicker.prototype.destructMemory = function ()
{
    if (this.memory == null) {
        return
    }
    this.hideMemory();
    var a = this._controllerNodes.memory_block.childNodes[0].firstChild;
    this._labelNodes.btnAddColor = null;
    if (typeof (window.addEventListener) == "function")
    {
        a.removeEventListener("click", this.saveColor, false)
    }
    else {
        a.detachEvent("onclick", this.saveColor)
    }
    this.memory.remove();
    this._controllerNodes.memory_block.innerHTML = "";
    this.memory = null;
};
dhtmlXColorPicker.prototype.Memory = function (c)
{
    var b = this, a = null, d = {
        red : 255, blue : 255, green : 255, hue : 0, sat : 0, lum : 100
    };
    this.select = function ()
    {
        var f = (this != window) ? this : event.srcElement;
        var e = e || f.dhxpc_memory;
        if (a != null) {
            b.unSelect()
        }
        a = e;
        e.domElement.className += " dhxcp_memory_el_select";
        if (typeof (b.onSelect) == "function")
        {
            b.onSelect(e)
        }
    };
    this.onSelect = null;
    this.onSave = null;
    this._createMemoryController = function (e)
    {
        var f = {
            domElement : e, value : dhx4._copyObj(d)
        };
        e.dhxpc_memory = f;
        if (typeof (window.addEventListener) == "function")
        {
            e.addEventListener("click", b.select, false)
        }
        else {
            e.attachEvent("onclick", b.select)
        }
        return f;
    };
    this._findMemoryControllers = function (j)
    {
        var g = j.getElementsByTagName("a"), f, e, h = [];
        e = g.length;
        for (f = 0; f < e; f++) {
            h.push(this._createMemoryController(g[f]))
        }
        return h;
    };
    this.controllers = this._findMemoryControllers(c);
    this.unSelect = function ()
    {
        if (a) {
            a.domElement.className = a.domElement.className.replace(/\s.*$/i, "")
        }
        a = null;
    };
    this.setActiveNext = function ()
    {
        var f = null, e;
        if (a == null) {
            a = this.controllers[0]
        }
        else
        {
            f = this.getIndex(a);
            e = this.controllers.length;
            this.unSelect();
            a = (f + 1 < e) ? this.controllers[f + 1] : this.controllers[0]
        }
        a.domElement.className += " dhxcp_memory_el_next";
        return a;
    };
    this.setValue = function (f, e, g)
    {
        a = e || a;
        if (a == null) {
            a = this.controllers[0]
        }
        a.value.red = f.red;
        a.value.blue = f.blue;
        a.value.green = f.green;
        a.value.hue = f.hue;
        a.value.sat = f.sat;
        a.value.lum = f.lum;
        a.domElement.style.backgroundColor = "rgb(" + [f.red, f.green, f.blue].join(", ") + ")";
        this.setActiveNext();
        if ((g != false) && (typeof (this.onSave) == "function"))
        {
            this.onSave(f)
        }
    };
    this.clean = function ()
    {
        var e = this.controllers.length, g;
        for (var f = 0; f < e; f++)
        {
            g = this.controllers[f];
            g.value = dhx4._copyObj(d);
            g.domElement.style.backgroundColor = "rgb(" + [d.red, d.green, d.blue].join(", ") + ")"
        }
        this.unSelect();
        a = this.controllers[0];
    };
    this.getIndex = function (g)
    {
        var f, e, h =- 1;
        e = this.controllers.length;
        for (f = 0; f < e; f++) {
            if (this.controllers[f] == g) {
                h = f;
                break
            }
        }
        return h;
    };
    this.remove = function ()
    {
        var f, e;
        e = this.controllers.length;
        for (f = 0; f < e; f++)
        {
            if (typeof (window.addEventListener) == "function")
            {
                this.controllers[f].domElement.removeEventListener("click", this.select, false)
            }
            else {
                this.controllers[f].domElement.detachEvent("onclick", this.select)
            }
            delete this.controllers[f].domElement.dhxpc_memory
        }
        delete this.onSelect;
        delete this.controllers;
        delete this.onSave
    }
};
if (window.dhx4.isIE6)
{
    dhtmlXColorPicker.prototype._cpInitFRM = function ()
    {
        var a;
        if (!this._controllerNodes.fr_cover)
        {
            a = document.createElement("IFRAME");
            a.className = "dhxcp_frm";
            a.border = 0;
            a.frameBorder = 0;
            this._controllerNodes.fr_cover = a
        }
        if (!this.base._dhx_remove) {
            this.base.insertBefore(a, this._globalNode)
        }
    }
};

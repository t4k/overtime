! function(e) {
    var t;
    "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof exports ? (t = require("jquery"), module.exports = e(t)) : e(window.jQuery || window.Zepto || window.$)
}(function(d) {
    "use strict";
    var o = /\r?\n/g,
        i = /^(?:submit|button|image|reset|file)$/i,
        n = /^(?:input|select|textarea|keygen)/i,
        l = /^(?:checkbox|radio)$/i,
        a = (d.fn.serializeJSON = function(e) {
            var r = d.serializeJSON,
                a = r.setupOpts(e),
                o = d.extend({}, a.defaultTypes, a.customTypes),
                e = r.serializeArray(this, a),
                l = {};
            return d.each(e, function(e, t) {
                var i, n = t.name,
                    s = d(t.el).attr("data-value-type");
                s || a.disableColonTypes || (n = (i = r.splitType(t.name))[0], s = i[1]), "skip" !== s && (s = s || a.defaultType, (i = r.applyTypeFunc(t.name, t.value, s, t.el, o)) || !r.shouldSkipFalsy(t.name, n, s, t.el, a)) && (s = r.splitInputNameIntoKeysArray(n), r.deepSet(l, s, i, a))
            }), l
        }, d.serializeJSON = {
            defaultOptions: {},
            defaultBaseOptions: {
                checkboxUncheckedValue: void 0,
                useIntKeysAsArrayIndex: !1,
                skipFalsyValuesForTypes: [],
                skipFalsyValuesForFields: [],
                disableColonTypes: !1,
                customTypes: {},
                defaultTypes: {
                    string: function(e) {
                        return String(e)
                    },
                    number: function(e) {
                        return Number(e)
                    },
                    boolean: function(e) {
                        return -1 === ["false", "null", "undefined", "", "0"].indexOf(e)
                    },
                    null: function(e) {
                        return -1 === ["false", "null", "undefined", "", "0"].indexOf(e) ? e : null
                    },
                    array: function(e) {
                        return JSON.parse(e)
                    },
                    object: function(e) {
                        return JSON.parse(e)
                    },
                    skip: null
                },
                defaultType: "string"
            },
            setupOpts: function(e) {
                var t, i = d.serializeJSON,
                    n = ["checkboxUncheckedValue", "useIntKeysAsArrayIndex", "skipFalsyValuesForTypes", "skipFalsyValuesForFields", "disableColonTypes", "customTypes", "defaultTypes", "defaultType"];
                for (t in e = null == e ? {} : e)
                    if (-1 === n.indexOf(t)) throw new Error("serializeJSON ERROR: invalid option '" + t + "'. Please use one of " + n.join(", "));
                return d.extend({}, i.defaultBaseOptions, i.defaultOptions, e)
            },
            serializeArray: function(e, r) {
                null == r && (r = {});
                var a = d.serializeJSON;
                return e.map(function() {
                    var e = d.prop(this, "elements");
                    return e ? d.makeArray(e) : this
                }).filter(function() {
                    var e = d(this),
                        t = this.type;
                    return this.name && !e.is(":disabled") && n.test(this.nodeName) && !i.test(t) && (this.checked || !l.test(t) || null != a.getCheckboxUncheckedValue(e, r))
                }).map(function(e, t) {
                    var i = d(this),
                        n = i.val(),
                        s = this.type;
                    return null == n ? null : (l.test(s) && !this.checked && (n = a.getCheckboxUncheckedValue(i, r)), f(n) ? d.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(o, "\r\n"),
                            el: t
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(o, "\r\n"),
                        el: t
                    })
                }).get()
            },
            getCheckboxUncheckedValue: function(e, t) {
                e = e.attr("data-unchecked-value");
                return e = null == e ? t.checkboxUncheckedValue : e
            },
            applyTypeFunc: function(e, t, i, n, s) {
                var r = s[i];
                if (r) return r(t, n);
                throw new Error("serializeJSON ERROR: Invalid type " + i + " found in input name '" + e + "', please use one of " + a(s).join(", "))
            },
            splitType: function(e) {
                var t, i = e.split(":");
                return 1 < i.length ? (t = i.pop(), [i.join(":"), t]) : [e, ""]
            },
            shouldSkipFalsy: function(e, t, i, n, s) {
                var n = d(n).attr("data-skip-falsy");
                return null != n ? "false" !== n : !(!(n = s.skipFalsyValuesForFields) || -1 === n.indexOf(t) && -1 === n.indexOf(e)) || !(!(t = s.skipFalsyValuesForTypes) || -1 === t.indexOf(i))
            },
            splitInputNameIntoKeysArray: function(e) {
                e = e.split("[");
                return "" === (e = d.map(e, function(e) {
                    return e.replace(/\]/g, "")
                }))[0] && e.shift(), e
            },
            deepSet: function(e, t, i, n) {
                null == n && (n = {});
                var s = d.serializeJSON;
                if (u(e)) throw new Error("ArgumentError: param 'o' expected to be an object or array, found undefined");
                if (!t || 0 === t.length) throw new Error("ArgumentError: param 'keys' expected to be an array with least one element");
                var r, a, o, l = t[0];
                1 === t.length ? "" === l ? e.push(i) : e[l] = i : (r = t[1], t = t.slice(1), "" === l && (o = e[a = e.length - 1], l = c(o) && u(s.deepGet(o, t)) ? a : 1 + a), "" === r || n.useIntKeysAsArrayIndex && h(r) ? !u(e[l]) && f(e[l]) || (e[l] = []) : !u(e[l]) && c(e[l]) || (e[l] = {}), s.deepSet(e[l], t, i, n))
            },
            deepGet: function(e, t) {
                var i, n = d.serializeJSON;
                return u(e) || u(t) || 0 === t.length || !c(e) && !f(e) ? e : "" !== (i = t[0]) ? 1 === t.length ? e[i] : (t = t.slice(1), n.deepGet(e[i], t)) : void 0
            }
        }, function(e) {
            if (Object.keys) return Object.keys(e);
            var t, i = [];
            for (t in e) i.push(t);
            return i
        }),
        c = function(e) {
            return e === Object(e)
        },
        u = function(e) {
            return void 0 === e
        },
        h = function(e) {
            return /^[0-9]+$/.test(String(e))
        },
        f = Array.isArray || function(e) {
            return "[object Array]" === Object.prototype.toString.call(e)
        }
}),
function(u) {
    u.notification = function(e, t) {
        if ("" !== e && null != e) {
            t = u.extend(!0, {
                className: "jquery-notification",
                duration: 2e3,
                freezeOnHover: !0,
                hideSpeed: 200,
                position: "center",
                showSpeed: 150,
                zIndex: 99999
            }, t), 0 < u("#jquery-notification").length && (t.showSpeed = 0), u("#jquery-notification").remove();
            var i, n, s, r, a, o = u(window).width(),
                l = u(window).height(),
                d = u('<div id="jquery-notification" />');
            switch (d.appendTo(u("BODY")).addClass(t.className).html(e).css({
                    position: "fixed",
                    display: "none",
                    zIndex: t.zIndex
                }).mouseover(function() {
                    t.freezeOnHover && clearTimeout(a), u(this).addClass(t.className + "-hover")
                }).mouseout(function() {
                    u(this).removeClass(t.className + "-hover"), t.freezeOnHover && (a = setTimeout(c, t.duration))
                }).click(c).wrapInner('<div id="jquery-notification-message" />'), i = d.outerWidth(), n = d.outerHeight(), t.position) {
                case "top":
                    s = 0, r = o / 2 - i / 2;
                    break;
                case "top-left":
                    r = s = 0;
                    break;
                case "top-right":
                    s = 0, r = o - i;
                    break;
                case "bottom":
                    s = l - n, r = o / 2 - i / 2;
                    break;
                case "bottom-left":
                    s = l - n, r = 0;
                    break;
                case "bottom-right":
                    s = l - n, r = o - i;
                    break;
                case "left":
                    s = l / 2 - n / 2, r = 0;
                    break;
                case "right":
                    s = l / 2 - n / 2, r = o - i;
                    break;
                default:
                    s = l / 2 - n / 2, r = o / 2 - i / 2
            }
            d.css({
                top: s,
                left: r
            }).fadeIn(t.showSpeed, function() {
                a = setTimeout(c, t.duration)
            })
        }

        function c() {
            clearTimeout(a), d.fadeOut(t.hideSpeed, function() {
                u(this).remove()
            })
        }
    }
}(jQuery),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.moment = t()
}(this, function() {
    "use strict";
    var N;

    function m() {
        return N.apply(null, arguments)
    }

    function g(e) {
        return e instanceof Array || "[object Array]" === Object.prototype.toString.call(e)
    }

    function H(e) {
        return null != e && "[object Object]" === Object.prototype.toString.call(e)
    }

    function h(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function A(e) {
        if (Object.getOwnPropertyNames) return 0 === Object.getOwnPropertyNames(e).length;
        for (var t in e)
            if (h(e, t)) return;
        return 1
    }

    function y(e) {
        return void 0 === e
    }

    function v(e) {
        return "number" == typeof e || "[object Number]" === Object.prototype.toString.call(e)
    }

    function P(e) {
        return e instanceof Date || "[object Date]" === Object.prototype.toString.call(e)
    }

    function z(e, t) {
        for (var i = [], n = e.length, s = 0; s < n; ++s) i.push(t(e[s], s));
        return i
    }

    function F(e, t) {
        for (var i in t) h(t, i) && (e[i] = t[i]);
        return h(t, "toString") && (e.toString = t.toString), h(t, "valueOf") && (e.valueOf = t.valueOf), e
    }

    function d(e, t, i, n) {
        return Ot(e, t, i, n, !0).utc()
    }

    function _(e) {
        return null == e._pf && (e._pf = {
            empty: !1,
            unusedTokens: [],
            unusedInput: [],
            overflow: -2,
            charsLeftOver: 0,
            nullInput: !1,
            invalidEra: null,
            invalidMonth: null,
            invalidFormat: !1,
            userInvalidated: !1,
            iso: !1,
            parsedDateParts: [],
            era: null,
            meridiem: null,
            rfc2822: !1,
            weekdayMismatch: !1
        }), e._pf
    }

    function R(e) {
        if (null == e._isValid) {
            var t = _(e),
                i = U.call(t.parsedDateParts, function(e) {
                    return null != e
                }),
                i = !isNaN(e._d.getTime()) && t.overflow < 0 && !t.empty && !t.invalidEra && !t.invalidMonth && !t.invalidWeekday && !t.weekdayMismatch && !t.nullInput && !t.invalidFormat && !t.userInvalidated && (!t.meridiem || t.meridiem && i);
            if (e._strict && (i = i && 0 === t.charsLeftOver && 0 === t.unusedTokens.length && void 0 === t.bigHour), null != Object.isFrozen && Object.isFrozen(e)) return i;
            e._isValid = i
        }
        return e._isValid
    }

    function W(e) {
        var t = d(NaN);
        return null != e ? F(_(t), e) : _(t).userInvalidated = !0, t
    }
    var U = Array.prototype.some || function(e) {
            for (var t = Object(this), i = t.length >>> 0, n = 0; n < i; n++)
                if (n in t && e.call(this, t[n], n, t)) return !0;
            return !1
        },
        V = m.momentProperties = [],
        B = !1;

    function Q(e, t) {
        var i, n, s, r = V.length;
        if (y(t._isAMomentObject) || (e._isAMomentObject = t._isAMomentObject), y(t._i) || (e._i = t._i), y(t._f) || (e._f = t._f), y(t._l) || (e._l = t._l), y(t._strict) || (e._strict = t._strict), y(t._tzm) || (e._tzm = t._tzm), y(t._isUTC) || (e._isUTC = t._isUTC), y(t._offset) || (e._offset = t._offset), y(t._pf) || (e._pf = _(t)), y(t._locale) || (e._locale = t._locale), 0 < r)
            for (i = 0; i < r; i++) y(s = t[n = V[i]]) || (e[n] = s);
        return e
    }

    function G(e) {
        Q(this, e), this._d = new Date(null != e._d ? e._d.getTime() : NaN), this.isValid() || (this._d = new Date(NaN)), !1 === B && (B = !0, m.updateOffset(this), B = !1)
    }

    function b(e) {
        return e instanceof G || null != e && null != e._isAMomentObject
    }

    function q(e) {
        !1 === m.suppressDeprecationWarnings && "undefined" != typeof console && console.warn && console.warn("Deprecation warning: " + e)
    }

    function e(r, a) {
        var o = !0;
        return F(function() {
            if (null != m.deprecationHandler && m.deprecationHandler(null, r), o) {
                for (var e, t, i = [], n = arguments.length, s = 0; s < n; s++) {
                    if (e = "", "object" == typeof arguments[s]) {
                        for (t in e += "\n[" + s + "] ", arguments[0]) h(arguments[0], t) && (e += t + ": " + arguments[0][t] + ", ");
                        e = e.slice(0, -2)
                    } else e = arguments[s];
                    i.push(e)
                }
                q(r + "\nArguments: " + Array.prototype.slice.call(i).join("") + "\n" + (new Error).stack), o = !1
            }
            return a.apply(this, arguments)
        }, a)
    }
    var Z = {};

    function J(e, t) {
        null != m.deprecationHandler && m.deprecationHandler(e, t), Z[e] || (q(t), Z[e] = !0)
    }

    function a(e) {
        return "undefined" != typeof Function && e instanceof Function || "[object Function]" === Object.prototype.toString.call(e)
    }

    function K(e, t) {
        var i, n = F({}, e);
        for (i in t) h(t, i) && (H(e[i]) && H(t[i]) ? (n[i] = {}, F(n[i], e[i]), F(n[i], t[i])) : null != t[i] ? n[i] = t[i] : delete n[i]);
        for (i in e) h(e, i) && !h(t, i) && H(e[i]) && (n[i] = F({}, n[i]));
        return n
    }

    function X(e) {
        null != e && this.set(e)
    }
    m.suppressDeprecationWarnings = !1, m.deprecationHandler = null;
    var ee = Object.keys || function(e) {
        var t, i = [];
        for (t in e) h(e, t) && i.push(t);
        return i
    };

    function r(e, t, i) {
        var n = "" + Math.abs(e);
        return (0 <= e ? i ? "+" : "" : "-") + Math.pow(10, Math.max(0, t - n.length)).toString().substr(1) + n
    }
    var te = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|N{1,5}|YYYYYY|YYYYY|YYYY|YY|y{2,4}|yo?|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        ie = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        ne = {},
        se = {};

    function n(e, t, i, n) {
        var s = "string" == typeof n ? function() {
            return this[n]()
        } : n;
        e && (se[e] = s), t && (se[t[0]] = function() {
            return r(s.apply(this, arguments), t[1], t[2])
        }), i && (se[i] = function() {
            return this.localeData().ordinal(s.apply(this, arguments), e)
        })
    }

    function re(e, t) {
        return e.isValid() ? (t = ae(t, e.localeData()), ne[t] = ne[t] || function(n) {
            for (var e, s = n.match(te), t = 0, r = s.length; t < r; t++) se[s[t]] ? s[t] = se[s[t]] : s[t] = (e = s[t]).match(/\[[\s\S]/) ? e.replace(/^\[|\]$/g, "") : e.replace(/\\/g, "");
            return function(e) {
                for (var t = "", i = 0; i < r; i++) t += a(s[i]) ? s[i].call(e, n) : s[i];
                return t
            }
        }(t), ne[t](e)) : e.localeData().invalidDate()
    }

    function ae(e, t) {
        var i = 5;

        function n(e) {
            return t.longDateFormat(e) || e
        }
        for (ie.lastIndex = 0; 0 <= i && ie.test(e);) e = e.replace(ie, n), ie.lastIndex = 0, --i;
        return e
    }
    var oe = {};

    function t(e, t) {
        var i = e.toLowerCase();
        oe[i] = oe[i + "s"] = oe[t] = e
    }

    function o(e) {
        return "string" == typeof e ? oe[e] || oe[e.toLowerCase()] : void 0
    }

    function le(e) {
        var t, i, n = {};
        for (i in e) h(e, i) && (t = o(i)) && (n[t] = e[i]);
        return n
    }
    var de = {};

    function i(e, t) {
        de[e] = t
    }

    function ce(e) {
        return e % 4 == 0 && e % 100 != 0 || e % 400 == 0
    }

    function u(e) {
        return e < 0 ? Math.ceil(e) || 0 : Math.floor(e)
    }

    function c(e) {
        var e = +e,
            t = 0;
        return t = 0 != e && isFinite(e) ? u(e) : t
    }

    function ue(t, i) {
        return function(e) {
            return null != e ? (fe(this, t, e), m.updateOffset(this, i), this) : he(this, t)
        }
    }

    function he(e, t) {
        return e.isValid() ? e._d["get" + (e._isUTC ? "UTC" : "") + t]() : NaN
    }

    function fe(e, t, i) {
        e.isValid() && !isNaN(i) && ("FullYear" === t && ce(e.year()) && 1 === e.month() && 29 === e.date() ? (i = c(i), e._d["set" + (e._isUTC ? "UTC" : "") + t](i, e.month(), Ee(i, e.month()))) : e._d["set" + (e._isUTC ? "UTC" : "") + t](i))
    }
    var s = /\d/,
        l = /\d\d/,
        pe = /\d{3}/,
        me = /\d{4}/,
        ge = /[+-]?\d{6}/,
        f = /\d\d?/,
        ye = /\d\d\d\d?/,
        ve = /\d\d\d\d\d\d?/,
        _e = /\d{1,3}/,
        be = /\d{1,4}/,
        we = /[+-]?\d{1,6}/,
        ke = /\d+/,
        xe = /[+-]?\d+/,
        Se = /Z|[+-]\d\d:?\d\d/gi,
        Me = /Z|[+-]\d\d(?::?\d\d)?/gi,
        p = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    function w(e, i, n) {
        Te[e] = a(i) ? i : function(e, t) {
            return e && n ? n : i
        }
    }

    function De(e, t) {
        return h(Te, e) ? Te[e](t._strict, t._locale) : new RegExp(k(e.replace("\\", "").replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function(e, t, i, n, s) {
            return t || i || n || s
        })))
    }

    function k(e) {
        return e.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")
    }
    var Te = {},
        Ye = {};

    function x(e, i) {
        var t, n, s = i;
        for ("string" == typeof e && (e = [e]), v(i) && (s = function(e, t) {
                t[i] = c(e)
            }), n = e.length, t = 0; t < n; t++) Ye[e[t]] = s
    }

    function Ie(e, s) {
        x(e, function(e, t, i, n) {
            i._w = i._w || {}, s(e, i._w, i, n)
        })
    }
    var S, M = 0,
        D = 1,
        T = 2,
        Y = 3,
        I = 4,
        L = 5,
        Le = 6,
        Oe = 7,
        Ce = 8;

    function Ee(e, t) {
        var i;
        return isNaN(e) || isNaN(t) ? NaN : (i = (t % (i = 12) + i) % i, e += (t - i) / 12, 1 == i ? ce(e) ? 29 : 28 : 31 - i % 7 % 2)
    }
    S = Array.prototype.indexOf || function(e) {
        for (var t = 0; t < this.length; ++t)
            if (this[t] === e) return t;
        return -1
    }, n("M", ["MM", 2], "Mo", function() {
        return this.month() + 1
    }), n("MMM", 0, 0, function(e) {
        return this.localeData().monthsShort(this, e)
    }), n("MMMM", 0, 0, function(e) {
        return this.localeData().months(this, e)
    }), t("month", "M"), i("month", 8), w("M", f), w("MM", f, l), w("MMM", function(e, t) {
        return t.monthsShortRegex(e)
    }), w("MMMM", function(e, t) {
        return t.monthsRegex(e)
    }), x(["M", "MM"], function(e, t) {
        t[D] = c(e) - 1
    }), x(["MMM", "MMMM"], function(e, t, i, n) {
        n = i._locale.monthsParse(e, n, i._strict);
        null != n ? t[D] = n : _(i).invalidMonth = e
    });
    var $e = "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        je = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        Ne = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        He = p,
        Ae = p;

    function Pe(e, t) {
        var i;
        if (e.isValid()) {
            if ("string" == typeof t)
                if (/^\d+$/.test(t)) t = c(t);
                else if (!v(t = e.localeData().monthsParse(t))) return;
            i = Math.min(e.date(), Ee(e.year(), t)), e._d["set" + (e._isUTC ? "UTC" : "") + "Month"](t, i)
        }
    }

    function ze(e) {
        return null != e ? (Pe(this, e), m.updateOffset(this, !0), this) : he(this, "Month")
    }

    function Fe() {
        function e(e, t) {
            return t.length - e.length
        }
        for (var t, i = [], n = [], s = [], r = 0; r < 12; r++) t = d([2e3, r]), i.push(this.monthsShort(t, "")), n.push(this.months(t, "")), s.push(this.months(t, "")), s.push(this.monthsShort(t, ""));
        for (i.sort(e), n.sort(e), s.sort(e), r = 0; r < 12; r++) i[r] = k(i[r]), n[r] = k(n[r]);
        for (r = 0; r < 24; r++) s[r] = k(s[r]);
        this._monthsRegex = new RegExp("^(" + s.join("|") + ")", "i"), this._monthsShortRegex = this._monthsRegex, this._monthsStrictRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._monthsShortStrictRegex = new RegExp("^(" + i.join("|") + ")", "i")
    }

    function Re(e) {
        return ce(e) ? 366 : 365
    }
    n("Y", 0, 0, function() {
        var e = this.year();
        return e <= 9999 ? r(e, 4) : "+" + e
    }), n(0, ["YY", 2], 0, function() {
        return this.year() % 100
    }), n(0, ["YYYY", 4], 0, "year"), n(0, ["YYYYY", 5], 0, "year"), n(0, ["YYYYYY", 6, !0], 0, "year"), t("year", "y"), i("year", 1), w("Y", xe), w("YY", f, l), w("YYYY", be, me), w("YYYYY", we, ge), w("YYYYYY", we, ge), x(["YYYYY", "YYYYYY"], M), x("YYYY", function(e, t) {
        t[M] = 2 === e.length ? m.parseTwoDigitYear(e) : c(e)
    }), x("YY", function(e, t) {
        t[M] = m.parseTwoDigitYear(e)
    }), x("Y", function(e, t) {
        t[M] = parseInt(e, 10)
    }), m.parseTwoDigitYear = function(e) {
        return c(e) + (68 < c(e) ? 1900 : 2e3)
    };
    var We = ue("FullYear", !0);

    function Ue(e, t, i, n, s, r, a) {
        var o;
        return e < 100 && 0 <= e ? (o = new Date(e + 400, t, i, n, s, r, a), isFinite(o.getFullYear()) && o.setFullYear(e)) : o = new Date(e, t, i, n, s, r, a), o
    }

    function Ve(e) {
        var t;
        return e < 100 && 0 <= e ? ((t = Array.prototype.slice.call(arguments))[0] = e + 400, t = new Date(Date.UTC.apply(null, t)), isFinite(t.getUTCFullYear()) && t.setUTCFullYear(e)) : t = new Date(Date.UTC.apply(null, arguments)), t
    }

    function Be(e, t, i) {
        i = 7 + t - i;
        return i - (7 + Ve(e, 0, i).getUTCDay() - t) % 7 - 1
    }

    function Qe(e, t, i, n, s) {
        var r, t = 1 + 7 * (t - 1) + (7 + i - n) % 7 + Be(e, n, s),
            i = t <= 0 ? Re(r = e - 1) + t : t > Re(e) ? (r = e + 1, t - Re(e)) : (r = e, t);
        return {
            year: r,
            dayOfYear: i
        }
    }

    function Ge(e, t, i) {
        var n, s, r = Be(e.year(), t, i),
            r = Math.floor((e.dayOfYear() - r - 1) / 7) + 1;
        return r < 1 ? n = r + O(s = e.year() - 1, t, i) : r > O(e.year(), t, i) ? (n = r - O(e.year(), t, i), s = e.year() + 1) : (s = e.year(), n = r), {
            week: n,
            year: s
        }
    }

    function O(e, t, i) {
        var n = Be(e, t, i),
            t = Be(e + 1, t, i);
        return (Re(e) - n + t) / 7
    }
    n("w", ["ww", 2], "wo", "week"), n("W", ["WW", 2], "Wo", "isoWeek"), t("week", "w"), t("isoWeek", "W"), i("week", 5), i("isoWeek", 5), w("w", f), w("ww", f, l), w("W", f), w("WW", f, l), Ie(["w", "ww", "W", "WW"], function(e, t, i, n) {
        t[n.substr(0, 1)] = c(e)
    });

    function qe(e, t) {
        return e.slice(t, 7).concat(e.slice(0, t))
    }
    n("d", 0, "do", "day"), n("dd", 0, 0, function(e) {
        return this.localeData().weekdaysMin(this, e)
    }), n("ddd", 0, 0, function(e) {
        return this.localeData().weekdaysShort(this, e)
    }), n("dddd", 0, 0, function(e) {
        return this.localeData().weekdays(this, e)
    }), n("e", 0, 0, "weekday"), n("E", 0, 0, "isoWeekday"), t("day", "d"), t("weekday", "e"), t("isoWeekday", "E"), i("day", 11), i("weekday", 11), i("isoWeekday", 11), w("d", f), w("e", f), w("E", f), w("dd", function(e, t) {
        return t.weekdaysMinRegex(e)
    }), w("ddd", function(e, t) {
        return t.weekdaysShortRegex(e)
    }), w("dddd", function(e, t) {
        return t.weekdaysRegex(e)
    }), Ie(["dd", "ddd", "dddd"], function(e, t, i, n) {
        n = i._locale.weekdaysParse(e, n, i._strict);
        null != n ? t.d = n : _(i).invalidWeekday = e
    }), Ie(["d", "e", "E"], function(e, t, i, n) {
        t[n] = c(e)
    });
    var Ze = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        Je = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        Ke = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        Xe = p,
        et = p,
        tt = p;

    function it() {
        function e(e, t) {
            return t.length - e.length
        }
        for (var t, i, n, s = [], r = [], a = [], o = [], l = 0; l < 7; l++) n = d([2e3, 1]).day(l), t = k(this.weekdaysMin(n, "")), i = k(this.weekdaysShort(n, "")), n = k(this.weekdays(n, "")), s.push(t), r.push(i), a.push(n), o.push(t), o.push(i), o.push(n);
        s.sort(e), r.sort(e), a.sort(e), o.sort(e), this._weekdaysRegex = new RegExp("^(" + o.join("|") + ")", "i"), this._weekdaysShortRegex = this._weekdaysRegex, this._weekdaysMinRegex = this._weekdaysRegex, this._weekdaysStrictRegex = new RegExp("^(" + a.join("|") + ")", "i"), this._weekdaysShortStrictRegex = new RegExp("^(" + r.join("|") + ")", "i"), this._weekdaysMinStrictRegex = new RegExp("^(" + s.join("|") + ")", "i")
    }

    function nt() {
        return this.hours() % 12 || 12
    }

    function st(e, t) {
        n(e, 0, 0, function() {
            return this.localeData().meridiem(this.hours(), this.minutes(), t)
        })
    }

    function rt(e, t) {
        return t._meridiemParse
    }
    n("H", ["HH", 2], 0, "hour"), n("h", ["hh", 2], 0, nt), n("k", ["kk", 2], 0, function() {
        return this.hours() || 24
    }), n("hmm", 0, 0, function() {
        return "" + nt.apply(this) + r(this.minutes(), 2)
    }), n("hmmss", 0, 0, function() {
        return "" + nt.apply(this) + r(this.minutes(), 2) + r(this.seconds(), 2)
    }), n("Hmm", 0, 0, function() {
        return "" + this.hours() + r(this.minutes(), 2)
    }), n("Hmmss", 0, 0, function() {
        return "" + this.hours() + r(this.minutes(), 2) + r(this.seconds(), 2)
    }), st("a", !0), st("A", !1), t("hour", "h"), i("hour", 13), w("a", rt), w("A", rt), w("H", f), w("h", f), w("k", f), w("HH", f, l), w("hh", f, l), w("kk", f, l), w("hmm", ye), w("hmmss", ve), w("Hmm", ye), w("Hmmss", ve), x(["H", "HH"], Y), x(["k", "kk"], function(e, t, i) {
        e = c(e);
        t[Y] = 24 === e ? 0 : e
    }), x(["a", "A"], function(e, t, i) {
        i._isPm = i._locale.isPM(e), i._meridiem = e
    }), x(["h", "hh"], function(e, t, i) {
        t[Y] = c(e), _(i).bigHour = !0
    }), x("hmm", function(e, t, i) {
        var n = e.length - 2;
        t[Y] = c(e.substr(0, n)), t[I] = c(e.substr(n)), _(i).bigHour = !0
    }), x("hmmss", function(e, t, i) {
        var n = e.length - 4,
            s = e.length - 2;
        t[Y] = c(e.substr(0, n)), t[I] = c(e.substr(n, 2)), t[L] = c(e.substr(s)), _(i).bigHour = !0
    }), x("Hmm", function(e, t, i) {
        var n = e.length - 2;
        t[Y] = c(e.substr(0, n)), t[I] = c(e.substr(n))
    }), x("Hmmss", function(e, t, i) {
        var n = e.length - 4,
            s = e.length - 2;
        t[Y] = c(e.substr(0, n)), t[I] = c(e.substr(n, 2)), t[L] = c(e.substr(s))
    });
    p = ue("Hours", !0);
    var at, ot = {
            calendar: {
                sameDay: "[Today at] LT",
                nextDay: "[Tomorrow at] LT",
                nextWeek: "dddd [at] LT",
                lastDay: "[Yesterday at] LT",
                lastWeek: "[Last] dddd [at] LT",
                sameElse: "L"
            },
            longDateFormat: {
                LTS: "h:mm:ss A",
                LT: "h:mm A",
                L: "MM/DD/YYYY",
                LL: "MMMM D, YYYY",
                LLL: "MMMM D, YYYY h:mm A",
                LLLL: "dddd, MMMM D, YYYY h:mm A"
            },
            invalidDate: "Invalid date",
            ordinal: "%d",
            dayOfMonthOrdinalParse: /\d{1,2}/,
            relativeTime: {
                future: "in %s",
                past: "%s ago",
                s: "a few seconds",
                ss: "%d seconds",
                m: "a minute",
                mm: "%d minutes",
                h: "an hour",
                hh: "%d hours",
                d: "a day",
                dd: "%d days",
                w: "a week",
                ww: "%d weeks",
                M: "a month",
                MM: "%d months",
                y: "a year",
                yy: "%d years"
            },
            months: $e,
            monthsShort: je,
            week: {
                dow: 0,
                doy: 6
            },
            weekdays: Ze,
            weekdaysMin: Ke,
            weekdaysShort: Je,
            meridiemParse: /[ap]\.?m?\.?/i
        },
        C = {},
        lt = {};

    function dt(e) {
        return e && e.toLowerCase().replace("_", "-")
    }

    function ct(e) {
        for (var t, i, n, s, r = 0; r < e.length;) {
            for (t = (s = dt(e[r]).split("-")).length, i = (i = dt(e[r + 1])) ? i.split("-") : null; 0 < t;) {
                if (n = ut(s.slice(0, t).join("-"))) return n;
                if (i && i.length >= t && function(e, t) {
                        for (var i = Math.min(e.length, t.length), n = 0; n < i; n += 1)
                            if (e[n] !== t[n]) return n;
                        return i
                    }(s, i) >= t - 1) break;
                t--
            }
            r++
        }
        return at
    }

    function ut(t) {
        var e;
        if (void 0 === C[t] && "undefined" != typeof module && module && module.exports && null != t.match("^[^/\\\\]*$")) try {
            e = at._abbr, require("./locale/" + t), ht(e)
        } catch (e) {
            C[t] = null
        }
        return C[t]
    }

    function ht(e, t) {
        return e && ((t = y(t) ? pt(e) : ft(e, t)) ? at = t : "undefined" != typeof console && console.warn && console.warn("Locale " + e + " not found. Did you forget to load it?")), at._abbr
    }

    function ft(e, t) {
        if (null === t) return delete C[e], null;
        var i, n = ot;
        if (t.abbr = e, null != C[e]) J("defineLocaleOverride", "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."), n = C[e]._config;
        else if (null != t.parentLocale)
            if (null != C[t.parentLocale]) n = C[t.parentLocale]._config;
            else {
                if (null == (i = ut(t.parentLocale))) return lt[t.parentLocale] || (lt[t.parentLocale] = []), lt[t.parentLocale].push({
                    name: e,
                    config: t
                }), null;
                n = i._config
            } return C[e] = new X(K(n, t)), lt[e] && lt[e].forEach(function(e) {
            ft(e.name, e.config)
        }), ht(e), C[e]
    }

    function pt(e) {
        var t;
        if (!(e = e && e._locale && e._locale._abbr ? e._locale._abbr : e)) return at;
        if (!g(e)) {
            if (t = ut(e)) return t;
            e = [e]
        }
        return ct(e)
    }

    function mt(e) {
        var t = e._a;
        return t && -2 === _(e).overflow && (t = t[D] < 0 || 11 < t[D] ? D : t[T] < 1 || t[T] > Ee(t[M], t[D]) ? T : t[Y] < 0 || 24 < t[Y] || 24 === t[Y] && (0 !== t[I] || 0 !== t[L] || 0 !== t[Le]) ? Y : t[I] < 0 || 59 < t[I] ? I : t[L] < 0 || 59 < t[L] ? L : t[Le] < 0 || 999 < t[Le] ? Le : -1, _(e)._overflowDayOfYear && (t < M || T < t) && (t = T), _(e)._overflowWeeks && -1 === t && (t = Oe), _(e)._overflowWeekday && -1 === t && (t = Ce), _(e).overflow = t), e
    }
    var gt = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        yt = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d|))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([+-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        vt = /Z|[+-]\d\d(?::?\d\d)?/,
        _t = [
            ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
            ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
            ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
            ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
            ["YYYY-DDD", /\d{4}-\d{3}/],
            ["YYYY-MM", /\d{4}-\d\d/, !1],
            ["YYYYYYMMDD", /[+-]\d{10}/],
            ["YYYYMMDD", /\d{8}/],
            ["GGGG[W]WWE", /\d{4}W\d{3}/],
            ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
            ["YYYYDDD", /\d{7}/],
            ["YYYYMM", /\d{6}/, !1],
            ["YYYY", /\d{4}/, !1]
        ],
        bt = [
            ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
            ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
            ["HH:mm:ss", /\d\d:\d\d:\d\d/],
            ["HH:mm", /\d\d:\d\d/],
            ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
            ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
            ["HHmmss", /\d\d\d\d\d\d/],
            ["HHmm", /\d\d\d\d/],
            ["HH", /\d\d/]
        ],
        wt = /^\/?Date\((-?\d+)/i,
        kt = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/,
        xt = {
            UT: 0,
            GMT: 0,
            EDT: -240,
            EST: -300,
            CDT: -300,
            CST: -360,
            MDT: -360,
            MST: -420,
            PDT: -420,
            PST: -480
        };

    function St(e) {
        var t, i, n, s, r, a, o = e._i,
            l = gt.exec(o) || yt.exec(o),
            o = _t.length,
            d = bt.length;
        if (l) {
            for (_(e).iso = !0, t = 0, i = o; t < i; t++)
                if (_t[t][1].exec(l[1])) {
                    s = _t[t][0], n = !1 !== _t[t][2];
                    break
                } if (null == s) e._isValid = !1;
            else {
                if (l[3]) {
                    for (t = 0, i = d; t < i; t++)
                        if (bt[t][1].exec(l[3])) {
                            r = (l[2] || " ") + bt[t][0];
                            break
                        } if (null == r) return void(e._isValid = !1)
                }
                if (n || null == r) {
                    if (l[4]) {
                        if (!vt.exec(l[4])) return void(e._isValid = !1);
                        a = "Z"
                    }
                    e._f = s + (r || "") + (a || ""), It(e)
                } else e._isValid = !1
            }
        } else e._isValid = !1
    }

    function Mt(e, t, i, n, s, r) {
        e = [function(e) {
            e = parseInt(e, 10); {
                if (e <= 49) return 2e3 + e;
                if (e <= 999) return 1900 + e
            }
            return e
        }(e), je.indexOf(t), parseInt(i, 10), parseInt(n, 10), parseInt(s, 10)];
        return r && e.push(parseInt(r, 10)), e
    }

    function Dt(e) {
        var t, i, n = kt.exec(e._i.replace(/\([^()]*\)|[\n\t]/g, " ").replace(/(\s\s+)/g, " ").replace(/^\s\s*/, "").replace(/\s\s*$/, ""));
        n ? (t = Mt(n[4], n[3], n[2], n[5], n[6], n[7]), function(e, t, i) {
            if (!e || Je.indexOf(e) === new Date(t[0], t[1], t[2]).getDay()) return 1;
            _(i).weekdayMismatch = !0, i._isValid = !1
        }(n[1], t, e) && (e._a = t, e._tzm = (t = n[8], i = n[9], n = n[10], t ? xt[t] : i ? 0 : 60 * (((t = parseInt(n, 10)) - (i = t % 100)) / 100) + i), e._d = Ve.apply(null, e._a), e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), _(e).rfc2822 = !0)) : e._isValid = !1
    }

    function Tt(e, t, i) {
        return null != e ? e : null != t ? t : i
    }

    function Yt(e) {
        var t, i, n, s, r, a, o, l, d, c, u, h = [];
        if (!e._d) {
            for (n = e, s = new Date(m.now()), i = n._useUTC ? [s.getUTCFullYear(), s.getUTCMonth(), s.getUTCDate()] : [s.getFullYear(), s.getMonth(), s.getDate()], e._w && null == e._a[T] && null == e._a[D] && (null != (s = (n = e)._w).GG || null != s.W || null != s.E ? (l = 1, d = 4, r = Tt(s.GG, n._a[M], Ge(E(), 1, 4).year), a = Tt(s.W, 1), ((o = Tt(s.E, 1)) < 1 || 7 < o) && (c = !0)) : (l = n._locale._week.dow, d = n._locale._week.doy, u = Ge(E(), l, d), r = Tt(s.gg, n._a[M], u.year), a = Tt(s.w, u.week), null != s.d ? ((o = s.d) < 0 || 6 < o) && (c = !0) : null != s.e ? (o = s.e + l, (s.e < 0 || 6 < s.e) && (c = !0)) : o = l), a < 1 || a > O(r, l, d) ? _(n)._overflowWeeks = !0 : null != c ? _(n)._overflowWeekday = !0 : (u = Qe(r, a, o, l, d), n._a[M] = u.year, n._dayOfYear = u.dayOfYear)), null != e._dayOfYear && (s = Tt(e._a[M], i[M]), (e._dayOfYear > Re(s) || 0 === e._dayOfYear) && (_(e)._overflowDayOfYear = !0), c = Ve(s, 0, e._dayOfYear), e._a[D] = c.getUTCMonth(), e._a[T] = c.getUTCDate()), t = 0; t < 3 && null == e._a[t]; ++t) e._a[t] = h[t] = i[t];
            for (; t < 7; t++) e._a[t] = h[t] = null == e._a[t] ? 2 === t ? 1 : 0 : e._a[t];
            24 === e._a[Y] && 0 === e._a[I] && 0 === e._a[L] && 0 === e._a[Le] && (e._nextDay = !0, e._a[Y] = 0), e._d = (e._useUTC ? Ve : Ue).apply(null, h), r = e._useUTC ? e._d.getUTCDay() : e._d.getDay(), null != e._tzm && e._d.setUTCMinutes(e._d.getUTCMinutes() - e._tzm), e._nextDay && (e._a[Y] = 24), e._w && void 0 !== e._w.d && e._w.d !== r && (_(e).weekdayMismatch = !0)
        }
    }

    function It(e) {
        if (e._f === m.ISO_8601) St(e);
        else if (e._f === m.RFC_2822) Dt(e);
        else {
            e._a = [], _(e).empty = !0;
            for (var t, i, n, s, r, a = "" + e._i, o = a.length, l = 0, d = ae(e._f, e._locale).match(te) || [], c = d.length, u = 0; u < c; u++) i = d[u], (t = (a.match(De(i, e)) || [])[0]) && (0 < (n = a.substr(0, a.indexOf(t))).length && _(e).unusedInput.push(n), a = a.slice(a.indexOf(t) + t.length), l += t.length), se[i] ? (t ? _(e).empty = !1 : _(e).unusedTokens.push(i), n = i, r = e, null != (s = t) && h(Ye, n) && Ye[n](s, r._a, r, n)) : e._strict && !t && _(e).unusedTokens.push(i);
            _(e).charsLeftOver = o - l, 0 < a.length && _(e).unusedInput.push(a), e._a[Y] <= 12 && !0 === _(e).bigHour && 0 < e._a[Y] && (_(e).bigHour = void 0), _(e).parsedDateParts = e._a.slice(0), _(e).meridiem = e._meridiem, e._a[Y] = function(e, t, i) {
                if (null == i) return t;
                return null != e.meridiemHour ? e.meridiemHour(t, i) : null != e.isPM ? ((e = e.isPM(i)) && t < 12 && (t += 12), t = e || 12 !== t ? t : 0) : t
            }(e._locale, e._a[Y], e._meridiem), null !== (o = _(e).era) && (e._a[M] = e._locale.erasConvertYear(o, e._a[M])), Yt(e), mt(e)
        }
    }

    function Lt(e) {
        var t, i, n, s = e._i,
            r = e._f;
        if (e._locale = e._locale || pt(e._l), null === s || void 0 === r && "" === s) return W({
            nullInput: !0
        });
        if ("string" == typeof s && (e._i = s = e._locale.preparse(s)), b(s)) return new G(mt(s));
        if (P(s)) e._d = s;
        else if (g(r)) {
            var a, o, l, d, c, u, h = e,
                f = !1,
                p = h._f.length;
            if (0 === p) _(h).invalidFormat = !0, h._d = new Date(NaN);
            else {
                for (d = 0; d < p; d++) c = 0, u = !1, a = Q({}, h), null != h._useUTC && (a._useUTC = h._useUTC), a._f = h._f[d], It(a), R(a) && (u = !0), c = (c += _(a).charsLeftOver) + 10 * _(a).unusedTokens.length, _(a).score = c, f ? c < l && (l = c, o = a) : (null == l || c < l || u) && (l = c, o = a, u) && (f = !0);
                F(h, o || a)
            }
        } else if (r) It(e);
        else if (y(r = (s = e)._i)) s._d = new Date(m.now());
        else P(r) ? s._d = new Date(r.valueOf()) : "string" == typeof r ? (i = s, null !== (t = wt.exec(i._i)) ? i._d = new Date(+t[1]) : (St(i), !1 === i._isValid && (delete i._isValid, Dt(i), !1 === i._isValid) && (delete i._isValid, i._strict ? i._isValid = !1 : m.createFromInputFallback(i)))) : g(r) ? (s._a = z(r.slice(0), function(e) {
            return parseInt(e, 10)
        }), Yt(s)) : H(r) ? (t = s)._d || (n = void 0 === (i = le(t._i)).day ? i.date : i.day, t._a = z([i.year, i.month, n, i.hour, i.minute, i.second, i.millisecond], function(e) {
            return e && parseInt(e, 10)
        }), Yt(t)) : v(r) ? s._d = new Date(r) : m.createFromInputFallback(s);
        return R(e) || (e._d = null), e
    }

    function Ot(e, t, i, n, s) {
        var r = {};
        return !0 !== t && !1 !== t || (n = t, t = void 0), !0 !== i && !1 !== i || (n = i, i = void 0), (H(e) && A(e) || g(e) && 0 === e.length) && (e = void 0), r._isAMomentObject = !0, r._useUTC = r._isUTC = s, r._l = i, r._i = e, r._f = t, r._strict = n, (s = new G(mt(Lt(s = r))))._nextDay && (s.add(1, "d"), s._nextDay = void 0), s
    }

    function E(e, t, i, n) {
        return Ot(e, t, i, n, !1)
    }
    m.createFromInputFallback = e("value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.", function(e) {
        e._d = new Date(e._i + (e._useUTC ? " UTC" : ""))
    }), m.ISO_8601 = function() {}, m.RFC_2822 = function() {};
    ye = e("moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = E.apply(null, arguments);
        return this.isValid() && e.isValid() ? e < this ? this : e : W()
    }), ve = e("moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/", function() {
        var e = E.apply(null, arguments);
        return this.isValid() && e.isValid() ? this < e ? this : e : W()
    });

    function Ct(e, t) {
        var i, n;
        if (!(t = 1 === t.length && g(t[0]) ? t[0] : t).length) return E();
        for (i = t[0], n = 1; n < t.length; ++n) t[n].isValid() && !t[n][e](i) || (i = t[n]);
        return i
    }
    var Et = ["year", "quarter", "month", "week", "day", "hour", "minute", "second", "millisecond"];

    function $t(e) {
        var e = le(e),
            t = e.year || 0,
            i = e.quarter || 0,
            n = e.month || 0,
            s = e.week || e.isoWeek || 0,
            r = e.day || 0,
            a = e.hour || 0,
            o = e.minute || 0,
            l = e.second || 0,
            d = e.millisecond || 0;
        this._isValid = function(e) {
            var t, i, n = !1,
                s = Et.length;
            for (t in e)
                if (h(e, t) && (-1 === S.call(Et, t) || null != e[t] && isNaN(e[t]))) return !1;
            for (i = 0; i < s; ++i)
                if (e[Et[i]]) {
                    if (n) return !1;
                    parseFloat(e[Et[i]]) !== c(e[Et[i]]) && (n = !0)
                } return !0
        }(e), this._milliseconds = +d + 1e3 * l + 6e4 * o + 1e3 * a * 60 * 60, this._days = +r + 7 * s, this._months = +n + 3 * i + 12 * t, this._data = {}, this._locale = pt(), this._bubble()
    }

    function jt(e) {
        return e instanceof $t
    }

    function Nt(e) {
        return e < 0 ? -1 * Math.round(-1 * e) : Math.round(e)
    }

    function Ht(e, i) {
        n(e, 0, 0, function() {
            var e = this.utcOffset(),
                t = "+";
            return e < 0 && (e = -e, t = "-"), t + r(~~(e / 60), 2) + i + r(~~e % 60, 2)
        })
    }
    Ht("Z", ":"), Ht("ZZ", ""), w("Z", Me), w("ZZ", Me), x(["Z", "ZZ"], function(e, t, i) {
        i._useUTC = !0, i._tzm = Pt(Me, e)
    });
    var At = /([\+\-]|\d\d)/gi;

    function Pt(e, t) {
        var t = (t || "").match(e);
        return null === t ? null : 0 === (t = 60 * (e = ((t[t.length - 1] || []) + "").match(At) || ["-", 0, 0])[1] + c(e[2])) ? 0 : "+" === e[0] ? t : -t
    }

    function zt(e, t) {
        var i;
        return t._isUTC ? (t = t.clone(), i = (b(e) || P(e) ? e : E(e)).valueOf() - t.valueOf(), t._d.setTime(t._d.valueOf() + i), m.updateOffset(t, !1), t) : E(e).local()
    }

    function Ft(e) {
        return -Math.round(e._d.getTimezoneOffset())
    }

    function Rt() {
        return !!this.isValid() && this._isUTC && 0 === this._offset
    }
    m.updateOffset = function() {};
    var Wt = /^(-|\+)?(?:(\d*)[. ])?(\d+):(\d+)(?::(\d+)(\.\d*)?)?$/,
        Ut = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function $(e, t) {
        var i, n = e;
        return jt(e) ? n = {
            ms: e._milliseconds,
            d: e._days,
            M: e._months
        } : v(e) || !isNaN(+e) ? (n = {}, t ? n[t] = +e : n.milliseconds = +e) : (t = Wt.exec(e)) ? (i = "-" === t[1] ? -1 : 1, n = {
            y: 0,
            d: c(t[T]) * i,
            h: c(t[Y]) * i,
            m: c(t[I]) * i,
            s: c(t[L]) * i,
            ms: c(Nt(1e3 * t[Le])) * i
        }) : (t = Ut.exec(e)) ? (i = "-" === t[1] ? -1 : 1, n = {
            y: Vt(t[2], i),
            M: Vt(t[3], i),
            w: Vt(t[4], i),
            d: Vt(t[5], i),
            h: Vt(t[6], i),
            m: Vt(t[7], i),
            s: Vt(t[8], i)
        }) : null == n ? n = {} : "object" == typeof n && ("from" in n || "to" in n) && (t = function(e, t) {
            var i;
            if (!e.isValid() || !t.isValid()) return {
                milliseconds: 0,
                months: 0
            };
            t = zt(t, e), e.isBefore(t) ? i = Bt(e, t) : ((i = Bt(t, e)).milliseconds = -i.milliseconds, i.months = -i.months);
            return i
        }(E(n.from), E(n.to)), (n = {}).ms = t.milliseconds, n.M = t.months), i = new $t(n), jt(e) && h(e, "_locale") && (i._locale = e._locale), jt(e) && h(e, "_isValid") && (i._isValid = e._isValid), i
    }

    function Vt(e, t) {
        e = e && parseFloat(e.replace(",", "."));
        return (isNaN(e) ? 0 : e) * t
    }

    function Bt(e, t) {
        var i = {};
        return i.months = t.month() - e.month() + 12 * (t.year() - e.year()), e.clone().add(i.months, "M").isAfter(t) && --i.months, i.milliseconds = +t - +e.clone().add(i.months, "M"), i
    }

    function Qt(n, s) {
        return function(e, t) {
            var i;
            return null === t || isNaN(+t) || (J(s, "moment()." + s + "(period, number) is deprecated. Please use moment()." + s + "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."), i = e, e = t, t = i), Gt(this, $(e, t), n), this
        }
    }

    function Gt(e, t, i, n) {
        var s = t._milliseconds,
            r = Nt(t._days),
            t = Nt(t._months);
        e.isValid() && (n = null == n || n, t && Pe(e, he(e, "Month") + t * i), r && fe(e, "Date", he(e, "Date") + r * i), s && e._d.setTime(e._d.valueOf() + s * i), n) && m.updateOffset(e, r || t)
    }
    $.fn = $t.prototype, $.invalid = function() {
        return $(NaN)
    };
    $e = Qt(1, "add"), Ze = Qt(-1, "subtract");

    function qt(e) {
        return "string" == typeof e || e instanceof String
    }

    function Zt(e) {
        return b(e) || P(e) || qt(e) || v(e) || function(t) {
            var e = g(t),
                i = !1;
            e && (i = 0 === t.filter(function(e) {
                return !v(e) && qt(t)
            }).length);
            return e && i
        }(e) || function(e) {
            var t, i, n = H(e) && !A(e),
                s = !1,
                r = ["years", "year", "y", "months", "month", "M", "days", "day", "d", "dates", "date", "D", "hours", "hour", "h", "minutes", "minute", "m", "seconds", "second", "s", "milliseconds", "millisecond", "ms"],
                a = r.length;
            for (t = 0; t < a; t += 1) i = r[t], s = s || h(e, i);
            return n && s
        }(e) || null == e
    }

    function Jt(e, t) {
        var i, n;
        return e.date() < t.date() ? -Jt(t, e) : -((i = 12 * (t.year() - e.year()) + (t.month() - e.month())) + (t - (n = e.clone().add(i, "months")) < 0 ? (t - n) / (n - e.clone().add(i - 1, "months")) : (t - n) / (e.clone().add(1 + i, "months") - n))) || 0
    }

    function Kt(e) {
        return void 0 === e ? this._locale._abbr : (null != (e = pt(e)) && (this._locale = e), this)
    }
    m.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ", m.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]";
    Ke = e("moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.", function(e) {
        return void 0 === e ? this.localeData() : this.locale(e)
    });

    function Xt() {
        return this._locale
    }
    var ei = 126227808e5;

    function ti(e, t) {
        return (e % t + t) % t
    }

    function ii(e, t, i) {
        return e < 100 && 0 <= e ? new Date(e + 400, t, i) - ei : new Date(e, t, i).valueOf()
    }

    function ni(e, t, i) {
        return e < 100 && 0 <= e ? Date.UTC(e + 400, t, i) - ei : Date.UTC(e, t, i)
    }

    function si(e, t) {
        return t.erasAbbrRegex(e)
    }

    function ri() {
        for (var e = [], t = [], i = [], n = [], s = this.eras(), r = 0, a = s.length; r < a; ++r) t.push(k(s[r].name)), e.push(k(s[r].abbr)), i.push(k(s[r].narrow)), n.push(k(s[r].name)), n.push(k(s[r].abbr)), n.push(k(s[r].narrow));
        this._erasRegex = new RegExp("^(" + n.join("|") + ")", "i"), this._erasNameRegex = new RegExp("^(" + t.join("|") + ")", "i"), this._erasAbbrRegex = new RegExp("^(" + e.join("|") + ")", "i"), this._erasNarrowRegex = new RegExp("^(" + i.join("|") + ")", "i")
    }

    function ai(e, t) {
        n(0, [e, e.length], 0, t)
    }

    function oi(e, t, i, n, s) {
        var r;
        return null == e ? Ge(this, n, s).year : (r = O(e, n, s), function(e, t, i, n, s) {
            e = Qe(e, t, i, n, s), t = Ve(e.year, 0, e.dayOfYear);
            return this.year(t.getUTCFullYear()), this.month(t.getUTCMonth()), this.date(t.getUTCDate()), this
        }.call(this, e, t = r < t ? r : t, i, n, s))
    }
    n("N", 0, 0, "eraAbbr"), n("NN", 0, 0, "eraAbbr"), n("NNN", 0, 0, "eraAbbr"), n("NNNN", 0, 0, "eraName"), n("NNNNN", 0, 0, "eraNarrow"), n("y", ["y", 1], "yo", "eraYear"), n("y", ["yy", 2], 0, "eraYear"), n("y", ["yyy", 3], 0, "eraYear"), n("y", ["yyyy", 4], 0, "eraYear"), w("N", si), w("NN", si), w("NNN", si), w("NNNN", function(e, t) {
        return t.erasNameRegex(e)
    }), w("NNNNN", function(e, t) {
        return t.erasNarrowRegex(e)
    }), x(["N", "NN", "NNN", "NNNN", "NNNNN"], function(e, t, i, n) {
        n = i._locale.erasParse(e, n, i._strict);
        n ? _(i).era = n : _(i).invalidEra = e
    }), w("y", ke), w("yy", ke), w("yyy", ke), w("yyyy", ke), w("yo", function(e, t) {
        return t._eraYearOrdinalRegex || ke
    }), x(["y", "yy", "yyy", "yyyy"], M), x(["yo"], function(e, t, i, n) {
        var s;
        i._locale._eraYearOrdinalRegex && (s = e.match(i._locale._eraYearOrdinalRegex)), i._locale.eraYearOrdinalParse ? t[M] = i._locale.eraYearOrdinalParse(e, s) : t[M] = parseInt(e, 10)
    }), n(0, ["gg", 2], 0, function() {
        return this.weekYear() % 100
    }), n(0, ["GG", 2], 0, function() {
        return this.isoWeekYear() % 100
    }), ai("gggg", "weekYear"), ai("ggggg", "weekYear"), ai("GGGG", "isoWeekYear"), ai("GGGGG", "isoWeekYear"), t("weekYear", "gg"), t("isoWeekYear", "GG"), i("weekYear", 1), i("isoWeekYear", 1), w("G", xe), w("g", xe), w("GG", f, l), w("gg", f, l), w("GGGG", be, me), w("gggg", be, me), w("GGGGG", we, ge), w("ggggg", we, ge), Ie(["gggg", "ggggg", "GGGG", "GGGGG"], function(e, t, i, n) {
        t[n.substr(0, 2)] = c(e)
    }), Ie(["gg", "GG"], function(e, t, i, n) {
        t[n] = m.parseTwoDigitYear(e)
    }), n("Q", 0, "Qo", "quarter"), t("quarter", "Q"), i("quarter", 7), w("Q", s), x("Q", function(e, t) {
        t[D] = 3 * (c(e) - 1)
    }), n("D", ["DD", 2], "Do", "date"), t("date", "D"), i("date", 9), w("D", f), w("DD", f, l), w("Do", function(e, t) {
        return e ? t._dayOfMonthOrdinalParse || t._ordinalParse : t._dayOfMonthOrdinalParseLenient
    }), x(["D", "DD"], T), x("Do", function(e, t) {
        t[T] = c(e.match(f)[0])
    });
    be = ue("Date", !0);
    n("DDD", ["DDDD", 3], "DDDo", "dayOfYear"), t("dayOfYear", "DDD"), i("dayOfYear", 4), w("DDD", _e), w("DDDD", pe), x(["DDD", "DDDD"], function(e, t, i) {
        i._dayOfYear = c(e)
    }), n("m", ["mm", 2], 0, "minute"), t("minute", "m"), i("minute", 14), w("m", f), w("mm", f, l), x(["m", "mm"], I);
    var li, me = ue("Minutes", !1),
        we = (n("s", ["ss", 2], 0, "second"), t("second", "s"), i("second", 15), w("s", f), w("ss", f, l), x(["s", "ss"], L), ue("Seconds", !1));
    for (n("S", 0, 0, function() {
            return ~~(this.millisecond() / 100)
        }), n(0, ["SS", 2], 0, function() {
            return ~~(this.millisecond() / 10)
        }), n(0, ["SSS", 3], 0, "millisecond"), n(0, ["SSSS", 4], 0, function() {
            return 10 * this.millisecond()
        }), n(0, ["SSSSS", 5], 0, function() {
            return 100 * this.millisecond()
        }), n(0, ["SSSSSS", 6], 0, function() {
            return 1e3 * this.millisecond()
        }), n(0, ["SSSSSSS", 7], 0, function() {
            return 1e4 * this.millisecond()
        }), n(0, ["SSSSSSSS", 8], 0, function() {
            return 1e5 * this.millisecond()
        }), n(0, ["SSSSSSSSS", 9], 0, function() {
            return 1e6 * this.millisecond()
        }), t("millisecond", "ms"), i("millisecond", 16), w("S", _e, s), w("SS", _e, l), w("SSS", _e, pe), li = "SSSS"; li.length <= 9; li += "S") w(li, ke);

    function di(e, t) {
        t[Le] = c(1e3 * ("0." + e))
    }
    for (li = "S"; li.length <= 9; li += "S") x(li, di);
    ge = ue("Milliseconds", !1), n("z", 0, 0, "zoneAbbr"), n("zz", 0, 0, "zoneName");
    s = G.prototype;

    function ci(e) {
        return e
    }
    s.add = $e, s.calendar = function(e, t) {
        1 === arguments.length && (arguments[0] ? Zt(arguments[0]) ? (e = arguments[0], t = void 0) : function(e) {
            for (var t = H(e) && !A(e), i = !1, n = ["sameDay", "nextDay", "lastDay", "nextWeek", "lastWeek", "sameElse"], s = 0; s < n.length; s += 1) i = i || h(e, n[s]);
            return t && i
        }(arguments[0]) && (t = arguments[0], e = void 0) : t = e = void 0);
        var e = e || E(),
            i = zt(e, this).startOf("day"),
            i = m.calendarFormat(this, i) || "sameElse",
            t = t && (a(t[i]) ? t[i].call(this, e) : t[i]);
        return this.format(t || this.localeData().calendar(i, this, E(e)))
    }, s.clone = function() {
        return new G(this)
    }, s.diff = function(e, t, i) {
        var n, s, r;
        if (!this.isValid()) return NaN;
        if (!(n = zt(e, this)).isValid()) return NaN;
        switch (s = 6e4 * (n.utcOffset() - this.utcOffset()), t = o(t)) {
            case "year":
                r = Jt(this, n) / 12;
                break;
            case "month":
                r = Jt(this, n);
                break;
            case "quarter":
                r = Jt(this, n) / 3;
                break;
            case "second":
                r = (this - n) / 1e3;
                break;
            case "minute":
                r = (this - n) / 6e4;
                break;
            case "hour":
                r = (this - n) / 36e5;
                break;
            case "day":
                r = (this - n - s) / 864e5;
                break;
            case "week":
                r = (this - n - s) / 6048e5;
                break;
            default:
                r = this - n
        }
        return i ? r : u(r)
    }, s.endOf = function(e) {
        var t, i;
        if (void 0 !== (e = o(e)) && "millisecond" !== e && this.isValid()) {
            switch (i = this._isUTC ? ni : ii, e) {
                case "year":
                    t = i(this.year() + 1, 0, 1) - 1;
                    break;
                case "quarter":
                    t = i(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                    break;
                case "month":
                    t = i(this.year(), this.month() + 1, 1) - 1;
                    break;
                case "week":
                    t = i(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                    break;
                case "isoWeek":
                    t = i(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                    break;
                case "day":
                case "date":
                    t = i(this.year(), this.month(), this.date() + 1) - 1;
                    break;
                case "hour":
                    t = this._d.valueOf(), t += 36e5 - ti(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5) - 1;
                    break;
                case "minute":
                    t = this._d.valueOf(), t += 6e4 - ti(t, 6e4) - 1;
                    break;
                case "second":
                    t = this._d.valueOf(), t += 1e3 - ti(t, 1e3) - 1
            }
            this._d.setTime(t), m.updateOffset(this, !0)
        }
        return this
    }, s.format = function(e) {
        return e = e || (this.isUtc() ? m.defaultFormatUtc : m.defaultFormat), e = re(this, e), this.localeData().postformat(e)
    }, s.from = function(e, t) {
        return this.isValid() && (b(e) && e.isValid() || E(e).isValid()) ? $({
            to: this,
            from: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }, s.fromNow = function(e) {
        return this.from(E(), e)
    }, s.to = function(e, t) {
        return this.isValid() && (b(e) && e.isValid() || E(e).isValid()) ? $({
            from: this,
            to: e
        }).locale(this.locale()).humanize(!t) : this.localeData().invalidDate()
    }, s.toNow = function(e) {
        return this.to(E(), e)
    }, s.get = function(e) {
        return a(this[e = o(e)]) ? this[e]() : this
    }, s.invalidAt = function() {
        return _(this).overflow
    }, s.isAfter = function(e, t) {
        return e = b(e) ? e : E(e), !(!this.isValid() || !e.isValid()) && ("millisecond" === (t = o(t) || "millisecond") ? this.valueOf() > e.valueOf() : e.valueOf() < this.clone().startOf(t).valueOf())
    }, s.isBefore = function(e, t) {
        return e = b(e) ? e : E(e), !(!this.isValid() || !e.isValid()) && ("millisecond" === (t = o(t) || "millisecond") ? this.valueOf() < e.valueOf() : this.clone().endOf(t).valueOf() < e.valueOf())
    }, s.isBetween = function(e, t, i, n) {
        return e = b(e) ? e : E(e), t = b(t) ? t : E(t), !!(this.isValid() && e.isValid() && t.isValid()) && ("(" === (n = n || "()")[0] ? this.isAfter(e, i) : !this.isBefore(e, i)) && (")" === n[1] ? this.isBefore(t, i) : !this.isAfter(t, i))
    }, s.isSame = function(e, t) {
        var e = b(e) ? e : E(e);
        return !(!this.isValid() || !e.isValid()) && ("millisecond" === (t = o(t) || "millisecond") ? this.valueOf() === e.valueOf() : (e = e.valueOf(), this.clone().startOf(t).valueOf() <= e && e <= this.clone().endOf(t).valueOf()))
    }, s.isSameOrAfter = function(e, t) {
        return this.isSame(e, t) || this.isAfter(e, t)
    }, s.isSameOrBefore = function(e, t) {
        return this.isSame(e, t) || this.isBefore(e, t)
    }, s.isValid = function() {
        return R(this)
    }, s.lang = Ke, s.locale = Kt, s.localeData = Xt, s.max = ve, s.min = ye, s.parsingFlags = function() {
        return F({}, _(this))
    }, s.set = function(e, t) {
        if ("object" == typeof e)
            for (var i = function(e) {
                    var t, i = [];
                    for (t in e) h(e, t) && i.push({
                        unit: t,
                        priority: de[t]
                    });
                    return i.sort(function(e, t) {
                        return e.priority - t.priority
                    }), i
                }(e = le(e)), n = i.length, s = 0; s < n; s++) this[i[s].unit](e[i[s].unit]);
        else if (a(this[e = o(e)])) return this[e](t);
        return this
    }, s.startOf = function(e) {
        var t, i;
        if (void 0 !== (e = o(e)) && "millisecond" !== e && this.isValid()) {
            switch (i = this._isUTC ? ni : ii, e) {
                case "year":
                    t = i(this.year(), 0, 1);
                    break;
                case "quarter":
                    t = i(this.year(), this.month() - this.month() % 3, 1);
                    break;
                case "month":
                    t = i(this.year(), this.month(), 1);
                    break;
                case "week":
                    t = i(this.year(), this.month(), this.date() - this.weekday());
                    break;
                case "isoWeek":
                    t = i(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                    break;
                case "day":
                case "date":
                    t = i(this.year(), this.month(), this.date());
                    break;
                case "hour":
                    t = this._d.valueOf(), t -= ti(t + (this._isUTC ? 0 : 6e4 * this.utcOffset()), 36e5);
                    break;
                case "minute":
                    t = this._d.valueOf(), t -= ti(t, 6e4);
                    break;
                case "second":
                    t = this._d.valueOf(), t -= ti(t, 1e3)
            }
            this._d.setTime(t), m.updateOffset(this, !0)
        }
        return this
    }, s.subtract = Ze, s.toArray = function() {
        var e = this;
        return [e.year(), e.month(), e.date(), e.hour(), e.minute(), e.second(), e.millisecond()]
    }, s.toObject = function() {
        var e = this;
        return {
            years: e.year(),
            months: e.month(),
            date: e.date(),
            hours: e.hours(),
            minutes: e.minutes(),
            seconds: e.seconds(),
            milliseconds: e.milliseconds()
        }
    }, s.toDate = function() {
        return new Date(this.valueOf())
    }, s.toISOString = function(e) {
        var t;
        return this.isValid() ? (t = (e = !0 !== e) ? this.clone().utc() : this).year() < 0 || 9999 < t.year() ? re(t, e ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ") : a(Date.prototype.toISOString) ? e ? this.toDate().toISOString() : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3).toISOString().replace("Z", re(t, "Z")) : re(t, e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ") : null
    }, s.inspect = function() {
        var e, t, i;
        return this.isValid() ? (t = "moment", e = "", this.isLocal() || (t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone", e = "Z"), t = "[" + t + '("]', i = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY", this.format(t + i + "-MM-DD[T]HH:mm:ss.SSS" + (e + '[")]'))) : "moment.invalid(/* " + this._i + " */)"
    }, "undefined" != typeof Symbol && null != Symbol.for && (s[Symbol.for("nodejs.util.inspect.custom")] = function() {
        return "Moment<" + this.format() + ">"
    }), s.toJSON = function() {
        return this.isValid() ? this.toISOString() : null
    }, s.toString = function() {
        return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")
    }, s.unix = function() {
        return Math.floor(this.valueOf() / 1e3)
    }, s.valueOf = function() {
        return this._d.valueOf() - 6e4 * (this._offset || 0)
    }, s.creationData = function() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        }
    }, s.eraName = function() {
        for (var e, t = this.localeData().eras(), i = 0, n = t.length; i < n; ++i) {
            if (e = this.clone().startOf("day").valueOf(), t[i].since <= e && e <= t[i].until) return t[i].name;
            if (t[i].until <= e && e <= t[i].since) return t[i].name
        }
        return ""
    }, s.eraNarrow = function() {
        for (var e, t = this.localeData().eras(), i = 0, n = t.length; i < n; ++i) {
            if (e = this.clone().startOf("day").valueOf(), t[i].since <= e && e <= t[i].until) return t[i].narrow;
            if (t[i].until <= e && e <= t[i].since) return t[i].narrow
        }
        return ""
    }, s.eraAbbr = function() {
        for (var e, t = this.localeData().eras(), i = 0, n = t.length; i < n; ++i) {
            if (e = this.clone().startOf("day").valueOf(), t[i].since <= e && e <= t[i].until) return t[i].abbr;
            if (t[i].until <= e && e <= t[i].since) return t[i].abbr
        }
        return ""
    }, s.eraYear = function() {
        for (var e, t, i = this.localeData().eras(), n = 0, s = i.length; n < s; ++n)
            if (e = i[n].since <= i[n].until ? 1 : -1, t = this.clone().startOf("day").valueOf(), i[n].since <= t && t <= i[n].until || i[n].until <= t && t <= i[n].since) return (this.year() - m(i[n].since).year()) * e + i[n].offset;
        return this.year()
    }, s.year = We, s.isLeapYear = function() {
        return ce(this.year())
    }, s.weekYear = function(e) {
        return oi.call(this, e, this.week(), this.weekday(), this.localeData()._week.dow, this.localeData()._week.doy)
    }, s.isoWeekYear = function(e) {
        return oi.call(this, e, this.isoWeek(), this.isoWeekday(), 1, 4)
    }, s.quarter = s.quarters = function(e) {
        return null == e ? Math.ceil((this.month() + 1) / 3) : this.month(3 * (e - 1) + this.month() % 3)
    }, s.month = ze, s.daysInMonth = function() {
        return Ee(this.year(), this.month())
    }, s.week = s.weeks = function(e) {
        var t = this.localeData().week(this);
        return null == e ? t : this.add(7 * (e - t), "d")
    }, s.isoWeek = s.isoWeeks = function(e) {
        var t = Ge(this, 1, 4).week;
        return null == e ? t : this.add(7 * (e - t), "d")
    }, s.weeksInYear = function() {
        var e = this.localeData()._week;
        return O(this.year(), e.dow, e.doy)
    }, s.weeksInWeekYear = function() {
        var e = this.localeData()._week;
        return O(this.weekYear(), e.dow, e.doy)
    }, s.isoWeeksInYear = function() {
        return O(this.year(), 1, 4)
    }, s.isoWeeksInISOWeekYear = function() {
        return O(this.isoWeekYear(), 1, 4)
    }, s.date = be, s.day = s.days = function(e) {
        var t, i, n;
        return this.isValid() ? (t = this._isUTC ? this._d.getUTCDay() : this._d.getDay(), null != e ? (i = e, n = this.localeData(), e = "string" != typeof i ? i : isNaN(i) ? "number" == typeof(i = n.weekdaysParse(i)) ? i : null : parseInt(i, 10), this.add(e - t, "d")) : t) : null != e ? this : NaN
    }, s.weekday = function(e) {
        var t;
        return this.isValid() ? (t = (this.day() + 7 - this.localeData()._week.dow) % 7, null == e ? t : this.add(e - t, "d")) : null != e ? this : NaN
    }, s.isoWeekday = function(e) {
        var t, i;
        return this.isValid() ? null != e ? (t = e, i = this.localeData(), i = "string" == typeof t ? i.weekdaysParse(t) % 7 || 7 : isNaN(t) ? null : t, this.day(this.day() % 7 ? i : i - 7)) : this.day() || 7 : null != e ? this : NaN
    }, s.dayOfYear = function(e) {
        var t = Math.round((this.clone().startOf("day") - this.clone().startOf("year")) / 864e5) + 1;
        return null == e ? t : this.add(e - t, "d")
    }, s.hour = s.hours = p, s.minute = s.minutes = me, s.second = s.seconds = we, s.millisecond = s.milliseconds = ge, s.utcOffset = function(e, t, i) {
        var n, s = this._offset || 0;
        if (!this.isValid()) return null != e ? this : NaN;
        if (null == e) return this._isUTC ? s : Ft(this);
        if ("string" == typeof e) {
            if (null === (e = Pt(Me, e))) return this
        } else Math.abs(e) < 16 && !i && (e *= 60);
        return !this._isUTC && t && (n = Ft(this)), this._offset = e, this._isUTC = !0, null != n && this.add(n, "m"), s !== e && (!t || this._changeInProgress ? Gt(this, $(e - s, "m"), 1, !1) : this._changeInProgress || (this._changeInProgress = !0, m.updateOffset(this, !0), this._changeInProgress = null)), this
    }, s.utc = function(e) {
        return this.utcOffset(0, e)
    }, s.local = function(e) {
        return this._isUTC && (this.utcOffset(0, e), this._isUTC = !1, e) && this.subtract(Ft(this), "m"), this
    }, s.parseZone = function() {
        var e;
        return null != this._tzm ? this.utcOffset(this._tzm, !1, !0) : "string" == typeof this._i && (null != (e = Pt(Se, this._i)) ? this.utcOffset(e) : this.utcOffset(0, !0)), this
    }, s.hasAlignedHourOffset = function(e) {
        return !!this.isValid() && (e = e ? E(e).utcOffset() : 0, (this.utcOffset() - e) % 60 == 0)
    }, s.isDST = function() {
        return this.utcOffset() > this.clone().month(0).utcOffset() || this.utcOffset() > this.clone().month(5).utcOffset()
    }, s.isLocal = function() {
        return !!this.isValid() && !this._isUTC
    }, s.isUtcOffset = function() {
        return !!this.isValid() && this._isUTC
    }, s.isUtc = Rt, s.isUTC = Rt, s.zoneAbbr = function() {
        return this._isUTC ? "UTC" : ""
    }, s.zoneName = function() {
        return this._isUTC ? "Coordinated Universal Time" : ""
    }, s.dates = e("dates accessor is deprecated. Use date instead.", be), s.months = e("months accessor is deprecated. Use month instead", ze), s.years = e("years accessor is deprecated. Use year instead", We), s.zone = e("moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/", function(e, t) {
        return null != e ? (this.utcOffset(e = "string" != typeof e ? -e : e, t), this) : -this.utcOffset()
    }), s.isDSTShifted = e("isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information", function() {
        var e, t;
        return y(this._isDSTShifted) && (Q(e = {}, this), (e = Lt(e))._a ? (t = (e._isUTC ? d : E)(e._a), this._isDSTShifted = this.isValid() && 0 < function(e, t, i) {
            for (var n = Math.min(e.length, t.length), s = Math.abs(e.length - t.length), r = 0, a = 0; a < n; a++)(i && e[a] !== t[a] || !i && c(e[a]) !== c(t[a])) && r++;
            return r + s
        }(e._a, t.toArray())) : this._isDSTShifted = !1), this._isDSTShifted
    });
    l = X.prototype;

    function ui(e, t, i, n) {
        var s = pt(),
            n = d().set(n, t);
        return s[i](n, e)
    }

    function hi(e, t, i) {
        if (v(e) && (t = e, e = void 0), e = e || "", null != t) return ui(e, t, i, "month");
        for (var n = [], s = 0; s < 12; s++) n[s] = ui(e, s, i, "month");
        return n
    }

    function fi(e, t, i, n) {
        t = ("boolean" == typeof e ? v(t) && (i = t, t = void 0) : (t = e, e = !1, v(i = t) && (i = t, t = void 0)), t || "");
        var s, r = pt(),
            a = e ? r._week.dow : 0,
            o = [];
        if (null != i) return ui(t, (i + a) % 7, n, "day");
        for (s = 0; s < 7; s++) o[s] = ui(t, (s + a) % 7, n, "day");
        return o
    }
    l.calendar = function(e, t, i) {
        return a(e = this._calendar[e] || this._calendar.sameElse) ? e.call(t, i) : e
    }, l.longDateFormat = function(e) {
        var t = this._longDateFormat[e],
            i = this._longDateFormat[e.toUpperCase()];
        return t || !i ? t : (this._longDateFormat[e] = i.match(te).map(function(e) {
            return "MMMM" === e || "MM" === e || "DD" === e || "dddd" === e ? e.slice(1) : e
        }).join(""), this._longDateFormat[e])
    }, l.invalidDate = function() {
        return this._invalidDate
    }, l.ordinal = function(e) {
        return this._ordinal.replace("%d", e)
    }, l.preparse = ci, l.postformat = ci, l.relativeTime = function(e, t, i, n) {
        var s = this._relativeTime[i];
        return a(s) ? s(e, t, i, n) : s.replace(/%d/i, e)
    }, l.pastFuture = function(e, t) {
        return a(e = this._relativeTime[0 < e ? "future" : "past"]) ? e(t) : e.replace(/%s/i, t)
    }, l.set = function(e) {
        var t, i;
        for (i in e) h(e, i) && (a(t = e[i]) ? this[i] = t : this["_" + i] = t);
        this._config = e, this._dayOfMonthOrdinalParseLenient = new RegExp((this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) + "|" + /\d{1,2}/.source)
    }, l.eras = function(e, t) {
        for (var i, n = this._eras || pt("en")._eras, s = 0, r = n.length; s < r; ++s) switch ("string" == typeof n[s].since && (i = m(n[s].since).startOf("day"), n[s].since = i.valueOf()), typeof n[s].until) {
            case "undefined":
                n[s].until = 1 / 0;
                break;
            case "string":
                i = m(n[s].until).startOf("day").valueOf(), n[s].until = i.valueOf()
        }
        return n
    }, l.erasParse = function(e, t, i) {
        var n, s, r, a, o, l = this.eras();
        for (e = e.toUpperCase(), n = 0, s = l.length; n < s; ++n)
            if (r = l[n].name.toUpperCase(), a = l[n].abbr.toUpperCase(), o = l[n].narrow.toUpperCase(), i) switch (t) {
                case "N":
                case "NN":
                case "NNN":
                    if (a === e) return l[n];
                    break;
                case "NNNN":
                    if (r === e) return l[n];
                    break;
                case "NNNNN":
                    if (o === e) return l[n]
            } else if (0 <= [r, a, o].indexOf(e)) return l[n]
    }, l.erasConvertYear = function(e, t) {
        var i = e.since <= e.until ? 1 : -1;
        return void 0 === t ? m(e.since).year() : m(e.since).year() + (t - e.offset) * i
    }, l.erasAbbrRegex = function(e) {
        return h(this, "_erasAbbrRegex") || ri.call(this), e ? this._erasAbbrRegex : this._erasRegex
    }, l.erasNameRegex = function(e) {
        return h(this, "_erasNameRegex") || ri.call(this), e ? this._erasNameRegex : this._erasRegex
    }, l.erasNarrowRegex = function(e) {
        return h(this, "_erasNarrowRegex") || ri.call(this), e ? this._erasNarrowRegex : this._erasRegex
    }, l.months = function(e, t) {
        return e ? (g(this._months) ? this._months : this._months[(this._months.isFormat || Ne).test(t) ? "format" : "standalone"])[e.month()] : g(this._months) ? this._months : this._months.standalone
    }, l.monthsShort = function(e, t) {
        return e ? (g(this._monthsShort) ? this._monthsShort : this._monthsShort[Ne.test(t) ? "format" : "standalone"])[e.month()] : g(this._monthsShort) ? this._monthsShort : this._monthsShort.standalone
    }, l.monthsParse = function(e, t, i) {
        var n, s;
        if (this._monthsParseExact) return function(e, t, i) {
            var n, s, r, e = e.toLocaleLowerCase();
            if (!this._monthsParse)
                for (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = [], n = 0; n < 12; ++n) r = d([2e3, n]), this._shortMonthsParse[n] = this.monthsShort(r, "").toLocaleLowerCase(), this._longMonthsParse[n] = this.months(r, "").toLocaleLowerCase();
            return i ? "MMM" === t ? -1 !== (s = S.call(this._shortMonthsParse, e)) ? s : null : -1 !== (s = S.call(this._longMonthsParse, e)) ? s : null : "MMM" === t ? -1 !== (s = S.call(this._shortMonthsParse, e)) || -1 !== (s = S.call(this._longMonthsParse, e)) ? s : null : -1 !== (s = S.call(this._longMonthsParse, e)) || -1 !== (s = S.call(this._shortMonthsParse, e)) ? s : null
        }.call(this, e, t, i);
        for (this._monthsParse || (this._monthsParse = [], this._longMonthsParse = [], this._shortMonthsParse = []), n = 0; n < 12; n++) {
            if (s = d([2e3, n]), i && !this._longMonthsParse[n] && (this._longMonthsParse[n] = new RegExp("^" + this.months(s, "").replace(".", "") + "$", "i"), this._shortMonthsParse[n] = new RegExp("^" + this.monthsShort(s, "").replace(".", "") + "$", "i")), i || this._monthsParse[n] || (s = "^" + this.months(s, "") + "|^" + this.monthsShort(s, ""), this._monthsParse[n] = new RegExp(s.replace(".", ""), "i")), i && "MMMM" === t && this._longMonthsParse[n].test(e)) return n;
            if (i && "MMM" === t && this._shortMonthsParse[n].test(e)) return n;
            if (!i && this._monthsParse[n].test(e)) return n
        }
    }, l.monthsRegex = function(e) {
        return this._monthsParseExact ? (h(this, "_monthsRegex") || Fe.call(this), e ? this._monthsStrictRegex : this._monthsRegex) : (h(this, "_monthsRegex") || (this._monthsRegex = Ae), this._monthsStrictRegex && e ? this._monthsStrictRegex : this._monthsRegex)
    }, l.monthsShortRegex = function(e) {
        return this._monthsParseExact ? (h(this, "_monthsRegex") || Fe.call(this), e ? this._monthsShortStrictRegex : this._monthsShortRegex) : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = He), this._monthsShortStrictRegex && e ? this._monthsShortStrictRegex : this._monthsShortRegex)
    }, l.week = function(e) {
        return Ge(e, this._week.dow, this._week.doy).week
    }, l.firstDayOfYear = function() {
        return this._week.doy
    }, l.firstDayOfWeek = function() {
        return this._week.dow
    }, l.weekdays = function(e, t) {
        return t = g(this._weekdays) ? this._weekdays : this._weekdays[e && !0 !== e && this._weekdays.isFormat.test(t) ? "format" : "standalone"], !0 === e ? qe(t, this._week.dow) : e ? t[e.day()] : t
    }, l.weekdaysMin = function(e) {
        return !0 === e ? qe(this._weekdaysMin, this._week.dow) : e ? this._weekdaysMin[e.day()] : this._weekdaysMin
    }, l.weekdaysShort = function(e) {
        return !0 === e ? qe(this._weekdaysShort, this._week.dow) : e ? this._weekdaysShort[e.day()] : this._weekdaysShort
    }, l.weekdaysParse = function(e, t, i) {
        var n, s;
        if (this._weekdaysParseExact) return function(e, t, i) {
            var n, s, r, e = e.toLocaleLowerCase();
            if (!this._weekdaysParse)
                for (this._weekdaysParse = [], this._shortWeekdaysParse = [], this._minWeekdaysParse = [], n = 0; n < 7; ++n) r = d([2e3, 1]).day(n), this._minWeekdaysParse[n] = this.weekdaysMin(r, "").toLocaleLowerCase(), this._shortWeekdaysParse[n] = this.weekdaysShort(r, "").toLocaleLowerCase(), this._weekdaysParse[n] = this.weekdays(r, "").toLocaleLowerCase();
            return i ? "dddd" === t ? -1 !== (s = S.call(this._weekdaysParse, e)) ? s : null : "ddd" === t ? -1 !== (s = S.call(this._shortWeekdaysParse, e)) ? s : null : -1 !== (s = S.call(this._minWeekdaysParse, e)) ? s : null : "dddd" === t ? -1 !== (s = S.call(this._weekdaysParse, e)) || -1 !== (s = S.call(this._shortWeekdaysParse, e)) || -1 !== (s = S.call(this._minWeekdaysParse, e)) ? s : null : "ddd" === t ? -1 !== (s = S.call(this._shortWeekdaysParse, e)) || -1 !== (s = S.call(this._weekdaysParse, e)) || -1 !== (s = S.call(this._minWeekdaysParse, e)) ? s : null : -1 !== (s = S.call(this._minWeekdaysParse, e)) || -1 !== (s = S.call(this._weekdaysParse, e)) || -1 !== (s = S.call(this._shortWeekdaysParse, e)) ? s : null
        }.call(this, e, t, i);
        for (this._weekdaysParse || (this._weekdaysParse = [], this._minWeekdaysParse = [], this._shortWeekdaysParse = [], this._fullWeekdaysParse = []), n = 0; n < 7; n++) {
            if (s = d([2e3, 1]).day(n), i && !this._fullWeekdaysParse[n] && (this._fullWeekdaysParse[n] = new RegExp("^" + this.weekdays(s, "").replace(".", "\\.?") + "$", "i"), this._shortWeekdaysParse[n] = new RegExp("^" + this.weekdaysShort(s, "").replace(".", "\\.?") + "$", "i"), this._minWeekdaysParse[n] = new RegExp("^" + this.weekdaysMin(s, "").replace(".", "\\.?") + "$", "i")), this._weekdaysParse[n] || (s = "^" + this.weekdays(s, "") + "|^" + this.weekdaysShort(s, "") + "|^" + this.weekdaysMin(s, ""), this._weekdaysParse[n] = new RegExp(s.replace(".", ""), "i")), i && "dddd" === t && this._fullWeekdaysParse[n].test(e)) return n;
            if (i && "ddd" === t && this._shortWeekdaysParse[n].test(e)) return n;
            if (i && "dd" === t && this._minWeekdaysParse[n].test(e)) return n;
            if (!i && this._weekdaysParse[n].test(e)) return n
        }
    }, l.weekdaysRegex = function(e) {
        return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || it.call(this), e ? this._weekdaysStrictRegex : this._weekdaysRegex) : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = Xe), this._weekdaysStrictRegex && e ? this._weekdaysStrictRegex : this._weekdaysRegex)
    }, l.weekdaysShortRegex = function(e) {
        return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || it.call(this), e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex) : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = et), this._weekdaysShortStrictRegex && e ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
    }, l.weekdaysMinRegex = function(e) {
        return this._weekdaysParseExact ? (h(this, "_weekdaysRegex") || it.call(this), e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex) : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = tt), this._weekdaysMinStrictRegex && e ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
    }, l.isPM = function(e) {
        return "p" === (e + "").toLowerCase().charAt(0)
    }, l.meridiem = function(e, t, i) {
        return 11 < e ? i ? "pm" : "PM" : i ? "am" : "AM"
    }, ht("en", {
        eras: [{
            since: "0001-01-01",
            until: 1 / 0,
            offset: 1,
            name: "Anno Domini",
            narrow: "AD",
            abbr: "AD"
        }, {
            since: "0000-12-31",
            until: -1 / 0,
            offset: 1,
            name: "Before Christ",
            narrow: "BC",
            abbr: "BC"
        }],
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal: function(e) {
            var t = e % 10;
            return e + (1 === c(e % 100 / 10) ? "th" : 1 == t ? "st" : 2 == t ? "nd" : 3 == t ? "rd" : "th")
        }
    }), m.lang = e("moment.lang is deprecated. Use moment.locale instead.", ht), m.langData = e("moment.langData is deprecated. Use moment.localeData instead.", pt);
    var pi = Math.abs;

    function mi(e, t, i, n) {
        t = $(t, i);
        return e._milliseconds += n * t._milliseconds, e._days += n * t._days, e._months += n * t._months, e._bubble()
    }

    function gi(e) {
        return e < 0 ? Math.floor(e) : Math.ceil(e)
    }

    function yi(e) {
        return 4800 * e / 146097
    }

    function vi(e) {
        return 146097 * e / 4800
    }

    function _i(e) {
        return function() {
            return this.as(e)
        }
    }
    _e = _i("ms"), pe = _i("s"), $e = _i("m"), ve = _i("h"), ye = _i("d"), Ze = _i("w"), p = _i("M"), me = _i("Q"), we = _i("y");

    function bi(e) {
        return function() {
            return this.isValid() ? this._data[e] : NaN
        }
    }
    var ge = bi("milliseconds"),
        be = bi("seconds"),
        We = bi("minutes"),
        l = bi("hours"),
        wi = bi("days"),
        ki = bi("months"),
        xi = bi("years");
    var Si = Math.round,
        Mi = {
            ss: 44,
            s: 45,
            m: 45,
            h: 22,
            d: 26,
            w: null,
            M: 11
        };

    function Di(e, t, i, n) {
        var s = $(e).abs(),
            r = Si(s.as("s")),
            a = Si(s.as("m")),
            o = Si(s.as("h")),
            l = Si(s.as("d")),
            d = Si(s.as("M")),
            c = Si(s.as("w")),
            s = Si(s.as("y")),
            r = (r <= i.ss ? ["s", r] : r < i.s && ["ss", r]) || (a <= 1 ? ["m"] : a < i.m && ["mm", a]) || (o <= 1 ? ["h"] : o < i.h && ["hh", o]) || (l <= 1 ? ["d"] : l < i.d && ["dd", l]);
        return (r = (r = null != i.w ? r || (c <= 1 ? ["w"] : c < i.w && ["ww", c]) : r) || (d <= 1 ? ["M"] : d < i.M && ["MM", d]) || (s <= 1 ? ["y"] : ["yy", s]))[2] = t, r[3] = 0 < +e, r[4] = n,
            function(e, t, i, n, s) {
                return s.relativeTime(t || 1, !!i, e, n)
            }.apply(null, r)
    }
    var Ti = Math.abs;

    function Yi(e) {
        return (0 < e) - (e < 0) || +e
    }

    function Ii() {
        var e, t, i, n, s, r, a, o, l, d, c;
        return this.isValid() ? (e = Ti(this._milliseconds) / 1e3, t = Ti(this._days), i = Ti(this._months), (o = this.asSeconds()) ? (n = u(e / 60), s = u(n / 60), e %= 60, n %= 60, r = u(i / 12), i %= 12, a = e ? e.toFixed(3).replace(/\.?0+$/, "") : "", l = Yi(this._months) !== Yi(o) ? "-" : "", d = Yi(this._days) !== Yi(o) ? "-" : "", c = Yi(this._milliseconds) !== Yi(o) ? "-" : "", (o < 0 ? "-" : "") + "P" + (r ? l + r + "Y" : "") + (i ? l + i + "M" : "") + (t ? d + t + "D" : "") + (s || n || e ? "T" : "") + (s ? c + s + "H" : "") + (n ? c + n + "M" : "") + (e ? c + a + "S" : "")) : "P0D") : this.localeData().invalidDate()
    }
    var j = $t.prototype;
    return j.isValid = function() {
        return this._isValid
    }, j.abs = function() {
        var e = this._data;
        return this._milliseconds = pi(this._milliseconds), this._days = pi(this._days), this._months = pi(this._months), e.milliseconds = pi(e.milliseconds), e.seconds = pi(e.seconds), e.minutes = pi(e.minutes), e.hours = pi(e.hours), e.months = pi(e.months), e.years = pi(e.years), this
    }, j.add = function(e, t) {
        return mi(this, e, t, 1)
    }, j.subtract = function(e, t) {
        return mi(this, e, t, -1)
    }, j.as = function(e) {
        if (!this.isValid()) return NaN;
        var t, i, n = this._milliseconds;
        if ("month" === (e = o(e)) || "quarter" === e || "year" === e) switch (t = this._days + n / 864e5, i = this._months + yi(t), e) {
            case "month":
                return i;
            case "quarter":
                return i / 3;
            case "year":
                return i / 12
        } else switch (t = this._days + Math.round(vi(this._months)), e) {
            case "week":
                return t / 7 + n / 6048e5;
            case "day":
                return t + n / 864e5;
            case "hour":
                return 24 * t + n / 36e5;
            case "minute":
                return 1440 * t + n / 6e4;
            case "second":
                return 86400 * t + n / 1e3;
            case "millisecond":
                return Math.floor(864e5 * t) + n;
            default:
                throw new Error("Unknown unit " + e)
        }
    }, j.asMilliseconds = _e, j.asSeconds = pe, j.asMinutes = $e, j.asHours = ve, j.asDays = ye, j.asWeeks = Ze, j.asMonths = p, j.asQuarters = me, j.asYears = we, j.valueOf = function() {
        return this.isValid() ? this._milliseconds + 864e5 * this._days + this._months % 12 * 2592e6 + 31536e6 * c(this._months / 12) : NaN
    }, j._bubble = function() {
        var e = this._milliseconds,
            t = this._days,
            i = this._months,
            n = this._data;
        return 0 <= e && 0 <= t && 0 <= i || e <= 0 && t <= 0 && i <= 0 || (e += 864e5 * gi(vi(i) + t), i = t = 0), n.milliseconds = e % 1e3, e = u(e / 1e3), n.seconds = e % 60, e = u(e / 60), n.minutes = e % 60, e = u(e / 60), n.hours = e % 24, t += u(e / 24), i += e = u(yi(t)), t -= gi(vi(e)), e = u(i / 12), i %= 12, n.days = t, n.months = i, n.years = e, this
    }, j.clone = function() {
        return $(this)
    }, j.get = function(e) {
        return e = o(e), this.isValid() ? this[e + "s"]() : NaN
    }, j.milliseconds = ge, j.seconds = be, j.minutes = We, j.hours = l, j.days = wi, j.weeks = function() {
        return u(this.days() / 7)
    }, j.months = ki, j.years = xi, j.humanize = function(e, t) {
        var i, n;
        return this.isValid() ? (i = !1, n = Mi, "object" == typeof e && (t = e, e = !1), "boolean" == typeof e && (i = e), "object" == typeof t && (n = Object.assign({}, Mi, t), null != t.s) && null == t.ss && (n.ss = t.s - 1), e = this.localeData(), t = Di(this, !i, n, e), i && (t = e.pastFuture(+this, t)), e.postformat(t)) : this.localeData().invalidDate()
    }, j.toISOString = Ii, j.toString = Ii, j.toJSON = Ii, j.locale = Kt, j.localeData = Xt, j.toIsoString = e("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)", Ii), j.lang = Ke, n("X", 0, 0, "unix"), n("x", 0, 0, "valueOf"), w("x", xe), w("X", /[+-]?\d+(\.\d{1,3})?/), x("X", function(e, t, i) {
        i._d = new Date(1e3 * parseFloat(e))
    }), x("x", function(e, t, i) {
        i._d = new Date(c(e))
    }), m.version = "2.29.4", N = E, m.fn = s, m.min = function() {
        return Ct("isBefore", [].slice.call(arguments, 0))
    }, m.max = function() {
        return Ct("isAfter", [].slice.call(arguments, 0))
    }, m.now = function() {
        return Date.now ? Date.now() : +new Date
    }, m.utc = d, m.unix = function(e) {
        return E(1e3 * e)
    }, m.months = function(e, t) {
        return hi(e, t, "months")
    }, m.isDate = P, m.locale = ht, m.invalid = W, m.duration = $, m.isMoment = b, m.weekdays = function(e, t, i) {
        return fi(e, t, i, "weekdays")
    }, m.parseZone = function() {
        return E.apply(null, arguments).parseZone()
    }, m.localeData = pt, m.isDuration = jt, m.monthsShort = function(e, t) {
        return hi(e, t, "monthsShort")
    }, m.weekdaysMin = function(e, t, i) {
        return fi(e, t, i, "weekdaysMin")
    }, m.defineLocale = ft, m.updateLocale = function(e, t) {
        var i, n;
        return null != t ? (n = ot, null != C[e] && null != C[e].parentLocale ? C[e].set(K(C[e]._config, t)) : (t = K(n = null != (i = ut(e)) ? i._config : n, t), null == i && (t.abbr = e), (n = new X(t)).parentLocale = C[e], C[e] = n), ht(e)) : null != C[e] && (null != C[e].parentLocale ? (C[e] = C[e].parentLocale, e === ht() && ht(e)) : null != C[e] && delete C[e]), C[e]
    }, m.locales = function() {
        return ee(C)
    }, m.weekdaysShort = function(e, t, i) {
        return fi(e, t, i, "weekdaysShort")
    }, m.normalizeUnits = o, m.relativeTimeRounding = function(e) {
        return void 0 === e ? Si : "function" == typeof e && (Si = e, !0)
    }, m.relativeTimeThreshold = function(e, t) {
        return void 0 !== Mi[e] && (void 0 === t ? Mi[e] : (Mi[e] = t, "s" === e && (Mi.ss = t - 1), !0))
    }, m.calendarFormat = function(e, t) {
        return (e = e.diff(t, "days", !0)) < -6 ? "sameElse" : e < -1 ? "lastWeek" : e < 0 ? "lastDay" : e < 1 ? "sameDay" : e < 2 ? "nextDay" : e < 7 ? "nextWeek" : "sameElse"
    }, m.prototype = s, m.HTML5_FMT = {
        DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
        DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
        DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
        DATE: "YYYY-MM-DD",
        TIME: "HH:mm",
        TIME_SECONDS: "HH:mm:ss",
        TIME_MS: "HH:mm:ss.SSS",
        WEEK: "GGGG-[W]WW",
        MONTH: "YYYY-MM"
    }, m
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? t(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";
    return e.defineLocale("cy", {
        months: "Ionawr_Chwefror_Mawrth_Ebrill_Mai_Mehefin_Gorffennaf_Awst_Medi_Hydref_Tachwedd_Rhagfyr".split("_"),
        monthsShort: "Ion_Chwe_Maw_Ebr_Mai_Meh_Gor_Aws_Med_Hyd_Tach_Rhag".split("_"),
        weekdays: "Dydd Sul_Dydd Llun_Dydd Mawrth_Dydd Mercher_Dydd Iau_Dydd Gwener_Dydd Sadwrn".split("_"),
        weekdaysShort: "Sul_Llun_Maw_Mer_Iau_Gwe_Sad".split("_"),
        weekdaysMin: "Su_Ll_Ma_Me_Ia_Gw_Sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Heddiw am] LT",
            nextDay: "[Yfory am] LT",
            nextWeek: "dddd [am] LT",
            lastDay: "[Ddoe am] LT",
            lastWeek: "dddd [diwethaf am] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "mewn %s",
            past: "%s yn ôl",
            s: "ychydig eiliadau",
            ss: "%d eiliad",
            m: "munud",
            mm: "%d munud",
            h: "awr",
            hh: "%d awr",
            d: "diwrnod",
            dd: "%d diwrnod",
            M: "mis",
            MM: "%d mis",
            y: "blwyddyn",
            yy: "%d flynedd"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(fed|ain|af|il|ydd|ed|eg)/,
        ordinal: function(e) {
            var t = "";
            return 20 < e ? t = 40 === e || 50 === e || 60 === e || 80 === e || 100 === e ? "fed" : "ain" : 0 < e && (t = ["", "af", "il", "ydd", "ydd", "ed", "ed", "ed", "fed", "fed", "fed", "eg", "fed", "eg", "eg", "fed", "eg", "eg", "fed", "eg", "fed"][e]), e + t
        },
        week: {
            dow: 1,
            doy: 4
        }
    })
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? t(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";
    var i = "ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.".split("_"),
        n = "ene_feb_mar_abr_may_jun_jul_ago_sep_oct_nov_dic".split("_"),
        t = [/^ene/i, /^feb/i, /^mar/i, /^abr/i, /^may/i, /^jun/i, /^jul/i, /^ago/i, /^sep/i, /^oct/i, /^nov/i, /^dic/i],
        s = /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i;
    return e.defineLocale("es", {
        months: "enero_febrero_marzo_abril_mayo_junio_julio_agosto_septiembre_octubre_noviembre_diciembre".split("_"),
        monthsShort: function(e, t) {
            return e ? (/-MMM-/.test(t) ? n : i)[e.month()] : i
        },
        monthsRegex: s,
        monthsShortRegex: s,
        monthsStrictRegex: /^(enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre)/i,
        monthsShortStrictRegex: /^(ene\.?|feb\.?|mar\.?|abr\.?|may\.?|jun\.?|jul\.?|ago\.?|sep\.?|oct\.?|nov\.?|dic\.?)/i,
        monthsParse: t,
        longMonthsParse: t,
        shortMonthsParse: t,
        weekdays: "domingo_lunes_martes_miércoles_jueves_viernes_sábado".split("_"),
        weekdaysShort: "dom._lun._mar._mié._jue._vie._sáb.".split("_"),
        weekdaysMin: "do_lu_ma_mi_ju_vi_sá".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D [de] MMMM [de] YYYY",
            LLL: "D [de] MMMM [de] YYYY H:mm",
            LLLL: "dddd, D [de] MMMM [de] YYYY H:mm"
        },
        calendar: {
            sameDay: function() {
                return "[hoy a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextDay: function() {
                return "[mañana a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            nextWeek: function() {
                return "dddd [a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastDay: function() {
                return "[ayer a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            lastWeek: function() {
                return "[el] dddd [pasado a la" + (1 !== this.hours() ? "s" : "") + "] LT"
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "en %s",
            past: "hace %s",
            s: "unos segundos",
            ss: "%d segundos",
            m: "un minuto",
            mm: "%d minutos",
            h: "una hora",
            hh: "%d horas",
            d: "un día",
            dd: "%d días",
            w: "una semana",
            ww: "%d semanas",
            M: "un mes",
            MM: "%d meses",
            y: "un año",
            yy: "%d años"
        },
        dayOfMonthOrdinalParse: /\d{1,2}º/,
        ordinal: "%dº",
        week: {
            dow: 1,
            doy: 4
        },
        invalidDate: "Fecha inválida"
    })
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? t(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";
    var t = /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
        i = [/^janv/i, /^févr/i, /^mars/i, /^avr/i, /^mai/i, /^juin/i, /^juil/i, /^août/i, /^sept/i, /^oct/i, /^nov/i, /^déc/i];
    return e.defineLocale("fr", {
        months: "janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre".split("_"),
        monthsShort: "janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.".split("_"),
        monthsRegex: t,
        monthsShortRegex: t,
        monthsStrictRegex: /^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i,
        monthsShortStrictRegex: /(janv\.?|févr\.?|mars|avr\.?|mai|juin|juil\.?|août|sept\.?|oct\.?|nov\.?|déc\.?)/i,
        monthsParse: i,
        longMonthsParse: i,
        shortMonthsParse: i,
        weekdays: "dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),
        weekdaysShort: "dim._lun._mar._mer._jeu._ven._sam.".split("_"),
        weekdaysMin: "di_lu_ma_me_je_ve_sa".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Aujourd’hui à] LT",
            nextDay: "[Demain à] LT",
            nextWeek: "dddd [à] LT",
            lastDay: "[Hier à] LT",
            lastWeek: "dddd [dernier à] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "dans %s",
            past: "il y a %s",
            s: "quelques secondes",
            ss: "%d secondes",
            m: "une minute",
            mm: "%d minutes",
            h: "une heure",
            hh: "%d heures",
            d: "un jour",
            dd: "%d jours",
            w: "une semaine",
            ww: "%d semaines",
            M: "un mois",
            MM: "%d mois",
            y: "un an",
            yy: "%d ans"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(er|)/,
        ordinal: function(e, t) {
            switch (t) {
                case "D":
                    return e + (1 === e ? "er" : "");
                default:
                case "M":
                case "Q":
                case "DDD":
                case "d":
                    return e + (1 === e ? "er" : "e");
                case "w":
                case "W":
                    return e + (1 === e ? "re" : "e")
            }
        },
        week: {
            dow: 1,
            doy: 4
        }
    })
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? t(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";
    return e.defineLocale("ga", {
        months: ["Eanáir", "Feabhra", "Márta", "Aibreán", "Bealtaine", "Meitheamh", "Iúil", "Lúnasa", "Meán Fómhair", "Deireadh Fómhair", "Samhain", "Nollaig"],
        monthsShort: ["Ean", "Feabh", "Márt", "Aib", "Beal", "Meith", "Iúil", "Lún", "M.F.", "D.F.", "Samh", "Noll"],
        monthsParseExact: !0,
        weekdays: ["Dé Domhnaigh", "Dé Luain", "Dé Máirt", "Dé Céadaoin", "Déardaoin", "Dé hAoine", "Dé Sathairn"],
        weekdaysShort: ["Domh", "Luan", "Máirt", "Céad", "Déar", "Aoine", "Sath"],
        weekdaysMin: ["Do", "Lu", "Má", "Cé", "Dé", "A", "Sa"],
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM YYYY",
            LLL: "D MMMM YYYY HH:mm",
            LLLL: "dddd, D MMMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Inniu ag] LT",
            nextDay: "[Amárach ag] LT",
            nextWeek: "dddd [ag] LT",
            lastDay: "[Inné ag] LT",
            lastWeek: "dddd [seo caite] [ag] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "i %s",
            past: "%s ó shin",
            s: "cúpla soicind",
            ss: "%d soicind",
            m: "nóiméad",
            mm: "%d nóiméad",
            h: "uair an chloig",
            hh: "%d uair an chloig",
            d: "lá",
            dd: "%d lá",
            M: "mí",
            MM: "%d míonna",
            y: "bliain",
            yy: "%d bliain"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(d|na|mh)/,
        ordinal: function(e) {
            return e + (1 === e ? "d" : e % 10 == 2 ? "na" : "mh")
        },
        week: {
            dow: 1,
            doy: 4
        }
    })
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? t(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";
    return e.defineLocale("ja", {
        eras: [{
            since: "2019-05-01",
            offset: 1,
            name: "令和",
            narrow: "㋿",
            abbr: "R"
        }, {
            since: "1989-01-08",
            until: "2019-04-30",
            offset: 1,
            name: "平成",
            narrow: "㍻",
            abbr: "H"
        }, {
            since: "1926-12-25",
            until: "1989-01-07",
            offset: 1,
            name: "昭和",
            narrow: "㍼",
            abbr: "S"
        }, {
            since: "1912-07-30",
            until: "1926-12-24",
            offset: 1,
            name: "大正",
            narrow: "㍽",
            abbr: "T"
        }, {
            since: "1873-01-01",
            until: "1912-07-29",
            offset: 6,
            name: "明治",
            narrow: "㍾",
            abbr: "M"
        }, {
            since: "0001-01-01",
            until: "1873-12-31",
            offset: 1,
            name: "西暦",
            narrow: "AD",
            abbr: "AD"
        }, {
            since: "0000-12-31",
            until: -1 / 0,
            offset: 1,
            name: "紀元前",
            narrow: "BC",
            abbr: "BC"
        }],
        eraYearOrdinalRegex: /(元|\d+)年/,
        eraYearOrdinalParse: function(e, t) {
            return "元" === t[1] ? 1 : parseInt(t[1] || e, 10)
        },
        months: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "日曜日_月曜日_火曜日_水曜日_木曜日_金曜日_土曜日".split("_"),
        weekdaysShort: "日_月_火_水_木_金_土".split("_"),
        weekdaysMin: "日_月_火_水_木_金_土".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYY年M月D日",
            LLL: "YYYY年M月D日 HH:mm",
            LLLL: "YYYY年M月D日 dddd HH:mm",
            l: "YYYY/MM/DD",
            ll: "YYYY年M月D日",
            lll: "YYYY年M月D日 HH:mm",
            llll: "YYYY年M月D日(ddd) HH:mm"
        },
        meridiemParse: /午前|午後/i,
        isPM: function(e) {
            return "午後" === e
        },
        meridiem: function(e, t, i) {
            return e < 12 ? "午前" : "午後"
        },
        calendar: {
            sameDay: "[今日] LT",
            nextDay: "[明日] LT",
            nextWeek: function(e) {
                return e.week() !== this.week() ? "[来週]dddd LT" : "dddd LT"
            },
            lastDay: "[昨日] LT",
            lastWeek: function(e) {
                return this.week() !== e.week() ? "[先週]dddd LT" : "dddd LT"
            },
            sameElse: "L"
        },
        dayOfMonthOrdinalParse: /\d{1,2}日/,
        ordinal: function(e, t) {
            switch (t) {
                case "y":
                    return 1 === e ? "元年" : e + "年";
                case "d":
                case "D":
                case "DDD":
                    return e + "日";
                default:
                    return e
            }
        },
        relativeTime: {
            future: "%s後",
            past: "%s前",
            s: "数秒",
            ss: "%d秒",
            m: "1分",
            mm: "%d分",
            h: "1時間",
            hh: "%d時間",
            d: "1日",
            dd: "%d日",
            M: "1ヶ月",
            MM: "%dヶ月",
            y: "1年",
            yy: "%d年"
        }
    })
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? t(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";

    function t(e, t, i, n) {
        var s = e + " ";
        switch (i) {
            case "s":
                return t || n ? "nekaj sekund" : "nekaj sekundami";
            case "ss":
                return s += 1 === e ? t ? "sekundo" : "sekundi" : 2 === e ? t || n ? "sekundi" : "sekundah" : e < 5 ? t || n ? "sekunde" : "sekundah" : "sekund";
            case "m":
                return t ? "ena minuta" : "eno minuto";
            case "mm":
                return s += 1 === e ? t ? "minuta" : "minuto" : 2 === e ? t || n ? "minuti" : "minutama" : e < 5 ? t || n ? "minute" : "minutami" : t || n ? "minut" : "minutami";
            case "h":
                return t ? "ena ura" : "eno uro";
            case "hh":
                return s += 1 === e ? t ? "ura" : "uro" : 2 === e ? t || n ? "uri" : "urama" : e < 5 ? t || n ? "ure" : "urami" : t || n ? "ur" : "urami";
            case "d":
                return t || n ? "en dan" : "enim dnem";
            case "dd":
                return s += 1 === e ? t || n ? "dan" : "dnem" : 2 === e ? t || n ? "dni" : "dnevoma" : t || n ? "dni" : "dnevi";
            case "M":
                return t || n ? "en mesec" : "enim mesecem";
            case "MM":
                return s += 1 === e ? t || n ? "mesec" : "mesecem" : 2 === e ? t || n ? "meseca" : "mesecema" : e < 5 ? t || n ? "mesece" : "meseci" : t || n ? "mesecev" : "meseci";
            case "y":
                return t || n ? "eno leto" : "enim letom";
            case "yy":
                return s += 1 === e ? t || n ? "leto" : "letom" : 2 === e ? t || n ? "leti" : "letoma" : e < 5 ? t || n ? "leta" : "leti" : t || n ? "let" : "leti"
        }
    }
    return e.defineLocale("sl", {
        months: "januar_februar_marec_april_maj_junij_julij_avgust_september_oktober_november_december".split("_"),
        monthsShort: "jan._feb._mar._apr._maj._jun._jul._avg._sep._okt._nov._dec.".split("_"),
        monthsParseExact: !0,
        weekdays: "nedelja_ponedeljek_torek_sreda_četrtek_petek_sobota".split("_"),
        weekdaysShort: "ned._pon._tor._sre._čet._pet._sob.".split("_"),
        weekdaysMin: "ne_po_to_sr_če_pe_so".split("_"),
        weekdaysParseExact: !0,
        longDateFormat: {
            LT: "H:mm",
            LTS: "H:mm:ss",
            L: "DD. MM. YYYY",
            LL: "D. MMMM YYYY",
            LLL: "D. MMMM YYYY H:mm",
            LLLL: "dddd, D. MMMM YYYY H:mm"
        },
        calendar: {
            sameDay: "[danes ob] LT",
            nextDay: "[jutri ob] LT",
            nextWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[v] [nedeljo] [ob] LT";
                    case 3:
                        return "[v] [sredo] [ob] LT";
                    case 6:
                        return "[v] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[v] dddd [ob] LT"
                }
            },
            lastDay: "[včeraj ob] LT",
            lastWeek: function() {
                switch (this.day()) {
                    case 0:
                        return "[prejšnjo] [nedeljo] [ob] LT";
                    case 3:
                        return "[prejšnjo] [sredo] [ob] LT";
                    case 6:
                        return "[prejšnjo] [soboto] [ob] LT";
                    case 1:
                    case 2:
                    case 4:
                    case 5:
                        return "[prejšnji] dddd [ob] LT"
                }
            },
            sameElse: "L"
        },
        relativeTime: {
            future: "čez %s",
            past: "pred %s",
            s: t,
            ss: t,
            m: t,
            mm: t,
            h: t,
            hh: t,
            d: t,
            dd: t,
            M: t,
            MM: t,
            y: t,
            yy: t
        },
        dayOfMonthOrdinalParse: /\d{1,2}\./,
        ordinal: "%d.",
        week: {
            dow: 1,
            doy: 7
        }
    })
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? t(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";
    return e.defineLocale("vi", {
        months: "tháng 1_tháng 2_tháng 3_tháng 4_tháng 5_tháng 6_tháng 7_tháng 8_tháng 9_tháng 10_tháng 11_tháng 12".split("_"),
        monthsShort: "Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12".split("_"),
        monthsParseExact: !0,
        weekdays: "chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy".split("_"),
        weekdaysShort: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        weekdaysMin: "CN_T2_T3_T4_T5_T6_T7".split("_"),
        weekdaysParseExact: !0,
        meridiemParse: /sa|ch/i,
        isPM: function(e) {
            return /^ch$/i.test(e)
        },
        meridiem: function(e, t, i) {
            return e < 12 ? i ? "sa" : "SA" : i ? "ch" : "CH"
        },
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "DD/MM/YYYY",
            LL: "D MMMM [năm] YYYY",
            LLL: "D MMMM [năm] YYYY HH:mm",
            LLLL: "dddd, D MMMM [năm] YYYY HH:mm",
            l: "DD/M/YYYY",
            ll: "D MMM YYYY",
            lll: "D MMM YYYY HH:mm",
            llll: "ddd, D MMM YYYY HH:mm"
        },
        calendar: {
            sameDay: "[Hôm nay lúc] LT",
            nextDay: "[Ngày mai lúc] LT",
            nextWeek: "dddd [tuần tới lúc] LT",
            lastDay: "[Hôm qua lúc] LT",
            lastWeek: "dddd [tuần trước lúc] LT",
            sameElse: "L"
        },
        relativeTime: {
            future: "%s tới",
            past: "%s trước",
            s: "vài giây",
            ss: "%d giây",
            m: "một phút",
            mm: "%d phút",
            h: "một giờ",
            hh: "%d giờ",
            d: "một ngày",
            dd: "%d ngày",
            w: "một tuần",
            ww: "%d tuần",
            M: "một tháng",
            MM: "%d tháng",
            y: "một năm",
            yy: "%d năm"
        },
        dayOfMonthOrdinalParse: /\d{1,2}/,
        ordinal: function(e) {
            return e
        },
        week: {
            dow: 1,
            doy: 4
        }
    })
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module && "function" == typeof require ? t(require("../moment")) : "function" == typeof define && define.amd ? define(["../moment"], t) : t(e.moment)
}(this, function(e) {
    "use strict";
    return e.defineLocale("zh", {
        months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
        monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
        weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
        weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
        weekdaysMin: "日_一_二_三_四_五_六".split("_"),
        longDateFormat: {
            LT: "HH:mm",
            LTS: "HH:mm:ss",
            L: "YYYY/MM/DD",
            LL: "YYYY年M月D日",
            LLL: "YYYY年M月D日Ah点mm分",
            LLLL: "YYYY年M月D日ddddAh点mm分",
            l: "YYYY/M/D",
            ll: "YYYY年M月D日",
            lll: "YYYY年M月D日 HH:mm",
            llll: "YYYY年M月D日dddd HH:mm"
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function(e, t) {
            return 12 === e && (e = 0), "凌晨" === t || "早上" === t || "上午" === t || "下午" !== t && "晚上" !== t && 11 <= e ? e : e + 12
        },
        meridiem: function(e, t, i) {
            e = 100 * e + t;
            return e < 600 ? "凌晨" : e < 900 ? "早上" : e < 1130 ? "上午" : e < 1230 ? "中午" : e < 1800 ? "下午" : "晚上"
        },
        calendar: {
            sameDay: "[今天]LT",
            nextDay: "[明天]LT",
            nextWeek: function(e) {
                return e.week() !== this.week() ? "[下]dddLT" : "[本]dddLT"
            },
            lastDay: "[昨天]LT",
            lastWeek: function(e) {
                return this.week() !== e.week() ? "[上]dddLT" : "[本]dddLT"
            },
            sameElse: "L"
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function(e, t) {
            switch (t) {
                case "d":
                case "D":
                case "DDD":
                    return e + "日";
                case "M":
                    return e + "月";
                case "w":
                case "W":
                    return e + "周";
                default:
                    return e
            }
        },
        relativeTime: {
            future: "%s后",
            past: "%s前",
            s: "几秒",
            ss: "%d 秒",
            m: "1 分钟",
            mm: "%d 分钟",
            h: "1 小时",
            hh: "%d 小时",
            d: "1 天",
            dd: "%d 天",
            w: "1 周",
            ww: "%d 周",
            M: "1 个月",
            MM: "%d 个月",
            y: "1 年",
            yy: "%d 年"
        },
        week: {
            dow: 1,
            doy: 4
        }
    })
}),
function(e, t) {
    void 0 === e && void 0 !== window && (e = window), "function" == typeof define && define.amd ? define(["jquery"], t) : "object" == typeof module && module.exports ? module.exports = t(require("jquery")) : t(e.jQuery)
}(this, function(e) {
    ! function(b) {
        "use strict";
        var N = ["sanitize", "whiteList", "sanitizeFn"],
            H = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"],
            A = {
                "*": ["class", "dir", "id", "lang", "role", "tabindex", "style", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: []
            },
            P = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi,
            z = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

        function T(e, t, i) {
            if (i && "function" == typeof i) return i(e);
            for (var n = Object.keys(t), s = 0, r = e.length; s < r; s++)
                for (var a = e[s].querySelectorAll("*"), o = 0, l = a.length; o < l; o++) {
                    var d = a[o],
                        c = d.nodeName.toLowerCase();
                    if (-1 === n.indexOf(c)) d.parentNode.removeChild(d);
                    else
                        for (var u = [].slice.call(d.attributes), h = [].concat(t["*"] || [], t[c] || []), f = 0, p = u.length; f < p; f++) {
                            var m = u[f];
                            ! function(e, t) {
                                var i = e.nodeName.toLowerCase();
                                if (-1 !== b.inArray(i, t)) return -1 === b.inArray(i, H) || Boolean(e.nodeValue.match(P) || e.nodeValue.match(z));
                                for (var n = b(t).filter(function(e, t) {
                                        return t instanceof RegExp
                                    }), s = 0, r = n.length; s < r; s++)
                                    if (i.match(n[s])) return 1
                            }(m, h) && d.removeAttribute(m.nodeName)
                        }
                }
        }
        if (!("classList" in document.createElement("_")) && "Element" in (i = window)) {
            var t = "classList",
                e = "prototype",
                i = i.Element[e],
                n = Object,
                s = function() {
                    var i = b(this);
                    return {
                        add: function(e) {
                            return e = Array.prototype.slice.call(arguments).join(" "), i.addClass(e)
                        },
                        remove: function(e) {
                            return e = Array.prototype.slice.call(arguments).join(" "), i.removeClass(e)
                        },
                        toggle: function(e, t) {
                            return i.toggleClass(e, t)
                        },
                        contains: function(e) {
                            return i.hasClass(e)
                        }
                    }
                };
            if (n.defineProperty) {
                var r = {
                    get: s,
                    enumerable: !0,
                    configurable: !0
                };
                try {
                    n.defineProperty(i, t, r)
                } catch (e) {
                    void 0 !== e.number && -2146823252 !== e.number || (r.enumerable = !1, n.defineProperty(i, t, r))
                }
            } else n[e].__defineGetter__ && i.__defineGetter__(t, s)
        }
        var a, o, l, d, r = document.createElement("_");

        function c(e) {
            if (null == this) throw new TypeError;
            var t = String(this);
            if (e && "[object RegExp]" == d.call(e)) throw new TypeError;
            var i = t.length,
                n = String(e),
                s = n.length,
                e = 1 < arguments.length ? arguments[1] : void 0,
                e = e ? Number(e) : 0,
                r = (e != e && (e = 0), Math.min(Math.max(e, 0), i));
            if (i < s + r) return !1;
            for (var a = -1; ++a < s;)
                if (t.charCodeAt(r + a) != n.charCodeAt(a)) return !1;
            return !0
        }

        function w(e, t) {
            var i, n = e.selectedOptions,
                s = [];
            if (t) {
                for (var r = 0, a = n.length; r < a; r++)(i = n[r]).disabled || "OPTGROUP" === i.parentNode.tagName && i.parentNode.disabled || s.push(i);
                return s
            }
            return n
        }

        function k(e, t) {
            for (var i, n = [], s = t || e.selectedOptions, r = 0, a = s.length; r < a; r++)(i = s[r]).disabled || "OPTGROUP" === i.parentNode.tagName && i.parentNode.disabled || n.push(i.value);
            return e.multiple ? n : n.length ? n[0] : null
        }
        r.classList.add("c1", "c2"), r.classList.contains("c2") || (a = DOMTokenList.prototype.add, o = DOMTokenList.prototype.remove, DOMTokenList.prototype.add = function() {
            Array.prototype.forEach.call(arguments, a.bind(this))
        }, DOMTokenList.prototype.remove = function() {
            Array.prototype.forEach.call(arguments, o.bind(this))
        }), r.classList.toggle("c3", !1), r.classList.contains("c3") && (l = DOMTokenList.prototype.toggle, DOMTokenList.prototype.toggle = function(e, t) {
            return 1 in arguments && !this.contains(e) == !t ? t : l.call(this, e)
        }), r = null, String.prototype.startsWith || (n = function() {
            try {
                var e = {},
                    t = Object.defineProperty,
                    i = t(e, e, e) && t
            } catch (e) {}
            return i
        }(), d = {}.toString, n ? n(String.prototype, "startsWith", {
            value: c,
            configurable: !0,
            writable: !0
        }) : String.prototype.startsWith = c), Object.keys || (Object.keys = function(e, t, i) {
            for (t in i = [], e) i.hasOwnProperty.call(e, t) && i.push(t);
            return i
        }), HTMLSelectElement && !HTMLSelectElement.prototype.hasOwnProperty("selectedOptions") && Object.defineProperty(HTMLSelectElement.prototype, "selectedOptions", {
            get: function() {
                return this.querySelectorAll(":checked")
            }
        });
        var u = {
                useDefault: !1,
                _set: b.valHooks.select.set
            },
            x = (b.valHooks.select.set = function(e, t) {
                return t && !u.useDefault && b(e).data("selected", !0), u._set.apply(this, arguments)
            }, null),
            F = function() {
                try {
                    return new Event("change"), !0
                } catch (e) {
                    return !1
                }
            }();

        function v(e, t, i, n) {
            for (var s = ["display", "subtext", "tokens"], r = !1, a = 0; a < s.length; a++) {
                var o = s[a],
                    l = e[o];
                if (l && (l = l.toString(), "display" === o && (l = l.replace(/<[^>]+>/g, "")), l = (l = n ? f(l) : l).toUpperCase(), r = "contains" === i ? 0 <= l.indexOf(t) : l.startsWith(t))) break
            }
            return r
        }

        function y(e) {
            return parseInt(e, 10) || 0
        }
        b.fn.triggerNative = function(e) {
            var t, i = this[0];
            i.dispatchEvent ? (F ? t = new Event(e, {
                bubbles: !0
            }) : (t = document.createEvent("Event")).initEvent(e, !0, !1), i.dispatchEvent(t)) : i.fireEvent ? ((t = document.createEventObject()).eventType = e, i.fireEvent("on" + e, t)) : this.trigger(e)
        };
        var R = {
                "À": "A",
                "Á": "A",
                "Â": "A",
                "Ã": "A",
                "Ä": "A",
                "Å": "A",
                "à": "a",
                "á": "a",
                "â": "a",
                "ã": "a",
                "ä": "a",
                "å": "a",
                "Ç": "C",
                "ç": "c",
                "Ð": "D",
                "ð": "d",
                "È": "E",
                "É": "E",
                "Ê": "E",
                "Ë": "E",
                "è": "e",
                "é": "e",
                "ê": "e",
                "ë": "e",
                "Ì": "I",
                "Í": "I",
                "Î": "I",
                "Ï": "I",
                "ì": "i",
                "í": "i",
                "î": "i",
                "ï": "i",
                "Ñ": "N",
                "ñ": "n",
                "Ò": "O",
                "Ó": "O",
                "Ô": "O",
                "Õ": "O",
                "Ö": "O",
                "Ø": "O",
                "ò": "o",
                "ó": "o",
                "ô": "o",
                "õ": "o",
                "ö": "o",
                "ø": "o",
                "Ù": "U",
                "Ú": "U",
                "Û": "U",
                "Ü": "U",
                "ù": "u",
                "ú": "u",
                "û": "u",
                "ü": "u",
                "Ý": "Y",
                "ý": "y",
                "ÿ": "y",
                "Æ": "Ae",
                "æ": "ae",
                "Þ": "Th",
                "þ": "th",
                "ß": "ss",
                "Ā": "A",
                "Ă": "A",
                "Ą": "A",
                "ā": "a",
                "ă": "a",
                "ą": "a",
                "Ć": "C",
                "Ĉ": "C",
                "Ċ": "C",
                "Č": "C",
                "ć": "c",
                "ĉ": "c",
                "ċ": "c",
                "č": "c",
                "Ď": "D",
                "Đ": "D",
                "ď": "d",
                "đ": "d",
                "Ē": "E",
                "Ĕ": "E",
                "Ė": "E",
                "Ę": "E",
                "Ě": "E",
                "ē": "e",
                "ĕ": "e",
                "ė": "e",
                "ę": "e",
                "ě": "e",
                "Ĝ": "G",
                "Ğ": "G",
                "Ġ": "G",
                "Ģ": "G",
                "ĝ": "g",
                "ğ": "g",
                "ġ": "g",
                "ģ": "g",
                "Ĥ": "H",
                "Ħ": "H",
                "ĥ": "h",
                "ħ": "h",
                "Ĩ": "I",
                "Ī": "I",
                "Ĭ": "I",
                "Į": "I",
                "İ": "I",
                "ĩ": "i",
                "ī": "i",
                "ĭ": "i",
                "į": "i",
                "ı": "i",
                "Ĵ": "J",
                "ĵ": "j",
                "Ķ": "K",
                "ķ": "k",
                "ĸ": "k",
                "Ĺ": "L",
                "Ļ": "L",
                "Ľ": "L",
                "Ŀ": "L",
                "Ł": "L",
                "ĺ": "l",
                "ļ": "l",
                "ľ": "l",
                "ŀ": "l",
                "ł": "l",
                "Ń": "N",
                "Ņ": "N",
                "Ň": "N",
                "Ŋ": "N",
                "ń": "n",
                "ņ": "n",
                "ň": "n",
                "ŋ": "n",
                "Ō": "O",
                "Ŏ": "O",
                "Ő": "O",
                "ō": "o",
                "ŏ": "o",
                "ő": "o",
                "Ŕ": "R",
                "Ŗ": "R",
                "Ř": "R",
                "ŕ": "r",
                "ŗ": "r",
                "ř": "r",
                "Ś": "S",
                "Ŝ": "S",
                "Ş": "S",
                "Š": "S",
                "ś": "s",
                "ŝ": "s",
                "ş": "s",
                "š": "s",
                "Ţ": "T",
                "Ť": "T",
                "Ŧ": "T",
                "ţ": "t",
                "ť": "t",
                "ŧ": "t",
                "Ũ": "U",
                "Ū": "U",
                "Ŭ": "U",
                "Ů": "U",
                "Ű": "U",
                "Ų": "U",
                "ũ": "u",
                "ū": "u",
                "ŭ": "u",
                "ů": "u",
                "ű": "u",
                "ų": "u",
                "Ŵ": "W",
                "ŵ": "w",
                "Ŷ": "Y",
                "ŷ": "y",
                "Ÿ": "Y",
                "Ź": "Z",
                "Ż": "Z",
                "Ž": "Z",
                "ź": "z",
                "ż": "z",
                "ž": "z",
                "Ĳ": "IJ",
                "ĳ": "ij",
                "Œ": "Oe",
                "œ": "oe",
                "ŉ": "'n",
                "ſ": "s"
            },
            W = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,
            U = RegExp("[\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff\\u1ab0-\\u1aff\\u1dc0-\\u1dff]", "g");

        function V(e) {
            return R[e]
        }

        function f(e) {
            return (e = e.toString()) && e.replace(W, V).replace(U, "")
        }
        h = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        }, e = "(?:" + Object.keys(h).join("|") + ")", p = RegExp(e), m = RegExp(e, "g");
        var h, p, m, S = function(e) {
            return p.test(e = null == e ? "" : "" + e) ? e.replace(m, B) : e
        };

        function B(e) {
            return h[e]
        }
        var Q = {
                32: " ",
                48: "0",
                49: "1",
                50: "2",
                51: "3",
                52: "4",
                53: "5",
                54: "6",
                55: "7",
                56: "8",
                57: "9",
                59: ";",
                65: "A",
                66: "B",
                67: "C",
                68: "D",
                69: "E",
                70: "F",
                71: "G",
                72: "H",
                73: "I",
                74: "J",
                75: "K",
                76: "L",
                77: "M",
                78: "N",
                79: "O",
                80: "P",
                81: "Q",
                82: "R",
                83: "S",
                84: "T",
                85: "U",
                86: "V",
                87: "W",
                88: "X",
                89: "Y",
                90: "Z",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9"
            },
            _ = 27,
            G = 13,
            M = 32,
            D = 9,
            Y = 38,
            I = 40,
            L = {
                success: !1,
                major: "3"
            };
        try {
            L.full = (b.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split("."), L.major = L.full[0], L.success = !0
        } catch (e) {}
        var g = 0,
            O = ".bs.select",
            C = {
                DISABLED: "disabled",
                DIVIDER: "divider",
                SHOW: "open",
                DROPUP: "dropup",
                MENU: "dropdown-menu",
                MENURIGHT: "dropdown-menu-right",
                MENULEFT: "dropdown-menu-left",
                BUTTONCLASS: "btn-default",
                POPOVERHEADER: "popover-title",
                ICONBASE: "glyphicon",
                TICKICON: "glyphicon-ok"
            },
            q = {
                MENU: "." + C.MENU
            },
            E = {
                div: document.createElement("div"),
                span: document.createElement("span"),
                i: document.createElement("i"),
                subtext: document.createElement("small"),
                a: document.createElement("a"),
                li: document.createElement("li"),
                whitespace: document.createTextNode(" "),
                fragment: document.createDocumentFragment()
            },
            Z = (E.noResults = E.li.cloneNode(!1), E.noResults.className = "no-results", E.a.setAttribute("role", "option"), E.a.className = "dropdown-item", E.subtext.className = "text-muted", E.text = E.span.cloneNode(!1), E.text.className = "text", E.checkMark = E.span.cloneNode(!1), new RegExp(Y + "|" + I)),
            J = new RegExp("^" + D + "$|" + _),
            $ = {
                li: function(e, t, i) {
                    var n = E.li.cloneNode(!1);
                    return e && (1 === e.nodeType || 11 === e.nodeType ? n.appendChild(e) : n.innerHTML = e), void 0 !== t && "" !== t && (n.className = t), null != i && n.classList.add("optgroup-" + i), n
                },
                a: function(e, t, i) {
                    var n = E.a.cloneNode(!0);
                    return e && (11 === e.nodeType ? n.appendChild(e) : n.insertAdjacentHTML("beforeend", e)), void 0 !== t && "" !== t && n.classList.add.apply(n.classList, t.split(/\s+/)), i && n.setAttribute("style", i), n
                },
                text: function(e, t) {
                    var i, n, s = E.text.cloneNode(!1);
                    if (e.content ? s.innerHTML = e.content : (s.textContent = e.text, e.icon && (i = E.whitespace.cloneNode(!1), (n = (!0 === t ? E.i : E.span).cloneNode(!1)).className = this.options.iconBase + " " + e.icon, E.fragment.appendChild(n), E.fragment.appendChild(i)), e.subtext && ((n = E.subtext.cloneNode(!1)).textContent = e.subtext, s.appendChild(n))), !0 === t)
                        for (; 0 < s.childNodes.length;) E.fragment.appendChild(s.childNodes[0]);
                    else E.fragment.appendChild(s);
                    return E.fragment
                },
                label: function(e) {
                    var t, i, n = E.text.cloneNode(!1);
                    return n.innerHTML = e.display, e.icon && (t = E.whitespace.cloneNode(!1), (i = E.span.cloneNode(!1)).className = this.options.iconBase + " " + e.icon, E.fragment.appendChild(i), E.fragment.appendChild(t)), e.subtext && ((i = E.subtext.cloneNode(!1)).textContent = e.subtext, n.appendChild(i)), E.fragment.appendChild(n), E.fragment
                }
            };

        function j(e, t) {
            var i = this;
            u.useDefault || (b.valHooks.select.set = u._set, u.useDefault = !0), this.$element = b(e), this.$newElement = null, this.$button = null, this.$menu = null, this.options = t, this.selectpicker = {
                main: {},
                search: {},
                current: {},
                view: {},
                isSearching: !1,
                keydown: {
                    keyHistory: "",
                    resetKeyHistory: {
                        start: function() {
                            return setTimeout(function() {
                                i.selectpicker.keydown.keyHistory = ""
                            }, 800)
                        }
                    }
                }
            }, this.sizeInfo = {}, null === this.options.title && (this.options.title = this.$element.attr("title")), "number" == typeof(e = this.options.windowPadding) && (this.options.windowPadding = [e, e, e, e]), this.val = j.prototype.val, this.render = j.prototype.render, this.refresh = j.prototype.refresh, this.setStyle = j.prototype.setStyle, this.selectAll = j.prototype.selectAll, this.deselectAll = j.prototype.deselectAll, this.destroy = j.prototype.destroy, this.remove = j.prototype.remove, this.show = j.prototype.show, this.hide = j.prototype.hide, this.init()
        }

        function K(e) {
            var o, l = arguments,
                d = e;
            if ([].shift.apply(l), !L.success) {
                try {
                    L.full = (b.fn.dropdown.Constructor.VERSION || "").split(" ")[0].split(".")
                } catch (e) {
                    j.BootstrapVersion ? L.full = j.BootstrapVersion.split(" ")[0].split(".") : (L.full = [L.major, "0", "0"], console.warn("There was an issue retrieving Bootstrap's version. Ensure Bootstrap is being loaded before bootstrap-select and there is no namespace collision. If loading Bootstrap asynchronously, the version may need to be manually specified via $.fn.selectpicker.Constructor.BootstrapVersion.", e))
                }
                L.major = L.full[0], L.success = !0
            }
            if ("4" === L.major) {
                var t = [];
                j.DEFAULTS.style === C.BUTTONCLASS && t.push({
                    name: "style",
                    className: "BUTTONCLASS"
                }), j.DEFAULTS.iconBase === C.ICONBASE && t.push({
                    name: "iconBase",
                    className: "ICONBASE"
                }), j.DEFAULTS.tickIcon === C.TICKICON && t.push({
                    name: "tickIcon",
                    className: "TICKICON"
                }), C.DIVIDER = "dropdown-divider", C.SHOW = "show", C.BUTTONCLASS = "btn-light", C.POPOVERHEADER = "popover-header", C.ICONBASE = "", C.TICKICON = "bs-ok-default";
                for (var i = 0; i < t.length; i++) {
                    e = t[i];
                    j.DEFAULTS[e.name] = C[e.className]
                }
            }
            var n = this.each(function() {
                var e = b(this);
                if (e.is("select")) {
                    var t = e.data("selectpicker"),
                        i = "object" == typeof d && d;
                    if (t) {
                        if (i)
                            for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t.options[n] = i[n])
                    } else {
                        var s, r = e.data();
                        for (s in r) Object.prototype.hasOwnProperty.call(r, s) && -1 !== b.inArray(s, N) && delete r[s];
                        var a = b.extend({}, j.DEFAULTS, b.fn.selectpicker.defaults || {}, r, i);
                        a.template = b.extend({}, j.DEFAULTS.template, b.fn.selectpicker.defaults ? b.fn.selectpicker.defaults.template : {}, r.template, i.template), e.data("selectpicker", t = new j(this, a))
                    }
                    "string" == typeof d && (o = t[d] instanceof Function ? t[d].apply(t, l) : t.options[d])
                }
            });
            return void 0 !== o ? o : n
        }
        j.VERSION = "1.13.18", j.DEFAULTS = {
            noneSelectedText: "Nothing selected",
            noneResultsText: "No results matched {0}",
            countSelectedText: function(e, t) {
                return 1 == e ? "{0} item selected" : "{0} items selected"
            },
            maxOptionsText: function(e, t) {
                return [1 == e ? "Limit reached ({n} item max)" : "Limit reached ({n} items max)", 1 == t ? "Group limit reached ({n} item max)" : "Group limit reached ({n} items max)"]
            },
            selectAllText: "Select All",
            deselectAllText: "Deselect All",
            doneButton: !1,
            doneButtonText: "Close",
            multipleSeparator: ", ",
            styleBase: "btn",
            style: C.BUTTONCLASS,
            size: "auto",
            title: null,
            selectedTextFormat: "values",
            width: !1,
            container: !1,
            hideDisabled: !1,
            showSubtext: !1,
            showIcon: !0,
            showContent: !0,
            dropupAuto: !0,
            header: !1,
            liveSearch: !1,
            liveSearchPlaceholder: null,
            liveSearchNormalize: !1,
            liveSearchStyle: "contains",
            actionsBox: !1,
            iconBase: C.ICONBASE,
            tickIcon: C.TICKICON,
            showTick: !1,
            template: {
                caret: '<span class="caret"></span>'
            },
            maxOptions: !1,
            mobile: !1,
            selectOnTab: !1,
            dropdownAlignRight: !1,
            windowPadding: 0,
            virtualScroll: 600,
            display: !1,
            sanitize: !0,
            sanitizeFn: null,
            whiteList: A
        }, j.prototype = {
            constructor: j,
            init: function() {
                var i = this,
                    e = this.$element.attr("id"),
                    t = this.$element[0],
                    n = t.form;
                g++, this.selectId = "bs-select-" + g, t.classList.add("bs-select-hidden"), this.multiple = this.$element.prop("multiple"), this.autofocus = this.$element.prop("autofocus"), t.classList.contains("show-tick") && (this.options.showTick = !0), this.$newElement = this.createDropdown(), this.buildData(), this.$element.after(this.$newElement).prependTo(this.$newElement), n && null === t.form && (n.id || (n.id = "form-" + this.selectId), t.setAttribute("form", n.id)), this.$button = this.$newElement.children("button"), this.$menu = this.$newElement.children(q.MENU), this.$menuInner = this.$menu.children(".inner"), this.$searchbox = this.$menu.find("input"), t.classList.remove("bs-select-hidden"), !0 === this.options.dropdownAlignRight && this.$menu[0].classList.add(C.MENURIGHT), void 0 !== e && this.$button.attr("data-id", e), this.checkDisabled(), this.clickListener(), this.options.liveSearch ? (this.liveSearchListener(), this.focusedParent = this.$searchbox[0]) : this.focusedParent = this.$menuInner[0], this.setStyle(), this.render(), this.setWidth(), this.options.container ? this.selectPosition() : this.$element.on("hide" + O, function() {
                    var e, t;
                    i.isVirtual() && (t = (e = i.$menuInner[0]).firstChild.cloneNode(!1), e.replaceChild(t, e.firstChild), e.scrollTop = 0)
                }), this.$menu.data("this", this), this.$newElement.data("this", this), this.options.mobile && this.mobile(), this.$newElement.on({
                    "hide.bs.dropdown": function(e) {
                        i.$element.trigger("hide" + O, e)
                    },
                    "hidden.bs.dropdown": function(e) {
                        i.$element.trigger("hidden" + O, e)
                    },
                    "show.bs.dropdown": function(e) {
                        i.$element.trigger("show" + O, e)
                    },
                    "shown.bs.dropdown": function(e) {
                        i.$element.trigger("shown" + O, e)
                    }
                }), t.hasAttribute("required") && this.$element.on("invalid" + O, function() {
                    i.$button[0].classList.add("bs-invalid"), i.$element.on("shown" + O + ".invalid", function() {
                        i.$element.val(i.$element.val()).off("shown" + O + ".invalid")
                    }).on("rendered" + O, function() {
                        this.validity.valid && i.$button[0].classList.remove("bs-invalid"), i.$element.off("rendered" + O)
                    }), i.$button.on("blur" + O, function() {
                        i.$element.trigger("focus").trigger("blur"), i.$button.off("blur" + O)
                    })
                }), setTimeout(function() {
                    i.buildList(), i.$element.trigger("loaded" + O)
                })
            },
            createDropdown: function() {
                var e = this.multiple || this.options.showTick ? " show-tick" : "",
                    t = this.multiple ? ' aria-multiselectable="true"' : "",
                    i = "",
                    n = this.autofocus ? " autofocus" : "";
                L.major < 4 && this.$element.parent().hasClass("input-group") && (i = " input-group-btn");
                var s = "",
                    r = "",
                    a = "",
                    o = "";
                return this.options.header && (s = '<div class="' + C.POPOVERHEADER + '"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + "</div>"), this.options.liveSearch && (r = '<div class="bs-searchbox"><input type="search" class="form-control" autocomplete="off"' + (null === this.options.liveSearchPlaceholder ? "" : ' placeholder="' + S(this.options.liveSearchPlaceholder) + '"') + ' role="combobox" aria-label="Search" aria-controls="' + this.selectId + '" aria-autocomplete="list"></div>'), this.multiple && this.options.actionsBox && (a = '<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn ' + C.BUTTONCLASS + '">' + this.options.selectAllText + '</button><button type="button" class="actions-btn bs-deselect-all btn ' + C.BUTTONCLASS + '">' + this.options.deselectAllText + "</button></div></div>"), this.multiple && this.options.doneButton && (o = '<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm ' + C.BUTTONCLASS + '">' + this.options.doneButtonText + "</button></div></div>"), e = '<div class="dropdown bootstrap-select' + e + i + '"><button type="button" tabindex="-1" class="' + this.options.styleBase + ' dropdown-toggle" ' + ("static" === this.options.display ? 'data-display="static"' : "") + 'data-toggle="dropdown"' + n + ' role="combobox" aria-owns="' + this.selectId + '" aria-haspopup="listbox" aria-expanded="false"><div class="filter-option"><div class="filter-option-inner"><div class="filter-option-inner-inner"></div></div> </div>' + ("4" === L.major ? "" : '<span class="bs-caret">' + this.options.template.caret + "</span>") + '</button><div class="' + C.MENU + " " + ("4" === L.major ? "" : C.SHOW) + '">' + s + r + a + '<div class="inner ' + C.SHOW + '" role="listbox" id="' + this.selectId + '" tabindex="-1" ' + t + '><ul class="' + C.MENU + " inner " + ("4" === L.major ? C.SHOW : "") + '" role="presentation"></ul></div>' + o + "</div></div>", b(e)
            },
            setPositionData: function() {
                this.selectpicker.view.canHighlight = [], this.selectpicker.view.size = 0, this.selectpicker.view.firstHighlightIndex = !1;
                for (var e = 0; e < this.selectpicker.current.data.length; e++) {
                    var t = this.selectpicker.current.data[e],
                        i = !0;
                    "divider" === t.type ? (i = !1, t.height = this.sizeInfo.dividerHeight) : "optgroup-label" === t.type ? (i = !1, t.height = this.sizeInfo.dropdownHeaderHeight) : t.height = this.sizeInfo.liHeight, t.disabled && (i = !1), this.selectpicker.view.canHighlight.push(i), i && (this.selectpicker.view.size++, t.posinset = this.selectpicker.view.size, !1 === this.selectpicker.view.firstHighlightIndex) && (this.selectpicker.view.firstHighlightIndex = e), t.position = (0 === e ? 0 : this.selectpicker.current.data[e - 1].position) + t.height
                }
            },
            isVirtual: function() {
                return !1 !== this.options.virtualScroll && this.selectpicker.main.elements.length >= this.options.virtualScroll || !0 === this.options.virtualScroll
            },
            createView: function(k, e, t) {
                var x, S, M = this,
                    i = 0,
                    D = [];

                function n(e, t) {
                    var i, n = M.selectpicker.current.elements.length,
                        s = [],
                        r = !0,
                        a = M.isVirtual();
                    M.selectpicker.view.scrollTop = e;
                    for (var o, l = Math.ceil(M.sizeInfo.menuInnerHeight / M.sizeInfo.liHeight * 1.5), d = Math.round(n / l) || 1, c = 0; c < d; c++) {
                        var u = c === d - 1 ? n : (c + 1) * l;
                        if (s[c] = [c * l + (c ? 1 : 0), u], !n) break;
                        void 0 === i && e - 1 <= M.selectpicker.current.data[u - 1].position - M.sizeInfo.menuInnerHeight && (i = c)
                    }
                    if (void 0 === i && (i = 0), y = [M.selectpicker.view.position0, M.selectpicker.view.position1], h = Math.max(0, i - 1), p = Math.min(d - 1, i + 1), M.selectpicker.view.position0 = !1 !== a && Math.max(0, s[h][0]) || 0, M.selectpicker.view.position1 = !1 === a ? n : Math.min(n, s[p][1]) || 0, h = y[0] !== M.selectpicker.view.position0 || y[1] !== M.selectpicker.view.position1, void 0 !== M.activeIndex && (S = M.selectpicker.main.elements[M.prevActiveIndex], D = M.selectpicker.main.elements[M.activeIndex], x = M.selectpicker.main.elements[M.selectedIndex], t && (M.activeIndex !== M.selectedIndex && M.defocusItem(D), M.activeIndex = void 0), M.activeIndex) && M.activeIndex !== M.selectedIndex && M.defocusItem(x), void 0 !== M.prevActiveIndex && M.prevActiveIndex !== M.activeIndex && M.prevActiveIndex !== M.selectedIndex && M.defocusItem(S), (t || h) && (p = M.selectpicker.view.visibleElements ? M.selectpicker.view.visibleElements.slice() : [], M.selectpicker.view.visibleElements = !1 === a ? M.selectpicker.current.elements : M.selectpicker.current.elements.slice(M.selectpicker.view.position0, M.selectpicker.view.position1), M.setOptionStatus(), (k || !1 === a && t) && (y = p, o = M.selectpicker.view.visibleElements, r = !(y.length === o.length && y.every(function(e, t) {
                            return e === o[t]
                        }))), t || !0 === a) && r) {
                        var h = M.$menuInner[0],
                            f = document.createDocumentFragment(),
                            p = h.firstChild.cloneNode(!1),
                            m = M.selectpicker.view.visibleElements,
                            g = [];
                        h.replaceChild(p, h.firstChild);
                        for (var y, c = 0, v = m.length; c < v; c++) {
                            var _, b, w = m[c];
                            M.options.sanitize && (_ = w.lastChild) && (b = M.selectpicker.current.data[c + M.selectpicker.view.position0]) && b.content && !b.sanitized && (g.push(_), b.sanitized = !0), f.appendChild(w)
                        }
                        M.options.sanitize && g.length && T(g, M.options.whiteList, M.options.sanitizeFn), !0 === a ? (y = 0 === M.selectpicker.view.position0 ? 0 : M.selectpicker.current.data[M.selectpicker.view.position0 - 1].position, r = M.selectpicker.view.position1 > n - 1 ? 0 : M.selectpicker.current.data[n - 1].position - M.selectpicker.current.data[M.selectpicker.view.position1 - 1].position, h.firstChild.style.marginTop = y + "px", h.firstChild.style.marginBottom = r + "px") : (h.firstChild.style.marginTop = 0, h.firstChild.style.marginBottom = 0), h.firstChild.appendChild(f), !0 === a && M.sizeInfo.hasScrollBar && (p = h.firstChild.offsetWidth, t && p < M.sizeInfo.menuInnerInnerWidth && M.sizeInfo.totalMenuWidth > M.sizeInfo.selectWidth ? h.firstChild.style.minWidth = M.sizeInfo.menuInnerInnerWidth + "px" : p > M.sizeInfo.menuInnerInnerWidth && (M.$menu[0].style.minWidth = 0, (y = h.firstChild.offsetWidth) > M.sizeInfo.menuInnerInnerWidth && (M.sizeInfo.menuInnerInnerWidth = y, h.firstChild.style.minWidth = M.sizeInfo.menuInnerInnerWidth + "px"), M.$menu[0].style.minWidth = ""))
                    }
                    M.prevActiveIndex = M.activeIndex, M.options.liveSearch ? k && t && (M.selectpicker.view.canHighlight[r = 0] || (r = 1 + M.selectpicker.view.canHighlight.slice(1).indexOf(!0)), a = M.selectpicker.view.visibleElements[r], M.defocusItem(M.selectpicker.view.currentActive), M.activeIndex = (M.selectpicker.current.data[r] || {}).index, M.focusItem(a)) : M.$menuInner.trigger("focus")
                }
                this.selectpicker.isSearching = k, this.selectpicker.current = k ? this.selectpicker.search : this.selectpicker.main, this.setPositionData(), e && (t ? i = this.$menuInner[0].scrollTop : M.multiple || "number" == typeof(t = ((e = M.$element[0]).options[e.selectedIndex] || {}).liIndex) && !1 !== M.options.size && (t = (e = M.selectpicker.main.data[t]) && e.position) && (i = t - (M.sizeInfo.menuInnerHeight + M.sizeInfo.liHeight) / 2)), n(i, !0), this.$menuInner.off("scroll.createView").on("scroll.createView", function(e, t) {
                    M.noScroll || n(this.scrollTop, t), M.noScroll = !1
                }), b(window).off("resize" + O + "." + this.selectId + ".createView").on("resize" + O + "." + this.selectId + ".createView", function() {
                    M.$newElement.hasClass(C.SHOW) && n(M.$menuInner[0].scrollTop)
                })
            },
            focusItem: function(e, t, i) {
                var n;
                e && (t = t || this.selectpicker.main.data[this.activeIndex], n = e.firstChild) && (n.setAttribute("aria-setsize", this.selectpicker.view.size), n.setAttribute("aria-posinset", t.posinset), !0 !== i) && (this.focusedParent.setAttribute("aria-activedescendant", n.id), e.classList.add("active"), n.classList.add("active"))
            },
            defocusItem: function(e) {
                e && (e.classList.remove("active"), e.firstChild) && e.firstChild.classList.remove("active")
            },
            setPlaceholder: function() {
                var e, t, i, n, s, r, a = this,
                    o = !1;
                return this.options.title && !this.multiple && (this.selectpicker.view.titleOption || (this.selectpicker.view.titleOption = document.createElement("option")), e = this.$element[0], t = !(o = !0), i = !this.selectpicker.view.titleOption.parentNode, n = e.selectedIndex, s = e.options[n], r = (r = window.performance && window.performance.getEntriesByType("navigation")) && r.length ? "back_forward" !== r[0].type : 2 !== window.performance.navigation.type, i && (this.selectpicker.view.titleOption.className = "bs-title-option", this.selectpicker.view.titleOption.value = "", t = !s || 0 === n && !1 === s.defaultSelected && void 0 === this.$element.data("selected")), !i && 0 === this.selectpicker.view.titleOption.index || e.insertBefore(this.selectpicker.view.titleOption, e.firstChild), t && r ? e.selectedIndex = 0 : "complete" !== document.readyState && window.addEventListener("pageshow", function() {
                    a.selectpicker.view.displayedValue !== e.value && a.render()
                })), o
            },
            buildData: function() {
                var e = ':not([hidden]):not([data-hidden="true"])',
                    r = [],
                    t = 0,
                    i = this.setPlaceholder() ? 1 : 0,
                    n = (this.options.hideDisabled && (e += ":not(:disabled)"), this.$element[0].querySelectorAll("select > *" + e));

                function a(e) {
                    var t = r[r.length - 1];
                    t && "divider" === t.type && (t.optID || e.optID) || ((e = e || {}).type = "divider", r.push(e))
                }

                function s(e, t) {
                    var i, n, s;
                    (t = t || {}).divider = "true" === e.getAttribute("data-divider"), t.divider ? a({
                        optID: t.optID
                    }) : (i = r.length, n = (n = e.style.cssText) ? S(n) : "", s = (e.className || "") + (t.optgroupClass || ""), t.optID && (s = "opt " + s), t.optionClass = s.trim(), t.inlineStyle = n, t.text = e.textContent, t.content = e.getAttribute("data-content"), t.tokens = e.getAttribute("data-tokens"), t.subtext = e.getAttribute("data-subtext"), t.icon = e.getAttribute("data-icon"), e.liIndex = i, t.display = t.content || t.text, t.type = "option", t.index = i, t.option = e, t.selected = !!e.selected, t.disabled = t.disabled || !!e.disabled, r.push(t))
                }
                for (var o = n.length, l = i; l < o; l++) {
                    var d = n[l];
                    if ("OPTGROUP" !== d.tagName) s(d, {});
                    else {
                        _ = v = y = m = p = g = f = u = c = h = d = void 0;
                        var d = l,
                            c = (h = n)[d],
                            u = !(d - 1 < i) && h[d - 1],
                            h = h[d + 1],
                            f = c.querySelectorAll("option" + e);
                        if (f.length) {
                            var p, m, g = {
                                display: S(c.label),
                                subtext: c.getAttribute("data-subtext"),
                                icon: c.getAttribute("data-icon"),
                                type: "optgroup-label",
                                optgroupClass: " " + (c.className || "")
                            };
                            t++, u && a({
                                optID: t
                            }), g.optID = t, r.push(g);
                            for (var y = 0, v = f.length; y < v; y++) {
                                var _ = f[y];
                                0 === y && (m = (p = r.length - 1) + v), s(_, {
                                    headerIndex: p,
                                    lastIndex: m,
                                    optID: g.optID,
                                    optgroupClass: g.optgroupClass,
                                    disabled: c.disabled
                                })
                            }
                            h && a({
                                optID: t
                            })
                        }
                    }
                }
                this.selectpicker.main.data = this.selectpicker.current.data = r
            },
            buildList: function() {
                var e = this,
                    t = this.selectpicker.main.data,
                    i = [],
                    n = 0;
                !e.options.showTick && !e.multiple || E.checkMark.parentNode || (E.checkMark.className = this.options.iconBase + " " + e.options.tickIcon + " check-mark", E.a.appendChild(E.checkMark));
                for (var s = t.length, r = 0; r < s; r++) {
                    var a, o = t[r],
                        l = (d = a = l = void 0, o),
                        d = 0;
                    switch (l.type) {
                        case "divider":
                            a = $.li(!1, C.DIVIDER, l.optID ? l.optID + "div" : void 0);
                            break;
                        case "option":
                            (a = $.li($.a($.text.call(e, l), l.optionClass, l.inlineStyle), "", l.optID)).firstChild && (a.firstChild.id = e.selectId + "-" + l.index);
                            break;
                        case "optgroup-label":
                            a = $.li($.label.call(e, l), "dropdown-header" + l.optgroupClass, l.optID)
                    }
                    l.element = a, i.push(a), l.display && (d += l.display.length), l.subtext && (d += l.subtext.length), l.icon && (d += 1), n < d && (n = d, e.selectpicker.view.widestOption = i[i.length - 1])
                }
                this.selectpicker.main.elements = this.selectpicker.current.elements = i
            },
            findLis: function() {
                return this.$menuInner.find(".inner > li")
            },
            render: function() {
                var e = this,
                    t = this.$element[0],
                    i = this.setPlaceholder() && 0 === t.selectedIndex,
                    n = w(t, this.options.hideDisabled),
                    s = n.length,
                    r = this.$button[0],
                    a = r.querySelector(".filter-option-inner-inner"),
                    o = document.createTextNode(this.options.multipleSeparator),
                    l = E.fragment.cloneNode(!1),
                    d = !1;
                if (r.classList.toggle("bs-placeholder", e.multiple ? !s : !k(t, n)), e.multiple || 1 !== n.length || (e.selectpicker.view.displayedValue = k(t, n)), "static" === this.options.selectedTextFormat) l = $.text.call(this, {
                    text: this.options.title
                }, !0);
                else if (!1 === (this.multiple && -1 !== this.options.selectedTextFormat.indexOf("count") && 1 < s && (1 < (t = this.options.selectedTextFormat.split(">")).length && s > t[1] || 1 === t.length && 2 <= s))) {
                    if (!i) {
                        for (var c = 0; c < s && c < 50; c++) {
                            var u = n[c],
                                h = this.selectpicker.main.data[u.liIndex],
                                f = {};
                            this.multiple && 0 < c && l.appendChild(o.cloneNode(!1)), u.title ? f.text = u.title : h && (h.content && e.options.showContent ? (f.content = h.content.toString(), d = !0) : (e.options.showIcon && (f.icon = h.icon), e.options.showSubtext && !e.multiple && h.subtext && (f.subtext = " " + h.subtext), f.text = u.textContent.trim())), l.appendChild($.text.call(this, f, !0))
                        }
                        49 < s && l.appendChild(document.createTextNode("..."))
                    }
                } else var t = ':not([hidden]):not([data-hidden="true"]):not([data-divider="true"])',
                    i = (this.options.hideDisabled && (t += ":not(:disabled)"), this.$element[0].querySelectorAll("select > option" + t + ", optgroup" + t + " option" + t).length),
                    t = "function" == typeof this.options.countSelectedText ? this.options.countSelectedText(s, i) : this.options.countSelectedText,
                    l = $.text.call(this, {
                        text: t.replace("{0}", s.toString()).replace("{1}", i.toString())
                    }, !0);
                null == this.options.title && (this.options.title = this.$element.attr("title")), l.childNodes.length || (l = $.text.call(this, {
                    text: void 0 !== this.options.title ? this.options.title : this.options.noneSelectedText
                }, !0)), r.title = l.textContent.replace(/<[^>]*>?/g, "").trim(), this.options.sanitize && d && T([l], e.options.whiteList, e.options.sanitizeFn), a.innerHTML = "", a.appendChild(l), L.major < 4 && this.$newElement[0].classList.contains("bs3-has-addon") && (t = r.querySelector(".filter-expand"), (i = a.cloneNode(!0)).className = "filter-expand", t ? r.replaceChild(i, t) : r.appendChild(i)), this.$element.trigger("rendered" + O)
            },
            setStyle: function(e, t) {
                var i = this.$button[0],
                    n = this.$newElement[0],
                    s = this.options.style.trim();
                this.$element.attr("class") && this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi, "")), L.major < 4 && (n.classList.add("bs3"), n.parentNode.classList) && n.parentNode.classList.contains("input-group") && (n.previousElementSibling || n.nextElementSibling) && (n.previousElementSibling || n.nextElementSibling).classList.contains("input-group-addon") && n.classList.add("bs3-has-addon"), n = e ? e.trim() : s, "add" == t ? n && i.classList.add.apply(i.classList, n.split(" ")) : "remove" == t ? n && i.classList.remove.apply(i.classList, n.split(" ")) : (s && i.classList.remove.apply(i.classList, s.split(" ")), n && i.classList.add.apply(i.classList, n.split(" ")))
            },
            liHeight: function(e) {
                if (e || !1 !== this.options.size && !Object.keys(this.sizeInfo).length) {
                    var t, e = E.div.cloneNode(!1),
                        i = E.div.cloneNode(!1),
                        n = E.div.cloneNode(!1),
                        s = document.createElement("ul"),
                        r = E.li.cloneNode(!1),
                        a = E.li.cloneNode(!1),
                        o = E.a.cloneNode(!1),
                        l = E.span.cloneNode(!1),
                        d = this.options.header && 0 < this.$menu.find("." + C.POPOVERHEADER).length ? this.$menu.find("." + C.POPOVERHEADER)[0].cloneNode(!0) : null,
                        c = this.options.liveSearch ? E.div.cloneNode(!1) : null,
                        u = this.options.actionsBox && this.multiple && 0 < this.$menu.find(".bs-actionsbox").length ? this.$menu.find(".bs-actionsbox")[0].cloneNode(!0) : null,
                        h = this.options.doneButton && this.multiple && 0 < this.$menu.find(".bs-donebutton").length ? this.$menu.find(".bs-donebutton")[0].cloneNode(!0) : null,
                        f = this.$element.find("option")[0];
                    if (this.sizeInfo.selectWidth = this.$newElement[0].offsetWidth, l.className = "text", o.className = "dropdown-item " + (f ? f.className : ""), e.className = this.$menu[0].parentNode.className + " " + C.SHOW, e.style.width = 0, "auto" === this.options.width && (i.style.minWidth = 0), i.className = C.MENU + " " + C.SHOW, n.className = "inner " + C.SHOW, s.className = C.MENU + " inner " + ("4" === L.major ? C.SHOW : ""), r.className = C.DIVIDER, a.className = "dropdown-header", l.appendChild(document.createTextNode("​")), this.selectpicker.current.data.length)
                        for (var p = 0; p < this.selectpicker.current.data.length; p++) {
                            var m = this.selectpicker.current.data[p];
                            if ("option" === m.type) {
                                t = m.element;
                                break
                            }
                        } else t = E.li.cloneNode(!1), o.appendChild(l), t.appendChild(o);
                    a.appendChild(l.cloneNode(!0)), this.selectpicker.view.widestOption && s.appendChild(this.selectpicker.view.widestOption.cloneNode(!0)), s.appendChild(t), s.appendChild(r), s.appendChild(a), d && i.appendChild(d), c && (f = document.createElement("input"), c.className = "bs-searchbox", f.className = "form-control", c.appendChild(f), i.appendChild(c)), u && i.appendChild(u), n.appendChild(s), i.appendChild(n), h && i.appendChild(h), e.appendChild(i), document.body.appendChild(e);
                    var o = t.offsetHeight,
                        l = a ? a.offsetHeight : 0,
                        f = d ? d.offsetHeight : 0,
                        s = c ? c.offsetHeight : 0,
                        a = u ? u.offsetHeight : 0,
                        d = h ? h.offsetHeight : 0,
                        c = b(r).outerHeight(!0),
                        u = !!window.getComputedStyle && window.getComputedStyle(i),
                        h = i.offsetWidth,
                        r = u ? null : b(i),
                        g = {
                            vert: y(u ? u.paddingTop : r.css("paddingTop")) + y(u ? u.paddingBottom : r.css("paddingBottom")) + y(u ? u.borderTopWidth : r.css("borderTopWidth")) + y(u ? u.borderBottomWidth : r.css("borderBottomWidth")),
                            horiz: y(u ? u.paddingLeft : r.css("paddingLeft")) + y(u ? u.paddingRight : r.css("paddingRight")) + y(u ? u.borderLeftWidth : r.css("borderLeftWidth")) + y(u ? u.borderRightWidth : r.css("borderRightWidth"))
                        },
                        u = {
                            vert: g.vert + y(u ? u.marginTop : r.css("marginTop")) + y(u ? u.marginBottom : r.css("marginBottom")) + 2,
                            horiz: g.horiz + y(u ? u.marginLeft : r.css("marginLeft")) + y(u ? u.marginRight : r.css("marginRight")) + 2
                        };
                    n.style.overflowY = "scroll", r = i.offsetWidth - h, document.body.removeChild(e), this.sizeInfo.liHeight = o, this.sizeInfo.dropdownHeaderHeight = l, this.sizeInfo.headerHeight = f, this.sizeInfo.searchHeight = s, this.sizeInfo.actionsHeight = a, this.sizeInfo.doneButtonHeight = d, this.sizeInfo.dividerHeight = c, this.sizeInfo.menuPadding = g, this.sizeInfo.menuExtras = u, this.sizeInfo.menuWidth = h, this.sizeInfo.menuInnerInnerWidth = h - g.horiz, this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth, this.sizeInfo.scrollBarWidth = r, this.sizeInfo.selectHeight = this.$newElement[0].offsetHeight, this.setPositionData()
                }
            },
            getSelectPosition: function() {
                var e, t = b(window),
                    i = this.$newElement.offset(),
                    n = b(this.options.container),
                    n = (this.options.container && n.length && !n.is("body") ? ((e = n.offset()).top += parseInt(n.css("borderTopWidth")), e.left += parseInt(n.css("borderLeftWidth"))) : e = {
                        top: 0,
                        left: 0
                    }, this.options.windowPadding);
                this.sizeInfo.selectOffsetTop = i.top - e.top - t.scrollTop(), this.sizeInfo.selectOffsetBot = t.height() - this.sizeInfo.selectOffsetTop - this.sizeInfo.selectHeight - e.top - n[2], this.sizeInfo.selectOffsetLeft = i.left - e.left - t.scrollLeft(), this.sizeInfo.selectOffsetRight = t.width() - this.sizeInfo.selectOffsetLeft - this.sizeInfo.selectWidth - e.left - n[1], this.sizeInfo.selectOffsetTop -= n[0], this.sizeInfo.selectOffsetLeft -= n[3]
            },
            setMenuSize: function(e) {
                this.getSelectPosition();
                var t, i, n, s, r, a, o = this.sizeInfo.selectWidth,
                    l = this.sizeInfo.liHeight,
                    d = this.sizeInfo.headerHeight,
                    c = this.sizeInfo.searchHeight,
                    u = this.sizeInfo.actionsHeight,
                    h = this.sizeInfo.doneButtonHeight,
                    f = this.sizeInfo.dividerHeight,
                    p = this.sizeInfo.menuPadding,
                    m = 0;
                if (this.options.dropupAuto && (a = l * this.selectpicker.current.elements.length + p.vert, a = this.sizeInfo.selectOffsetTop - this.sizeInfo.selectOffsetBot > this.sizeInfo.menuExtras.vert && a + this.sizeInfo.menuExtras.vert + 50 > this.sizeInfo.selectOffsetBot, !0 === this.selectpicker.isSearching && (a = this.selectpicker.dropup), this.$newElement.toggleClass(C.DROPUP, a), this.selectpicker.dropup = a), "auto" === this.options.size) a = 3 < this.selectpicker.current.elements.length ? 3 * this.sizeInfo.liHeight + this.sizeInfo.menuExtras.vert - 2 : 0, i = this.sizeInfo.selectOffsetBot - this.sizeInfo.menuExtras.vert, n = a + d + c + u + h, r = Math.max(a - p.vert, 0), t = (s = i = this.$newElement.hasClass(C.DROPUP) ? this.sizeInfo.selectOffsetTop - this.sizeInfo.menuExtras.vert : i) - d - c - u - h - p.vert;
                else if (this.options.size && "auto" != this.options.size && this.selectpicker.current.elements.length > this.options.size) {
                    for (var g = 0; g < this.options.size; g++) "divider" === this.selectpicker.current.data[g].type && m++;
                    t = (i = l * this.options.size + m * f + p.vert) - p.vert, s = i + d + c + u + h, n = r = ""
                }
                this.$menu.css({
                    "max-height": s + "px",
                    overflow: "hidden",
                    "min-height": n + "px"
                }), this.$menuInner.css({
                    "max-height": t + "px",
                    "overflow-y": "auto",
                    "min-height": r + "px"
                }), this.sizeInfo.menuInnerHeight = Math.max(t, 1), this.selectpicker.current.data.length && this.selectpicker.current.data[this.selectpicker.current.data.length - 1].position > this.sizeInfo.menuInnerHeight && (this.sizeInfo.hasScrollBar = !0, this.sizeInfo.totalMenuWidth = this.sizeInfo.menuWidth + this.sizeInfo.scrollBarWidth), "auto" === this.options.dropdownAlignRight && this.$menu.toggleClass(C.MENURIGHT, this.sizeInfo.selectOffsetLeft > this.sizeInfo.selectOffsetRight && this.sizeInfo.selectOffsetRight < this.sizeInfo.totalMenuWidth - o), this.dropdown && this.dropdown._popper && this.dropdown._popper.update()
            },
            setSize: function(e) {
                var t, i;
                this.liHeight(e), this.options.header && this.$menu.css("padding-top", 0), !1 !== this.options.size && (t = this, i = b(window), this.setMenuSize(), this.options.liveSearch && this.$searchbox.off("input.setMenuSize propertychange.setMenuSize").on("input.setMenuSize propertychange.setMenuSize", function() {
                    return t.setMenuSize()
                }), "auto" === this.options.size ? i.off("resize" + O + "." + this.selectId + ".setMenuSize scroll" + O + "." + this.selectId + ".setMenuSize").on("resize" + O + "." + this.selectId + ".setMenuSize scroll" + O + "." + this.selectId + ".setMenuSize", function() {
                    return t.setMenuSize()
                }) : this.options.size && "auto" != this.options.size && this.selectpicker.current.elements.length > this.options.size && i.off("resize" + O + "." + this.selectId + ".setMenuSize scroll" + O + "." + this.selectId + ".setMenuSize")), this.createView(!1, !0, e)
            },
            setWidth: function() {
                var i = this;
                "auto" === this.options.width ? requestAnimationFrame(function() {
                    i.$menu.css("min-width", "0"), i.$element.on("loaded" + O, function() {
                        i.liHeight(), i.setMenuSize();
                        var e = i.$newElement.clone().appendTo("body"),
                            t = e.css("width", "auto").children("button").outerWidth();
                        e.remove(), i.sizeInfo.selectWidth = Math.max(i.sizeInfo.totalMenuWidth, t), i.$newElement.css("width", i.sizeInfo.selectWidth + "px")
                    })
                }) : "fit" === this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", "").addClass("fit-width")) : this.options.width ? (this.$menu.css("min-width", ""), this.$newElement.css("width", this.options.width)) : (this.$menu.css("min-width", ""), this.$newElement.css("width", "")), this.$newElement.hasClass("fit-width") && "fit" !== this.options.width && this.$newElement[0].classList.remove("fit-width")
            },
            selectPosition: function() {
                this.$bsContainer = b('<div class="bs-container" />');

                function e(e) {
                    var t = {},
                        i = a.options.display || !!b.fn.dropdown.Constructor.Default && b.fn.dropdown.Constructor.Default.display;
                    a.$bsContainer.addClass(e.attr("class").replace(/form-control|fit-width/gi, "")).toggleClass(C.DROPUP, e.hasClass(C.DROPUP)), n = e.offset(), o.is("body") ? s = {
                        top: 0,
                        left: 0
                    } : ((s = o.offset()).top += parseInt(o.css("borderTopWidth")) - o.scrollTop(), s.left += parseInt(o.css("borderLeftWidth")) - o.scrollLeft()), r = e.hasClass(C.DROPUP) ? 0 : e[0].offsetHeight, (L.major < 4 || "static" === i) && (t.top = n.top - s.top + r, t.left = n.left - s.left), t.width = e[0].offsetWidth, a.$bsContainer.css(t)
                }
                var n, s, r, a = this,
                    o = b(this.options.container);
                this.$button.on("click.bs.dropdown.data-api", function() {
                    a.isDisabled() || (e(a.$newElement), a.$bsContainer.appendTo(a.options.container).toggleClass(C.SHOW, !a.$button.hasClass(C.SHOW)).append(a.$menu))
                }), b(window).off("resize" + O + "." + this.selectId + " scroll" + O + "." + this.selectId).on("resize" + O + "." + this.selectId + " scroll" + O + "." + this.selectId, function() {
                    a.$newElement.hasClass(C.SHOW) && e(a.$newElement)
                }), this.$element.on("hide" + O, function() {
                    a.$menu.data("height", a.$menu.height()), a.$bsContainer.detach()
                })
            },
            setOptionStatus: function(e) {
                var t = this;
                if (t.noScroll = !1, t.selectpicker.view.visibleElements && t.selectpicker.view.visibleElements.length)
                    for (var i = 0; i < t.selectpicker.view.visibleElements.length; i++) {
                        var n = t.selectpicker.current.data[i + t.selectpicker.view.position0],
                            s = n.option;
                        s && (!0 !== e && t.setDisabled(n.index, n.disabled), t.setSelected(n.index, s.selected))
                    }
            },
            setSelected: function(e, t) {
                var i, n = this.selectpicker.main.elements[e],
                    s = this.selectpicker.main.data[e],
                    r = void 0 !== this.activeIndex,
                    a = this.activeIndex === e || t && !this.multiple && !r;
                s.selected = t, i = n.firstChild, t && (this.selectedIndex = e), n.classList.toggle("selected", t), a ? (this.focusItem(n, s), this.selectpicker.view.currentActive = n, this.activeIndex = e) : this.defocusItem(n), i && (i.classList.toggle("selected", t), t ? i.setAttribute("aria-selected", !0) : this.multiple ? i.setAttribute("aria-selected", !1) : i.removeAttribute("aria-selected")), a || r || !t || void 0 === this.prevActiveIndex || (s = this.selectpicker.main.elements[this.prevActiveIndex], this.defocusItem(s))
            },
            setDisabled: function(e, t) {
                var i = this.selectpicker.main.elements[e];
                this.selectpicker.main.data[e].disabled = t, e = i.firstChild, i.classList.toggle(C.DISABLED, t), e && ("4" === L.major && e.classList.toggle(C.DISABLED, t), t ? (e.setAttribute("aria-disabled", t), e.setAttribute("tabindex", -1)) : (e.removeAttribute("aria-disabled"), e.setAttribute("tabindex", 0)))
            },
            isDisabled: function() {
                return this.$element[0].disabled
            },
            checkDisabled: function() {
                this.isDisabled() ? (this.$newElement[0].classList.add(C.DISABLED), this.$button.addClass(C.DISABLED).attr("aria-disabled", !0)) : this.$button[0].classList.contains(C.DISABLED) && (this.$newElement[0].classList.remove(C.DISABLED), this.$button.removeClass(C.DISABLED).attr("aria-disabled", !1))
            },
            clickListener: function() {
                var _ = this,
                    t = b(document);

                function e() {
                    (_.options.liveSearch ? _.$searchbox : _.$menuInner).trigger("focus")
                }

                function i() {
                    _.dropdown && _.dropdown._popper && _.dropdown._popper.state.isCreated ? e() : requestAnimationFrame(i)
                }
                t.data("spaceSelect", !1), this.$button.on("keyup", function(e) {
                    /(32)/.test(e.keyCode.toString(10)) && t.data("spaceSelect") && (e.preventDefault(), t.data("spaceSelect", !1))
                }), this.$newElement.on("show.bs.dropdown", function() {
                    3 < L.major && !_.dropdown && (_.dropdown = _.$button.data("bs.dropdown"), _.dropdown._menu = _.$menu[0])
                }), this.$button.on("click.bs.dropdown.data-api", function() {
                    _.$newElement.hasClass(C.SHOW) || _.setSize()
                }), this.$element.on("shown" + O, function() {
                    _.$menuInner[0].scrollTop !== _.selectpicker.view.scrollTop && (_.$menuInner[0].scrollTop = _.selectpicker.view.scrollTop), 3 < L.major ? requestAnimationFrame(i) : e()
                }), this.$menuInner.on("mouseenter", "li a", function(e) {
                    var t = this.parentElement,
                        i = _.isVirtual() ? _.selectpicker.view.position0 : 0,
                        n = Array.prototype.indexOf.call(t.parentElement.children, t),
                        n = _.selectpicker.current.data[n + i];
                    _.focusItem(t, n, !0)
                }), this.$menuInner.on("click", "li a", function(e, t) {
                    var i = b(this),
                        n = _.$element[0],
                        s = _.isVirtual() ? _.selectpicker.view.position0 : 0,
                        s = _.selectpicker.current.data[i.parent().index() + s],
                        r = s.index,
                        a = k(n),
                        o = n.selectedIndex,
                        l = n.options[o],
                        d = !0;
                    if (_.multiple && 1 !== _.options.maxOptions && e.stopPropagation(), e.preventDefault(), !_.isDisabled() && !i.parent().hasClass(C.DISABLED)) {
                        var e = s.option,
                            i = b(e),
                            s = e.selected,
                            c = i.parent("optgroup"),
                            u = c.find("option"),
                            h = _.options.maxOptions,
                            f = c.data("maxOptions") || !1;
                        if ((t = r === _.activeIndex ? !0 : t) || (_.prevActiveIndex = _.activeIndex, _.activeIndex = void 0), _.multiple) {
                            if (e.selected = !s, _.setSelected(r, !s), _.focusedParent.focus(), !1 !== h || !1 !== f) {
                                t = h < w(n).length, s = f < c.find("option:selected").length;
                                if (h && t || f && s)
                                    if (h && 1 == h) n.selectedIndex = -1, e.selected = !0, _.setOptionStatus(!0);
                                    else if (f && 1 == f) {
                                    for (var p = 0; p < u.length; p++) {
                                        var m = u[p];
                                        m.selected = !1, _.setSelected(m.liIndex, !1)
                                    }
                                    e.selected = !0, _.setSelected(r, !0)
                                } else {
                                    var c = "string" == typeof _.options.maxOptionsText ? [_.options.maxOptionsText, _.options.maxOptionsText] : _.options.maxOptionsText,
                                        c = "function" == typeof c ? c(h, f) : c,
                                        g = c[0].replace("{n}", h),
                                        y = c[1].replace("{n}", f),
                                        v = b('<div class="notify"></div>');
                                    c[2] && (g = g.replace("{var}", c[2][1 < h ? 0 : 1]), y = y.replace("{var}", c[2][1 < f ? 0 : 1])), e.selected = !1, _.$menu.append(v), h && t && (v.append(b("<div>" + g + "</div>")), d = !1, _.$element.trigger("maxReached" + O)), f && s && (v.append(b("<div>" + y + "</div>")), d = !1, _.$element.trigger("maxReachedGrp" + O)), setTimeout(function() {
                                        _.setSelected(r, !1)
                                    }, 10), v[0].classList.add("fadeOut"), setTimeout(function() {
                                        v.remove()
                                    }, 1050)
                                }
                            }
                        } else l && (l.selected = !1), e.selected = !0, _.setSelected(r, !0);
                        !_.multiple || _.multiple && 1 === _.options.maxOptions ? _.$button.trigger("focus") : _.options.liveSearch && _.$searchbox.trigger("focus"), !d || !_.multiple && o === n.selectedIndex || (x = [e.index, i.prop("selected"), a], _.$element.triggerNative("change"))
                    }
                }), this.$menu.on("click", "li." + C.DISABLED + " a, ." + C.POPOVERHEADER + ", ." + C.POPOVERHEADER + " :not(.close)", function(e) {
                    e.currentTarget == this && (e.preventDefault(), e.stopPropagation(), (_.options.liveSearch && !b(e.target).hasClass("close") ? _.$searchbox : _.$button).trigger("focus"))
                }), this.$menuInner.on("click", ".divider, .dropdown-header", function(e) {
                    e.preventDefault(), e.stopPropagation(), (_.options.liveSearch ? _.$searchbox : _.$button).trigger("focus")
                }), this.$menu.on("click", "." + C.POPOVERHEADER + " .close", function() {
                    _.$button.trigger("click")
                }), this.$searchbox.on("click", function(e) {
                    e.stopPropagation()
                }), this.$menu.on("click", ".actions-btn", function(e) {
                    (_.options.liveSearch ? _.$searchbox : _.$button).trigger("focus"), e.preventDefault(), e.stopPropagation(), b(this).hasClass("bs-select-all") ? _.selectAll() : _.deselectAll()
                }), this.$button.on("focus" + O, function(e) {
                    var t = _.$element[0].getAttribute("tabindex");
                    void 0 !== t && e.originalEvent && e.originalEvent.isTrusted && (this.setAttribute("tabindex", t), _.$element[0].setAttribute("tabindex", -1), _.selectpicker.view.tabindex = t)
                }).on("blur" + O, function(e) {
                    void 0 !== _.selectpicker.view.tabindex && e.originalEvent && e.originalEvent.isTrusted && (_.$element[0].setAttribute("tabindex", _.selectpicker.view.tabindex), this.setAttribute("tabindex", -1), _.selectpicker.view.tabindex = void 0)
                }), this.$element.on("change" + O, function() {
                    _.render(), _.$element.trigger("changed" + O, x), x = null
                }).on("focus" + O, function() {
                    _.options.mobile || _.$button[0].focus()
                })
            },
            liveSearchListener: function() {
                var h = this;
                this.$button.on("click.bs.dropdown.data-api", function() {
                    h.$searchbox.val() && (h.$searchbox.val(""), h.selectpicker.search.previousValue = void 0)
                }), this.$searchbox.on("click.bs.dropdown.data-api focus.bs.dropdown.data-api touchend.bs.dropdown.data-api", function(e) {
                    e.stopPropagation()
                }), this.$searchbox.on("input propertychange", function() {
                    var e = h.$searchbox[0].value;
                    if (h.selectpicker.search.elements = [], h.selectpicker.search.data = [], e) {
                        var t = [],
                            i = e.toUpperCase(),
                            n = {},
                            s = [],
                            r = h._searchStyle(),
                            a = h.options.liveSearchNormalize;
                        a && (i = f(i));
                        for (var o = 0; o < h.selectpicker.main.data.length; o++) {
                            var l = h.selectpicker.main.data[o];
                            n[o] || (n[o] = v(l, i, r, a)), n[o] && void 0 !== l.headerIndex && -1 === s.indexOf(l.headerIndex) && (0 < l.headerIndex && (n[l.headerIndex - 1] = !0, s.push(l.headerIndex - 1)), n[l.headerIndex] = !0, s.push(l.headerIndex), n[l.lastIndex + 1] = !0), n[o] && "optgroup-label" !== l.type && s.push(o)
                        }
                        for (var o = 0, d = s.length; o < d; o++) {
                            var c = s[o],
                                l = h.selectpicker.main.data[c],
                                u = h.selectpicker.main.data[s[o - 1]];
                            ("divider" !== l.type || "divider" === l.type && u && "divider" !== u.type && d - 1 !== o) && (h.selectpicker.search.data.push(l), t.push(h.selectpicker.main.elements[c]))
                        }
                        h.activeIndex = void 0, h.noScroll = !0, h.$menuInner.scrollTop(0), h.selectpicker.search.elements = t, h.createView(!0), ! function(e, t) {
                            e.length || (E.noResults.innerHTML = this.options.noneResultsText.replace("{0}", '"' + S(t) + '"'), this.$menuInner[0].firstChild.appendChild(E.noResults))
                        }.call(h, t, e)
                    } else h.selectpicker.search.previousValue && (h.$menuInner.scrollTop(0), h.createView(!1));
                    h.selectpicker.search.previousValue = e
                })
            },
            _searchStyle: function() {
                return this.options.liveSearchStyle || "contains"
            },
            val: function(e) {
                var t, i = this.$element[0];
                return void 0 !== e ? (t = k(i), x = [null, null, t], this.$element.val(e).trigger("changed" + O, x), this.$newElement.hasClass(C.SHOW) && (this.multiple ? this.setOptionStatus(!0) : "number" == typeof(t = (i.options[i.selectedIndex] || {}).liIndex) && (this.setSelected(this.selectedIndex, !1), this.setSelected(t, !0))), this.render(), x = null, this.$element) : this.$element.val()
            },
            changeAll: function(e) {
                if (this.multiple) {
                    void 0 === e && (e = !0);
                    var t = this.$element[0],
                        i = 0,
                        n = 0,
                        s = k(t);
                    t.classList.add("bs-select-hidden");
                    for (var r = 0, a = this.selectpicker.current.data, o = a.length; r < o; r++) {
                        var l = a[r],
                            d = l.option;
                        d && !l.disabled && "divider" !== l.type && (l.selected && i++, !0 === (d.selected = e)) && n++
                    }
                    t.classList.remove("bs-select-hidden"), i !== n && (this.setOptionStatus(), x = [null, null, s], this.$element.triggerNative("change"))
                }
            },
            selectAll: function() {
                return this.changeAll(!0)
            },
            deselectAll: function() {
                return this.changeAll(!1)
            },
            toggle: function(e) {
                (e = e || window.event) && e.stopPropagation(), this.$button.trigger("click.bs.dropdown.data-api")
            },
            keydown: function(e) {
                var t, i, n, s, r = b(this),
                    a = r.hasClass("dropdown-toggle"),
                    o = (a ? r.closest(".dropdown") : r.closest(q.MENU)).data("this"),
                    l = o.findLis(),
                    d = !1,
                    a = e.which === D && !a && !o.options.selectOnTab,
                    c = Z.test(e.which) || a,
                    u = o.$menuInner[0].scrollTop,
                    h = !0 === o.isVirtual() ? o.selectpicker.view.position0 : 0;
                if (!(112 <= e.which && e.which <= 123))
                    if (!(t = o.$newElement.hasClass(C.SHOW)) && (c || 48 <= e.which && e.which <= 57 || 96 <= e.which && e.which <= 105 || 65 <= e.which && e.which <= 90) && (o.$button.trigger("click.bs.dropdown.data-api"), o.options.liveSearch)) o.$searchbox.trigger("focus");
                    else {
                        if (e.which === _ && t && (e.preventDefault(), o.$button.trigger("click.bs.dropdown.data-api").trigger("focus")), c) {
                            if (!l.length) return; - 1 !== (c = (i = o.selectpicker.main.elements[o.activeIndex]) ? Array.prototype.indexOf.call(i.parentElement.children, i) : -1) && o.defocusItem(i), e.which === Y ? (-1 !== c && c--, c + h < 0 && (c += l.length), o.selectpicker.view.canHighlight[c + h] || -1 === (c = o.selectpicker.view.canHighlight.slice(0, c + h).lastIndexOf(!0) - h) && (c = l.length - 1)) : e.which !== I && !a || (++c + h >= o.selectpicker.view.canHighlight.length && (c = o.selectpicker.view.firstHighlightIndex), o.selectpicker.view.canHighlight[c + h]) || (c = c + 1 + o.selectpicker.view.canHighlight.slice(c + h + 1).indexOf(!0)), e.preventDefault();
                            var f = h + c;
                            e.which === Y ? 0 === h && c === l.length - 1 ? (o.$menuInner[0].scrollTop = o.$menuInner[0].scrollHeight, f = o.selectpicker.current.elements.length - 1) : d = (s = (n = o.selectpicker.current.data[f]).position - n.height) < u : e.which !== I && !a || (c === o.selectpicker.view.firstHighlightIndex ? (o.$menuInner[0].scrollTop = 0, f = o.selectpicker.view.firstHighlightIndex) : d = u < (s = (n = o.selectpicker.current.data[f]).position - o.sizeInfo.menuInnerHeight)), i = o.selectpicker.current.elements[f], o.activeIndex = o.selectpicker.current.data[f].index, o.focusItem(i), o.selectpicker.view.currentActive = i, d && (o.$menuInner[0].scrollTop = s), (o.options.liveSearch ? o.$searchbox : r).trigger("focus")
                        } else if (!r.is("input") && !J.test(e.which) || e.which === M && o.selectpicker.keydown.keyHistory) {
                            var p, m = [];
                            e.preventDefault(), o.selectpicker.keydown.keyHistory += Q[e.which], o.selectpicker.keydown.resetKeyHistory.cancel && clearTimeout(o.selectpicker.keydown.resetKeyHistory.cancel), o.selectpicker.keydown.resetKeyHistory.cancel = o.selectpicker.keydown.resetKeyHistory.start(), p = o.selectpicker.keydown.keyHistory, /^(.)\1+$/.test(p) && (p = p.charAt(0));
                            for (var g = 0; g < o.selectpicker.current.data.length; g++) {
                                var y = o.selectpicker.current.data[g];
                                v(y, p, "startsWith", !0) && o.selectpicker.view.canHighlight[g] && m.push(y.index)
                            }
                            m.length && (h = 0, l.removeClass("active").find("a").removeClass("active"), 1 === p.length && (-1 === (h = m.indexOf(o.activeIndex)) || h === m.length - 1 ? h = 0 : h++), d = 0 < u - (n = o.selectpicker.main.data[a = m[h]]).position ? (s = n.position - n.height, !0) : (s = n.position - o.sizeInfo.menuInnerHeight, n.position > u + o.sizeInfo.menuInnerHeight), i = o.selectpicker.main.elements[a], o.activeIndex = m[h], o.focusItem(i), i && i.firstChild.focus(), d && (o.$menuInner[0].scrollTop = s), r.trigger("focus"))
                        }
                        t && (e.which === M && !o.selectpicker.keydown.keyHistory || e.which === G || e.which === D && o.options.selectOnTab) && (e.which !== M && e.preventDefault(), o.options.liveSearch && e.which === M || (o.$menuInner.find(".active a").trigger("click", !0), r.trigger("focus"), o.options.liveSearch) || (e.preventDefault(), b(document).data("spaceSelect", !0)))
                    }
            },
            mobile: function() {
                this.options.mobile = !0, this.$element[0].classList.add("mobile-device")
            },
            refresh: function() {
                var e = b.extend({}, this.options, this.$element.data());
                this.options = e, this.checkDisabled(), this.buildData(), this.setStyle(), this.render(), this.buildList(), this.setWidth(), this.setSize(!0), this.$element.trigger("refreshed" + O)
            },
            hide: function() {
                this.$newElement.hide()
            },
            show: function() {
                this.$newElement.show()
            },
            remove: function() {
                this.$newElement.remove(), this.$element.remove()
            },
            destroy: function() {
                this.$newElement.before(this.$element).remove(), (this.$bsContainer || this.$menu).remove(), this.selectpicker.view.titleOption && this.selectpicker.view.titleOption.parentNode && this.selectpicker.view.titleOption.parentNode.removeChild(this.selectpicker.view.titleOption), this.$element.off(O).removeData("selectpicker").removeClass("bs-select-hidden selectpicker"), b(window).off(O + "." + this.selectId)
            }
        };
        var X = b.fn.selectpicker;

        function ee() {
            if (b.fn.dropdown) return (b.fn.dropdown.Constructor._dataApiKeydownHandler || b.fn.dropdown.Constructor.prototype.keydown).apply(this, arguments)
        }
        b.fn.selectpicker = K, b.fn.selectpicker.Constructor = j, b.fn.selectpicker.noConflict = function() {
            return b.fn.selectpicker = X, this
        }, b(document).off("keydown.bs.dropdown.data-api").on("keydown.bs.dropdown.data-api", ':not(.bootstrap-select) > [data-toggle="dropdown"]', ee).on("keydown.bs.dropdown.data-api", ":not(.bootstrap-select) > .dropdown-menu", ee).on("keydown" + O, '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', j.prototype.keydown).on("focusin.modal", '.bootstrap-select [data-toggle="dropdown"], .bootstrap-select [role="listbox"], .bootstrap-select .bs-searchbox input', function(e) {
            e.stopPropagation()
        }), b(window).on("load" + O + ".data-api", function() {
            b(".selectpicker").each(function() {
                var e = b(this);
                K.call(e, e.data())
            })
        })
    }(e)
}),
function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Mustache = t()
}(this, function() {
    "use strict";
    var t = Object.prototype.toString,
        O = Array.isArray || function(e) {
            return "[object Array]" === t.call(e)
        };

    function c(e) {
        return "function" == typeof e
    }

    function C(e) {
        return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    }

    function u(e, t) {
        return null != e && "object" == typeof e && t in e
    }
    var i = RegExp.prototype.test;
    var n = /\S/;

    function E(e) {
        return !i.call(n, e)
    }
    var s = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;",
        "`": "&#x60;",
        "=": "&#x3D;"
    };
    var $ = /\s*/,
        j = /\s+/,
        N = /\s*=/,
        H = /\s*\}/,
        A = /#|\^|\/|>|\{|&|=|!/;

    function a(e, t) {
        if (!e) return [];
        var i, n, s, r = !1,
            a = [],
            o = [],
            l = [],
            d = !1,
            c = !1,
            u = "",
            h = 0;

        function f() {
            if (d && !c)
                for (; l.length;) delete o[l.pop()];
            else l = [];
            c = d = !1
        }

        function p(e) {
            if ("string" == typeof e && (e = e.split(j, 2)), !O(e) || 2 !== e.length) throw new Error("Invalid tags: " + e);
            i = new RegExp(C(e[0]) + "\\s*"), n = new RegExp("\\s*" + C(e[1])), s = new RegExp("\\s*" + C("}" + e[1]))
        }
        p(t || z.tags);
        for (var m, g, y, v, _, b, w = new P(e); !w.eos();) {
            if (m = w.pos, y = w.scanUntil(i))
                for (var k = 0, x = y.length; k < x; ++k) E(v = y.charAt(k)) ? (l.push(o.length), u += v) : (r = c = !0, u += " "), o.push(["text", v, m, m + 1]), m += 1, "\n" === v && (f(), u = "", h = 0, r = !1);
            if (!w.scan(i)) break;
            if (d = !0, g = w.scan(A) || "name", w.scan($), "=" === g ? (y = w.scanUntil(N), w.scan(N), w.scanUntil(n)) : "{" === g ? (y = w.scanUntil(s), w.scan(H), w.scanUntil(n), g = "&") : y = w.scanUntil(n), !w.scan(n)) throw new Error("Unclosed tag at " + w.pos);
            if (_ = ">" == g ? [g, y, m, w.pos, u, h, r] : [g, y, m, w.pos], h++, o.push(_), "#" === g || "^" === g) a.push(_);
            else if ("/" === g) {
                if (!(b = a.pop())) throw new Error('Unopened section "' + y + '" at ' + m);
                if (b[1] !== y) throw new Error('Unclosed section "' + b[1] + '" at ' + m)
            } else "name" === g || "{" === g || "&" === g ? c = !0 : "=" === g && p(y)
        }
        if (f(), b = a.pop()) throw new Error('Unclosed section "' + b[1] + '" at ' + w.pos);
        for (var S, M = function(e) {
                for (var t, i, n = [], s = 0, r = e.length; s < r; ++s)(t = e[s]) && ("text" === t[0] && i && "text" === i[0] ? (i[1] += t[1], i[3] = t[3]) : (n.push(t), i = t));
                return n
            }(o), D = [], T = D, Y = [], I = 0, L = M.length; I < L; ++I) switch ((S = M[I])[0]) {
            case "#":
            case "^":
                T.push(S), Y.push(S), T = S[4] = [];
                break;
            case "/":
                Y.pop()[5] = S[2], T = 0 < Y.length ? Y[Y.length - 1][4] : D;
                break;
            default:
                T.push(S)
        }
        return D
    }

    function P(e) {
        this.string = e, this.tail = e, this.pos = 0
    }

    function r(e, t) {
        this.view = e, this.cache = {
            ".": this.view
        }, this.parent = t
    }

    function e() {
        this.templateCache = {
            _cache: {},
            set: function(e, t) {
                this._cache[e] = t
            },
            get: function(e) {
                return this._cache[e]
            },
            clear: function() {
                this._cache = {}
            }
        }
    }
    P.prototype.eos = function() {
        return "" === this.tail
    }, P.prototype.scan = function(e) {
        var e = this.tail.match(e);
        return e && 0 === e.index ? (e = e[0], this.tail = this.tail.substring(e.length), this.pos += e.length, e) : ""
    }, P.prototype.scanUntil = function(e) {
        var t, i = this.tail.search(e);
        switch (i) {
            case -1:
                t = this.tail, this.tail = "";
                break;
            case 0:
                t = "";
                break;
            default:
                t = this.tail.substring(0, i), this.tail = this.tail.substring(i)
        }
        return this.pos += t.length, t
    }, r.prototype.push = function(e) {
        return new r(e, this)
    }, r.prototype.lookup = function(e) {
        var t, i, n, s = this.cache;
        if (s.hasOwnProperty(e)) t = s[e];
        else {
            for (var r, a, o, l = this, d = !1; l;) {
                if (0 < e.indexOf("."))
                    for (r = l.view, a = e.split("."), o = 0; null != r && o < a.length;) o === a.length - 1 && (d = u(r, a[o]) || (i = r, n = a[o], null != i && "object" != typeof i && i.hasOwnProperty && i.hasOwnProperty(n))), r = r[a[o++]];
                else r = l.view[e], d = u(l.view, e);
                if (d) {
                    t = r;
                    break
                }
                l = l.parent
            }
            s[e] = t
        }
        return t = c(t) ? t.call(this.view) : t
    }, e.prototype.clearCache = function() {
        void 0 !== this.templateCache && this.templateCache.clear()
    }, e.prototype.parse = function(e, t) {
        var i = this.templateCache,
            n = e + ":" + (t || z.tags).join(":"),
            s = void 0 !== i,
            r = s ? i.get(n) : void 0;
        return null == r && (r = a(e, t), s) && i.set(n, r), r
    }, e.prototype.render = function(e, t, i, n) {
        var s = this.getConfigTags(n),
            s = this.parse(e, s),
            t = t instanceof r ? t : new r(t, void 0);
        return this.renderTokens(s, t, i, e, n)
    }, e.prototype.renderTokens = function(e, t, i, n, s) {
        for (var r, a, o, l = "", d = 0, c = e.length; d < c; ++d) o = void 0, "#" === (a = (r = e[d])[0]) ? o = this.renderSection(r, t, i, n, s) : "^" === a ? o = this.renderInverted(r, t, i, n, s) : ">" === a ? o = this.renderPartial(r, t, i, s) : "&" === a ? o = this.unescapedValue(r, t) : "name" === a ? o = this.escapedValue(r, t, s) : "text" === a && (o = this.rawValue(r)), void 0 !== o && (l += o);
        return l
    }, e.prototype.renderSection = function(e, t, i, n, s) {
        var r = this,
            a = "",
            o = t.lookup(e[1]);
        if (o) {
            if (O(o))
                for (var l = 0, d = o.length; l < d; ++l) a += this.renderTokens(e[4], t.push(o[l]), i, n, s);
            else if ("object" == typeof o || "string" == typeof o || "number" == typeof o) a += this.renderTokens(e[4], t.push(o), i, n, s);
            else if (c(o)) {
                if ("string" != typeof n) throw new Error("Cannot use higher-order sections without the original template");
                null != (o = o.call(t.view, n.slice(e[3], e[5]), function(e) {
                    return r.render(e, t, i, s)
                })) && (a += o)
            } else a += this.renderTokens(e[4], t, i, n, s);
            return a
        }
    }, e.prototype.renderInverted = function(e, t, i, n, s) {
        var r = t.lookup(e[1]);
        if (!r || O(r) && 0 === r.length) return this.renderTokens(e[4], t, i, n, s)
    }, e.prototype.indentPartial = function(e, t, i) {
        for (var n = t.replace(/[^ \t]/g, ""), s = e.split("\n"), r = 0; r < s.length; r++) s[r].length && (0 < r || !i) && (s[r] = n + s[r]);
        return s.join("\n")
    }, e.prototype.renderPartial = function(e, t, i, n) {
        var s, r, a, o, l;
        if (i) return s = this.getConfigTags(n), null != (r = c(i) ? i(e[1]) : i[e[1]]) ? (a = e[6], l = e[5], e = e[4], o = r, 0 == l && e && (o = this.indentPartial(r, e, a)), l = this.parse(o, s), this.renderTokens(l, t, i, o, n)) : void 0
    }, e.prototype.unescapedValue = function(e, t) {
        t = t.lookup(e[1]);
        if (null != t) return t
    }, e.prototype.escapedValue = function(e, t, i) {
        i = this.getConfigEscape(i) || z.escape, t = t.lookup(e[1]);
        if (null != t) return ("number" == typeof t && i === z.escape ? String : i)(t)
    }, e.prototype.rawValue = function(e) {
        return e[1]
    }, e.prototype.getConfigTags = function(e) {
        return O(e) ? e : e && "object" == typeof e ? e.tags : void 0
    }, e.prototype.getConfigEscape = function(e) {
        if (e && "object" == typeof e && !O(e)) return e.escape
    };
    var z = {
            name: "mustache.js",
            version: "4.2.0",
            tags: ["{{", "}}"],
            clearCache: void 0,
            escape: void 0,
            parse: void 0,
            render: void 0,
            Scanner: void 0,
            Context: void 0,
            Writer: void 0,
            set templateCache(e) {
                o.templateCache = e
            },
            get templateCache() {
                return o.templateCache
            }
        },
        o = new e;
    return z.clearCache = function() {
        return o.clearCache()
    }, z.parse = function(e, t) {
        return o.parse(e, t)
    }, z.render = function(e, t, i, n) {
        if ("string" != typeof e) throw new TypeError('Invalid template! Template should be a "string" but "' + (O(s = e) ? "array" : typeof s) + '" was given as the first argument for mustache#render(template, view, partials)');
        var s;
        return o.render(e, t, i, n)
    }, z.escape = function(e) {
        return String(e).replace(/[&<>"'`=\/]/g, function(e) {
            return s[e]
        })
    }, z.Scanner = P, z.Context = r, z.Writer = e, z
});
var $tablist = $(".nav-tabs, .nav-pills"),
    $lis = $tablist.children("li"),
    $tabs = $tablist.find('[data-toggle="tab"], [data-toggle="pill"]'),
    tabactivate = ($tabs && ($tablist.attr("role", "tablist"), $lis.attr("role", "presentation"), $tabs.attr("role", "tab")), $tabs.each(function(e) {
        var t = $($(this).attr("href")),
            i = $(this),
            n = i.attr("id") || uniqueId("ui-tab");
        i.attr("id", n), i.parent().hasClass("active") ? (i.attr({
            tabIndex: "0",
            "aria-selected": "true",
            "aria-controls": i.attr("href").substr(1)
        }), t.attr({
            role: "tabpanel",
            tabIndex: "0",
            "aria-hidden": "false",
            "aria-labelledby": n
        })) : (i.attr({
            tabIndex: "-1",
            "aria-selected": "false",
            "aria-controls": i.attr("href").substr(1)
        }), t.attr({
            role: "tabpanel",
            tabIndex: "-1",
            "aria-hidden": "true",
            "aria-labelledby": n
        }))
    }), $.fn.tab.Constructor.prototype.keydown = function(e) {
        var t, i = $(this).closest("ul[role=tablist] "),
            n = e.which || e.keyCode;
        $(this);
        /(37|38|39|40)/.test(n) && (t = (i = i.find("[role=tab]:visible")).index(i.filter(":focus")), 38 != n && 37 != n || t--, 39 != n && 40 != n || t++, (t = t < 0 ? i.length - 1 : t) == i.length && (t = 0), "tab" === (n = i.eq(t)).attr("role") && n.tab("show").focus(), e.preventDefault(), e.stopPropagation())
    }, $(document).on("keydown.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', $.fn.tab.Constructor.prototype.keydown), $.fn.tab.Constructor.prototype.activate),
    springSpace = ($.fn.tab.Constructor.prototype.activate = function(e, t, i) {
        var n = t.find("> .active");
        n.find("[data-toggle=tab], [data-toggle=pill]").attr({
            tabIndex: "-1",
            "aria-selected": !1
        }), n.filter(".tab-pane").attr({
            "aria-hidden": !0,
            tabIndex: "-1"
        }), tabactivate.apply(this, arguments), e.addClass("active"), e.find("[data-toggle=tab], [data-toggle=pill]").attr({
            tabIndex: "0",
            "aria-selected": !0
        }), e.filter(".tab-pane").attr({
            "aria-hidden": !1,
            tabIndex: "0"
        })
    }, {
        timeFormat: "h:mma",
        dateFormat: "dddd MMM Do",
        dateShortFormat: "ddd MMM Do YYYY",
        locale: "en-us",
        language: "en",
        currency: "USD",
        currencySymbol: "$",
        defaultTimeFormat: "h:mm A",
        nativeTimeFormat: "HH:mm",
        phpDateFormat: "YYYY-MM-DD",
        phpTimeFormat: "HH:mm",
        phpDateTimeFormat: "YYYY-MM-DD HH:mm",
        googleDateFormat: "YYYY/MM/DD",
        smallScreenSize: 480,
        modalSizeSmall: 640,
        modalSizeMedium: 800,
        modalSizeLarge: 1060,
        fadeOutDuration: 3e3,
        nbspRegex: new RegExp(String.fromCharCode(160), "g"),
        getDateTimeFormat: function() {
            return this.timeFormat + " " + this.dateFormat
        },
        getShortDateTimeFormat: function() {
            return this.timeFormat + " " + this.dateShortFormat
        },
        formatNumber: function(e, t) {
            var i = {
                style: "currency",
                currency: this.currency,
                currencyDisplay: "code"
            };
            return !1 === t && (i.minimumFractionDigits = 0, i.maximumFractionDigits = 0), Number(e).toLocaleString(this.locale, i).replace(this.nbspRegex, "").replace(this.currency, "")
        },
        formatCurrency: function(e) {
            return this.currencySymbol + this.formatNumber(e)
        },
        formatDateTimePair: function(e, t) {
            var i = springSpace.getDateTimeFormat();
            return e.isSame(t, "day") ? e.format(springSpace.timeFormat) + " - " + t.format(i) : e.format(i) + " - " + t.format(i)
        },
        formatDateTime: function(e, t) {
            t = void 0 !== t ? t : null;
            e = moment(e);
            return e.isValid() ? e.format(this.getDateTimeFormat()) : t
        },
        formatTime: function(e, t) {
            t = void 0 !== t ? t : null;
            var i = (new moment).format(springSpace.phpDateFormat),
                i = moment(i + " " + e);
            return i.isValid() ? i.format(springSpace.timeFormat) : t
        },
        formatDate: function(e, t) {
            e = moment(e);
            return e.isValid() ? e.format(this.dateFormat) : void 0 !== t ? t : null
        },
        createDateTimeMoment: function(e, t) {
            void 0 !== t && "" !== t || (t = moment().startOf("day").format(springSpace.timeFormat));
            var i = springSpace.dateFormat + " " + springSpace.timeFormat;
            return moment(e + " " + t, i)
        },
        createLocalMomentFromUtcDate: function(e) {
            return moment.utc(e).tz(springSpace.timezone)
        },
        setupLanguage: function() {
            moment.locale(springSpace.locale), setupDatePickerLanguage()
        }
    });

function disableButton(e, t) {
    ("" == (t = void 0 === t ? "" : t) ? jQuery("#" + e) : jQuery("#" + e).html(t)).prop("disabled", !0)
}

function enableButton(e, t) {
    ("" == (t = void 0 === t ? "" : t) ? jQuery("#" + e) : jQuery("#" + e).html(t)).prop("disabled", !1)
}

function ajaxDialog(e, t, i, n, s) {
    s = void 0 !== s ? s : "Save", jQuery("#dialog").remove();
    var r = "s-lc-ajax-modal";
    return jQuery('<div class="modal fade" id="dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"' + (0 == n ? "" : ' style="width:' + n + 'px"') + '><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" aria-label="Close">&times;</button><h4 class="modal-title" id="myModalLabel">' + i + '</h4></div><div class="modal-body" id="' + r + '"></div><div class="modal-footer"><button type="button" id="modalbtn" class="btn btn-primary pull-left">' + s + '</button> <button type="button" id="modalbtnc" class="btn btn-default pull-left" data-dismiss="modal">Close</button></div></div></div></div>').appendTo("body"), springyPublic.setLastFocusElement(), jQuery("#" + r).load(e + "?" + t, function() {
        jQuery("#dialog").modal(), jQuery("#dialog").on("hidden.bs.modal", function() {
            springyPublic.restoreLastFocusElement()
        })
    }), !1
}

function ajaxModal(e, t) {
    jQuery("#dialog").remove();
    var i = 0 == t ? "" : ' style="width:' + t + 'px"';
    return workingAlert(), jQuery.ajax({
        url: e,
        type: "get",
        dataType: "html"
    }).always(stopAlert).done(function(e) {
        springyPublic.setLastFocusElement(), springyPublic.createModal(e, i), jQuery("#dialog").on("hidden.bs.modal", function() {
            springyPublic.restoreLastFocusElement()
        })
    }).fail(ajaxErrorHandler), !1
}

function closeDialog(e) {
    void 0 === e && (e = "dialog");
    try {
        jQuery("#" + e).dialog("close")
    } catch (e) {}
    return jQuery("#" + e).remove(), jQuery(".modal-backdrop").remove(), jQuery("body").removeClass("modal-open"), !1
}

function hit(e, t, i) {
    return jQuery.post("/recordhit.php?id=" + e + "&table=" + t + "&src=" + i, function() {}), !1
}

function loadBrowse(e, t) {
    return jQuery("#" + t + "-cont").html('<br/><p class="text-center"><i class="fa fa-spinner fa-spin fa-lg"></i></p>'), jQuery.post("/process_public.php?m=" + e + "&id=" + t, function(e) {
        jQuery("#" + t + "-cont").hide().html(e).fadeIn("fast")
    }), !1
}

function datePickerAccessibilityFix(e) {
    e.find(".datepicker-title").remove(), e.find("th.dow, th.next, th.prev, th.datepicker-switch").attr("scope", "col")
}

function addslashes(e) {
    return e.replace(/[\\"']/g, "\\$&").replace(/\u0000/g, "\\0")
}

function setupLanguageDropdown() {
    jQuery("#s-lc-language-selector").on("change", function() {
        window.location.href = window.location.origin + "/language/change?lang=" + jQuery(this).val() + "&url=" + encodeURIComponent(window.location.href)
    })
}(springSpace = springSpace || {}).cookieConsent = springSpace.cookieConsent || {}, springSpace.cookieConsent.alert = function(e) {
    this.setConfig = function(e) {
        var t = (e = void 0 === e ? {} : e).okay || "OK";
        this.placement_opts = ["bottom", "top"], this.placement = -1 !== this.placement_opts.indexOf(e.placement) ? e.placement : "bottom", this.cookie_name = "springy_cookie_consent", this.cookie_notice_accepted = "ok", this.cookie_exp_days = e.cookie_exp_days || 180, this.read_more_callback = e.read_more_callback || function() {}, this.aria_label = e.aria_label || "User Privacy Alert", this.fade_in = 500, this.fade_out = 200, this.container_id = "s-ui-cc-container", this.close_button_id = "s-ui-cc-close-btn", this.read_more_elt_id = "s-ui-cc-read-more-link", this.consent_message = e.consent_message || "By using our website you are consenting to our use of cookies in accordance with our cookie policy.", this.content = '<div id="' + this.container_id + '" class="container" style="display: none;">    <aside class="navbar navbar-default navbar-fixed-' + this.placement + " fixed-" + this.placement + '" id="s-ui-cc-navbar" aria-label="' + this.aria_label + '">        <div id="s-ui-cc-main" class="container">            <div class="navbar-inner navbar-content-center" id="s-ui-cc-msg-container">                <div id="s-ui-cc-msg">' + this.consent_message + '<button id="' + this.close_button_id + '" type="button" class="btn btn-sm btn-default btn-light" data-dismiss="alert" aria-label="Close">' + t + "</button></div>            </div>        </div>    </aside></div>"
    }, this.consentCookieAccepted = function() {
        return this.getCookie(this.cookie_name) === this.cookie_notice_accepted
    }, this.setCookie = function(e, t, i) {
        var n = new Date,
            t = (n.setDate(n.getDate() + i), encodeURI(t) + (null === i ? "" : "; expires=" + n.toUTCString())),
            i = "https:" === location.protocol ? "; secure" : "";
        document.cookie = e + "=" + t + "; path=/; samesite=lax;" + i, jQuery("#" + this.container_id).hide("slow")
    }, this.getCookie = function(e) {
        for (var t, i = document.cookie.split(";"), n = 0; n < i.length; n++)
            if (t = i[n].indexOf("="), i[n].substr(0, t).replace(/^\s+|\s+$/g, "") === e) return t = i[n].substr(t + 1), decodeURI(t);
        return null
    }, this.handleClose = function() {
        this.setCookie(this.cookie_name, this.cookie_notice_accepted, this.cookie_exp_days), jQuery("#" + this.container_id).fadeOut(this.fade_out)
    }, this.handleAlert = function() {
        this.consentCookieAccepted() || (jQuery("body").prepend(this.content), jQuery("#" + this.container_id).fadeIn(this.fade_in), jQuery("#" + this.close_button_id).on("click", this.handleClose.bind(this)), jQuery("#" + this.read_more_elt_id).attr("href", "#"), jQuery("#" + this.read_more_elt_id).on("click", this.read_more_callback.bind(this)))
    }, this.setConfig(e), jQuery(document).ready(this.handleAlert.bind(this))
}, (springSpace = springSpace || {}).sui = springSpace.sui || {}, springSpace.sui.filedrop = function(e) {
    if (void 0 === e) return !1;
    if (!e.selector || "" === e.selector) return !1;
    if (this.callback = e.callback || function() {}, this.error_callback = e.error_callback || function() {}, this.validate = e.validate || function() {
            return !0
        }, this.max_files = e.max_files ? parseInt(e.max_files, 10) : 0, this.max_upload_size = e.max_upload_size ? parseInt(e.max_upload_size, 10) : 0, this.max_file_size = e.max_file_size ? parseInt(e.max_file_size, 10) : 0, this.batch_files = void 0 !== e.batch_files && !!e.batch_files, this.autoupload = void 0 === e.autoupload || !!e.autoupload, this.translations = e.translations || {
            max_file_size: "Maximum file size"
        }, this.allowedMimeTypes = e.allowedMimeTypes || [], this.isAdvancedUpload = ("draggable" in (t = document.createElement("div")) || "ondragstart" in t && "ondrop" in t) && "FormData" in window && "FileReader" in window, this.$form = jQuery(e.selector), 0 === this.$form.length) return !1;
    this.$droparea = this.$form.find(".s-ui-filedrop"), this.droppedFiles = [], this.batchedFiles = [], this.batch = {
        current: 0,
        total: 0
    };
    var t, o = this;
    this.$input = this.$droparea.find('input[type="file"]'), this.$label = this.$droparea.find("label"), this.$submitbutton = this.$form.find('button[type="submit"]'), this.$progress = null, this.showFiles = function() {
        var t, i, n, e;
        0 !== this.$input.length && (e = this.$droparea[0].querySelector(".s-ui-filedrop-filenames"), t = e.querySelector("ul"), this.isAdvancedUpload ? (i = [], n = 0, this.droppedFiles.forEach(function(e) {
            var t = document.createElement("li");
            t.innerText = e.name, i.push(t), n += e.size
        }), t.innerHTML = "", 0 === i.length ? e.classList.add("hidden") : (e.classList.remove("hidden"), i.forEach(function(e) {
            t.appendChild(e)
        })), 0 < this.max_files && i.length > this.max_files && this.showError(o.max_files + " file uploads maximum."), !1 === this.batch_files && 0 < this.max_upload_size && n > this.max_upload_size && this.showError("Files total " + o.bytesToMB(n) + " MB which exceeds the maximum of " + o.bytesToMB(this.max_upload_size) + " MB at a time.")) : "" === this.$input.val() ? (e.classList.add("hidden"), t.innerHTML = "") : (e.classList.remove("hidden"), (e = document.createElement("li")).innerText = this.$input.val().split("\\").slice(-1).pop(), t.appendChild(e), this.$label.find(".filetext").addClass("hidden")))
    }, this.reset = function() {
        o.$form[0].reset(), o.removeError(), o.droppedFiles = [], o.batch.current = 0, o.batch.total = 0, o.stopProgress(), o.showFiles(), o.$input.removeClass("has-focus")
    }, this.clearFiles = function() {
        o.resetFileInput(), o.droppedFiles = [], o.batch.current = 0, o.batch.total = 0, o.showFiles()
    }, this.resetFileInput = function() {
        var e, t;
        0 !== this.$input.length && (e = jQuery("<form>"), t = this.$input.clone(!0).appendTo(e), e[0].reset(), this.$input.replaceWith(t), this.$input = t)
    }, this.showError = function(e) {
        var t;
        0 !== this.$droparea.length && ((t = document.createElement("p")).innerText = e, 0 < this.$form.find("div.s-ui-filedrop-error").length ? this.$form.find("div.s-ui-filedrop-error").append(t) : ((e = document.createElement("div")).classList.add("alert"), e.classList.add("alert-danger"), e.classList.add("s-ui-filedrop-error"), e.setAttribute("role", "alert"), e.appendChild(t), this.$droparea.prepend(e)))
    }, this.removeError = function() {
        this.$form.find("div.s-ui-filedrop-error").empty()
    }, this.countFiles = function() {
        return 0 === this.$input.length ? 0 : this.isAdvancedUpload ? this.droppedFiles.length : "" !== this.$input.val() ? 1 : 0
    }, this.startProgress = function() {
        var e, t, i;
        (null === this.$progress || 1 === this.$progress.length && "" === this.$progress.html()) && (e = !0, this.$progress = this.$form.find("div.s-ui-filedrop-progress"), 0 === this.$progress.length && (e = !1, this.$progress = jQuery("<div></div>").addClass("s-ui-filedrop-progress")), t = jQuery("<div></div>").attr({
            id: "s-ui-filedrop-progresslabel"
        }).text("Uploading files"), (i = jQuery("<div></div>").addClass("s-ui-filedrop-progbar").attr({
            role: "progressbar",
            "aria-valuenow": "0",
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-labelledby": "s-ui-filedrop-progresslabel"
        })).append(document.createElement("span")), this.$progress.append([t, i]), e || this.$droparea.prepend(this.$progress))
    }, this.updateProgress = function(e, t) {
        e = Math.round(e / t * 100);
        this.$progress.find("span:first").css("width", e + "%"), this.$progress.find(".s-ui-filedrop-progbar").attr("aria-valuenow", e), 1 < this.batch.total && e < 50 && this.$progress.find("div:first").html("Uploading file batch (" + this.batch.current + "/" + this.batch.total + ")")
    }, this.stopProgress = function() {
        null !== this.$progress && this.$progress.empty()
    }, this.bytesToMB = function(e) {
        return (parseInt(e, 10) / 1048576).toFixed(1)
    }, this.addFiles = function(e) {
        if (0 < o.max_files && o.countFiles() + e.length > o.max_files) return o.showError(o.max_files + " file uploads maximum."), !1;
        for (var t = 0, i = (o.droppedFiles.forEach(function(e) {
                t += e.size
            }), []), n = 0; n < e.length; n++) {
            var s = e[n];
            if (0 < o.droppedFiles.length) {
                var r = !1;
                if (o.droppedFiles.forEach(function(e) {
                        e.name === s.name && (r = !0)
                    }), r) {
                    i.push(n);
                    continue
                }
            }
            0 < this.allowedMimeTypes.length && -1 === this.allowedMimeTypes.indexOf(s.type) ? (o.showError("File: " + s.name + " is not an allowed file type."), i.push(n)) : 0 < o.max_file_size && s.size > o.max_file_size ? (o.showError("File: " + s.name + " is greater than allowed file size of " + o.bytesToMB(o.max_file_size) + " MB."), i.push(n)) : !1 === o.batch_files && t + s.size > o.max_upload_size ? (o.showError("File: " + s.name + " causes files to go over maximum upload size of " + o.bytesToMB(o.max_upload_size) + " MB at a time."), i.push(n)) : t += s.size
        }
        if (!1 === o.batch_files && 0 < o.max_upload_size && t > o.max_upload_size) return o.showError("Files total " + t + " bytes which exceeds the maximum of " + o.bytesToMB(o.max_upload_size) + " MB at a time."), !1;
        for (var a = 0; a < e.length; a++) - 1 === i.indexOf(a) && o.droppedFiles.push(e[a]);
        return 0 !== o.droppedFiles.length
    }, this.batchFiles = function() {
        var t, s = [],
            r = [];
        return this.batch_files ? (t = 1, s.push([]), r.push(0), this.droppedFiles.forEach(function(i) {
            var e, n = !1;
            r.forEach(function(e, t) {
                !n && e + i.size < o.max_upload_size && (r[t] = e + i.size, s[t].push(i), n = !0)
            }), n || (r.push(0), t++, s.push([]), r[e = t - 1] = i.size, s[e].push(i))
        })) : s.push(this.droppedFiles), s
    }, this.isLastBatch = function() {
        return this.batch.current >= this.batch.total
    }, this.ajaxUpload = function() {
        o.$form.find('input[name="batch_current"]').val(o.batch.current);
        var t = new FormData(o.$form[0]);
        "function" == typeof t.delete && t.delete(o.$input.attr("name")), o.batchedFiles[o.batch.current - 1].forEach(function(e) {
            t.append(o.$input.attr("name"), e)
        }), jQuery.ajax({
            url: o.$form.attr("action"),
            type: o.$form.attr("method"),
            data: t,
            dataType: "json",
            cache: !1,
            crossDomain: !0,
            contentType: !1,
            processData: !1,
            beforeSend: function() {
                0 < o.countFiles() && o.startProgress()
            },
            complete: function() {
                o.isLastBatch() ? (o.$form.removeClass("is-uploading"), o.$submitbutton.prop("disabled", !1), o.stopProgress()) : (o.batch.current++, o.ajaxUpload())
            },
            success: function(e) {
                o.callback(e, o)
            },
            xhr: function() {
                var e = jQuery.ajaxSettings.xhr();
                return 0 < o.countFiles() && (e.upload.onprogress = function(e) {
                    o.updateProgress(e.loaded, e.total)
                }), e
            }
        }).fail(function(e) {
            o.error_callback(e, o)
        })
    }, this.isAdvancedUpload && 0 < this.$input.length && (this.$droparea.addClass("has-advanced-upload"), this.batch_files && (t = jQuery("<input />").attr({
        type: "hidden",
        name: "batch_current"
    }).val("0"), e = jQuery("<input />").attr({
        type: "hidden",
        name: "batch_total"
    }).val("0"), this.$form.prepend([t, e])), this.$droparea.on("drag dragstart dragend dragover dragenter dragleave drop", function(e) {
        e.preventDefault(), e.stopPropagation()
    }).on("dragover dragenter", function() {
        o.$droparea.addClass("is-dragover")
    }).on("dragleave dragend drop", function() {
        o.$droparea.removeClass("is-dragover")
    }).on("drop", function(e) {
        e = o.addFiles(e.originalEvent.dataTransfer.files);
        o.showFiles(), !0 === e && o.autoupload && o.$form.submit()
    }).on("click", function(e) {
        var t = e.target.tagName; - 1 !== ["A", "I", "SPAN", "B", "STRONG", "BUTTON"].indexOf(t) && jQuery(e.target).closest("a, button").hasClass("s-ui-filedrop-clear") && (o.clearFiles(), o.removeError())
    })), this.isAdvancedUpload || (this.$input.remove(), this.$droparea.remove()), 0 < this.$input.length && (this.$input.on("change", function(e) {
        e.target.files && (o.isAdvancedUpload && (e = o.addFiles(e.target.files), o.resetFileInput(), !0 === e) && o.autoupload && o.$form.submit(), o.$input.removeClass("has-focus"), o.showFiles())
    }).on("focus", function(e) {
        e.target.classList.add("has-focus")
    }).on("blur", function(e) {
        e.target.classList.remove("has-focus")
    }), this.translations.max_file_size) && ((t = document.createElement("p")).innerHTML = this.translations.max_file_size + ": " + this.bytesToMB(this.max_file_size) + " MB", this.$label.append(t)), this.$form.on("submit", function(e) {
        o.$form.hasClass("is-uploading") ? e.preventDefault() : (o.$form.removeClass("is-error"), o.removeError(), 0 < o.max_files && o.countFiles() > o.max_files ? (o.showError(o.max_files + " file uploads maximum."), e.preventDefault()) : !1 === o.validate(o) ? (o.$form.addClass("is-error"), e.preventDefault()) : (o.$form.addClass("is-uploading"), o.$submitbutton.prop("disabled", !0), o.isAdvancedUpload ? (e.preventDefault(), o.batch.current = 1, o.batchedFiles = o.batchFiles(), o.batch.total = o.batchedFiles.length, o.$form.find('input[name="batch_total"]').val(o.batch.total), o.ajaxUpload()) : (e.preventDefault(), jQuery.ajax({
            url: o.$form.attr("action"),
            type: o.$form.attr("method"),
            data: o.$form.serialize(),
            dataType: "json",
            complete: function() {
                o.$form.removeClass("is-uploading"), o.$submitbutton.prop("disabled", !1)
            },
            success: function(e) {
                o.callback(e, o)
            }
        }).fail(function(e) {
            o.error_callback(e, o)
        }))))
    })
}, jQuery.fn.selectpicker.defaults = {
    iconBase: "fa",
    tickIcon: "fa-check"
};
var springyPublic = {
    lastFocusElement: null,
    showTimezoneModal: function() {
        return ajaxModal("/timezone/list", 0)
    },
    createModal: function(e, t) {
        jQuery('<div class="modal fade" id="dialog" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"' + t + '><div class="modal-content s-lc-public-modal-content">' + e + "</div></div></div>").appendTo("body").modal()
    },
    getFutureEventDates: function(t) {
        return 0 < jQuery("#future_" + t).html().trim().length || (jQuery("#future_loading_" + t).show(), jQuery.ajax({
            url: "/ajax/event/future/" + t,
            type: "get",
            dataType: "html"
        }).always(function() {
            jQuery("#future_loading_" + t).hide()
        }).done(function(e) {
            jQuery("#future_" + t).html(e).show()
        }).fail(ajaxErrorHandler)), !1
    },
    registerClearBackForwardCache: function() {
        window.addEventListener("unload", function() {})
    },
    setLastFocusElement: function() {
        springyPublic.lastFocusElement = document.activeElement
    },
    restoreLastFocusElement: function() {
        null !== springyPublic.lastFocusElement && springyPublic.lastFocusElement.focus(), springyPublic.lastFocusElement = null
    },
    goToSelectedUrl: function() {
        var e = jQuery(this).val();
        return window.location = e + "#s-lc-public-pt", !1
    }
};

function getCurrentTimelineInstance(e) {
    return "undefined" != typeof timelineInstance ? timelineInstance : "undefined" != typeof timelineInFocus && null !== timelineInFocus ? timelineInFocus : timelineLocationMap[e]
}

function tgSetupDateManipulationVisuals() {
    jQuery(".fc-goToDate-button").datepicker({
        format: "yyyy-mm-dd",
        autoclose: !0,
        todayHighlight: !0,
        startDate: "today"
    }), jQuery(".fc-goToNextAvailable-button").hide(), jQuery(".fc-button").prop("disabled", !0)
}

function tgSetupDateManipulationChangeHandler(e, t, i) {
    jQuery("#" + t).find(".fc-goToDate-button").on("changeDate", function() {
        var e = getCurrentTimelineInstance(i),
            t = springyDatepicker.getDate(this);
        springyFullCalendar.goToDate(e, t)
    }), e && jQuery(".fc-goToNextAvailable-button").on("click", function() {
        return timeGridOnClickGoToNextAvailable(jQuery(this), springyPage.locationId, springyPage.groupId, springyPage.itemId, !0)
    })
}

function timeGridOnClickGoToNextAvailable(e, i, t, n, s) {
    e.prop("disabled", !0);
    var r = jQuery("#s-lc-timegrid-loading");
    return r.show(), jQuery.ajax({
        type: "get",
        url: "/equipment/availability/nextdate",
        data: {
            lid: i,
            gid: t,
            eid: n,
            seatId: springyPage.seatId,
            zone: springyPage.zoneId,
            capacity: springyCommon.parseInt(jQuery("#capacity").val()),
            accessible: springyPage.isAccessible,
            powered: springyPage.isPowered,
            isEquipment: s,
            isSeatBooking: springyPage.isSeatBooking,
            pageIndex: springyPage.pageIndex,
            pageSize: springyPage.pageSize
        },
        dataType: "json"
    }).always(function() {
        e.prop("disabled", !1), r.hide()
    }).done(function(e) {
        if (e.error) return errorAlert(e.error);
        var t = 0 < jQuery("#s-lc-timegrid-loading").length;
        s || springySpaces.setPageIndex(e.page), getCurrentTimelineInstance(i).gotoDate(e.date), tgSetupDateManipulationVisuals(), t && springySpaces.createLoadingIndicator(), tgSetupDateManipulationChangeHandler(s, "eq-time-grid")
    }).fail(ajaxErrorHandler), !1
}

function getTimelineCustomButtons(e, t, i) {
    return {
        goToNextAvailable: {
            click: function() {
                return timeGridOnClickGoToNextAvailable(jQuery(this), e, t, i, !1)
            }
        },
        goToDate: {}
    }
}

function timelineLoading(e) {
    !e && springyPage.wantAlternatingBackground && timegridAlternateHeaderBackgrounds(), jQuery("#s-lc-timegrid-loading").toggle(e), jQuery(".fc-button").prop("disabled", e)
}

function getFixedSlotWidth() {
    return jQuery(window).width() < 768 ? 70 : null
}

function errorAlert(e) {
    void 0 !== e && 0 !== e.length || (e = "undefined" == typeof springyText ? "Error: Please try again." : springyText.messages.errorDefault), jQuery.notification(e, {
        className: "jquery-notification-error",
        duration: 1e4
    });
    e = $("#jquery-notification");
    return e.attr("role", "alert"), e.attr("aria-live", "assertive"), !1
}

function successAlert(e) {
    void 0 !== e && 0 !== e.length || (e = "undefined" == typeof springyText ? "Success." : springyText.messages.success), jQuery.notification(e);
    e = $("#jquery-notification");
    e.attr("role", "alert"), e.attr("aria-live", "assertive")
}

function workingAlert(e) {
    void 0 !== e && "" != e || (e = ' <i class="fa fa-spinner fa-pulse fa-4x"></i> '), jQuery.notification(e, {
        duration: 6e4
    })
}

function stopAlert() {
    jQuery("#jquery-notification").hide()
}

function getAccessibleLabel(e) {
    var t = e.find(".icon-label.sr-only").html() || "";
    return 0 < t.length ? t : e.attr("aria-label") || ""
}

function createAccessibleTooltip(e) {
    var t = getAccessibleLabel(e);
    0 !== t.length && e.tooltip({
        title: t,
        html: !0,
        container: "body",
        trigger: "hover"
    })
}

function accessibleIcons() {
    jQuery("a > .fa").each(function(e, t) {
        createAccessibleTooltip(jQuery(t).parent("a"))
    }), jQuery("button > .fa").each(function(e, t) {
        createAccessibleTooltip(jQuery(t).parent("button"))
    }), jQuery('[data-toggle="tooltip"]').tooltip({
        trigger: "hover"
    }), jQuery('[data-toggle="popover"]').popover(), jQuery(".selectpicker").on("loaded.bs.select", function() {
        var e = jQuery(this),
            t = e.parent(),
            e = jQuery('label[for="' + e.attr("id") + '"]'),
            e = e.contents().not(e.children()).text().trim(),
            i = t.find(".inner").attr("id");
        t.append('<label class="sr-only" for="' + i + '">' + e + "</label>")
    })
}

function accessibleTables(e) {
    e = jQuery(e);
    e.find("th, td").attr("tabindex", 0), e.find("th").attr("scope", "col"), e.find("tr").attr("scope", "row")
}

function timegridAlternateHeaderBackgrounds() {
    var e = jQuery(".fc-time-area.fc-widget-header .fc-content > table > tbody > tr").first()[0];
    if (e)
        for (var t = 0; t < e.children.length; t++) jQuery(e.children[t]).addClass(t % 2 == 1 ? "s-lc-eq-timegrid-even" : "s-lc-eq-timegrid-odd")
}

function validateEmailAddress(e) {
    return /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e)
}

function addValueToKeyInDict(e, t, i, n) {
    t in e || (e[t] = {}), i in e[t] ? e[t][i] += n : e[t][i] = n
}

function isNormalInteger(e) {
    var t = Math.floor(Number(e));
    return String(t) === e && 0 <= t
}
jQuery(function() {
        springSpace.setupLanguage(), setupBrowserDefaults(), setupLanguageDropdown()
    }),
    function(u) {
        u.fn.LibCalMySched = function(s) {
            var i, e = u('script[src*="libcal"][src*="myscheduler"]').attr("src"),
                t = document.createElement("a"),
                n = (t.href = e, (s = u.extend({
                    animationEffect: "fadeIn",
                    animationSpeed: 400,
                    moveModalSpeed: "slow",
                    background: "000",
                    opacity: .5,
                    openOnLoad: !1,
                    docClose: !1,
                    closeByEscape: !0,
                    moveOnScroll: !1,
                    resizeWindow: !1,
                    uid: 0,
                    iid: 0,
                    lid: 0,
                    gid: 0,
                    height: 450,
                    width: 400,
                    title: "Make an Appointment",
                    domain: "https://" + t.hostname,
                    redirectMobile: !1,
                    redirectViewport: 330,
                    skip_first: 0
                }, s)).triggerid = u(this).attr("id"), s.trigger = "#" + s.triggerid, s.olay = s.trigger + "-s-lc-ms-overlay", s.modals = s.trigger + "-s-lc-ms-modal", s.close = s.trigger + "-s-lc-ms-close", u("body").append('<div id="' + s.triggerid + '-s-lc-ms-overlay"></div>'), u(s.olay).css({
                    width: "100%",
                    height: "100%",
                    position: "fixed",
                    top: "0",
                    left: "0",
                    "z-index": "1000",
                    display: "none"
                }), u("body").append('<div id="' + s.triggerid + '-s-lc-ms-modal" style="box-sizing: content-box!important; display: none;" role="dialog" aria-live="assertive" aria-atomic="true" tabindex="-1"><a href="#" id="' + s.triggerid + '-s-lc-ms-close" aria-label="close" tabindex="0"><span class="sr-only">Close</span></a></div>'), u(s.olay)),
                r = u(s.modals),
                a = !1,
                o = !1;

            function l() {
                r.hide();
                var e = u(window).height() / 2 - i.outerHeight() / 2 + u(window).scrollTop(),
                    t = u(window).width() / 2 - i.outerWidth() / 2 + u(window).scrollLeft();
                i.css({
                    top: e = e < 0 ? 5 : e,
                    left: t = t < 0 ? 5 : t
                }), !1 === a ? (n.css({
                    opacity: s.opacity,
                    backgroundColor: "#" + s.background
                }), n[s.animationEffect](s.animationSpeed), i.delay(s.animationSpeed)[s.animationEffect](s.animationSpeed)) : i.show(), a = !0, setTimeout(function() {
                    u("#" + s.triggerid + "-s-lc-ms-modal").focus()
                }, 700)
            }

            function d() {
                r.stop(!0).animate({
                    top: u(window).height() / 2 - r.outerHeight() / 2 + u(window).scrollTop(),
                    left: u(window).width() / 2 - r.outerWidth() / 2 + u(window).scrollLeft()
                }, s.moveModalSpeed)
            }

            function c() {
                return o = a = !1, u("#" + s.triggerid + "-iframe").remove(), r.fadeOut(100, function() {
                    "slideDown" === s.animationEffect ? n.slideUp() : "fadeIn" === s.animationEffect && n.fadeOut()
                }), u(s.trigger).trigger("focus"), !1
            }
            return "fadein" === s.animationEffect && (s.animationEffect = "fadeIn"), "slidedown" === s.animationEffect && (s.animationEffect = "slideDown"), n.css({
                opacity: 0
            }), s.openOnLoad ? l() : (n.hide(), r.hide()), u(s.trigger).bind("click", function(e) {
                e.preventDefault(), !1 === o && function() {
                    o = !0;
                    var e = u(window).width(),
                        t = u(window).height(),
                        i = (new Date).getTime(),
                        n = s.domain + "/widget/appointments?u=" + s.uid + "&lid=" + s.lid + "&gid=" + s.gid + "&iid=" + s.iid + "&t=" + encodeURIComponent(s.title);
                    0 === s.uid && s.skip_first;
                    if (s.redirectMobile && e <= s.redirectViewport) return window.location.href = n, !1;
                    s.width > e && (s.width = e - 30, s.width < 0 || s.width < 250) && (s.width = s.redirectViewport);
                    s.height > t && (s.height = t - 30, s.height < 0 || s.height < 250) && (s.height = 250);
                    u(s.close).after('<iframe id="' + s.triggerid + '-iframe" src="' + n + "&ncache=" + i + '" height="' + s.height + '" width="' + s.width + '" style="padding:0; margin:0; border:0; overflow-x: hidden; overflow-y: scroll;" title="' + s.title + '"><a href="' + n + '">Go to scheduling widget.</a></iframe>'), u(s.close).css({
                        background: "url(//lcimages.s3.amazonaws.com/ms-x.png) no-repeat",
                        width: "25px",
                        height: "29px",
                        "z-index": "1002",
                        display: "inline",
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        cursor: "pointer",
                        margin: "0",
                        padding: "0"
                    }), u(s.close + " .sr-only").css({
                        width: "1px",
                        height: "1px",
                        padding: "0",
                        position: "absolute",
                        margin: "-1px",
                        overflow: "hidden",
                        clip: "rect(0,0,0,0)",
                        border: "0"
                    });
                    e = s.width + 6, t = s.height + 10;
                    return u(s.modals).css({
                        background: "#fff",
                        padding: "30px 0px 0px 10px",
                        margin: "0px",
                        border: "2px solid #ddd",
                        "border-radius": "4px",
                        overflow: "auto",
                        "z-index": "1001",
                        position: "absolute",
                        width: e + "px",
                        height: t + "px",
                        "-webkit-overflow-scrolling": "touch"
                    }), !0
                }() && (i = u(s.modals), l())
            }), s.closeByEscape && u(window).bind("keyup", function(e) {
                if (27 === e.which) {
                    e = u("#" + s.triggerid + "-iframe");
                    if (0 !== e.length) return c()
                }
            }), u(s.close).bind("click", c), s.docClose && n.bind("click", c), !!s.resizeWindow && (u(window).bind("resize", d), !!s.moveOnScroll) && void u(window).bind("scroll", d)
        }
    }(jQuery), $.fn.tooltip.Constructor.DEFAULTS.whiteList.dl = [], $.fn.tooltip.Constructor.DEFAULTS.whiteList.dt = [], $.fn.tooltip.Constructor.DEFAULTS.whiteList.dd = [], $.fn.tooltip.Constructor.DEFAULTS.whiteList.span = ["style"];
var htmlEscapes = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    },
    htmlEscaper = /[&<>"']/g;

function escapeHtml(e) {
    return ("" + e).replace(htmlEscaper, function(e) {
        return htmlEscapes[e]
    })
}

function pageBusyBegin(e) {
    workingAlert(), jQuery(e).prop("disabled", !0)
}

function pageBusyEnd(e) {
    stopAlert(), jQuery(e).prop("disabled", !1)
}

function ajaxErrorGetText(e) {
    return null !== e.responseText && 0 < e.responseText.length ? e.responseText : 403 === e.status ? "undefined" == typeof springyText ? "Permission denied." : springyText.messages.permissionDenied : "undefined" == typeof springyText ? "Error: Please try again." : springyText.messages.errorDefault
}

function ajaxErrorHandler(e) {
    errorAlert(ajaxErrorGetText(e))
}

function setupBrowserDefaults() {
    !window.MSInputMethodContext || !document.documentMode || jQuery.ajaxSetup({
        cache: !1
    })
}

function setupDatePickerLanguage() {
    void 0 !== $.fn.datepicker && void 0 !== $.fn.datepicker.defaults && ($.fn.datepicker.defaults.language = springSpace.language), void 0 !== jQuery.datepicker && (springSpace.language in jQuery.datepicker.regional ? jQuery.datepicker.setDefaults(jQuery.datepicker.regional[springSpace.language]) : jQuery.datepicker.setDefaults(jQuery.datepicker.regional[springSpace.locale]))
}

function createHiddenInput(e, t) {
    var i = document.createElement("input");
    return i.setAttribute("type", "hidden"), i.setAttribute("name", e), i.setAttribute("value", t), i
}

function decodeEscapedJavascriptString(e) {
    return e.replace(/&#(\d+);/g, function(e, t) {
        return String.fromCharCode(t)
    })
}

function convertStringToFloat(e) {
    e = parseFloat(e);
    return isNaN(e) ? 0 : e
}

function compareDates(e, t) {
    e = springSpace.createDateTimeMoment(e), t = springSpace.createDateTimeMoment(t);
    return e.unix() - t.unix()
}

function compareStringIgnoreCase(e, t) {
    e = e.toUpperCase(), t = t.toUpperCase();
    return e < t ? -1 : t < e ? 1 : 0
}

function scrollAndFocusOnElement(e) {
    e = document.querySelector(e);
    return e.scrollIntoView(), e.focus(), e
}
var springyCommon = {
    wrapText: function(e, i) {
        var n = 0,
            s = "";
        for (e.split(" ").forEach(function(e) {
                var t = e.length;
                0 !== t && (0 === s.length ? (s = e, n = t) : void 0 === i || i < n + t ? (s += "<br>" + e, n = t) : (s += e, n += t))
            }); 0 <= e.indexOf("  ");) e = e.replace("  ", " ");
        return e.replace(" ", "<br>").replace("\n", "<br>")
    },
    bindAccessibleKeyPress: function(e, t) {
        var i = [13, 32];
        e.off("keypress"), e.on("keypress", function(e) {
            e = e.keyCode || e.which; - 1 !== i.indexOf(e) && t()
        })
    },
    parseInt: function(e, t) {
        e = parseInt(e);
        return isNaN(e) ? void 0 === t ? 0 : t : e
    },
    getElement: function(e) {
        e = document.querySelectorAll(e);
        return 0 === e.length ? null : e[0]
    },
    getValue: function(e) {
        e = springyCommon.getElement(e);
        return null === e ? null : e.value
    },
    getIntValue: function(e) {
        return springyCommon.parseInt(springyCommon.getValue(e))
    },
    addEventListener: function(e, t, i) {
        for (var n = document.querySelectorAll(e), s = 0; s < n.length; s++) n[s].addEventListener(t, i)
    },
    addIdNameModelsToSelect: function(e, t, i) {
        for (var n = 0; n < t.length; n++) {
            var s = t[n],
                r = s.id === i;
            e.append('<option value="' + s.id + '"' + (r ? ' selected="selected"' : "") + ">" + s.name + "</option>")
        }
    },
    safeGet: function(e, t, i) {
        for (var n = e, s = 0; s < t.length; s++) {
            var r = t[s];
            if (!(r in n)) return i;
            n = n[r]
        }
        return n
    },
    getDateTimePickerMoment: function(e) {
        var e = e.data("DateTimePicker");
        return (e = e && e.date()) ? moment(e) : null
    },
    getDateTimePickerValue: function(e) {
        e = springyCommon.getDateTimePickerMoment(e);
        return null === e ? null : e.format(springSpace.phpDateTimeFormat)
    },
    getFormSearchParams: function(e) {
        e = jQuery(e);
        return 0 === e.length ? new URLSearchParams : new URLSearchParams(new FormData(e[0]))
    },
    closeAllPopups: function() {
        jQuery(".tooltip, .popover").hide()
    },
    appendHiddenInput: function(e, t, i) {
        jQuery("<input />").attr("type", "hidden").attr("name", e).attr("value", t).appendTo(i)
    }
};
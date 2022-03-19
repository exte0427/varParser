"use strict";
exports.__esModule = true;
exports.makeCode = exports.getType = exports.parse = exports.Token = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["command"] = 0] = "command";
    TokenType[TokenType["string_u"] = 1] = "string_u";
    TokenType[TokenType["string_o"] = 2] = "string_o";
    TokenType[TokenType["string_t"] = 3] = "string_t";
    TokenType[TokenType["number"] = 4] = "number";
    TokenType[TokenType["sb_start"] = 5] = "sb_start";
    TokenType[TokenType["sb_end"] = 6] = "sb_end";
    TokenType[TokenType["mb_start"] = 7] = "mb_start";
    TokenType[TokenType["mb_end"] = 8] = "mb_end";
    TokenType[TokenType["bb_start"] = 9] = "bb_start";
    TokenType[TokenType["bb_end"] = 10] = "bb_end";
    TokenType[TokenType["plus"] = 11] = "plus";
    TokenType[TokenType["minus"] = 12] = "minus";
    TokenType[TokenType["mul"] = 13] = "mul";
    TokenType[TokenType["div"] = 14] = "div";
    TokenType[TokenType["not"] = 15] = "not";
    TokenType[TokenType["add_s"] = 16] = "add_s";
    TokenType[TokenType["mis_s"] = 17] = "mis_s";
    TokenType[TokenType["same"] = 18] = "same";
    TokenType[TokenType["div_same"] = 19] = "div_same";
    TokenType[TokenType["mul_same"] = 20] = "mul_same";
    TokenType[TokenType["add_same"] = 21] = "add_same";
    TokenType[TokenType["mis_same"] = 22] = "mis_same";
    TokenType[TokenType["eq"] = 23] = "eq";
    TokenType[TokenType["eq_jn"] = 24] = "eq_jn";
    TokenType[TokenType["uneq"] = 25] = "uneq";
    TokenType[TokenType["eq_t"] = 26] = "eq_t";
    TokenType[TokenType["uneq_t"] = 27] = "uneq_t";
    TokenType[TokenType["big"] = 28] = "big";
    TokenType[TokenType["big_s"] = 29] = "big_s";
    TokenType[TokenType["small"] = 30] = "small";
    TokenType[TokenType["se"] = 31] = "se";
    TokenType[TokenType["ee"] = 32] = "ee";
    TokenType[TokenType["small_s"] = 33] = "small_s";
    TokenType[TokenType["pow"] = 34] = "pow";
    TokenType[TokenType["pow_o"] = 35] = "pow_o";
    TokenType[TokenType["rem"] = 36] = "rem";
    TokenType[TokenType["and"] = 37] = "and";
    TokenType[TokenType["or"] = 38] = "or";
    TokenType[TokenType["arrow"] = 39] = "arrow";
    TokenType[TokenType["comma"] = 40] = "comma";
    TokenType[TokenType["point"] = 41] = "point";
    TokenType[TokenType["oa"] = 42] = "oa";
    TokenType[TokenType["semi"] = 43] = "semi";
    TokenType[TokenType["other"] = 44] = "other";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
var Token = /** @class */ (function () {
    function Token(type_, value_) {
        this.type = type_;
        this.value = value_;
    }
    return Token;
}());
exports.Token = Token;
var parse = function (code) {
    var tokens = [];
    for (var i = 0; i < code.length; i++) {
        if (code[i] === "(")
            tokens.push(new Token(TokenType.sb_start, "("));
        else if (code[i] === ")")
            tokens.push(new Token(TokenType.sb_end, ")"));
        else if (code[i] === "{")
            tokens.push(new Token(TokenType.mb_start, "{"));
        else if (code[i] === "}")
            tokens.push(new Token(TokenType.mb_end, "}"));
        else if (code[i] === "[")
            tokens.push(new Token(TokenType.bb_start, "["));
        else if (code[i] === "]")
            tokens.push(new Token(TokenType.bb_end, "]"));
        else if (code[i] === "*") {
            if (i + 1 < code.length && code[i + 1] === "*") {
                tokens.push(new Token(TokenType.pow_o, "**"));
                i++;
            }
            else if (i + 1 < code.length && code[i + 1] === "=") {
                tokens.push(new Token(TokenType.mul_same, "*="));
                i++;
            }
            else
                tokens.push(new Token(TokenType.mul, "*"));
        }
        else if (code[i] === "/") {
            if (i + 1 < code.length && code[i + 1] === "=") {
                tokens.push(new Token(TokenType.div_same, "/="));
                i++;
            }
            else if (i + 1 < code.length && code[i + 1] === "/") {
                while (i === code.length - 1 || code[i] === "\n") {
                    i++;
                }
            }
            else if (i + 1 < code.length && code[i + 1] === "*") {
                while (code[i] === "*" && code[i + 1] === "/") {
                    i++;
                }
            }
            else if (i + 1 < code.length && code[i + 1] === ">") {
                tokens.push(new Token(TokenType.se, "/>"));
                i++;
            }
            else
                tokens.push(new Token(TokenType.div, ""));
        }
        else if (code[i] === "+") {
            if (i + 1 < code.length && code[i + 1] === "+") {
                tokens.push(new Token(TokenType.add_s, "++"));
                i++;
            }
            else if (i + 1 < code.length && code[i + 1] === "=") {
                tokens.push(new Token(TokenType.add_same, "+="));
                i++;
            }
            else
                tokens.push(new Token(TokenType.plus, "+"));
        }
        else if (code[i] === "-") {
            if (i + 1 < code.length && code[i + 1] === "-") {
                tokens.push(new Token(TokenType.mis_s, "--"));
                i++;
            }
            else if (i + 1 < code.length && code[i + 1] === "=") {
                tokens.push(new Token(TokenType.mis_same, "-="));
                i++;
            }
            else
                tokens.push(new Token(TokenType.minus, "-"));
        }
        else if (code[i] === "!") {
            if (i + 1 < code.length && code[i + 1] === "=") {
                tokens.push(new Token(TokenType.uneq, "!="));
                i++;
            }
            else if (i + 2 < code.length && code[i + 1] === "=" && code[i + 2] === "=") {
                tokens.push(new Token(TokenType.uneq_t, "!=="));
                i += 2;
            }
            else
                tokens.push(new Token(TokenType.not, "!"));
        }
        else if (code[i] === "=") {
            if (i + 1 < code.length && code[i + 1] === "=") {
                tokens.push(new Token(TokenType.eq, "=="));
                i++;
            }
            else if (i + 2 < code.length && code[i + 1] === "=" && code[i + 2] === "=") {
                tokens.push(new Token(TokenType.eq_t, "==="));
                i += 2;
            }
            else if (i + 1 < code.length && code[i + 1] === ">") {
                tokens.push(new Token(TokenType.arrow, "=>"));
                i++;
            }
            else
                tokens.push(new Token(TokenType.same, "="));
        }
        else if (code[i] === ":")
            tokens.push(new Token(TokenType.eq_jn, ":"));
        else if (code[i] === ">") {
            if (i + 1 < code.length && code[i + 1] === "=") {
                tokens.push(new Token(TokenType.big_s, ">="));
                i++;
            }
            else
                tokens.push(new Token(TokenType.big, ">"));
        }
        else if (code[i] === "<") {
            if (i + 1 < code.length && code[i + 1] === "=") {
                tokens.push(new Token(TokenType.small_s, "<="));
                i++;
            }
            else if (i + 1 < code.length && code[i + 1] === "/") {
                tokens.push(new Token(TokenType.ee, "</"));
                i++;
            }
            else
                tokens.push(new Token(TokenType.small, "<"));
        }
        else if (code[i] === "^")
            tokens.push(new Token(TokenType.pow, "^"));
        else if (code[i] === "%")
            tokens.push(new Token(TokenType.rem, "%"));
        else if (i + 1 < code.length && code[i] === "&" && code[i + 1] === "&") {
            i++;
            tokens.push(new Token(TokenType.and, "&&"));
        }
        else if (i + 1 < code.length && code[i] === "|" && code[i + 1] === "|") {
            i++;
            tokens.push(new Token(TokenType.or, "||"));
        }
        else if (code[i] === ".")
            tokens.push(new Token(TokenType.point, "."));
        else if (code[i] === ",")
            tokens.push(new Token(TokenType.comma, ","));
        else if (code[i] === "@")
            tokens.push(new Token(TokenType.oa, "@"));
        else if (code[i] === ";")
            tokens.push(new Token(TokenType.semi, ";"));
        else if ((/[0-9]/g).test(code[i])) {
            var num = "";
            while (i < code.length && (/[0-9]/g).test(code[i])) {
                num += code[i];
                i++;
            }
            tokens.push(new Token(TokenType.number, num));
            i--;
        }
        else if ((/[a-zA-Z]/g).test(code[i])) {
            var cmd = "";
            while (i < code.length && (/[a-zA-Z0-9]/g).test(code[i])) {
                cmd += code[i];
                i++;
            }
            tokens.push(new Token(TokenType.command, cmd));
            i--;
        }
        else if (code[i] === "`") {
            var str = "";
            i++;
            while (code[i] !== "`") {
                str += code[i];
                i++;
            }
            tokens.push(new Token(TokenType.string_u, str));
        }
        else if (code[i] === "\"") {
            var str = "";
            i++;
            while (code[i] !== "\"") {
                str += code[i];
                i++;
            }
            tokens.push(new Token(TokenType.string_t, str));
        }
        else if (code[i] === "'") {
            var str = "";
            i++;
            while (code[i] !== "'") {
                str += code[i];
                i++;
            }
            tokens.push(new Token(TokenType.string_o, str));
        }
        else if (!(code[i] === "\n" || code[i] === " "))
            tokens.push(new Token(TokenType.other, code[i]));
    }
    return tokens;
};
exports.parse = parse;
var getType = function (code) {
    var myToken = (0, exports.parse)(code)[0];
    return myToken.type;
};
exports.getType = getType;
var makeCode = function (tokens) {
    var retString = "";
    for (var i in tokens) {
        if (Number(i) > 0 && tokens[Number(i) - 1].type === TokenType.command && tokens[Number(i)].type === TokenType.command)
            retString += " ".concat(tokens[Number(i)].value);
        else if (tokens[Number(i)].type === TokenType.string_u)
            retString += "`".concat(tokens[Number(i)].value, "`");
        else if (tokens[Number(i)].type === TokenType.string_o)
            retString += "'".concat(tokens[Number(i)].value, "'");
        else if (tokens[Number(i)].type === TokenType.string_t)
            retString += "\"".concat(tokens[Number(i)].value, "\"");
        else
            retString += tokens[Number(i)].value;
    }
    return retString;
};
exports.makeCode = makeCode;

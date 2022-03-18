"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.Token = exports.TokenType = void 0;
var TokenType;
(function (TokenType) {
    TokenType[TokenType["command"] = 0] = "command";
    TokenType[TokenType["string"] = 1] = "string";
    TokenType[TokenType["number"] = 2] = "number";
    TokenType[TokenType["sb_start"] = 3] = "sb_start";
    TokenType[TokenType["sb_end"] = 4] = "sb_end";
    TokenType[TokenType["mb_start"] = 5] = "mb_start";
    TokenType[TokenType["mb_end"] = 6] = "mb_end";
    TokenType[TokenType["bb_start"] = 7] = "bb_start";
    TokenType[TokenType["bb_end"] = 8] = "bb_end";
    TokenType[TokenType["plus"] = 9] = "plus";
    TokenType[TokenType["minus"] = 10] = "minus";
    TokenType[TokenType["mul"] = 11] = "mul";
    TokenType[TokenType["div"] = 12] = "div";
    TokenType[TokenType["not"] = 13] = "not";
    TokenType[TokenType["add_s"] = 14] = "add_s";
    TokenType[TokenType["mis_s"] = 15] = "mis_s";
    TokenType[TokenType["same"] = 16] = "same";
    TokenType[TokenType["div_same"] = 17] = "div_same";
    TokenType[TokenType["mul_same"] = 18] = "mul_same";
    TokenType[TokenType["add_same"] = 19] = "add_same";
    TokenType[TokenType["mis_same"] = 20] = "mis_same";
    TokenType[TokenType["eq"] = 21] = "eq";
    TokenType[TokenType["eq_jn"] = 22] = "eq_jn";
    TokenType[TokenType["uneq"] = 23] = "uneq";
    TokenType[TokenType["eq_t"] = 24] = "eq_t";
    TokenType[TokenType["uneq_t"] = 25] = "uneq_t";
    TokenType[TokenType["big"] = 26] = "big";
    TokenType[TokenType["big_s"] = 27] = "big_s";
    TokenType[TokenType["small"] = 28] = "small";
    TokenType[TokenType["small_s"] = 29] = "small_s";
    TokenType[TokenType["pow"] = 30] = "pow";
    TokenType[TokenType["pow_o"] = 31] = "pow_o";
    TokenType[TokenType["rem"] = 32] = "rem";
    TokenType[TokenType["and"] = 33] = "and";
    TokenType[TokenType["or"] = 34] = "or";
    TokenType[TokenType["arrow"] = 35] = "arrow";
    TokenType[TokenType["comma"] = 36] = "comma";
    TokenType[TokenType["point"] = 37] = "point";
    TokenType[TokenType["oa"] = 38] = "oa";
    TokenType[TokenType["semi"] = 39] = "semi";
    TokenType[TokenType["other"] = 40] = "other";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
class Token {
    constructor(type_, value_) {
        this.type = type_;
        this.value = value_;
    }
}
exports.Token = Token;
const parse = (code) => {
    let tokens = [];
    for (let i = 0; i < code.length; i++) {
        if (code[i] === `(`)
            tokens.push(new Token(TokenType.sb_start, ``));
        else if (code[i] === `)`)
            tokens.push(new Token(TokenType.sb_end, ``));
        else if (code[i] === `{`)
            tokens.push(new Token(TokenType.mb_start, ``));
        else if (code[i] === `}`)
            tokens.push(new Token(TokenType.mb_end, ``));
        else if (code[i] === `[`)
            tokens.push(new Token(TokenType.bb_start, ``));
        else if (code[i] === `]`)
            tokens.push(new Token(TokenType.bb_end, ``));
        else if (code[i] === `*`) {
            if (i + 1 < code.length && code[i + 1] === `*`) {
                tokens.push(new Token(TokenType.pow_o, ``));
                i++;
            }
            else if (i + 1 < code.length && code[i + 1] === `=`) {
                tokens.push(new Token(TokenType.mul_same, ``));
                i++;
            }
            else
                tokens.push(new Token(TokenType.mul, ``));
        }
        else if (code[i] === `/`) {
            if (i + 1 < code.length && code[i + 1] === `=`) {
                tokens.push(new Token(TokenType.div_same, ``));
                i++;
            }
            else if (i + 1 < code.length && code[i + 1] === `/`) {
                while (i === code.length - 1 || code[i] === `\n`) {
                    i++;
                }
            }
            else if (i + 1 < code.length && code[i + 1] === `*`) {
                while (code[i] === `*` && code[i + 1] === `/`) {
                    i++;
                }
            }
            else
                tokens.push(new Token(TokenType.div, ``));
        }
        else if (code[i] === `+`) {
            if (i + 1 < code.length && code[i + 1] === `+`) {
                tokens.push(new Token(TokenType.add_s, ``));
                i++;
            }
            else if (i + 1 < code.length && code[i + 1] === `=`) {
                tokens.push(new Token(TokenType.add_same, ``));
                i++;
            }
            else
                tokens.push(new Token(TokenType.plus, ``));
        }
        else if (code[i] === `-`) {
            if (i + 1 < code.length && code[i + 1] === `-`) {
                tokens.push(new Token(TokenType.mis_s, ``));
                i++;
            }
            else if (i + 1 < code.length && code[i + 1] === `=`) {
                tokens.push(new Token(TokenType.mis_same, ``));
                i++;
            }
            else
                tokens.push(new Token(TokenType.minus, ``));
        }
        else if (code[i] === `!`) {
            if (i + 1 < code.length && code[i + 1] === `=`) {
                tokens.push(new Token(TokenType.uneq, ``));
                i++;
            }
            else if (i + 2 < code.length && code[i + 1] === `=` && code[i + 2] === `=`) {
                tokens.push(new Token(TokenType.uneq_t, ``));
                i += 2;
            }
            else
                tokens.push(new Token(TokenType.not, ``));
        }
        else if (code[i] === `=`) {
            if (i + 1 < code.length && code[i + 1] === `=`) {
                tokens.push(new Token(TokenType.eq, ``));
                i++;
            }
            else if (i + 2 < code.length && code[i + 1] === `=` && code[i + 2] === `=`) {
                tokens.push(new Token(TokenType.eq_t, ``));
                i += 2;
            }
            else if (i + 1 < code.length && code[i + 1] === ">") {
                tokens.push(new Token(TokenType.arrow, ``));
                i++;
            }
            else
                tokens.push(new Token(TokenType.same, ``));
        }
        else if (code[i] === `:`)
            tokens.push(new Token(TokenType.eq_jn, ``));
        else if (code[i] === `>`) {
            if (i + 1 < code.length && code[i + 1] === `=`) {
                tokens.push(new Token(TokenType.big_s, ``));
                i++;
            }
            else
                tokens.push(new Token(TokenType.big, ``));
        }
        else if (code[i] === `<`) {
            if (i + 1 < code.length && code[i + 1] === `=`) {
                tokens.push(new Token(TokenType.small_s, ``));
                i++;
            }
            else
                tokens.push(new Token(TokenType.small, ``));
        }
        else if (code[i] === `^`)
            tokens.push(new Token(TokenType.pow, ``));
        else if (code[i] === `%`)
            tokens.push(new Token(TokenType.rem, ``));
        else if (i + 1 < code.length && code[i] === `&` && code[i + 1] === `&`) {
            i++;
            tokens.push(new Token(TokenType.and, ``));
        }
        else if (i + 1 < code.length && code[i] === `|` && code[i + 1] === `|`) {
            i++;
            tokens.push(new Token(TokenType.or, ``));
        }
        else if (code[i] === `.`)
            tokens.push(new Token(TokenType.point, ``));
        else if (code[i] === `,`)
            tokens.push(new Token(TokenType.comma, ``));
        else if (code[i] === `@`)
            tokens.push(new Token(TokenType.oa, ``));
        else if (code[i] === `;`)
            tokens.push(new Token(TokenType.semi, ``));
        else if ((/[0-9]/g).test(code[i])) {
            let num = "";
            while (i < code.length && (/[0-9]/g).test(code[i])) {
                num += code[i];
                i++;
            }
            tokens.push(new Token(TokenType.number, num));
            i--;
        }
        else if ((/[a-zA-Z]/g).test(code[i])) {
            let cmd = "";
            while (i < code.length && (/[a-zA-Z0-9]/g).test(code[i])) {
                cmd += code[i];
                i++;
            }
            tokens.push(new Token(TokenType.command, cmd));
            i--;
        }
        else if (code[i] === `\`` || code[i] === `"` || code[i] === `'`) {
            let str = "";
            i++;
            while (!(code[i] === `\`` || code[i] === `"` || code[i] === `'`)) {
                str += code[i];
                i++;
            }
            tokens.push(new Token(TokenType.string, str));
        }
        else if (!(code[i] === `\n` || code[i] === ` `))
            tokens.push(new Token(TokenType.other, code[i]));
    }
    return tokens;
};
exports.parse = parse;
//# sourceMappingURL=parser.js.map
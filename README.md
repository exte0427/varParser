# VAR - JS PARSER
### INFO
js parser that can  be used in many projects
### HOW TO USE
```
npm i var-js-parser
```
```js
const parser = require(`var-js-parser`);
parser.parse(`//some string`);
```
### .parse
```ts
const parse = (code:string) => data:Array<Token>
```
### .Token
```ts
class Token {
    type: TokenType;
    value: string;
}
```
### .TokenType
```ts
enum TokenType {
    command,
    string,
    number,

    sb_start, // (
    sb_end,   // )
    mb_start, // {
    mb_end,   // }
    bb_start, // [
    bb_end,   // ]

    plus,     // +
    minus,    // -
    mul,      // *
    div,      // /
    not,      // !

    add_s,      // ++
    mis_s,       // --

    same,     // =
    div_same, // /=
    mul_same, // *=
    add_same, // +=
    mis_same, // -=

    eq,       // ==
    eq_jn,     // :
    uneq,     // !=
    eq_t,     // ===
    uneq_t,   // !==
    big,      // >
    big_s,    // >=
    small,    // <
    small_s,  // <=
    pow,      // ^
    pow_o,    // **
    rem,      // %

    and,      // &&
    or,       // ||

    arrow,    // =>
    comma,    // ,
    point,    // .
    oa,       // @

    semi,     // ;
    other,     // other
}
```
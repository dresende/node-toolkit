## NodeJS / Javascript Toolkit ![ Travis CI ](https://secure.travis-ci.org/dresende/node-toolkit.png)

This is a set of extensions for native objects. Almost all native objects will probably have usefull
extensions such as formatting a number or comparing dates or even padding a string.

Before suggesting any extension, check if native objects don't have them already. For example,
`Array.map` and `Array.filter` are already in the core.

## Usage

Install:

    npm install tk

Initialize:

    require("tk").extendNative();

Use:

    console.log([ 1, 2, 3, 4 ].first(2)); // prints [ 1, 2 ]

Test:

    vows --spec tests/*

## API

Here is a list (possibly not up-to-date) of the extensions:

### Array

#### .first([ n ])

    [ 1, 2, 3, 4 ].first()                        // prints 1
    [ 1, 2, 3, 4 ].first(2)                       // prints [ 1, 2 ]
  
#### .last([ n ])

    [ 1, 2, 3, 4 ].last()                         // prints 4
    [ 1, 2, 3, 4 ].last(2)                        // prints [ 3, 4 ]

#### .without(v1, .., vN)

    [ 1, 2, 3, 4 ].without(2)                     // prints [ 1, 3, 4 ]
    [ 1, 2, 3, 4 ].without(2, 4)                  // prints [ 1, 3 ]

#### .compact()

    [ 1, null, 2, 3, undefined ].compact()        // prints [ 1, 2, 3 ]

#### .unique()

    [ 1, 2, 3, 2, 4 ].unique()                    // prints [ 1, 2, 3, 4 ]

#### .sum()

    [ 1, 2, 3, 4 ].sum()                          // prints 10
    [ 10, 10, 10 ].sum(8)                         // prints 24 (30 octal => 24 decimal)

#### .product()

    [ 1, 2, 3, 4 ].product()                      // prints 24
    [ 10, 10 ].product(8)                         // prints 64 (100 octal => 64 decimal)

#### .grep(/re/)

    [ 'joe', 'john', 'tom' ].grep(/^j/)           // prints [ 'joe', 'john' ]

#### .min()

    [ 1, 2, 3, 4 ].min()                          // prints 1
    [ -1, -2, -3 ].min()                          // prints -3

#### .max()

    [ 1, 2, 3, 4 ].max()                          // prints 4
    [ -1, -2, -3 ].max()                          // prints -1

#### .multisort(key1, "asc", key2, "desc", ...)

    [{ name: "John" }, { name: "Jane" }].multisort("name", "asc")
    // returns the Array sorting each Object by the name key ascending
    
    [{ name: "John" }, { name: "Jane" }].multisort("name")
    // same as above
    
    [{ name: "John" }, { name: "Jane" }].multisort("name", "desc", "age")
    // same as above, sorting name descending and the by the age key ascending


### Date

#### .addHour(n)
#### .addDay(n)
#### .addWeek(n)
#### .addMonth(n)
#### .addYear(n)

    var dt = new Date();
    dt.addDay()
    // returns a new Date representing tomorrow
    dt.addDay(2)
    // returns a new Date representing after tomorrow
    dt.addDay(-1)
    // returns a new Date representing yesterday

#### .before(date)
#### .after(date)
#### .between(start, end)

    var dt1 = new Date(), dt2 = dt1.addDay(), dt3 = dt1.addDay(-1);

    dt1.after(dt2)                     // it's not, it's before
    dt1.before(dt2)                    // yes it is
    dt1.between(dt2, dt3)              // yes too
    
#### .diff(date)

    var dt1 = new Date(), dt2 = dt1.addDay();

    dt1.diff(dt2)                      // -86400000 (miliseconds)
    dt2.diff(dt1)                      // 86400000 (miliseconds)

### Function

- .defer([ms])
- .curry(arg1, .., argN)

### Math

- .random([ start [, end ]])

### Number

- .pow(n)
- .odd()
- .even()
- .abs()
- .ceil()
- .floor()
- .round([n])
- .format([ decimals [, decimal_separator [, thousands_separator ]]])
- .duration([ format ])
- .bin([ pad ])
- .oct([ pad ])
- .hex([ pad ])

### Object

- .keys()
- .isset(key)
- .unset(key)
- .watch(key, cb)
- .unwatch(key)

### String

- .words([ separators ])
- .count(needle, [ offset [, len ]])
- .csv([ delimiter_char, [ enclosure_char, [ escape_char ]]])
- .repeat([ n ])
- .reverse()
- .ord([ n ])
- .trim()
- .ltrim()
- .rtrim()
- .pad([ length, [ padding_string, [ type ]]])
- .shuffle()
- .chunk([ length, [ delimiter ]])

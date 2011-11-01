## NodeJS / Javascript Toolkit

This is a set of extensions for native objects. Almost all native objects will probably have usefull
extensions such as formatting a number or comparing dates or even padding a string.

Before suggesting any extension, check if native objects don't have them already. For example,
`Array.map` and `Array.filter` are already in the core.

Here is a list (possibly not up-to-date) of the extensions:

### Array

- .first([ n ])
- .last([ n ])
- .without(v1, .., vN)
- .compact()
- .unique()
- .sum()
- .product()
- .grep(/re/)
- .min()
- .max()

### Date

- .addHour(n)
- .addDay(n)
- .addWeek(n)
- .addMonth(n)
- .addYear(n)
- .before(date)
- .after(date)
- .between(start, end)
- .diff(date)

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

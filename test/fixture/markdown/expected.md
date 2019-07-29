# Group: Settings

<a id="settings-variable-example-variable"></a>

# [variable] example-variable

**Access:** public

example `variable`

## Type

**map | list**

## Properties

+ `key1` **[Number](https://sass-lang.com/documentation/values/numbers)** key1 (default `0`)
+ `key2` **[Color](https://sass-lang.com/documentation/values/colors)** key2 (default `#000`)
+ `key3` **[String](https://sass-lang.com/documentation/values/strings)** key3 (default `"example"`)

## Dependents

+ [mixin] **example-mixin** example `mixin`

# Group: General

<a id="general-variable-example-variable-bool"></a>

# [variable] example-variable-bool

**Access:** public

example `variable` bool

## Type

**Boolean**

<a id="general-variable-example-variable-private"></a>

# [variable] example-variable-private

**Access:** private

example private `variable` bool

## Type

**Boolean**

## Dependents

+ [mixin] **example-mixin** example `mixin`

<a id="general-placeholder-example-placeholder"></a>

# [placeholder] example-placeholder

**Access:** public

example `placeholder`

## Examples

scss inputs

```scss
.selector {
  @extend %example-placeholder;
}
```

css outputs

```css
.selector {
  display: block;
}
```

## Dependents

+ [mixin] **example-mixin** example `mixin`

<a id="general-function-example-function"></a>

# [function] example-function

**Access:** public

example `function`

## Parameters

+ `arg1` **[Number](https://sass-lang.com/documentation/values/numbers)** argument #1 (default `0`)
+ `arg1` **[List](https://sass-lang.com/documentation/values/lists)** argument #2 (default `()`)

## Returns

**[String](https://sass-lang.com/documentation/values/strings)** example text

## Examples

scss inputs

```scss
@debug: example-function(30px, ("a", "b", "c"));
```

outputs

```sh
example
```

## Dependents

+ [function] **example-function-alias** example `function` alias
+ [mixin] **example-mixin** example `mixin`

## Aliased by

+ **example-function-alias**

<a id="general-function-example-function-alias"></a>

# [function] example-function-alias

> **DEPRECATED!**  
> example-function-alias is deprecated, instead use example-function

**Access:** public

example `function` alias

## Dependencies

+ [function] **[example-function](#general-function-example-function)**

## Alias

+ **example-function**

<a id="general-mixin-example-mixin"></a>

# [mixin] example-mixin

**[TODO]** update options  
**[TODO]** update docs

**Access:** public

example `mixin`

## Parameters

+ `arg1` **[String](https://sass-lang.com/documentation/values/strings)** argument #1 ("hoge"|"fuga") (default `""`)
+ `arg2` **[Map](https://sass-lang.com/documentation/values/maps) \| [List](https://sass-lang.com/documentation/values/lists)** argument #2 (default `()`)
+ `arg2.key` **[String](https://sass-lang.com/documentation/values/strings)** key `option` (default `""`)

## Contents

extra content

## Throws

+ error description

## Outputs

example content value

## Examples

scss inputs

```scss
.selector {
  @include example-mixin($arg1: "hoge", $arg2: ()) {
    font-size: 16px;
  };
}
```

css outputs

```css
.selector::after {
  display: block;
  content: "hoge";
  font-size: 16px;
}
```

## Dependencies

+ [variable] **[example-variable](#settings-variable-example-variable)** require variable
+ [variable] **[example-variable-private](#general-variable-example-variable-private)** require private variable
+ [function] **[example-function](#general-function-example-function)** require function
+ [placeholder] **[example-placeholder](#general-placeholder-example-placeholder)** require function

## See

+ [variable] **[example-variable](#settings-variable-example-variable)**
+ [placeholder] **[example-placeholder](#general-placeholder-example-placeholder)**

## Links

+ [example caption](https://example.com/)
+ <https://other.example.com/>

## Since

+ **0.1.0** example description

## Authors

+ example author
+ example other author

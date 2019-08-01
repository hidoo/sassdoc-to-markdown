# Hoge

> Description of this Hoge

## Installation

```
$ npm install hoge
```

## API

## License

<a id="settings-variable-example-variable"></a>

### $example-variable

example `variable`

+ **Group:** Settings
+ **Access:** public

#### Type

**[Map](https://sass-lang.com/documentation/values/maps)**, **[List](https://sass-lang.com/documentation/values/lists)**

#### Properties

| Name   | Type                                                             | Description | Default     |
| :----- | :--------------------------------------------------------------- | :---------- | :---------- |
| `key1` | **[Number](https://sass-lang.com/documentation/values/numbers)** | key1        | `0`         |
| `key2` | **[Color](https://sass-lang.com/documentation/values/colors)**   | key2        | `#000`      |
| `key3` | **[String](https://sass-lang.com/documentation/values/strings)** | key3        | `"example"` |

#### Dependents

+ **@mixin example-mixin** example `mixin`

<a id="general-variable-example-variable-bool"></a>

### $example-variable-bool

example `variable` bool

+ **Group:** General
+ **Access:** public

#### Type

**[Boolean](https://sass-lang.com/documentation/values/booleans)**

<a id="general-variable-example-variable-private"></a>

### $example-variable-private

example private `variable` bool

+ **Group:** General
+ **Access:** private

#### Type

**[Boolean](https://sass-lang.com/documentation/values/booleans)**

#### Dependents

+ **@mixin example-mixin** example `mixin`

<a id="general-placeholder-example-placeholder"></a>

### %example-placeholder

example `placeholder`

+ **Group:** General
+ **Access:** public

#### Examples

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

#### Dependents

+ **@mixin example-mixin** example `mixin`

<a id="general-function-example-function-alias"></a>

### @function example-function-alias

> **DEPRECATED!**  
> example-function-alias is deprecated, instead use example-function

example `function` alias

+ **Group:** General
+ **Access:** public

#### Dependencies

+ **[@function example-function](#general-function-example-function)**

#### Alias

+ **example-function**

<a id="general-function-example-function"></a>

### @function example-function

example `function`

+ **Group:** General
+ **Access:** public

#### Parameters

| Name    | Type                                                             | Description | Default |
| :------ | :--------------------------------------------------------------- | :---------- | :------ |
| `$arg1` | **[Number](https://sass-lang.com/documentation/values/numbers)** | argument #1 | `0`     |
| `$arg1` | **[List](https://sass-lang.com/documentation/values/lists)**     | argument #2 | `()`    |

#### Returns

**[String](https://sass-lang.com/documentation/values/strings)** example text

#### Examples

scss inputs

```scss
@debug example-function(30px, ("a", "b", "c"));
```

outputs

```sh
example
```

#### Dependents

+ **@function example-function-alias** example `function` alias
+ **@mixin example-mixin** example `mixin`

#### Aliased by

+ **example-function-alias**

<a id="general-mixin-example-mixin"></a>

### @mixin example-mixin

**[TODO]** update options  
**[TODO]** update docs

example `mixin`

+ **Group:** General
+ **Access:** public

#### Parameters

| Name        | Type                                                                                                                     | Description                           | Default |
| :---------- | :----------------------------------------------------------------------------------------------------------------------- | :------------------------------------ | :------ |
| `$arg1`     | **[String](https://sass-lang.com/documentation/values/strings)**                                                         | argument #1 (one of "hoge" or "fuga") | `""`    |
| `$arg2`     | **[Map](https://sass-lang.com/documentation/values/maps)**, **[List](https://sass-lang.com/documentation/values/lists)** | argument #2                           | `()`    |
| `$arg2.key` | **[String](https://sass-lang.com/documentation/values/strings)**                                                         | key `option`                          | `""`    |

#### Contents

extra content

#### Throws

+ error description

#### Outputs

example content value

#### Examples

scss inputs

```scss
.selector {
  @include example-mixin($arg1: "hoge", $arg2: ()) {
    font-size: 16px;
  }
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

#### Dependencies

+ **[$example-variable](#settings-variable-example-variable)** require variable
+ **[$example-variable-private](#general-variable-example-variable-private)** require private variable
+ **[@function example-function](#general-function-example-function)** require function
+ **[%example-placeholder](#general-placeholder-example-placeholder)** require function

#### See

+ **[$example-variable](#settings-variable-example-variable)**
+ **[%example-placeholder](#general-placeholder-example-placeholder)**

#### Links

+ [example caption](https://example.com/)
+ <https://other.example.com/>

#### Since

+ **0.1.0** example description

#### Authors

+ example author
+ example other author

---
layout: post
title: "A Clojure Introduction to Binary and Bitwise Operators"
date: 2017-08-17 18:00:00 -0400
comments: true
categories: ["Clojure", "Binary", "Math"]
---
I've been working in Clojure and ClojureScript lately. A few months back, I came across [this one weird trick to master Clojure](http://realworldclojure.com/one-weird-trick/). *TL;DR*: it recommends reading the API docs, fully, top to bottom.

{% blockquote "One Weird Trick To Become a Clojure Expert" http://realworldclojure.com/one-weird-trick/ %}
I’m not even joking! Go to this URL http://clojure.github.io/clojure/clojure.core-api.html and start reading from top to bottom. If you did not read through that page, you may not know about amap. If you stopped reading before you get to ‘f’ you wouldn’t know about frequencies. However, if you read all the way through, you will be rewarded with knowledge about vary-meta.
{% endblockquote %}

In the process of doing this, I was struck by all the `bit-` functions -- of the ~600 vars and functions in `clojure.core`, there are 12 specifically for bitwise operations.

<h3>Binary Fundamentals</h3>

A quick overview on binary:

``` clojure
;; base-10 (decimal) to base-2 (binary). from right-to-left, binary columns are 1, 2, 4, 8, 16, ... (derived from 2^0, 2^1, 2^2, 2^3, 2^4, ...).
;;
;; base-10        base-2                              math spelled out
;;    0                0            0   =  (0 * 1)
;;    1                1            1   =  (1 * 1)
;;    2               10            2   =  (1 * 2) + (0 * 1)
;;    3               11            3   =  (1 * 2) + (1 * 1)
;;    4              100            4   =  (1 * 4) + (0 * 2) + (0 * 1)
;;    5              101            5   =  (1 * 4) + (0 * 2) + (1 * 1)
;;    6              110            6   =  (1 * 4) + (1 * 2) + (0 * 1)
;;    7              111            7   =  (1 * 4) + (1 * 2) + (1 * 1)
;;    8             1000            8   =  (1 * 8) + (0 * 4) + (0 * 2) + (0 * 1)
;;    9             1001            9   =  (1 * 8) + (0 * 4) + (0 * 2) + (1 * 1)
;;   10             1010            10  =  (1 * 8) + (0 * 4) + (1 * 2) + (0 * 1)
;;   11             1011            11  =  (1 * 8) + (0 * 4) + (1 * 2) + (1 * 1)
;;   12             1100            12  =  (1 * 8) + (1 * 4) + (0 * 2) + (0 * 1)
;;   13             1101            13  =  (1 * 8) + (1 * 4) + (0 * 2) + (1 * 1)
;;   14             1110            14  =  (1 * 8) + (1 * 4) + (1 * 2) + (0 * 1)
;;   15             1111            15  =  (1 * 8) + (1 * 4) + (1 * 2) + (1 * 1)
;;   16            10000            16  = (1 * 16) + (0 * 8) + (0 * 4) + (0 * 2) + (0 * 1)

;; test in a repl
;; use `2r` to convert binary integer to decimal
;; use `java.lang.Integer/toBinaryString` to convert decimal integer to binary
$ lein repl

;; compare 11 (base-2) to 3 (base-10)
user=> 2r11
3
user=> (Integer/toBinaryString 3)
"11"

;; compare 1101 (base-2) to 13 (base-10)
user=> 2r1101
13
user=> (Integer/toBinaryString 13)
"1101"

;; side note: 2r means binary, can't take values besides 0 or 1
user=> 2r2
NumberFormatException For input string: "2"  java.lang.NumberFormatException.forInputString (NumberFormatException.java:65)
```

Some things to note:

  - We can disregard leading zeros in binary, so binary `0010` and binary `10` both represent decimal `2`.
  - Each position is one bit ("bit" means "*b*inary dig*it*"). So `1111` is a 4-bit integer (so we can represent up to 15 different values). A 32-bit integer maxes at `11111111111111111111111111111111` (so we can represent up to 4,294,967,295 values). We'll see that we don't always use every position counting up from 0 (the left-most position will be used to determine positive/negative).
  - This blog post uses `2r....` and `Integer/toBinaryString` to convert between binary and decimal. Other functions and formatters are discussed [here](https://stackoverflow.com/questions/21448788/printing-the-binary-value-of-a-number-in-clojure).

<h3>Bitwise Operators</h3>

This brings us to the bitwise operators. There are 12 in `clojure.core` (all visible in [the source](https://github.com/clojure/clojure/blob/master/src/clj/clojure/core.clj)):

`bit-and` - Bitwise and

``` clojure
;; `bit-and` does a logical AND across columns
;; 1010     ; 10
;; 1001     ; 9
;; ----
;; 1000     ; 8   ; by column: 1 AND 1   =>   1
;;                             0 AND 0   =>   0
;;                             1 AND 0   =>   0
;;                             0 AND 1   =>   0

user=> (bit-and 10 9)
8
user=> (bit-and 2r1010 2r1001)
8
```

`bit-or` - Bitwise or

``` clojure
;; `bit-or` does a logical OR across columns
;; 1010     ; 10
;; 1001     ; 9
;; ----
;; 1011     ; 11  ; by column: 1 OR 1   =>   1
;;                             0 OR 0   =>   0
;;                             1 OR 0   =>   1
;;                             0 OR 1   =>   1

user=> (bit-or 10 9)
11
user=> (bit-or 2r1010 2r1001)
11
```

`bit-xor` - Bitwise exclusive or

``` clojure
;; `bit-xor` does an exclusive OR across columns (true when the two values are different)
;; 1010     ; 10
;; 1001     ; 9
;; ----
;; 0011     ; 11  ; by column: 1 XOR 1   =>   0
;;                             0 XOR 0   =>   0
;;                             1 XOR 0   =>   1
;;                             0 XOR 1   =>   1

user=> (bit-xor 10 9)
3
user=> (bit-xor 2r1010 2r1001)
3
```

`bit-not` - Bitwise complement

``` clojure
;; `bit-not` does a complement, negating each position so each 0 becomes 1 and each 1 becomes 0
;; this reads 1010 as the 32-bit integer     00000000000000000000000000001010 (including leading 0s),
;; which, when negated/complemented, becomes 11111111111111111111111111110101 (represents decimal -11).

user=> (bit-not 2r1010)
-11
```

`bit-and-not` - Bitwise and with complement

``` clojure
;; `bit-and-not` ANDs the first integer with the complement of the second
;; (bit-and-not 2r1010 2r1001)
;; (bit-and 2r1010 (bit-not 2r1001))
;; (bit-and 2r1010 2r0110)    =>    0010    => 2

user=> (bit-and-not 2r1010 2r1001)
2
user=> (bit-and 2r1010 (bit-not 2r1001))
2
```

`bit-clear` - Clear bit at index n

``` clojure
;; `bit-clear` sets the bit to 0 at a given index (0-based, right to left)

user=> (bit-clear 2r1011 0)   ;; clears the 0th bit from right
10  ;; 2r1010
user=> (bit-clear 2r1011 1)   ;; clears the 1st bit from right
9   ;; 2r1001
user=> (bit-clear 2r1011 2)   ;; clears the 2nd bit from right
11  ;; 2r1011
user=> (bit-clear 2r1011 3)   ;; clears the 3rd bit from right
3   ;; 2r0011
```

`bit-flip` - Flip bit at index n

``` clojure
;; `bit-flip` flips the bit (changes 0 to 1 or 1 to 0)at a given index

user=> (bit-flip 2r1010 0)   ;; flips the 0th bit from right
11  ;; 2r1011
user=> (bit-flip 2r1010 1)   ;; flips the 1st bit from right
8   ;; 2r1000
user=> (bit-flip 2r1010 2)   ;; flips the 2nd bit from right
14  ;; 2r1110
user=> (bit-flip 2r1010 3)   ;; flips the 3rd bit from right
2   ;; 2r0010
```

`bit-set` - Set bit at index n

``` clojure
;; `bit-set` sets the bit to 1 at a given index

user=> (bit-set 2r1010 2)   ;; sets the 1st bit from right to 1
14  ;; 2r1110
```

`bit-test` - Test bit at index n

``` clojure
user=> (bit-test 2r1010 0)   ;; checks if the 0th bit from right is 1
false
user=> (bit-test 2r1010 1)   ;; checks if the 1st bit from right is 1
true
```

`bit-shift-left` - Bitwise shift left

``` clojure
;; `bit-shift-left` shifts the entire integer left, filling in empty spaces as 0

user=> (bit-shift-left 2r1010 1) ;; shifts the integer left 1 position (filling empty position with 0)
20  ; 2r10100
user=> (bit-shift-left 2r1011 3) ;; shifts the integer left 3 positions (filling empty positions with 0)
88 ; 2r1011000
```

`bit-shift-right` - Bitwise shift right

``` clojure
;; `bit-shift-right` shifts the entire integer right, clearing positions < 0

user=> (bit-shift-right 2r1010 1) ;; shifts the integer right 1 position
5  ; 2r101
user=> (bit-shift-right 2r1011 3) ;; shifts the integer right 3 positions
1 ; 2r1
```

`unsigned-bit-shift-right` - Bitwise shift right, without sign-extension

``` clojure
;; `unsigned-bit-shift-right` does a `bit-shift-right` (so same behavior for small integers). its
;; difference is that all the other operations are for 32-bit signed integers, whereas this accepts
;; unsigned (no negative values, only positive) integers

user=> (unsigned-bit-shift-right 2r1010 1)
5
user=> (bit-shift-right 2r1010 1)
5
```

<h3>Negative Binary (Signed and Unsigned Integers)</h3>

<h5>Sign-Magnitude Notation</h5>

<div style="float:right; display:flex; flex-direction:column; margin-left: 30px;">
  <img src="/images/bits/positive-signed-int.gif" />
  <img src="/images/bits/negative-signed-int.gif" />
  <span style="font-size:0.75em;">Source: <a href="http://www.electronics-tutorials.ws/binary/signed-binary-numbers.html">"Signed Binary Numbers"</a></span>
</div>

Negative numbers can be represented using signed integers, where the left-most position represents whether the integer is positive or negative. In one implementation (sign-magnitude notation), the left-most bit is the sign, and the remaining bits are the value.

This means that in an `n`-bit integer (e.g., 4-bit), the left-most bit signifies positive/negative, so the remaining `n-1` (3) bits can hold the actual value. There are 16 possible values for a 4-bit integer (`0000` to `1111`), meaning that a signed 4-bit integer can go from -7 to +7 (it is 16 possible values because we can represent both `-0` and `+0`, as binary `1000` and `0000`).

<h5>Two's Complement</h5>

Two's Complement is a slightly more complicated scheme for signed integers (though not overly so), and the one more commonly used. A leading `1` still signifies a negative integer. The difference is that it's not simply sign (1st bit) and magnitude (remaining bits), because the magnitude is determined using the *complement* (hence the name).

Up until now, all the code samples have been *unsigned* integers, which is why all the values are positive (and all the examples with a leading 1 haven't been negative). Assuming 8-bit signed integers, we interpret things as follows:

``` clojure
00001010    ;;  10

;; to get -10, complement and add 1
11110101    ;; first complement
11110110    ;; then add 1

;; so 11110110 is the signed 8-bit representation of -10
```

<h5>Idiosyncracies between signed and unsigned integers</h5>

I alluded to this in the previous section: all the code samples have been *unsigned* integers. We've been exploring conversions between decimal and binary using Clojure's radix-based entry format (e.g., `2r1010`), [which uses Java Longs](https://clojure.org/reference/reader#_literals) and Java's `Integer/toBinaryString`, which returns strings.

``` clojure
user=> (type 2r1010)
java.lang.Long
user=> (type (Integer/toBinaryString 10))
java.lang.String
```

This means there appear to be inconsistencies when dealing with signed integers:

``` clojure
user=> (Integer/toBinaryString -1)
"11111111111111111111111111111111"
user=> 2r11111111111111111111111111111111
4294967295  ;; might expect -1
```

I say there *appear* to be inconsistencies, because this is the expected result of using Long. A full discussion gets into the intricacies of language design and primitives, as exemplified by threads like [this](https://groups.google.com/forum/#!topic/clojure/7-hARL5c1lI) and [this](https://groups.google.com/forum/#!topic/clojure/yMhQWVyRzBE%5B1-25%5D).

<h3>Resources</h5>

- [Non-Clojure overview of bitwise operations](http://upshots.org/actionscript/basics-of-binary-and-bitwise-operations)
- [Explanation of Signed Binary Integers](http://www.electronics-tutorials.ws/binary/signed-binary-numbers.html)
- [Summary of Two's Complement](https://www.cs.cornell.edu/~tomf/notes/cps104/twoscomp.html)
- [One person's thoughts on Clojure numbers](http://blog.mishkovskyi.net/posts/2015/Oct/29/clojure-numbers-despair) (be sure to read Alex Miller's comment at the end)
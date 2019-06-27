---
layout: post
title: "A (Scheme) calculator in Clojure"
date: 2019-06-27 11:30:00 +0100
comments: true
categories: ["Clojure", "Functional Programming", "SICP", "Recursion", "CS61A", "REPL", "Interpreter"]
---
I've been working through [Structure and Interpretation of Computer Programs (SICP)](https://mitpress.mit.edu/sites/default/files/sicp/index.html) and watching the [UC Berkeley CS61A lectures from Brian Harvey](https://archive.org/details/ucberkeley-webcast-PL3E89002AA9B9879E?sort=titleSorter). It's great content, so I can understand why he refers to SICP as "the best computer science book in the world".

The [most recent lecture](https://archive.org/details/ucberkeley_webcast_nzMPF59Ackg) presented a calculator implementation (for a calculator with four functions) in Scheme. This calculator is a simple REPL interpreter: it reads a user input, evaluates it, prints the output, and loops back again.

What follows is a summary of the lecture with my takeaways, including a description of the program (and why it's worth considering), the original Scheme program from the lecture, and my translation of it into Clojure.

<h3>Why look at this example?</h3>

There are two main reasons to look at this:

  1. It is an example of processing deep lists (lists of lists of lists)
  2. This is a step towards understanding an actual Scheme interpreter written in Scheme. Unlike an actual Scheme interpreter, this has no variables and no procedures as first-class things. It only has four procedures: `+`, `/`, `-`, and `*`. But it's Scheme-like in its notation (`(+ 6 7)`) and does composition of functions as Scheme does.

<h3>The 4-function calculator code</h3>

Original Scheme code:

``` scheme
(define (calc)
  (display "calc: ")
  (flush)
  (print (calc-eval (read)))
  (calc))

(define (calc-eval exp)
  (cond ((number? exp) exp)
        ((list? exp) (calc-apply (car exp) (map calc-eval (cdr exp))))
        (else (error "Calc: bad expression:" exp))))

(define (calc-apply fn args)
  (cond ((eq? fn '+) (accumulate + 0 args))
        ((eq? fn '-) (cond ((null? args) (error "Calc: no args to -"))
                           ((= (length args) 1) (- (car args)))
                           (else (- (car args) (accumulate + 0 (cdr args))))))
        ((eq? fn '*) (accumulate * 1 args))
        ((eq? fn '/) (cond ((null? args) (error "Calc: no args to /"))
                           ((= (length args) 1) (/ (car args)))
                           (else (/ (car args) (accumulate * 1 (cdr args))))))
        (else (error "Calc: bad operator:" fn))))
```

And my translation into Clojure:

``` clojure
(defn calc-apply [fn args]
  (cond
    (= fn '+) (reduce + 0 args)
    (= fn '-) (cond
                (nil? args) (throw (Exception. "Calc: no args to -"))
                (= (count args) 1) (- (first args))
                :else (- (first args) (reduce + 0 (rest args))))
    (= fn '*) (reduce * 1 args)
    (= fn '/) (cond
                (nil? args) (throw (Exception. "Calc: no args to /"))
                (= (count args) 1) (/ (first args))
                :else (/ (first args) (reduce + 0 (rest args))))
    :else (throw (Exception. (str "Calc: bad operator:" fn)))))

(defn calc-eval [exp]
  (cond
    (number? exp) exp
    (list? exp) (calc-apply (first exp)
                            (map calc-eval (rest exp)))
    :else (throw (Exception. (str "Calc: bad expression:" exp)))))

(defn calc []
  (println "calc: ")
  (println (calc-eval (read)))
  (calc))
```

<h3>Dealing with Deep Lists</h3>

The key to handling deep lists can be seen in `(map calc-eval (cdr exp))`. It is sort of a recursive call, but not a exactly a recursive call, because there's no open parenthesis in front of `calc-eval`. Instead, `calc-eval` is an argument to `map`; `map` will typically call `calc-eval` more than once (for each sub-expression). So it's not just a simple recursive call, but a multi-way recursive call, which is the secret of dealing with deep lists.

For deep lists, we make a recursive call for each element of the top level list, and then for each element of sub-lists, and so on all the way down. The base case is an empty list (or when the expression isn't a list).

<h3>Interpreters and Types of Expressions</h3>

There are three pieces to an interpreter (and this goes for any interpreter, not just Scheme or Clojure):

1. The read-eval-print loop (REPL). It's a loop because the last thing in it is a call to itself, so it runs forever. In the example, `read` turns things in parentheses into pairs. `calc-eval` takes an expression as its argument and returns (and prints) the value of that expression.
2. `(eval exp)` returns the value of the expression
3. `(apply function arglist)` returns the value returned by the function. This is where the example is different from a full interpreter: the actual Scheme interpreter handles first-class procedures, whereas this calculator example depends on the _name_ of the function (must be one of `+`, `/`, `-`, and `*`.

In Scheme, there are basically four types of expressions:

 - **Self-evaluating expressions** (primitives) like numbers or booleans -- these are used in the calculator
 - **Variables** -- these are **not** supported in the calculator
 - **Function calls** -- these are used in the calculator
 - **Special forms** -- these are **not** supported in the calculator. A full interpreter would include special forms, but this introduces a lot of complexity which is ignored in the calculator example.

In an interpreter, an evaluator's job is to take the stuff that is typed in and figure out what it means. This requires figuring out what the notation means. Scheme and Clojure (or any Lisp) make this easier, because a complete expression is one list; the language was designed in order to be able to evaluate its own programs. Compare this to Java, for example, where there are many different notations that are not uniform, so what you can put in one context is different than another context.

Lispians say "at the heart of every programming language there's a lisp interpreter trying to get out", because you have to evaluate expressions that are procedure calls. Syntax doesn't get in the way.

A few differences between a full interpreter and this example can be seen in the following:

 - **`calc-eval`**: we will not see a recursive call for `(car exp)` in `calc-eval`; `(car exp)` has to be one of the 4 math symbols, but in a real Scheme interpreter it could be a symbol that's the name of a procedure, or it could be a lambda or procedure call or any number of other things to provide the function (so it would need to be evaluated).
 - **`calc-apply`**: this function takes `fn` and `args` as its arguments, where `args` is always a list. This is not just a simplification, but an actual difference from a full interpreter: we don't have procedures as first-class values, so fn argument is a _symbol_, not the procedure itself. This means that the calculator cannot handle all procedures (like `sqrt`, etc.)

There are a number of properties of a programming language that determine what it is to be a program in that language. For example, Scheme has first-class procedures, applicative order, variables. All of these properties manifest themselves in the interpreter; we can look at the interpreter and ask "how would I change this interpreter if I wanted Scheme, but with normal order instead of applicative order?" In that case, don't call `(map calc-eval (cdr exp))`, but just use `(cdr exp)`. Then we'd be giving apply actual argument expressions rather than argument values.

<h3>Syntax and Semantics</h3>

_Syntax_ is the technical term for the form of a program, what the program looks like. The Scheme function syntax is `(procedure arg arg arg)`. _Semantics_ is what that thing means. For example, `(procedure arg arg arg)` means "call that procedure with these argument values after you've recursively evaluated the argument expressions". There are differences across languages, but we see more or less the same kinds of things in the semantics--conditionals, loops, call functions, define variables--while syntax can be very different across languages.

An important point about the calculator: we are actually dealing with two different programming languages. _The calculator is a program written in Scheme, but the language that the calculator implements is a programming language that isn't Scheme_. For example, there are no variables in this calculator programming language. When Scheme interpreters are written in Scheme, there are also two languages involved (and it's more difficult to see the differences than Scheme vs. calculator language).

Notice that `eval` lives in both the syntax and semantics worlds. When it takes an expression (syntax) and returns a value, it turns syntax into semantics by turning the form into something meaningful. Meanwhile `apply` doesn't know anything about syntax. It takes a procedure and argument values, so it's entirely about semantics.

<h3>An Aside on Functional Programming</h3>

The `read` and `print` functions are primitive procedures that are _not_ functional. `read` is not functional because, every time you call it with the same arguments, you get a different answer. `print` is not functional because it changes the state of the world. Functions just compute and return values. Even though Scheme is a functional programming language, the Scheme interpreter itself is not an entirely functional program. Most of it (`eval` and `apply`) is functional, since it just takes arguments and returns values.

<h3>Some Clojure/Scheme Observations</h3>

Clearly Scheme and Clojure are both Lisps. It's nice to see that the Clojure implementation is as consise as Scheme (it's four more lines, but that could be eliminated if we didn't put the four `cond`s on their own line). There are a few syntax differences (Clojure `reduce` instead of Scheme `accumulate`, `read-line` instead of `read`), but the semantics are identical.

One final syntax difference: In Scheme (and Common Lisp and most other Lisp dialects), `cons` is a primitive data structure made up of a pair. In Clojure, this is not the case. We can see the `cons` in the Scheme example when we use `car ` (to access the first element) and `cdr` (to access the rest). Clojure _does_ have a `cons` function, but it works differently:

``` clojure
(cons 1 2) ; IllegalArgumentException Don't know how to create ISeq from: java.lang.Long

(cons 1 '(2 3 4)) ; (1 2 3 4)

; this is not a list, but a Cons
(list? (cons 1 '(2 3 4))) ; false
(type (cons 1 '(2 3 4))) ; clojure.lang.Cons
```

This is really a subject for [further](https://stackoverflow.com/questions/34347985/clojure-no-cons-cells) [reading](https://stackoverflow.com/questions/5741111/help-explaining-how-cons-in-scheme-work), but suffice it to say that Clojure is a Lisp with some [differences from other Lisps](https://clojure.org/reference/lisps), including the fact that "`cons`, `first` and `rest` manipulate sequence abstractions, not concrete cons cells".
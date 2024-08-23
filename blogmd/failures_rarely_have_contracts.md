---
title: "System failures rarely have contracts"
author: "@maruth"
author-url: 'https://github.com/maruthgoyal'
date: "2024-08-19"
---

Premise
-------
It is often very useful to reason about systems by thinking in terms of invariants like "if the user provides a valid payment method, then after they click the pay button and their payment is processed, their payment method will have been charged the correct amount". Some people refer to this as  the "invariants" of the system, others refer to it as the "contract" of the subsystem. But what about when processing the payment  _fails_? What do we know about the system now? Surely, we can conclude the payment method will ***not*** have been charged the correct amount, ... right? I argue that you can conclude ***nothing*** , and trying to conclude **something** and trying to "recover" around it is a recipe for disaster. "Heresy!" you say, "what if the payment network explicitly declined the payment and promise not to charge the payment method anything?". Indeed then, suppose the failure is precisely a decline from the payment network you may conclude the payment method was not charged. I will distinguish such cases as **faults**, not *failures*. 

Faults and Failures
------
Faults are explicitly accounted and designed for when designing a system, encompassing the *fault domain* of a system. Failures are breakages outside the fault domain. For instance, suppose you made an HTTP request to the payment network's API, but the connection dies  before you get a response. Should you assume the payment went through? Or that it failed? Or maybe the server never got it? None of them, assume nothing! Any of those outcomes and everything in between _could_ have occurred.  When I say assume nothing, I mean literally consider yourself in a state where nothing is known about the system. The goal then is to then get back to a set of assumptions that correspond to a valid state within the system. You might do this by poking at various parts of the system state, collecting assumptions as you go. For instance, querying the payments API to see if a payment really did get received and go through. I want to stress the important distinction here! If the payments API sent a response back saying the payment declined or that you can retry the payment, designing around that fault is fine! But in the case where the network blipped you have a failure not a fault and you know nothing about system state so you must reconstruct it! 

A real-life example
-----------------
This distinction was key to addressing one of the harder things I have had to debug (perhaps a separate post!). In that case, the system treated a failure as a fault. In particular, the system treated stack overflows as recoverable errors. It would just catch the exception, fail the request, and keep processing new user requests. Except, in a language with a GC that runs in the same thread on the same stack as business logic that assumption is far from true. First: such a garbage collector's contract can roughly be thought of as "assuming a valid starting state, after running to completion, dead objects will be collected and no live objects will be collected". But this says nothing about GC not running to completion (in which case we may assume nothing)! Second: stack overflows are somewhat unique in that they can happen *literally* anywhere ... including *during* garbage collection!  Putting these two together, we can classify stack overflows as being a failure: you can assume nothing about the state of the system when one happens. Observe I do not claim that you can assume memory is corrupted -- it may very well be in a perfectly valid state, or it may not! (hence, you assume nothing!). The net impact here was the system would sometimes be operating in an environment with incorrect memory, which led to all sorts of fun stuff. 

Takeaway
----------
The key takeaway is it's important to distinguish failures from faults in your system. It is tempting to encounter failures during the operation of a system and put a band-aid to begin treating it like a fault. This will likely make the system even more brittle, resulting eventually in even more complicated failures.

How to think about designing systems from here
-----------------------------
From the above, clearly larger fault domains are better. In the limit, the fault domain is the complement of the set of successful outcomes. For system design, this motivates an approach where (a) subsystem states are isolated, and (b)one can efficiently and accurately determine whether the outcome of a subsystem was a successful outcome. In such a world, one may feasibly reset a subsystem in the absence of a successful outcome. This seems to be very related to Erlang's "Let it Crash!" philosophy and supervisor model, but I don't have enough experience with it to make an assertive claim. Note this does seem too dissimilar from (and is perhaps equivalent to) treating  all non-success outcomes as failures! 


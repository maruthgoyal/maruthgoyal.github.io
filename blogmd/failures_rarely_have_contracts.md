---
title: "System Failures Rarely Have Contracts"
author: "@maruth"
author-url: 'https://github.com/maruthgoyal'
date: "2024-08-19"
---

## Introduction

In system design, we often rely on invariants and contracts to reason about behavior. For example, we might state: "If a user provides a valid payment method and clicks the pay button, their payment method will be charged the correct amount after processing." These assumptions form the backbone of our system's logic. But what happens when things go wrong? In this post, we'll explore the crucial distinction between faults and failures, and why this difference matters for robust system design.

## The Illusion of Certainty in Failure

When a system operation fails, it's tempting to make assumptions about the resulting state. For instance, if a payment fails, surely we can conclude the payment method wasn't charged, right? Not so fast. I argue that in true failure scenarios, you can conclude *nothing* about the system's state. Attempting to "recover" based on unfounded assumptions is a recipe for disaster.

## Faults vs. Failures: A Critical Distinction

To understand why this matters, we need to differentiate between two types of issues:

1. **Faults**: These are anticipated problems within the system's design. For example, a payment network explicitly declining a transaction is a fault. We can design around these because they're part of the system's "fault domain."

2. **Failures**: These are unexpected breakages outside the fault domain. A network connection dying mid-request is a failure. In these cases, we enter a state of complete uncertainty.

### Example: The Perils of Assumptions

Consider an HTTP request to a payment API where the connection drops before receiving a response. Did the payment go through? Did it fail? Did the server even receive the request? The correct answer is: we don't know. Any outcome is possible, and assuming otherwise is dangerous.

## Reconstructing State After Failure

When facing a true failure, the safest approach is to:

1. Assume nothing about the system's state.
2. Systematically reconstruct a valid state by querying various parts of the system.
3. Collect verified assumptions as you go.

This process is more involved than simply catching an error, but it's crucial for maintaining system integrity.

## Real-World Consequences: A Cautionary Tale

I once encountered a system that treated stack overflows as recoverable errors (i.e., faults). It would catch the exception, fail the request, and continue processing new requests. This approach overlooked two critical factors:

1. The language's Garbage collector's contract (implicitly) assumed (a) valid starting states, and (b) completion.
2. Stack overflows can occur anywhere, even during garbage collection.[^1]

[^1]: Particularly in language runtimes where Garbage Collection runs on the
same stack as application logic (eg: CRuby)

The result? Sometimes the system operated with corrupted memory, leading to unpredictable and hard-to-debug issues.

## Designing More Robust Systems

To build more resilient systems:

1. **Expand Your Fault Domain**: The larger your fault domain, the fewer true "failures" you'll encounter.
2. **Isolate Subsystem States**: This makes it easier to reset and recover from failures.
3. **Efficient Outcome Verification**: Develop ways to quickly and accurately determine if a subsystem operation was successful.

This approach aligns with Erlang's "Let it Crash!" philosophy and supervisor model, emphasizing clean restarts over complex error handling.

## Conclusion

Distinguishing between faults and failures is crucial for system reliability. While it's tempting to treat all errors as recoverable faults, doing so can lead to brittle systems and more complicated failures down the line. By designing with a clear understanding of your system's fault domain and implementing robust state verification, you can create more resilient and maintainable systems.

Remember: In the face of true failure, assume nothing and verify everything.

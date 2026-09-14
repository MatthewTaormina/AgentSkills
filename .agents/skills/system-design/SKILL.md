---
name: system-design
description: >-
  Authoritative guide on system design, modular architecture, deep modules, and managing software
  complexity based on John Ousterhout's "A Philosophy of Software Design". Use when designing
  architectures, writing or refactoring modules, conducting code reviews, evaluating abstractions
  and interfaces, strategic programming, or eliminating dependencies, obscurity, classitis, and
  shallow wrappers.
---

# System Design & Strategic Programming

This skill provides an authoritative operational framework for system design, managing complexity, and strategic programming, based on John Ousterhout's *A Philosophy of Software Design* (Chapter 2 "The Nature of Software Complexity", Chapter 3 "Working Code Isn't Enough", and Chapter 4 "Modules Should Be Deep").

Agents must apply these principles whenever planning architectures, writing new modules, implementing features or bug fixes, refactoring legacy code, or conducting design and code reviews.

### Detailed References
* [Nature of Complexity](./references/nature_of_complexity.md) (*Chapter 2*)
* [Working Code Isn't Enough](./references/working_code_isnt_enough.md) (*Chapter 3*)
* [Modules Should Be Deep](./references/modules-should-be-deep.md) (*Chapter 4*)

---

## 1. Complexity Defined

### Core Definition
> **Complexity is anything related to the structure of a software system that makes it hard to understand and modify the system.**

* **Simple vs. Complicated**:
  * **Simple**: Easy to understand and modify; large improvements and features can be implemented with minimal effort.
  * **Complicated**: Hard to understand and modify; requires substantial effort to implement even small improvements or bug fixes.
* **Cost vs. Benefit**: Complexity directly inflates the development cost, cycle time, and regression risk of all future work.
* **Size $\neq$ Complexity**: A large, sophisticated system is **not** complex if its abstractions remain clean and easy to work on. Conversely, a small, unsophisticated system can be extremely complex if it is tangled and opaque.

### Mathematical Model of System Complexity
System complexity is cumulative and weighted by developer/agent exposure:

$$C = \sum_p c_p t_p$$

| Term | Meaning |
| :--- | :--- |
| $C$ | **Overall system complexity** perceived by developers |
| $c_p$ | **Complexity of part $p$** (inherent difficulty, dependencies, obscurity) |
| $t_p$ | **Fraction of time** developers spend working on or interacting with part $p$ |

> [!TIP]
> **The Isolation Principle**:
> If a complicated subsystem is rarely touched ($t_p \approx 0$), its contribution to overall system complexity is minimal.
> **Isolating unavoidable complexity behind a clean, deep interface where it will rarely be seen or modified is almost as good as eliminating it entirely.**

### Reader-Centricity: Readers vs. Writers
* **Complexity is in the eye of the reader**, not the author.
* If a writer thinks code is "clever" or "simple", but other developers or agents find it difficult to understand or modify, **it is complex**.
* **Primary Agent Goal**: Write code that others can work with easily and safely—not code designed to prove writer cleverness or minimize author keystrokes.

---

## 2. The Three Primary Symptoms of Complexity

Complexity manifests in three distinct symptoms that hinder development:

```
                  +------------------------------------------------------+
                  |                SYMPTOMS OF COMPLEXITY                |
                  +------------------------------------------------------+
                                             |
         +-----------------------------------+----------------------------------+
         |                                   |                                  |
         v                                   v                                  v
+-----------------------+        +-----------------------+        +-----------------------+
|  Change Amplification |        |     Cognitive Load    |        |    Unknown Unknowns   |
|-----------------------|        |-----------------------|        |-----------------------|
| 1 conceptual change   |        | Excessive rules,      |        | Unclear what code to  |
| forces edits across   |        | context, and state to |        | change or what rules  |
| many scattered files. |        | hold in working memory|        | apply. (THE WORST)    |
+-----------------------+        +-----------------------+        +-----------------------+
```

### 1. Change Amplification
* **Definition**: A seemingly simple conceptual change requires modifications in many different places across the codebase.
* **Example / Pitfall**: Hardcoding UI values, status codes, or protocol fields across multiple handlers instead of centralizing them in a single authoritative source or abstraction.
* **Remediation**: Re-examine module boundaries. Co-locate related invariants or define a single shared abstraction so that one conceptual change requires modifying exactly one place.

### 2. Cognitive Load
* **Definition**: The amount of context, hidden rules, and background information a developer must actively hold in their mental working memory to complete a task safely.
* **Example / Pitfall**: An API function that allocates resources and implicitly expects the caller to free them, or functions that require parameters to be passed in a specific undocumented order.
* **The Lines of Code (LoC) Fallacy**:
  > [!WARNING]
  > **Fewer lines do NOT automatically mean less complexity.**
  > Dense one-liners, clever ternary chains, and extreme code golf inflate cognitive load. An implementation that takes more lines of code is often simpler if it reduces cognitive load, makes control flow explicit, and communicates intent clearly.

### 3. Unknown Unknowns (The Worst Symptom)
* **Definition**: It is not obvious which pieces of code must be modified, or what information is required to carry out a task safely.
* **Why it is the deadliest**: With change amplification, you know you have to make many edits. With cognitive load, you know you have to study the problem. With unknown unknowns, **you don't know what you don't know**—leading directly to regressions and production bugs.
* **Example / Pitfall**: Modifying a status enum value without realizing there is a decoupled string mapping table in another file that must also be kept in sync.
* **Remediation**: Eliminate implicit conventions. Replace decoupled mappings with compiler-enforced types, exhaustive pattern matches, or self-contained data structures.

### The Ultimate Goal: The "Obvious" System
The exact opposite of high cognitive load and unknown unknowns is an **obvious system**.

> **In an obvious system, a developer or agent can make a quick, confident guess about how to implement a change without deep deliberation—and that guess will be correct.**

---

## 3. Causes of Complexity & How They Map to Symptoms

All structural complexity stems from two fundamental root causes:

```
+--------------------------------------------------------------------------+
|                               ROOT CAUSES                                |
+-----------------------------------+--------------------------------------+
|            Dependencies           |               Obscurity              |
+-----------------------------------+--------------------------------------+
| A given piece of code cannot be   | Important information is not         |
| understood or modified in         | explicit, apparent, or obvious       |
| isolation.                        | to a reader inspecting the code.     |
+-----------------------------------+--------------------------------------+
                  |                                     |
                  v                                     v
+-----------------------------------+--------------------------------------+
|       Resulting Symptoms:         |         Resulting Symptoms:          |
|  * Change Amplification           |  * Unknown Unknowns (Primary driver) |
|  * Cognitive Load                 |  * Cognitive Load                    |
+-----------------------------------+--------------------------------------+
```

### Cause 1: Dependencies
* **Nature**: Dependencies are fundamental to software (APIs, function signatures, data schemas inherently create dependencies) and cannot be eliminated completely.
* **Design Objectives**:
  1. **Minimize the total number of dependencies**.
  2. **Make remaining dependencies as simple, obvious, and compiler-verified as possible** (e.g., strong types, interfaces, and automated contract tests rather than informal developer agreements).

### Cause 2: Obscurity
* **Nature**: Occurs when critical information is hidden, omitted, or ambiguous.
* **Common Forms**:
  * Generic or vague variable/function names (e.g., `time` without indicating seconds or milliseconds; `data`, `process()`, `handle()`).
  * Inconsistent usage (using the same variable name or concept for two different purposes).
  * Hidden or undocumented side effects and dependencies.
* **Design vs. Documentation Red Flag**:
  > [!IMPORTANT]
  > While inadequate documentation causes obscurity, **obscurity is fundamentally a design flaw**.
  > If a system requires extensive documentation just to be understood, it is a warning sign that the underlying design is too complicated and needs simplification. Documentation cannot fix bad design.

---

## 4. The Incremental Nature of Complexity

### Accumulation Over Catastrophe
Complexity is almost never caused by a single catastrophic architectural mistake. Instead, it accumulates in **hundreds or thousands of tiny increments** over time.

### The Psychological Trap ("Just This Once")
* A developer or agent introduces a small dependency or a slightly obscure shortcut, reasoning that "just this once won't hurt."
* When every patch, feature, or refactor adopts this mindset, complexity compounds exponentially.
* **The Remediation Dilemma**: Because complexity accumulates in tiny increments, fixing a single dependency or obscurity does not produce an immediate, dramatic improvement on its own. Once a system is thoroughly complex, reversing it requires immense effort.

### The Countermeasure: Zero-Tolerance Policy
Engineers and AI agents must adopt a strict **zero-tolerance philosophy** toward introducing unnecessary complexity:
* Treat even minor additions of obscurity or unneeded dependencies as unacceptable.
* Continuously apply the **Boy Scout Rule**: Leave every module simpler, clearer, and more obvious than you found it.

---

## 5. Architectural Summary & Causal Chain

```
        ROOT CAUSES                      SYMPTOMS                         IMPACT
  +--------------------+          +----------------------+          +-------------------+
  |    Dependencies    | -------> | Change Amplification | -------> | High Modification |
  +--------------------+    \     +----------------------+          | Cost & High Risk  |
                             \    |    Cognitive Load    |          +-------------------+
  +--------------------+     /--> +----------------------+                    ^
  |     Obscurity      | ---/     |   Unknown Unknowns   | -------------------+
  +--------------------+          +----------------------+
```

* **Core Takeaway**: Complexity is the accumulation of dependencies and obscurity.
* **Impact**: Inflates lines changed per feature, demands excessive context acquisition, and makes code modification risky and error-prone.
* **Ultimate Objective**: Minimize dependencies and eliminate obscurity so systems remain obvious, resilient, and effortless to modify.

---

---

## 6. Working Code Isn't Enough: Strategic vs. Tactical Programming

Based on Chapter 3 of *A Philosophy of Software Design*, this section establishes the operational philosophy that distinguishes high-leverage software engineering from short-sighted code generation.

### The Core Paradigm
> **"Working code isn't enough."**
> Your primary objective as an engineer or AI agent is not merely to write code that runs, but to create a great design that also happens to work.

Most code in production systems involves modifying or extending existing components. Therefore, the highest-leverage responsibility is to facilitate future modifications and protect system structure.

### Tactical vs. Strategic Programming Matrix

| Dimension | Tactical Programming | Strategic Programming |
| :--- | :--- | :--- |
| **Primary Mindset** | Short-sighted; finish the immediate task as fast as possible. | Investment mindset; optimize for the long-term structure of the system. |
| **Goal** | "Get something working" (a quick feature or patch). | Produce clean designs, prevent complexity, and make future changes easy. |
| **View on Complexity** | Tolerates small kludges, shortcuts, or hacks if they save time today. | Actively avoids unnecessary complexity; redesigns or refactors when flaws appear. |
| **Short-Term Impact** | Initial tasks are completed 10–20% faster. | Initial tasks take 10–20% longer. |
| **Long-Term Impact** | System becomes progressively harder to modify; speed drops 10–20%+. | Payback occurs in 6–18 months; development accelerates by 10–20%+. |
| **Net Cost** | Borrowed time compounds into perpetual technical debt. | Investments quickly become free (self-funding from accumulated efficiency). |

### Dangerous Antipatterns

#### 1. The "Tactical Tornado"
* **Definition**: A developer or agent that rapidly pumps out code in a purely tactical fashion.
* **The Organizational Illusion**: Management often perceives the tactical tornado as a high-performing hero because they close tickets and ship PRs rapidly.
* **The Hidden Reality**: They leave a wake of destruction. Other engineers must spend months cleaning up the messes left behind, causing the rest of the team to appear slower despite doing the actual heavy lifting. Never be a tactical tornado.

#### 2. Technical Debt vs. Financial Debt
* Tactical programming borrows time from the future.
* **Crucial Difference**: Unlike financial debt (which can be scheduled and fully paid off), **most technical debt is never fully repaid**. Teams end up paying perpetual interest through friction, regressions, cognitive load, and degraded velocity on every subsequent task.

### The Investment Framework & The 10–20% Rule
Strategic programming is **not** up-front "Waterfall" architecture (exhaustive up-front design fails because optimal abstractions emerge incrementally from system usage). Instead, make continual, disciplined micro-investments:

* **The 10–20% Rule**: Dedicate roughly **10% to 20% of total development time** to continuous design investments.
* **Investment Taxonomy**:
  * **Proactive (Before / During Writing)**:
    * Brainstorm 2–3 alternative designs for a class/module before selecting the cleanest one.
    * Design deep interfaces (simple interface, powerful implementation).
    * Write clear, robust types and interface specifications.
  * **Reactive (After Discovery)**:
    * Continually refactor rather than patching around existing design flaws.
    * Correct architectural mistakes as soon as they become apparent.
    * Apply the **Boy Scout Rule**: Leave modified code cleaner and simpler than you found it.

### Payoff Trajectory & The 6–18 Month Crossover Point

```text
Total
Progress
   ^
   |                                          / Strategic (sustainable, compound velocity)
   |                                    . - '
   |                            . - ' /
   |                    . - '       /
   |             . - '   Crossover /
   |       . - '           Point  /
   | . - '                   *   /
   |--------------------------x----------------- - - - Tactical (dragged down by complexity)
   |                    /
   |                 /
   |              /
   |           /
   +----------------------------------------------------> Time
```

* **Early Phase**: The tactical curve starts steeper because zero time is spent on clean design or documentation.
* **Crossover Point (~6 to 18 Months)**:
  * Driven by **human memory decay**: After a few months, engineers forget implicit assumptions and internal mental models. If code is messy and obscure, velocity plummets. If design is clean and obvious, re-entry and modification remain fast.
* **Long-Term Phase**: Past the crossover point, the tactical curve flattens due to cumulative complexity drag. Strategic investments become completely self-funding ("free").

---

## 7. Instructions for Following Strategic Programming

Whenever implementing a feature, bug fix, or refactoring in this codebase, follow these mandatory instructions:

### Step 1: Resist the Immediate Implementation Impulse
* **Do NOT start typing code immediately.**
* First identify the abstractions involved and assess whether the existing design cleanly accommodates the change.
* Ask: *"If I design this cleanly today, will the next engineer be able to extend it in 15 minutes, or will they need to read 5 files to understand what I did?"*

### Step 2: Compare Alternatives (The Rule of 2–3)
* Evaluate at least **2 to 3 alternative designs** for any new class, function, or interface before settling on an approach.
* Avoid adopting the first idea that comes to mind; first ideas are almost always tactical.
* Contrast the approaches: Which design minimizes dependencies? Which eliminates obscurity? Which keeps interfaces deep?

### Step 3: Implement with Proactive Investment (Budget 10–20%)
* Allocate 10–20% of the task time to design polish:
  * Make parameter lists minimal and intuitive.
  * Hide internal state completely.
  * Use precise, self-documenting naming (e.g., `timeout_ms` instead of `time` or `t`).
  * Add compiler-checked types, exhaustive checks, and invariants.

### Step 4: Refactor Flaws Immediately (No Tactical Band-Aids)
* If you discover that the existing architecture makes your change awkward, **do not add a conditional hack (`if (specialCase) ...`)**.
* Spend the extra 15–30 minutes to refactor the underlying abstraction so the change fits naturally.
* Never leave a known design flaw in place just because "it wasn't part of the original ticket."

### Step 5: Enforce the Boy Scout Rule
* Every file you touch should be left cleaner, more readable, and better typed than when you opened it.
* Remove dead code, clarify misleading variable names, and simplify convoluted logic within the immediate scope of your change.

---

## 8. Modules Should Be Deep

Based on Chapter 4 of *A Philosophy of Software Design*. Structure systems so a developer or agent only faces a small fraction of overall complexity at any time. Modules must interact, so the goal of modular design is to **minimize dependencies between modules**. If modules were fully independent, system complexity would equal the complexity of the single worst module.

### Core Terminology

| Term | Definition |
| :--- | :--- |
| **Module** | Any unit of code that pairs an **interface** with an **implementation** (functions, classes, subsystems, or network services). |
| **Interface** | Everything a developer working in *another* module must know to use this module. Describes **what** it does, not **how**. |
| **Implementation** | The code that fulfills the interface's promises. |
| **Dependency** | A link such that a change in one module requires a change in another (signatures, call-order prerequisites). |
| **Abstraction** | A simplified view that **omits unimportant details**. |
| **False abstraction** | Omits details that are actually important, causing obscurity and bad assumptions. |
| **Deep module** | Powerful functionality through a small, simple interface (high benefit-to-cost). |
| **Shallow module** | Interface relatively complex compared to modest functionality (low benefit-to-cost). |
| **Effective complexity** | Cognitive burden of an interface equals only its **commonly used features**, if advanced features stay unobtrusive. |
| **Classitis** | Dogma that "classes are good, so more/smaller classes are always better," producing an explosion of shallow abstractions and boilerplate. |

### Anatomy of an Interface

An interface is **all** information a caller must know to use the module correctly:

```
┌────────────────────────────────────────────────────────┐
│                   MODULE INTERFACE                     │
├───────────────────────────┬────────────────────────────┤
│      FORMAL ELEMENTS      │     INFORMAL ELEMENTS      │
│   (Enforced by Language)  │       (Documentation)      │
├───────────────────────────┼────────────────────────────┤
│ • Method signatures       │ • High-level behavior      │
│ • Parameter names & types │   (e.g., "deletes a file") │
│ • Return value types      │ • Usage constraints        │
│ • Thrown exceptions       │   (e.g., call ordering)    │
│ • Public variables        │ • Side effects             │
└───────────────────────────┴────────────────────────────┘
```

* **Formal**: declared in code and checked by the language.
* **Informal**: behavioral guarantees, ordering constraints, and side effects (usually larger and more complex than the formal part).
* A clearly specified interface eliminates **unknown unknowns** by making caller requirements explicit.

### Abstraction Failure Modes

```
                       ABSTRACTION ACCURACY
                     ┌───────────────────────┐
                     │ Well-Designed Module  │
                     │ (Omits only what is   │
                     │     unimportant)      │
                     └──────────┬────────────┘
           ┌────────────────────┴────────────────────┐
           ▼                                         ▼
┌───────────────────────────┐             ┌───────────────────────────┐
│   Error 1: Over-Detail    │             │  Error 2: Under-Detail    │
│  (Includes Unimportant)   │             │   (Omits Important)       │
├───────────────────────────┤             ├───────────────────────────┤
│ • Increases cognitive load│             │ • Leads to Obscurity      │
│ • Clutters interface      │             │ • "False Abstraction"     │
│ • Exposes internals       │             │ • Callers make bad        │
│                           │             │   assumptions & errors    │
└───────────────────────────┘             └───────────────────────────┘
```

* **Hide**: disk block allocation, physical layout, magnetron internals, transmission internals.
* **Expose when important**: e.g. `fsync` cache-flush semantics for databases that must survive crashes.

### Cost/Benefit Model

Ousterhout visualizes modules as rectangles: **interface width = cost** (cognitive burden on callers); **implementation area = benefit** (functionality and hidden complexity).

> Interfaces are good, but more, or larger, interfaces are not necessarily better.

```
        DEEP MODULE                        SHALLOW MODULE
  (Best: high benefit, low cost)    (Poor: low benefit, high cost)

       Interface (Cost)                   Interface (Cost)
         [==========]               [==========================]
        │          │               │                          │
        │ Function-│               └──────────────────────────┘
        │   ality  │                   Functionality (Benefit)
        │ (Benefit)│
        └──────────┘
```

**Canonical deep examples**
* **Unix file I/O**: five core calls (`open`, `read`, `write`, `lseek`, `close`) hide hundreds of thousands of lines (layouts, permissions, scheduling, caching, hardware). Sequential access is default; random access is opt-in via `lseek`. The calls stayed stable while implementations changed for decades.
* **Garbage collection**: the ultimate deep module — **no public interface**; it removes `free()`/`delete` from the system interface.

**Shallow red flag**: interface complicated relative to the functionality provided. Small modules tend to be shallow. Example of a worthless wrapper:

```java
private void addNullValueForAttribute(String attribute) {
    data.put(attribute, null);
}
```

Zero abstraction (exposes the map), net complexity increase (extra name to memorize), and more documentation than implementation.

### Classitis

Do not fragment classes/methods solely because they exceed an arbitrary line count (e.g. 10). Isolated tiny classes look simple, but system complexity explodes: more names, constructors, cross-dependencies, and glue. Implementation complexity is replaced with **interface complexity**.

### Design Principle: Make the Common Case Simple

Interfaces should make the common case as simple as possible. Punishing the common case (e.g. Java I/O requiring `FileInputStream` + `BufferedInputStream` + `ObjectInputStream`) is a design failure: buffering is almost always required, so making it optional and manual causes silent performance bugs and discarded intermediate objects.

* Provide the best common behavior **by default** (Unix: sequential access, automatic buffering).
* Isolate edge cases behind unobtrusive constructors or config.
* **Effective complexity** of an interface is only the complexity of everyday features, if advanced features stay out of the way.

**Chapter 4 takeaway**: a deep module has a **narrow, simple interface** hiding a **broad, powerful implementation**. Maximize concealed internal complexity; minimize what the rest of the system must know.

---

## 9. Practical Review Checklist & Complexity Heuristics

Before merging any pull request or finishing a task, verify against this combined checklist:

| Checkpoint | Strategic & Complexity Test | Action if Violated |
| :--- | :--- | :--- |
| **Beyond "It Works"** | Does this change integrate cleanly into the existing design, or is it a bolted-on patch? | Redesign the integration point so the feature feels native. |
| **Alternative Designs** | Did you evaluate at least 2 alternative designs before writing code? | Document and evaluate an alternative before committing. |
| **No Quick-Fix Band-Aids** | Did you add conditional flags or special-case hacks around a design flaw? | Refactor the underlying abstraction instead of patching around it. |
| **Change Locality** | Does adding a single feature require touching >2 disjoint modules? | Centralize invariants or introduce a unified abstraction. |
| **Cognitive Load** | Does this code require keeping track of hidden state or implicit call order? | Encapsulate state; enforce order via builder or types. |
| **Explicit vs. Terse** | Did I write a clever one-liner that saves LoC at the expense of readability? | Expand into clear, explicit statements with descriptive names. |
| **Unknown Unknowns** | If someone changes this type or enum, will other parts silently break at runtime? | Use compiler-enforced types, exhaustive switches, or co-located maps. |
| **Naming Precision** | Do variable names convey unit, scope, and purpose (e.g., `timeout_ms` vs `timeout`)? | Rename to eliminate any ambiguity. |
| **Documentation Test** | Am I writing extensive comments explaining *how* the code works because the design is awkward? | Redesign the interface to make behavior intuitive. |
| **Isolation ($t_p$)** | If this logic is inherently intricate, is it completely hidden behind a deep, simple API? | Seal the complex logic inside a dedicated subsystem so callers never see it. |
| **Team Velocity** | Are you optimizing for how fast you finish today, or how easy it will be for the next engineer to modify it? | Prioritize long-term team modification ease over personal sprint speed. |
| **10–20% Hygiene** | Did this work budget 10–20% of effort for interface refinement, types, and small refactors? | Perform the hygiene refactor before closing the task. |
| **Deep vs Shallow** | Is the new unit a thin pass-through whose interface is as complex as its implementation? | Inline it, or hide real complexity behind a smaller interface. |
| **Common Case Simple** | Does ordinary use require chaining wrappers, extra flags, or remembering optional steps? | Make the common path the default; isolate edge cases. |
| **Classitis** | Did you split a class/method only to keep line counts small, adding names and glue? | Merge into a deeper module with one simple interface. |
| **False Abstraction** | Does the interface omit important constraints (ordering, durability, side effects)? | Expose the important details; hide only the unimportant. |

# Reference Sheet: Working Code Isn't Enough (Tactical vs. Strategic Programming)
*Based on Chapter 3 of "A Philosophy of Software Design" by John Ousterhout*

---

## 1. Core Thesis

> **"Working code isn't enough."**

* Your primary objective as a software developer or AI coding agent is **not merely to produce code that runs**, but to **create a great design that also happens to work**.
* **The Reality of Production Software**: Most code in any production system is written by modifying or extending existing codebases. 
* **The Highest-Leverage Responsibility**: Facilitate future extensions and modifications, rather than optimizing purely for today's ticket or immediate task completion.

---

## 2. Tactical vs. Strategic Programming

| Dimension | Tactical Programming | Strategic Programming |
| :--- | :--- | :--- |
| **Primary Mindset** | Short-sighted; finish the immediate task as fast as possible. | Investment mindset; optimize for the long-term structure of the system. |
| **Goal** | "Get something working" (a quick feature or patch). | Produce clean designs, prevent complexity, and make future changes easy. |
| **View on Complexity** | Tolerates small kludges, shortcuts, or hacks if they save time today. | Actively avoids unnecessary complexity; redesigns or refactors when flaws appear. |
| **Short-Term Impact** | Initial tasks are completed 10–20% faster. | Initial tasks take 10–20% longer. |
| **Long-Term Impact** | System becomes progressively harder to modify; speed drops 10–20%+. | Payback occurs in 6–18 months; development accelerates by 10–20%+. |
| **Net Cost** | Borrowed time compounds into perpetual technical debt. | Investments quickly become free (self-funding from accumulated efficiency). |

---

## 3. Key Dynamics & Antipatterns

### The Incremental Nature of Complexity
* Systems rarely become unmaintainable due to a single catastrophic architectural failure.
* Complexity accumulates through dozens or hundreds of small, individually "reasonable" compromises and shortcuts.
* **The Slippery Slope**: Each patch or shortcut justifies the next. Once a codebase degrades, engineers feel that cleaning up one or two issues won't make a difference, reinforcing the tactical cycle.

### The "Tactical Tornado"
* **Definition**: A prolific developer who rapidly pumps out code in a purely tactical fashion.
* **Organizational Illusion**: Management and peers often perceive the tactical tornado as a high-performing hero because they close tickets and launch features at blistering speed.
* **The Hidden Reality**: They leave a wake of destruction. Other engineers must spend months untangling bugs and cleaning up messes left behind, causing the rest of the team to appear slower despite doing the actual heavy lifting.

### Technical Debt vs. Financial Debt
* Tactical programming borrows time from the future.
* **The Crucial Difference**: Unlike financial debt (which has a clear principal that can be scheduled and paid off in full), **most technical debt is never fully repaid**.
* Teams end up paying perpetual interest in the form of friction, unexpected bugs, heightened cognitive load, and degraded velocity on every subsequent task.

---

## 4. The Investment Framework

> Strategic programming does **not** mean attempting a "Waterfall" design (designing the entire architecture up-front rarely works, as ideal designs emerge incrementally from system experience). Instead, make continual, small investments.

### The 10–20% Rule
* Dedicate roughly **10% to 20% of total development time** to continuous design investments.
* This allocation is small enough to avoid derailing project deadlines or sprint commitments, yet substantial enough to yield massive compounding returns over time.

### Investment Taxonomy
```
Strategic Investments
├── Proactive (Before / During Writing)
│   ├── Brainstorming 2–3 alternative designs for a class/module before picking the cleanest one.
│   ├── Designing interfaces to be general, intuitive, and deep.
│   └── Writing clear, robust documentation and interface specifications.
└── Reactive (After Discovery)
    ├── Continually refactoring rather than patching around existing design flaws.
    ├── Correcting architectural mistakes as soon as they become apparent.
    └── Leaving modified code cleaner than you found it (The Boy Scout Rule).
```

---

## 5. Payoff Trajectory & Crossover Point

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

* **Early Phase**: The tactical curve starts steeper because zero time is spent on clean design, abstraction refinement, or documentation.
* **Crossover Point (~6 to 18 Months)**:
  * The estimated timeframe for strategic programming to pay for itself completely.
  * **Driven by Human Memory Decay**: After a few months, engineers forget the implicit assumptions, edge cases, and internal mental models behind the code. If the code is complex or messy, re-entry velocity plummets; if the design is clean and obvious, re-entry and modification remain fast.
* **Long-Term Phase**: Past the crossover point, the tactical curve flattens drastically due to cumulative complexity drag and unknown unknowns. Strategic investments become completely self-funding ("free").

---

## 6. Practical Team Checklist

Before merging code or marking a task complete, verify:

- [ ] **Reject the "It works, ship it" standard**: Does the new feature or fix cleanly integrate into the existing abstraction hierarchy, or is it just bolted on?
- [ ] **Compare alternatives**: Did you evaluate at least 2–3 alternative designs before implementing the first idea that came to mind?
- [ ] **Avoid quick-fix band-aids**: If you encounter a design flaw during implementation, did you spend the extra 15–30 minutes to fix the underlying structure instead of adding an `if`/conditional hack?
- [ ] **Respect team velocity over solo velocity**: Are you optimizing for how fast you personally finish today's task, or how easy it will be for the next engineer or agent to safely modify it?
- [ ] **Budget 10–20% for hygiene**: Do sprint estimates, feature branches, and PRs proactively account for interface refinement, robust types/docs, and opportunistic refactoring?

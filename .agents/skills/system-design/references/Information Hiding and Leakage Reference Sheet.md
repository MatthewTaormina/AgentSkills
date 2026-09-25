# Chapter 5: Information Hiding (and Leakage) Reference Sheet

This document summarizes key concepts from Chapter 5, detailing techniques for creating "deep" modules through effective information hiding and avoiding the pitfalls of information leakage.

## 5.1 Information Hiding

*   **Definition:** One of the most important techniques for achieving deep modules. Each module should encapsulate specific knowledge (design decisions) within its implementation, keeping it hidden from its interface and other modules.
*   **What is hidden:** Usually details about how to implement a mechanism (e.g., data structures, algorithms, lower-level details, or abstract assumptions).
    *   *Examples:* Storing/accessing info in a B-tree, implementing TCP protocol, scheduling threads.
*   **Benefits:** Reduces complexity in two ways:
    1.  **Simplifies the Interface:** The interface reflects a simpler, more abstract view, reducing cognitive load for developers using the module.
    2.  **Eases System Evolution:** Changes related to hidden information only affect the module containing it, preventing cascading dependencies.
*   **Private vs. Hidden:** Declaring variables/methods `private` is not the same as information hiding if that information is still exposed via public getters/setters.
*   **Partial Information Hiding:** Has value when a feature is only needed by a few users and is accessed via separate methods, keeping it invisible in common use cases.

## 5.2 Information Leakage

*   **Definition:** The opposite of information hiding. Occurs when a design decision is reflected in multiple modules, creating a dependency between them.
*   **Characteristics:**
    *   If information is in the interface, it has leaked (simpler interfaces correlate with better hiding).
    *   **Back-door Leakage:** Occurs when classes depend on shared knowledge (e.g., a specific file format) even if not exposed in the interface. This is more pernicious because it's not obvious.
*   **Red Flag:** Information Leakage is a major red flag in software design.
*   **Mitigation:**
    *   Merge closely tied, relatively small classes.
    *   Extract the shared information into a new, encapsulated class (only effective if the new interface is simple and abstracts details).

## 5.3 Temporal Decomposition

*   **Definition:** A common cause of information leakage where system structure mirrors the time order of operations (e.g., Class A reads, Class B modifies, Class C writes).
*   **The Problem:** Operations occurring at different times often share the same knowledge (e.g., file format), resulting in that knowledge being encoded in multiple places.
*   **Red Flag:** Temporal Decomposition is a specific type of information leakage to watch out for.
*   **The Solution:** Focus on the *knowledge* needed for tasks, not the *order* in which they occur. Combine core mechanisms (e.g., reading and writing) into a single class.

## 5.4 - 5.6 Example: HTTP Server (Information Hiding in Practice)

*   **The Mistake (Shallow Classes):** Dividing code into many shallow classes based on temporal decomposition (e.g., one class to read a request, another to parse it). This causes leakage because both need to understand the message structure.
*   **The Solution (Slightly Larger Classes):** Merging reading and parsing into a single class isolates knowledge of the request format and simplifies the caller's interface.
*   **Key Principle:** Information hiding can often be improved by making a class slightly larger to bring together all code related to a particular capability and raise the level of the interface.
*   **Exposing Internal Representations:** Returning internal data structures (like a raw `Map` of parameters) is a shallow interface that exposes internal representation. Any change to the implementation requires changes to callers.
*   **Better Interface:** Provide methods that return specific values (e.g., `getParameter(String name)`) or perform common conversions (`getIntParameter(String name)`), hiding the internal storage mechanism and reducing work for callers. getParams() { return this.params; }') against the deep alternatives ('public String getParameter(String name)', 'public int getIntParameter(String name)'). Concrete code snippets make the anti-pattern immediately recognizable." type="suggestion">

## 5.7 Example: Defaults in HTTP Responses

*   **The Principle:** Interfaces should make the common case as simple as possible. Classes should "do the right thing" without being explicitly asked.
*   **Defaults as Partial Hiding:** In normal cases, callers don't need to know about a defaulted item. Only when overriding a default do they need special methods.
*   **Example:** An HTTP library should automatically provide the HTTP protocol version and Date header, rather than forcing the caller to specify them.

## 5.8 Information Hiding Within a Class

*   Information hiding applies internally as well.
*   Design private methods so each encapsulates specific information/capability.
*   Minimize the number of places each instance variable is used to eliminate internal dependencies and reduce complexity.

## 5.9 Taking It Too Far

*   **Red Flag (Overexposure):** If an API for a common feature forces users to learn about rarely used features, it increases cognitive load.
*   **The Limit:** Information hiding only makes sense when the information is *not needed* outside the module. If it is needed (e.g., specific configuration parameters necessary for tuning), it must be exposed.
*   **Goal:** Minimize information needed outside, but ensure necessary information is exposed.

## 5.10 Conclusion

*   Information hiding and deep modules are intrinsically linked.
*   Hiding information increases functionality while reducing the interface, creating a **deep module**.
*   Conversely, not hiding information leads to shallow modules with either little functionality or complex interfaces.
*   **Final Rule:** Decompose based on *knowledge*, not *runtime order*. Design modules to encapsulate specific pieces of knowledge.
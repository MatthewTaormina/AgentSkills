# **Chapter 5: Information Hiding and Leakage — Reference Guide**

**Core Philosophy:** One of the most critical techniques for achieving **deep modules** is information hiding. Modules should maximize the internal knowledge they encapsulate while minimizing the complexity of the interfaces they expose.

## **Quick Reference Summary**

| Concept | Key Definition | Symptoms / Red Flags | Best Practice / Remedy |
| :---- | :---- | :---- | :---- |
| **Information Hiding** | Encapsulating design decisions and implementation mechanisms inside a module so they are inaccessible from outside. | Complex interfaces, cascading changes across classes when one data structure changes. | Expose simple, high-level abstractions; hide data structures, algorithms, and low-level protocols. |
| **Information Leakage** | A design decision is reflected in multiple modules, creating hidden interdependencies. | 🚩 *Information Leakage*: Modifying one component forces synchronized changes in others. | Merge closely tied classes or extract shared knowledge into a single dedicated module. |
| **Temporal Decomposition** | Structuring a system primarily around the execution order of operations rather than knowledge encapsulation. | 🚩 *Temporal Decomposition*: Code split into "Phase 1 / Phase 2" classes that both know the internal format. | Organize classes around *knowledge* and *capabilities*, not chronology. Combine reading, parsing, and serialization. |
| **Overexposure** | Exposing rarely used configurations or internal mechanisms in common-case APIs. | 🚩 *Overexposure*: High cognitive load for simple tasks; bloated parameter lists. | Provide sensible defaults; isolate specialized options into separate, optional interfaces. |

## **5.1 Information Hiding**

### **Definition & Objectives**

Information hiding is the primary mechanism for designing **deep modules** (modules that provide extensive functionality through a simple interface). Each module should encapsulate specific design decisions within its implementation, keeping them completely invisible to callers and neighboring components.

### **What to Hide**

> * **Data structures:** Trees, hash tables, custom arrays, caches, and internal representations.  
> * **Low-level protocols & mechanics:** Thread scheduling, file I/O operations, network wire formats (e.g., TCP handshakes, socket handling).  
> * **Algorithms & policies:** Eviction policies, parsing logic, optimization heuristics.  
> * **Abstract assumptions:** Assumptions about execution environment, hardware configurations, or persistence layers.

### **Key Benefits**

> 1. **Simplified Interfaces:** Callers only interact with an abstract, high-level model. This sharply reduces the cognitive load required to integrate the module.  
> 2. **Frictionless Evolution:** Internal details can be refactored, optimized, or completely rewritten without affecting external code, preventing cascading refactors.

### **Critical Nuances**

> * **private \\neq Hidden:** Simply marking fields or methods private does not achieve information hiding if public getters, setters, or pass-through methods expose the underlying representation.  
> * **Partial Information Hiding:** Specialized capabilities needed by only a small subset of callers should be placed in secondary methods rather than cluttering the primary, standard workflow.

## **5.2 Information Leakage**

### **Definition**

The inverse of information hiding. Information leakage occurs when a single design decision or piece of domain knowledge is replicated across multiple modules, coupling them together.

### **Characteristics & Forms**

> * **Interface Leakage:** The interface directly reveals implementation details (e.g., exposing an internal collection or database record format).  
> * **Back-Door Leakage (Pervasive & Subversive):** Two or more classes depend on shared external knowledge (such as the structure of a specific file format or serialization protocol) without declaring it in their public interfaces. Because the dependency is implicit, changes to the format break multiple classes unexpectedly.

🚩 **Red Flag: Information Leakage** If a change to a single design decision (such as changing a storage format or protocol) forces edits in multiple classes, knowledge has leaked across module boundaries.

### **Remedies**

> * **Merge Classes:** If two classes are tightly coupled through shared knowledge and are relatively small, combine them into a single, cohesive class.  
> * **Extract a Shared Manager:** If the classes must remain distinct, extract the shared knowledge into a new class with a simple, high-level interface that completely hides the shared detail.

## **5.3 Temporal Decomposition**

### **The Concept**

Temporal decomposition occurs when the architectural breakdown of a software system is organized by the chronological sequence in which tasks execute (e.g., FileReader \\rightarrow Parser \\rightarrow Validator \\rightarrow Writer).  
Temporal Decomposition (Anti-pattern):  
\[ Class A: Read Stream \] \---\> \[ Class B: Parse Format \] \---\> \[ Class C: Process Data \]  
               \\                         /  
                \\--- Shared Knowledge \--/ (Format Leaked Across Both)

### **The Inherent Problem**

Steps that occur close together in time usually rely on the exact same underlying knowledge (such as packet structures, record layouts, or memory buffers). Distributing these steps across different classes forces that knowledge to leak into every class in the sequence.  
🚩 **Red Flag: Temporal Decomposition** Organizing classes around the order of execution rather than cohesive knowledge boundaries leads to shallow classes and widespread leakage.

### **The Solution**

> * Decompose systems based on **knowledge ownership**, not runtime execution sequence.  
> * Group mechanisms that understand the same format or lifecycle (e.g., both reading and writing a format) into the same class.

## **5.4 – 5.6 Practical Example: HTTP Server Architecture**

### **Anti-Pattern: Shallow Classes via Temporal Slicing**

> * **Flawed Design:** A system with separate classes for SocketReader, RequestParser, ParameterExtractor, and ResponseFormatter.  
> * **Consequence:** Both the reader and parser must understand HTTP protocol framing rules (newlines, content lengths, headers). Modifying HTTP parsing requires updating multiple modules.

### **Deep Alternative: Consolidated Responsibility**

> * **Better Design:** A single HttpRequest class handles both receiving the raw socket stream and parsing it internally.  
> * **Result:** Knowledge of the wire format is strictly isolated within HttpRequest. Callers receive a clean abstraction.

### **Internal Representations vs. Deep Interfaces**

#### **❌ Shallow Interface (Exposing Internal Structure)**

// Leakage: Exposes internal collection and forces caller to parse types  
public class HttpRequest {  
    private Map\<String, String\> params;

    public Map\<String, String\> getParams() {  
        return this.params; // Exposes internal representation  
    }  
}

// Caller code:  
String timeoutStr \= request.getParams().get("timeout");  
int timeout \= (timeoutStr \!= null) ? Integer.parseInt(timeoutStr) : 30;

#### **✅ Deep Interface (Encapsulated & Caller-Focused)**

// Encapsulation: Storage is hidden; provides convenient domain operations  
public class HttpRequest {  
    private Map\<String, String\> params;

    public String getParameter(String name) {  
        return params.get(name);  
    }

    public int getIntParameter(String name, int defaultValue) {  
        String val \= params.get(name);  
        if (val \== null) return defaultValue;  
        try {  
            return Integer.parseInt(val);  
        } catch (NumberFormatException e) {  
            return defaultValue;  
        }  
    }  
}

// Caller code:  
int timeout \= request.getIntParameter("timeout", 30);

## **5.7 Defaults in Interface Design**

> * **Principle of Sensible Defaults:** An interface should make the standard case trivial. Classes should automatically "do the right thing" without requiring explicit configuration.  
> * **Defaults as Information Hiding:** By providing common-sense default behaviors, callers do not even need to be aware of underlying configuration options.  
> * **HTTP Response Example:**  
  * An HTTP response class should automatically supply standard headers (e.g., Date, Content-Length, HTTP/1.1) and default status codes (200 OK).  
  * Dedicated override methods should exist only for callers who require specialized behaviors.

## **5.8 Information Hiding Within a Class**

Information hiding is not limited to package or module boundaries; it is equally vital within a single class:

> 1. **Private Method Scope:** Keep private helper methods focused on single, encapsulated capabilities or algorithms.  
> 2. **Minimize Instance Variable Footprint:** Limit the number of methods within the class that read or modify a specific instance variable. Reducing touchpoints simplifies internal maintenance and debugging.

## **5.9 When Information Hiding Goes Too Far**

Information hiding must be balanced against legitimate consumer requirements:  
🚩 **Red Flag: Overexposure** Forcing users to understand rarely needed mechanisms or configuration parameters when performing common tasks.

> * **The Boundary:** Information hiding is only valuable when the information is **not needed outside the module**.  
> * If a caller genuinely requires tuning control (e.g., cache size limits, network retry counts), that information must be exposed via well-designed configuration interfaces.  
> * **Guiding Objective:** Minimize external complexity while preserving necessary expressiveness.

## **5.10 Summary of Rules & Principles**

> 1. **Knowledge Over Order:** Decompose classes around the knowledge they encapsulate, never around the chronological execution order of tasks.  
> 2. **Deepen Interfaces:** Strive for modules that offer significant capability through a minimal, cohesive surface area.  
> 3. **Guard the Representation:** Never leak internal collections or low-level primitives through accessors if higher-level queries or operations can be provided instead.  
> 4. **Automate the Standard Case:** Use sensible defaults to hide configuration parameters from the vast majority of consumers.
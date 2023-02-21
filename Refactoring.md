# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

The first piece of code that is refactor is the trivial or base case. I make it more clear when you have to return `TRIVIAL_PARTITION_KEY`, in the previous version that path was not clear enough. I change the conditions to positives when checking the type of the `partitionKey`, positive statements are more clear to understand. I use a ternary for the asignment, I think that for this case when you are typecheking a variable is more clean than using an if statement. I reduce the number of calls to the crypto library to one so is clear the operation being performed is just one and not many. Also I introduced `return` statement in intermediate parts of the code, in this way you can follow a path and knows when and where it ends.
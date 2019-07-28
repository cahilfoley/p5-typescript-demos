# Evolutionary Algorithms

## Challenge

Randomly type the phrase "Programmers took our jerbs" more efficiently than lexicographic brute forcing.

## Evolutionary Process

1. Create a population with random traits (DNA)
2. Test how well each member does the thing (fitness)
3. Create a mating pool (heh) of parents by randomly picking member based on fitness
4. Select pairs of parent members and combine their traits to make a new member for the next population (splice DNA)
5. Repeat from 2 until a correct guess is found

## Structure

`Guesser`

- The overall simulation
- Responsible for displaying information on the screen and calling methods on the population

`Population`

- Responsible for coordinating the population through the evolutionary process.
- Responsible for selecting parents for reproduction
- Responsible for splicing DNA of parents to create new generations
- Can provide the current fittest member if required

`Monkey`

- Contains DNA
- Responsible for calculating own fitness

`DNA`

- Contains genes (the letters of the current guess)
- Able to create random genes for initial population
- Provides method for splicing one DNA with another

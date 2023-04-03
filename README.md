# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# TODO
[ ] Solution Write back
[ ] NxN

<del>Toogle immediate</del>
<del>regex paste for 3x3</del> Not possible: don't know the structure

# Strategy

Default full board:
If backsapce end up empty: do solve
If insert invalid character: output set to invalid character
If insert valid character: do solve


Board state:
1. Invalid character: 
    Valid: '0'-'9' or ''
    Invalid: Any character not in ['0'-'9']
        e.g. '0', ' ', ''', '.'
2. UNSOLVABLE: Direct repetition / Indirect repetition
3. SOLVABLE => OK, Update Output
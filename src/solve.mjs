import BitSet from "bitset";

const EMPTY = null;

class Solver {
    constructor(verbose) {
        this.s = new BitSet(3*81); // blk, row, col
        this.verbose = verbose;
    }
    get_blk(bi, bj, c) {
        return this.s.get(2*81 + (c+bj*9+bi*27));
    }
    get_row(i, c) {
        return this.s.get(81 + (c+i*9));
    }
    get_col(j, c) {
        return this.s.get(c+j*9);
    }
    set_blk(bi, bj, c, t) {
        this.s.set(2*81 + (c+bj*9+bi*27), t);
    }
    set_row(i, c, t) {
        this.s.set(81 + (c+i*9), t);
    }
    set_col(j, c, t) {
        this.s.set(c+j*9, t);
    }
    dfs(t) {
        if (t >= 81) {
            return true;
        }
        let i = Math.floor(t / 9), j = t % 9;
        if (this.B[i][j] !== EMPTY) {
            return this.dfs(t+1);
        }
        for (let c = 0; c < 9; ++c) {
            let bi = Math.floor(i/3), bj = Math.floor(j/3);
            if (this.get_blk(bi, bj, c) || this.get_row(i, c) || this.get_col(j, c))
                continue;
            // trial
            this.B[i][j] = c + 1;
            this.set_blk(bi, bj, c, 1);
            this.set_row(i, c, 1);
            this.set_col(j, c, 1);
            if (this.dfs(t+1))
                return true;
            this.B[i][j] = EMPTY;
            this.set_blk(bi, bj, c, 0);
            this.set_row(i, c, 0);
            this.set_col(j, c, 0);
        }
        return false;
    }

    // Valid cell: int 1-9, or null
    // board[i][j], this.B uses 1-9. For accessing this.s, use 0-8
    solve(board) {
        let solvable = true;
        this.s.clear();
        if (this.verbose) {
            console.log('Algo input:')
            for (let i = 0; i < 9; ++i) {
                console.log(board[i].join(' '));
            }
        }
        this.B = board.map(row => row.slice());
        for (let t = 0; t < 81; ++t) {
            let i = Math.floor(t / 9), j = t % 9;
            if (board[i][j] === EMPTY)
                continue;
            let c = board[i][j] - 1;
            let bi = Math.floor(i/3), bj = Math.floor(j/3);
            if (this.get_blk(bi, bj, c) || this.get_row(i, c) || this.get_col(j, c)) {
                solvable = false;
                break;
            }
            this.B[i][j] = c + 1;
            this.set_blk(bi, bj, c, 1);
            this.set_row(i, c, 1);
            this.set_col(j, c, 1);
        }
        if (this.verbose)
            console.log(this.s.toString());

        if (!solvable) {
            if (this.verbose)
                console.log('No solution');
            return null;
        }

        solvable = this.dfs(0);
        if (!solvable) {
            if (this.verbose)
                console.log('No solution');
            return null;
        }
        if (this.verbose) {
            console.log('Algo output:')
            for (let i = 0; i < 9; ++i) {
                console.log(this.B[i].join(' '));
            }
        }
        return this.B;
    }
}

export default Solver;
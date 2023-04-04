const EMPTY = null;

class Solver {
    constructor(n, verbose) {
        this.n = n; // e.g. 3
        this.N = n * n; // e.g. 9
        this.bigN = this.N * this.N; // e.g. 81
        // this.s = new BitSet(this.n*this.N); // blk, row, col
        this.s = Array(this.n*this.N).fill(0); // blk, row, col
        this.visit = {};
        this.verbose = verbose;
    }
    get_blk(bi, bj, c) {
        return this.s[2 * this.bigN + (c + bj * this.N + bi * this.n * this.N)];
    }
    get_row(i, c) {
        return this.s[this.bigN + (c+i*this.N)];
    }
    get_col(j, c) {
        return this.s[c+j*this.N];
    }
    set_blk(bi, bj, c, t) {
        this.s[2*this.bigN + (c+bj*this.N+bi*this.n*this.N)] = t;
    }
    set_row(i, c, t) {
        this.s[this.bigN + (c+i*this.N)] = t;
    }
    set_col(j, c, t) {
        this.s[c+j*this.N] = t;
    }
    dfs(t) {
        if (this.s in this.visit) {
            return false;
        }
        if (t >= this.bigN) {
            return true;
        }
        let i = Math.floor(t / this.N), j = t % this.N;
        if (this.B[i][j] !== EMPTY) {
            return this.dfs(t+1);
        }
        for (let c = 0; c < this.N; ++c) {
            let bi = Math.floor(i/this.n), bj = Math.floor(j/this.n);
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
        this.s.fill(0);
        this.visit = {};
        if (this.verbose) {
            console.log('Algo input:')
            for (let i = 0; i < this.N; ++i) {
                console.log(board[i].join(' '));
            }
        }
        this.B = board.map(row => row.slice());
        for (let t = 0; t < this.bigN; ++t) {
            let i = Math.floor(t / this.N), j = t % this.N;
            if (board[i][j] === EMPTY)
                continue;
            let c = board[i][j] - 1;
            let bi = Math.floor(i/this.n), bj = Math.floor(j/this.n);
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
            for (let i = 0; i < this.N; ++i) {
                console.log(this.B[i].join(' '));
            }
        }
        return this.B;
    }
}

export default Solver;
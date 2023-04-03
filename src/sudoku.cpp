#include <iostream>
#include <vector>
#include <unordered_set>

#define get_blk(s,bi,bj,c) s[2*81 + (c+bj*9+bi*27)]
#define get_row(s,i,c) s[81 + (c+i*9)]
#define get_col(s,j,c) s[c+j*9]

using namespace std;
class Solution {
public:
    using State = std::bitset<3*81>;  // blk | row | col
    vector<vector<char>> B;
    unordered_set<State> visit;

    bool dfs(State &s, int t) {
        /* DBG(t); */
        if (visit.count(s))
            return false;

        if (t >= 81)
            return true;

        int i = t / 9;
        int j = t % 9;
        if (B[i][j] != '.') {
            return dfs(s, t+1);
        }

        for (int c = 0; c < 9; ++c) {
            // check
            if (get_blk(s,i/3,j/3,c))
                continue;
            if (get_row(s,i,c))
                continue;
            if (get_col(s,j,c))
                continue;

            // trial
            B[i][j] = c + '1';
            get_blk(s,i/3,j/3,c) = 1;
            get_row(s,i,c) = 1;
            get_col(s,j,c) = 1;

            if (dfs(s,t+1) == true) {
                return true;
            }
            B[i][j] = '.';
            get_blk(s,i/3,j/3,c) = 0;
            get_row(s,i,c) = 0;
            get_col(s,j,c) = 0;
        }

        return false; // none of valid answer found
    }

    void solveSudoku(vector<vector<char>> &board) {
        B = board;
        State s;
        s.reset();
        for (int t = 0; t < 81; ++t) {
            int i = t/9, j = t % 9;
            if (board[i][j] == '.')
                continue;
            int c = board[i][j] - '1';
            get_blk(s,i/3,j/3,c) = 1;
            get_row(s,i,c) = 1;
            get_col(s,j,c) = 1;
        }

        dfs(s,0);
        board = B;

        cout << s << endl;
        for (int i = 0; i < 9; ++i) {
            for (int j = 0; j < 9; ++j) {
                printf("%d ", B[i][j] - '0');
            }
            printf("\n");
        }
    }
};

int main() {
    auto board = vector<vector<char>> (9, vector<char>(9, '.'));
    board[0][0] = '9';
    board[0][1] = '9'; // This will fail
    Solution().solveSudoku(board);
}

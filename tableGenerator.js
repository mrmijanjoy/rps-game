import Table from 'cli-table3';
import chalk from 'chalk';

export class TableGenerator {
    constructor(moves) {
        this.moves = moves;
    }

    generateTable() {
        const table = new Table({
            head: ['v User\\PC >', ...this.moves].map(header => chalk.bold.blue(header))
        });

        for (let i = 0; i < this.moves.length; i++) {
            const row = [chalk.bold.green(this.moves[i])];
            for (let j = 0; j < this.moves.length; j++) {
                row.push(this.getResult(i, j));
            }
            table.push(row);
        }

        return table;
    }

    getResult(i, j) {
        if (i === j) return "Draw";
        const halfLength = Math.floor(this.moves.length / 2);
        const adjustedIndex = (j - i + this.moves.length) % this.moves.length;
        if (adjustedIndex <= halfLength && adjustedIndex !== 0) {
            return "Win";
        } else {
            return "Lose";
        }
    }

    printTable() {
        const table = this.generateTable();
        console.log(table.toString());
    }
}

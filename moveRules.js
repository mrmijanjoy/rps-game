export class MoveRules {
    constructor(moves) {
        this.moves = moves;
    }

    determineWinner(playerMove, computerMove) {
        const playerIndex = this.moves.indexOf(playerMove);
        const computerIndex = this.moves.indexOf(computerMove);

        if (playerIndex === computerIndex) {
            return 'Draw';
        }

        const halfLength = Math.floor(this.moves.length / 2);
        const adjustedIndex = (computerIndex - playerIndex + this.moves.length) % this.moves.length;

        if (adjustedIndex <= halfLength && adjustedIndex !== 0) {
            return 'Win';
        } else {
            return 'Lose';
        }
    }
}

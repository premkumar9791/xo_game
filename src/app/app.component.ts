import { Component,Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'xo';
  currentPlayer: 'X' | 'O' = 'X';
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  winner: string | null = null;

  constructor(private renderer: Renderer2, private el: ElementRef) {}

  makeMove(row: number, col: number): void {
    if (!this.board[row][col] && !this.winner) {
      this.board[row][col] = this.currentPlayer;
      this.checkWinner(row, col);
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  
  }

  checkWinner(row: number, col: number): void {
    // Check row
    if (
      this.board[row][0] === this.currentPlayer &&
      this.board[row][1] === this.currentPlayer &&
      this.board[row][2] === this.currentPlayer
    ) {
      this.winner = this.currentPlayer;
      return;
    }

    // Check column
    if (
      this.board[0][col] === this.currentPlayer &&
      this.board[1][col] === this.currentPlayer &&
      this.board[2][col] === this.currentPlayer
    ) {
      this.winner = this.currentPlayer;
      return;
    }

    if (
      (this.board[0][0] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][2] === this.currentPlayer) ||
      (this.board[0][2] === this.currentPlayer &&
        this.board[1][1] === this.currentPlayer &&
        this.board[2][0] === this.currentPlayer)
    ) {
      this.winner = this.currentPlayer;
      return;
    }

  if (this.winner || this.winner === 'Tie') {
    this.showAlert(this.winner === 'Tie' ? 'It\'s a Tie!' : `Player ${this.winner} Wins!`);
  }
}

showAlert(message: string): void {
  const alert = this.renderer.createElement('div');
  this.renderer.addClass(alert, 'winner-alert');
  this.renderer.appendChild(alert, this.renderer.createText(message));
  this.renderer.appendChild(this.el.nativeElement, alert);

  setTimeout(() => {
    this.renderer.removeChild(this.el.nativeElement, alert);
  }, 3000); 
}
}

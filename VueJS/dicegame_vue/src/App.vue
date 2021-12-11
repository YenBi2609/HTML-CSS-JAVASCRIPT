<template>
  <div id="app">
    <div class="wrapper clearfix">
      <players
        :isWinner="isWinner"
        v-bind:scoresPlayer="scoresPlayer"
        v-bind:currentScore="currentScore"
        v-bind:activePlayer="activePlayer"
      />
      <controls
        :isPlaying="isPlaying"
        v-bind:finalScore="finalScore"
        v-on:handleChangeFinalScore="handleChangeFinalScore"
        v-on:handleNewGame="handleNewGame"
        v-on:handleRollDice="handleRollDice"
        v-on:handleHoldScore="handleHoldScore"
      />
      <dices v-bind:dices="dices" />
      <popup-rule
        v-bind:isOpenPopup="isOpenPopup"
        v-on:handleConfirm="handleConfirm"
      />
    </div>
  </div>
</template>

<script>
import Players from "./components/Players";
import Controls from "./components/Controls";
import Dices from "./components/Dices";
import PopupRule from "./components/popupRule";
export default {
  name: "app",
  data() {
    return {
      isPlaying: false,
      isOpenPopup: false,
      activePlayer: 1,
      scoresPlayer: [14, 33],
      currentScore: 30,
      dices: [2, 5],
      finalScore: 10
    };
  },
  components: {
    Players,
    Controls,
    Dices,
    PopupRule,
  },
  methods: {
    handleChangeFinalScore(e){
      var number = parseInt(e.target.value);
      if(isNaN(number)){
        this.finalScore = '';
      }else this.finalScore = number;
    },
    nextPlayer() {
      this.activePlayer = this.activePlayer === 0 ? 1 : 0;
      this.currentScore = 0;
    },
    handleNewGame() {
      this.isOpenPopup = true;
    },
    handleConfirm() {
      this.isOpenPopup = false;
      this.isPlaying = true;
      this.activePlayer = 0;
      this.scoresPlayer = [0, 0];
      this.currentScore = 0;
      this.dices = [1, 1];
    },
    handleRollDice() {
      if (this.isPlaying == true) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        this.dices = [dice1, dice2];
        if (dice1 === 1 || dice2 === 1) {
          setTimeout(() => {
            alert(
              `Người chơi ${this.activePlayer + 1} đã quay trúng số 1. Rất tiếc`
            );
          }, 10);
          // dùng function thường --> biến this ko còn của thằng vue -> nan // arrow function ko có biến this
          this.nextPlayer();
        } else {
          this.currentScore += dice1 + dice2;
        }
      } else alert("Vui lòng nhấn vào nút new game");
    },
    handleHoldScore() {
      if (this.isPlaying == true) {
        let { scoresPlayer, activePlayer, currentScore } = this;
        // let cloneScorePlayer = [...scoresPlayer];
        // cloneScorePlayer[activePlayer] = scoresPlayer[activePlayer] + currentScore;
        // this.scoresPlayer = cloneScorePlayer;
        this.$set(
          this.scoresPlayer,
          activePlayer,
          scoresPlayer[activePlayer] + currentScore
        );
        if(!this.isWinner){
        this.nextPlayer();}

      } else alert("Vui lòng nhấn vào nút new game");
    }
  },
  computed: {
    isWinner() {
      let { scoresPlayer , finalScore } = this;
      if(scoresPlayer[0] >= finalScore || scoresPlayer[1] >= finalScore ){
        this.isPlaying = false;
        return true;
      }
      else return false;
    }
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}

body {
  background-image: linear-gradient(
      rgba(62, 20, 20, 0.4),
      rgba(62, 20, 20, 0.4)
    ),
    url("/public/assets/back.jpg");
  background-size: cover;
  background-position: center;
  font-family: Lato;
  font-weight: 300;
  position: relative;
  height: 100vh;
  color: #555;
}

.wrapper {
  width: 1000px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}
</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { STARTERS, BASIC, EFFECTIVE, GOOD, INTERESTING, WORK, COUPLES, STUDENTS, TRUTH, PHILOSOPHICAL, FUN } from "$lib/game-questions/getuno-questions";

    import CategoryCheckbox from "./CategoryCheckbox.svelte";

    let activeDropdown: boolean;
    let questionCategories =  [STARTERS, BASIC, EFFECTIVE, GOOD, INTERESTING, WORK, COUPLES, STUDENTS, TRUTH, PHILOSOPHICAL, FUN]
    
    // Create a list with the same length as the question categories selected by default
    let selectedCategories = questionCategories.map( category => true);

    let currentPlayer: PlayerScoreboard;
    let currentPlayerIndex: number;
    let playerList: string[];

    interface PlayerScoreboard {
        position: number,
        playerName: string,
        score: number
    }
    let playerScoreboard: PlayerScoreboard[] = [];
    onMount( () => {
        
        let playerObject = JSON.parse(window.localStorage.getItem("players") || "");

        playerList = playerObject["players"];

        
        

        playerList.forEach( (value: string, index: number) => {
            playerScoreboard.push({
                position: index + 1,
                playerName: value,
                score: 0
            });
        });

        currentPlayerIndex = Math.floor(Math.random() * playerScoreboard.length);
        currentPlayer = playerScoreboard[currentPlayerIndex];

        playerScoreboard = playerScoreboard;

    });

    let questionBank = questionCategories.map( (value, index) => {
        if(selectedCategories[index]){
            return value;
        }
    });
    function createQuestionBank(){
        questionBank = questionCategories.map( (value, index) => {
            if(selectedCategories[index]){
                return value;
            }
        });
    }
    function answerQuestion(){
        currentPlayer.score++;
        playerScoreboard.sort((a, b) => b.score - a.score)
        playerScoreboard = playerScoreboard.map( (value, index) => {
            return {
                position: index + 1,
                playerName: value.playerName,
                score: value.score,
            }
        })
        selectRandomPlayer();
        selectRandomQuestion();
    }

    function selectRandomPlayer(){
        currentPlayerIndex = Math.floor(Math.random() * playerScoreboard.length);
        currentPlayer = playerScoreboard[currentPlayerIndex];
    }
    function selectRandomQuestion(){
        randomCategory = questionBank[Math.floor(Math.random() * questionBank.length)];
        randomQuestion = randomCategory ? 
                            randomCategory.questions[Math.floor(Math.random() * randomCategory.questions.length)] 
                            : "Select at least one question category";
    }
    function refreshScoreboard(){

    }

    let randomCategory = questionBank[Math.floor(Math.random() * questionBank.length)];

    let randomQuestion = randomCategory ? 
                            randomCategory.questions[Math.floor(Math.random() * randomCategory.questions.length)] 
                            : "Select a question category";

</script>

<section class="hero is-fullheight is-danger" id="game-screen">
    <div class="columns">
        <div class="column is-8">
            <div class="container px-3">
                <div class="card mt-3">
                    <header class="card-header">
                        <p class="card-header-title">Getuno - Random get-to-know question</p>
                        <div class="control" id="category-dropdown-container">
                            <div 
                                class="dropdown mx-3 my-3"
                                class:is-active={activeDropdown}
                            >
                                <div class="dropdown-trigger">
                                    <button
                                        on:click={() => {
                                            activeDropdown = !activeDropdown;
                                            if(!activeDropdown){
                                                createQuestionBank();
                                            }
                                        }}  
                                        class="button" 
                                        aria-haspopup="true" 
                                        aria-controls="dropdown-menu"
                                    >
                                        <span>Categories</span>
                                        <span class="icon is-small">
                                            <i class="bi bi-chevron-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" role="menu">
                                    <div class="dropdown-content px-2">
                                        {#each questionCategories as category, i}
                                            <CategoryCheckbox
                                                categoryName={category.categoryName}
                                                bind:checkboxed={selectedCategories[i]}
                                            />
                                        {/each}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <div class="card-content">
                        <p class="is-size-3" id="question-card">
                            {randomQuestion}
                        </p>
                    </div>
                    <footer class="card-footer">
                        <button
                            on:click={answerQuestion} 
                            class="card-footer-item button is-success is-medium is-outlined" 
                        >
                            <span class="icon">
                                <i class="bi bi-check2-circle"></i>
                            </span>
                        </button>
                        <button class="card-footer-item button is-warning is-medium is-outlined" id="reject-button" >
                            <span class="icon">
                                <i class="bi bi-x-circle"></i>
                            </span>
                        </button>          
                    </footer>
                </div>
            </div>
            <div class="container px-3 py-6">
                <div class="card">
                    <header class="card-header">
                        <p class="card-header-title">Current player</p>
                    </header>
                    <div class="card-content">
                        <p class="is-size-3" id="current-player-card">
                            {#if currentPlayer}
                                {currentPlayer.playerName}
                            {/if}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="column is-4">
            <div class="container px-3">
                <div class="card mt-3">
                    <header class="card-header">
                        <p class="card-header-title">
                            Scoreboard
                        </p>
                    </header>
                    <div class="card-content">
                        <table class="table is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Position</th>
                                    <th>Player</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {#if playerScoreboard}
                                    {#each playerScoreboard as player}
                                        <tr>
                                            <th>{player.position}</th>
                                            <td>{player.playerName}</td>
                                            <td>{player.score}</td>
                                        </tr>
                                    {/each}
                                {/if}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
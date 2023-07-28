<script lang="ts">
    import { onMount } from "svelte";
    import {STARTERS, BASIC, EFFECTIVE, GOOD, INTERESTING, WORK, COUPLES, STUDENTS, TRUTH, PHILOSOPHICAL, FUN } from "$lib/game-content/getuno-questions";
    import { CHEST_WORKOUT, BACK_WORKOUT, LEG_WORKOUT, SHOULDERS_WORKOUT, ARMS_WORKOUT } from '$lib/game-content/getuno-challenges';

    import type { CategoryQuestionBank } from "$lib/game-content/getuno-questions";
    import type { CategoryChallengeBank } from "$lib/game-content/getuno-challenges";

    import CategoryDropdown from "./CategoryDropdown.svelte";
    
    // Question mechanic setup
    let questionCategories: CategoryQuestionBank[] =  [STARTERS, BASIC, EFFECTIVE, GOOD, INTERESTING, WORK, COUPLES, STUDENTS, TRUTH, PHILOSOPHICAL, FUN]
    let questionCategoriesName: string[] = questionCategories.map( category => category.categoryName); 
    
    let checkboxedQuestionCategories: boolean[] = questionCategories.map( category => true);
    let selectedQuestionBank: CategoryQuestionBank[] = questionCategories.filter( (value, index) => checkboxedQuestionCategories[index] )

    // Challenges mechanic setup
    let challengeCategories: CategoryChallengeBank[] = [CHEST_WORKOUT, BACK_WORKOUT, LEG_WORKOUT, SHOULDERS_WORKOUT, ARMS_WORKOUT]
    let challengeCategoriesName: string[] = challengeCategories.map( category => category.categoryName);
    
    let checkboxedChallengeCategories: boolean[] = challengeCategories.map( category => true);
    let selectedChallengeBank: CategoryChallengeBank[] = challengeCategories.filter( (value, index) => checkboxedChallengeCategories[index]);

    // Create a list with the same length as the question categories selected by default

    let currentPlayer: PlayerScoreboard;
    let currentPlayerIndex: number;
    let playerList: string[];

    // Displayable 

    let randomQuestion: string;
    let randomChallenge: string;
    let randomReps: string;

    const repsMin: number = 5;
    const repsMax: number = 20;

    // componentsStates

    let activeChallengeCard: boolean = false;

    interface PlayerScoreboard {
        position: number,
        playerName: string,
        score: number
    }
    let playerScoreboard: PlayerScoreboard[] = [];

    onMount( () => {
        
        randomQuestion = selectRandomQuestion();

        // Configure initial player Scoreboard
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

    function createQuestionBank(){
        selectedQuestionBank = questionCategories.filter( (value, index) => checkboxedQuestionCategories[index]);
    }

    function createChallengeBank(){
        selectedChallengeBank = challengeCategories.filter( (value, index) => checkboxedChallengeCategories[index]);
    }

    function answerQuestion(){
        currentPlayer.score++;
        randomChallenge = selectRandomChallenge();
        randomReps = (Math.floor(Math.random() * (repsMax - repsMin) + repsMin)).toString();
        activeChallengeCard = true;
    }
    function rejectQuestion(){
        randomChallenge = selectRandomChallenge();
        randomReps = (Math.floor(Math.random() * (repsMax - repsMin) + repsMin)).toString();
        activeChallengeCard = true;   
    }
    function completeChallenge(){
        currentPlayer.score++;
        console.log(currentPlayer);
        console.log(playerScoreboard);
        playerScoreboard.sort((a, b) => b.score - a.score);
        playerScoreboard = playerScoreboard.map( (value, index) => {
            return {
                position: index + 1,
                playerName: value.playerName,
                score: value.score,
            }
        });
        selectRandomPlayer();
        randomQuestion = selectRandomQuestion();
        activeChallengeCard = false;
    }
    function rejectChallenge(){
        selectRandomPlayer();
        randomQuestion = selectRandomQuestion();
        activeChallengeCard = false;
    }

    function selectRandomPlayer(){
        currentPlayerIndex = Math.floor(Math.random() * playerScoreboard.length);
        currentPlayer = playerScoreboard[currentPlayerIndex];
    }
    function selectRandomQuestion(){
        const randomCategory = selectedQuestionBank[Math.floor(Math.random() * selectedQuestionBank.length)];
        const randomQuestion = randomCategory.questions[Math.floor(Math.random() * randomCategory.questions.length)];

        return randomQuestion;
    }
    function selectRandomChallenge(){
        const randomCategory = selectedChallengeBank[Math.floor(Math.random() * selectedChallengeBank.length)];
        const randomChallenge = randomCategory.challenges[Math.floor(Math.random() * randomCategory.challenges.length)];

        return randomChallenge;
    }
    function refreshScoreboard(){

    }
</script>

<section class="hero is-fullheight is-danger" id="game-screen">
    <div class="columns">
        <div class="column is-8">
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
            <div class="container px-3">
                <div class="card mt-3">
                    <header class="card-header">
                        <p class="card-header-title">Getuno - Random get-to-know question</p>
                        <div class="control" id="category-dropdown-container">
                            <CategoryDropdown
                                on:close={createChallengeBank}
                                dropdownName={"Challenges"}
                                dropdownContent={challengeCategoriesName}
                                bind:checkboxedCategories={checkboxedChallengeCategories}
                            />
                            <CategoryDropdown 
                                on:close={createQuestionBank}
                                dropdownName={"Questions"}
                                dropdownContent={questionCategoriesName}
                                bind:checkboxedCategories={checkboxedQuestionCategories}
                            />
                        </div>
                    </header>
                    <div class="card-content">
                        <p class="is-size-3">
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
                        <button
                            on:click={rejectQuestion} 
                            class="card-footer-item button is-danger is-medium is-outlined">
                            <span class="icon">
                                <i class="bi bi-x-circle"></i>
                            </span>
                        </button>          
                    </footer>
                </div>
            </div>
            <div class="container px-3">
                <div 
                    class:is-hidden={!activeChallengeCard}
                    class="card mt-3"
                >
                    <header class="card-header">
                        <p class="card-header-title">Challenges</p>
                    </header>
                    <div class="card-content">
                        <p class="is-size-3">
                            {`${randomChallenge} - ${randomReps}` }
                        </p>
                    </div>
                    <footer class="card-footer">
                        <button
                            on:click={completeChallenge}
                            class="card-footer-item button is-success is-medium is-outlined" 
                        >
                            <span class="icon">
                                <i class="bi bi-check2-circle"></i>
                            </span>
                        </button>
                        <button 
                            on:click={rejectChallenge}
                            class="card-footer-item button is-danger is-medium is-outlined"
                        >
                            <span class="icon">
                                <i class="bi bi-x-circle"></i>
                            </span>
                        </button>          
                    </footer>
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
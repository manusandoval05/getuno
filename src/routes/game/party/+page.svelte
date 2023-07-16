<script lang="ts">
    import playerStore from "$lib/stores/players";
    import { STARTERS, BASIC, EFFECTIVE, GOOD, INTERESTING, WORK, COUPLES, STUDENTS, TRUTH, PHILOSOPHICAL, FUN } from "$lib/game-questions/getuno-questions";

    import CategoryCheckbox from "./CategoryCheckbox.svelte";

    let activeDropdown: boolean = false;
    let questionCategories =  [STARTERS, BASIC, EFFECTIVE, GOOD, INTERESTING, WORK, COUPLES, STUDENTS, TRUTH, PHILOSOPHICAL, FUN]
    
    // Create a list with the same length as the question categories selected by default
    let selectedCategories = questionCategories.map( category => true)

    let playerObjectStore = $playerStore;
    let playerList = playerObjectStore.players;

    interface PlayerScoreboard {
        position: number,
        name: string,
        score: number
    }

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
                                        on:click={() => activeDropdown != activeDropdown} 
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
                        <p class="is-size-3" id="question-card"></p>
                    </div>
                    <footer class="card-footer">
                        <a class="card-footer-item button is-success is-medium is-outlined" id="accept-button">
                            <span class="icon">
                                <i class="bi bi-check2-circle"></i>
                            </span>
                        </a>
                        <a class="card-footer-item button is-danger is-medium is-outlined" id="reject-button" >
                            <span class="icon">
                                <i class="bi bi-x-circle"></i>
                            </span>
                        </a>          
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
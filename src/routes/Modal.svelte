<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import Input from "./Input.svelte";

    export let active: boolean;
    export let players: string[] = [];

    const dispatch = createEventDispatcher();

    function closeModal(){
        dispatch('close'); 
    }
    function createPlayer(){
        players = [...players, ""];
    }
    function deletePlayer(event:any){
        players = players.splice(event.detail.index);
    }
    function startGameDispatch(){
        dispatch('startGame');
    }
</script>

<div 
    class="modal"
    class:is-active={active} 
    id="party-multiplayer-modal" 
    >
    <div 
        class="modal-background"
        on:click={closeModal}
        aria-label="close"
        ></div>
    <div class="modal-content">
        <div class="box">
            <h2 class="title has-text-centered">Start New Game</h2>
            <div class="notification-box"></div>
            <div class="container mb-3">
                <button 
                    on:click={createPlayer}
                    class="button is-info player-create-button"
                    >New Player</button>
            </div>
            
            <div class="container player-list" id="party-multiplayer-player-list">
                {#each players as player, i}
                    <Input
                       indexPosition={i}
                       bind:inputValue={player}
                       on:delete={deletePlayer}
                    />
                {/each}
            </div>
            <div class="container mt-3">
                <button 
                    class="button is-link"
                    on:click={startGameDispatch}
                    type="submit"
                >
                    Start Game
                </button>
            </div>
        </div>
    </div>
    <button 
        class="modal-close is-large" 
        aria-label="close"
        on:click={closeModal}
    >
    </button>
</div>
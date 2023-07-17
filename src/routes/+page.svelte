<script lang="ts">
	import Modal from "./Modal.svelte";
	import { goto } from "$app/navigation";

    let activeModal: boolean = false;

    let players: string[] = [];

    function startGame(){
        const playerObject = {
            players: players
        };

        window.localStorage.setItem("players", JSON.stringify(playerObject));

        goto("/game/party");
    }
</script>

<Modal 
    on:startGame={startGame}
    bind:players={players}
    active={activeModal}
    on:close={() => activeModal = false}
/>

<section class="hero is-fullheight is-danger" id="main-screen">
    <div class="hero-body is-flex is-flex-direction-column">
        <p class="title is-size-1 has-text-centered">Getuno</p>
        <div class="columns">
            <div class="column">
                <button 
                    class="button is-large is-primary modal-trigger"
                    on:click={() => activeModal = true}
                >Party Multiplayer</button>
            </div>
        </div>         
    </div>
</section>
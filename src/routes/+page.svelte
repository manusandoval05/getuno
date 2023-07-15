<script lang="ts">
    import 'bulma/css/bulma.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.min.css';
	import Modal from "./Modal.svelte";

    let activeModal : boolean = false;

    let players: string[] = [];
</script>

<Modal 
    bind:players={players}
    active={activeModal}
    on:close={() => activeModal = false}/>

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
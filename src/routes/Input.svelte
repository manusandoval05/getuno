<script lang="ts">
    import { createEventDispatcher } from "svelte";
    
    export let inputValue: string;
    export let indexPosition: number; 

    const dispatch = createEventDispatcher();


    function clickDeleteButton(){
        dispatch('delete', {
            index: indexPosition
        });
    }
</script>


<div class="field has-addons">
    <p class="control has-icons-left">
        <input bind:value={inputValue} class="input" type="text" placeholder={`Player ${indexPosition + 1}`}>
        <span class="icon is-medium is-left">
            <i class="bi bi-person-fill"></i>
        </span>
    </p>
    <p class="control">
        <button 
            class="button is-danger is-outlined"
            on:click={clickDeleteButton}
            >
            <span class="icon is-medium">
                <i class="bi bi-trash"></i>
            </span>
        </button>
    </p>
</div>
<script lang="ts">
    import { createEventDispatcher } from "svelte";

    import CategoryCheckbox from "./CategoryCheckbox.svelte";

    const dispatch = createEventDispatcher();

    let activeDropdown: boolean = false;

    export let dropdownName: string = "Categories"
    export let dropdownContent: string[];
    export let checkboxedCategories: boolean[] = dropdownContent.map( category => true);

    function toggleDropdown(){
        activeDropdown = !activeDropdown

        if(!activeDropdown){
            dispatch("close")
        }
    }
</script>

<div 
    class="dropdown mx-3 my-3"
    class:is-active={activeDropdown}
>
    <div class="dropdown-trigger">
        <button
            on:click={toggleDropdown}
            class="button" 
            aria-haspopup="true" 
            aria-controls="dropdown-menu"
        >
            <span>{dropdownName}</span>
            <span class="icon is-small">
                <i class="bi bi-chevron-down" aria-hidden="true"></i>
            </span>
        </button>
    </div>
    <div class="dropdown-menu" role="menu">
        <div class="dropdown-content px-2">
            {#each dropdownContent as category, i}
                <CategoryCheckbox
                    categoryName={category}
                    bind:checkboxed={checkboxedCategories[i]}
                />
            {/each}
        </div>
    </div>
</div>
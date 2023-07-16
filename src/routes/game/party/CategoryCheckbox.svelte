<script lang="ts">
    export let categoryName: string;
    export let checkboxed: boolean;

</script>

<div class="dropdown-item">
    <label class="checkbox">
        {categoryName}
        <input type="checkbox" bind:checked={checkboxed}>
    </label>
</div>
<hr class="dropdown-divider">
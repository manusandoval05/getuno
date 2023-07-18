<script lang="ts">
    import 'bulma/css/bulma.min.css';
    import 'bootstrap-icons/font/bootstrap-icons.min.css';

    import { base } from '$app/paths';
</script>

<svelte:head>
    <link rel="manifest" crossorigin="use-credentials" href="{base}/manifest.json" />
</svelte:head>
<slot></slot>
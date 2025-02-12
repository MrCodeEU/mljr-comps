<script lang="ts">
	import { Button } from "$lib/index.js";
	import Icon from "@iconify/svelte";
</script>

<Button variant="primary" onclick={() => alert()}><Icon icon="material-symbols:brightness-alert-outline" height="auto" class="pe-0.5"/>Primary</Button>
<Button variant="secondary">Secondary <Icon icon="line-md:loading-alt-loop" height="auto" /></Button>
<Button variant="tertiary"><Icon icon="vscode-icons:file-type-svelte" height="22" class="me-5" />Tertiary<Icon icon="vscode-icons:file-type-svelte" height="22" class="ms-5" /></Button>
<Button variant="accent">Accent</Button>
<Button variant="muted">Muted</Button>
<Button variant="error">Error</Button>
<Button variant="success">Success</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>
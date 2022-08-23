<script>
  import { Router } from "@roxi/routify";
  import { routes } from "../.routify/routes";
</script>

<a href="/">home</a> |
<a href="/more">more</a> |
<a href="./stuff">stuff</a>

<Router {routes} />

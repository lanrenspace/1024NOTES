<template>
  <Tutorial/>
</template>

<script>
import { getAllLabels} from "../api/labels";

export default {
  created() {
    getAllLabels().then(response => {
      console.log(response)
    })
  }
}
</script>

<template>
  <div class="details">
    <div class="details-header">
      <div class="details-row">
        <span>Withdraw Rowan</span>
        <span>{{ nativeAssetAmount }}</span>
      </div>
      <div class="details-row">
        <span>Withdraw {{ externalAssetSymbol }}</span>
        <span>{{ externalAssetAmount }}</span>
      </div>
    </div>
    <!-- <div class="details-body">
      
    </div> -->
  </div>
</template>

<style lang="scss" scoped>
.details {
  border: 1px solid $c_gray_200;
  border-radius: $br_sm;
  background: $c_white;

  &-header {
    padding: 10px 15px;
    border-bottom: 1px solid $c_gray_200;
  }
  &-body {
    padding: 10px 15px;
  }

  &-row {
    display: flex;
    justify-content: space-between;

    span:last-child {
      text-align: right;
      color: $c_gray_900;
    }

    span:first-child {
      color: $c_gray_700;
      font-weight: 400;
      text-align: left;
    }
  }
}
</style>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    nativeAssetSymbol: { type: String, default: ""},
    externalAssetAmount: { type: String, default: ""},
    externalAssetSymbol: { type: String, default: ""},
    nativeAssetAmount: { type: String, default: ""},
  },
});
</script>

<script lang="ts">
import { defineComponent } from "vue";
import Layout from "@/components/layout/Layout.vue";
import { computed, ref, toRefs } from "@vue/reactivity";
import { useCore } from "@/hooks/useCore";
import { Asset, SwapState, useSwapCalculator } from "ui-core";
import { useWalletButton } from "@/components/wallet/useWalletButton";
import CurrencyPairPanel from "@/components/currencyPairPanel/Index.vue";
import Modal from "@/components/shared/Modal.vue";
import SelectTokenDialogSif from "@/components/tokenSelector/SelectTokenDialogSif.vue";
import PriceCalculation from "@/components/shared/PriceCalculation.vue";
import ActionsPanel from "@/components/actionsPanel/ActionsPanel.vue";
import ModalView from "@/components/shared/ModalView.vue";
import ConfirmationDialog, {
  ConfirmState,
} from "@/components/confirmationDialog/ConfirmationDialog.vue";
import { useCurrencyFieldState } from "@/hooks/useCurrencyFieldState";
import DetailsPanel from "@/components/shared/DetailsPanel.vue";

export default defineComponent({
  components: {
    ActionsPanel,
    CurrencyPairPanel,
    Layout,
    Modal,
    DetailsPanel,
    SelectTokenDialogSif,
    ModalView,
    ConfirmationDialog,
  },

  setup() {
    const { actions, poolFinder, store } = useCore();

    const {
      fromSymbol,
      fromAmount,
      toSymbol,
      toAmount,
      priceImpact,
      providerFee,
    } = useCurrencyFieldState();
    const transactionState = ref<ConfirmState>("selecting");
    const transactionHash = ref<string | null>(null);
    const selectedField = ref<"from" | "to" | null>(null);
    const { connected, connectedText } = useWalletButton({
      addrLen: 8,
    });

    function requestTransactionModalClose() {
      transactionState.value = "selecting";
    }

    const balances = computed(() => {
      return store.wallet.sif.balances;
    });

    const {
      state,
      fromFieldAmount,
      toFieldAmount,
      priceMessage,
    } = useSwapCalculator({
      balances,
      fromAmount,
      toAmount,
      fromSymbol,
      selectedField,
      toSymbol,
      poolFinder,
      priceImpact,
      providerFee,
    });

    const minimumReceived = computed(() =>
      parseFloat(toAmount.value).toPrecision(10)
    );

    function clearAmounts() {
      fromAmount.value = "0.0";
      toAmount.value = "0.0";
    }

    function handleNextStepClicked() {
      if (!fromFieldAmount.value)
        throw new Error("from field amount is not defined");
      if (!toFieldAmount.value)
        throw new Error("to field amount is not defined");
      if (state.value !== SwapState.VALID_INPUT) return;

      transactionState.value = "confirming";
    }

    async function handleAskConfirmClicked() {
      if (!fromFieldAmount.value)
        throw new Error("from field amount is not defined");
      if (!toFieldAmount.value)
        throw new Error("to field amount is not defined");

      transactionState.value = "signing";
      let tx = await actions.clp.swap(
        fromFieldAmount.value,
        toFieldAmount.value.asset
      );

      transactionHash.value = tx?.transactionHash ?? "";
      transactionState.value = "confirmed";
      clearAmounts();
    }

    function swapInputs() {
      const fromAmountValue = fromAmount.value;
      const fromSymbolValue = fromSymbol.value;
      fromAmount.value = toAmount.value;
      fromSymbol.value = toSymbol.value;
      toAmount.value = fromAmountValue;
      toSymbol.value = fromSymbolValue;
    }

    return {
      connected,
      connectedText,
      nextStepMessage: computed(() => {
        switch (state.value) {
          case SwapState.SELECT_TOKENS:
            return "Select Tokens";
          case SwapState.ZERO_AMOUNTS:
            return "Please enter an amount";
          case SwapState.INSUFFICIENT_FUNDS:
            return "Insufficient Funds";
          case SwapState.VALID_INPUT:
            return "Swap";
        }
      }),
      disableInputFields: computed(() => {
        return state.value === SwapState.SELECT_TOKENS;
      }),
      handleFromSymbolClicked(next: () => void) {
        selectedField.value = "from";
        next();
      },
      handleToSymbolClicked(next: () => void) {
        selectedField.value = "to";
        next();
      },
      handleSelectClosed(data: string) {
        if (typeof data !== "string") {
          return;
        }

        if (selectedField.value === "from") {
          fromSymbol.value = data;
        }

        if (selectedField.value === "to") {
          toSymbol.value = data;
        }
        selectedField.value = null;
      },
      handleFromFocused() {
        selectedField.value = "from";
      },
      handleToFocused() {
        selectedField.value = "to";
      },
      handleNextStepClicked,
      handleBlur() {
        selectedField.value = null;
      },

      fromAmount,
      toAmount,
      fromSymbol,
      minimumReceived,
      toSymbol,
      priceMessage,
      priceImpact,
      providerFee,
      handleFromMaxClicked() {
        selectedField.value = "from";
        const accountBalance = balances.value.find(
          (balance) => balance.asset.symbol === fromSymbol.value
        );
        if (!accountBalance) return;
        fromAmount.value = accountBalance.toFixed(18);
      },
      nextStepAllowed: computed(() => {
        return state.value === SwapState.VALID_INPUT;
      }),
      transactionState,
      transactionModalOpen: computed(() => {
        return ["confirming", "signing", "confirmed"].includes(
          transactionState.value
        );
      }),
      requestTransactionModalClose,
      handleArrowClicked() {
        swapInputs();
      },
      handleConfirmClicked() {
        transactionState.value = "signing";
      },
      handleAskConfirmClicked,
      transactionHash,
    };
  },
});
</script>

<template>
  <Layout>
    <div>
      <Modal @close="handleSelectClosed">
        <template v-slot:activator="{ requestOpen }">
          <CurrencyPairPanel
            v-model:fromAmount="fromAmount"
            v-model:fromSymbol="fromSymbol"
            :fromMax="!!fromSymbol"
            :fromDisabled="disableInputFields"
            :toDisabled="disableInputFields"
            @frommaxclicked="handleFromMaxClicked"
            @fromfocus="handleFromFocused"
            @fromblur="handleBlur"
            @fromsymbolclicked="handleFromSymbolClicked(requestOpen)"
            :fromSymbolSelectable="connected"
            :canSwap="nextStepAllowed"
            @arrowclicked="handleArrowClicked"
            v-model:toAmount="toAmount"
            v-model:toSymbol="toSymbol"
            @tofocus="handleToFocused"
            @toblur="handleBlur"
            @tosymbolclicked="handleToSymbolClicked(requestOpen)"
            :toSymbolSelectable="connected"
          />
        </template>
        <template v-slot:default="{ requestClose }">
          <SelectTokenDialogSif
            :selectedTokens="[fromSymbol, toSymbol].filter(Boolean)"
            @tokenselected="requestClose"
          />
        </template>
      </Modal>
      <DetailsPanel
        :toToken="toSymbol || ''"
        :priceMessage="priceMessage || ''"
        :minimumReceived="minimumReceived || ''"
        :providerFee="providerFee || ''"
        :priceImpact="priceImpact || ''"
      />
      <ActionsPanel
        connectType="connectToSif"
        @nextstepclick="handleNextStepClicked"
        :nextStepAllowed="nextStepAllowed"
        :nextStepMessage="nextStepMessage"
      />
      <ModalView
        :requestClose="requestTransactionModalClose"
        :isOpen="transactionModalOpen"
        ><ConfirmationDialog
          @confirmswap="handleAskConfirmClicked"
          :transactionHash="transactionHash"
          :state="transactionState"
          :requestClose="requestTransactionModalClose"
          :priceMessage="priceMessage"
          :fromToken="fromSymbol"
          :fromAmount="fromAmount"
          :toAmount="toAmount"
          :toToken="toSymbol"
      /></ModalView>
    </div>
  </Layout>
</template>

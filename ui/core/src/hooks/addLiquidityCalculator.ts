import { computed, Ref } from "@vue/reactivity";
import { Asset, AssetAmount, IAssetAmount, Pool } from "../entities";
import { Fraction } from "../entities/fraction/Fraction";
import { useField } from "./useField";
import { useBalances } from "./utils";

export enum PoolState {
  SELECT_TOKENS,
  ZERO_AMOUNTS,
  INSUFFICIENT_FUNDS,
  VALID_INPUT,
  NO_LIQUIDITY,
}

export function usePoolCalculator(input: {
  fromAmount: Ref<string>;
  fromSymbol: Ref<string | null>;
  toAmount: Ref<string>;
  toSymbol: Ref<string | null>;
  balances: Ref<IAssetAmount[]>;
  selectedField: Ref<"from" | "to" | null>;
  poolFinder: (a: Asset | string, b: Asset | string) => Ref<Pool> | null;
}) {
  const fromField = useField(input.fromAmount, input.fromSymbol);
  const toField = useField(input.toAmount, input.toSymbol);
  const balanceMap = useBalances(input.balances);

  const fromBalance = computed(() => {
    return input.fromSymbol.value
      ? balanceMap.value.get(input.fromSymbol.value) ?? null
      : null;
  });

  const toBalance = computed(() => {
    return input.toSymbol.value
      ? balanceMap.value.get(input.toSymbol.value) ?? null
      : null;
  });

  const fromBalanceOverdrawn = computed(
    // () => !fromBalance.value?.greaterThan(fromField.fieldAmount.value || "0")
    () => fromBalance.value?.lessThan(fromField.fieldAmount.value || "0")
  );

  const toBalanceOverdrawn = computed(
    // () => !toBalance.value?.greaterThan(toField.fieldAmount.value || "0")
    () => toBalance.value?.lessThan(toField.fieldAmount.value || "0")
  );

  const preExistingPool = computed(() => {
    if (
      !fromField.asset.value ||
      !toField.asset.value
    )
      return null;

    // Find pool from poolFinder
    const pool = input.poolFinder(
      fromField.asset.value.symbol,
      toField.asset.value.symbol
    );
    return pool?.value ?? null;
  });

  const liquidityPool = computed(() => {
    if (
      !fromField.fieldAmount.value ||
      !toField.fieldAmount.value ||
      !fromField.asset.value ||
      !toField.asset.value
    )
      return null;

    return (
      preExistingPool.value ||
      Pool(
        AssetAmount(fromField.asset.value, "0"),
        AssetAmount(toField.asset.value, "0")
      )
    );
  });
  const poolUnitsArray = computed(() => {
    if (
      !liquidityPool.value ||
      !toField.fieldAmount.value ||
      !fromField.fieldAmount.value
    )
      return [new Fraction("0"), new Fraction("0")];

    return liquidityPool.value.calculatePoolUnits(
      toField.fieldAmount.value,
      fromField.fieldAmount.value
    );
  });

  const poolUnits = computed(() => poolUnitsArray.value[1].toFixed(0));
  const totalPoolUnits = computed(() => poolUnitsArray.value[1].toFixed(0));

  const shareOfPool = computed(() => {
    if (!poolUnitsArray.value) return new Fraction("0");

    const [units, lpUnits] = poolUnitsArray.value;

    // shareOfPool should be 0 if units and lpUnits are zero
    if (units.equalTo("0") && lpUnits.equalTo("0")) return new Fraction("0");

    // if no units lp owns 100% of pool
    return units.equalTo("0") ? new Fraction("1") : lpUnits.divide(units);
  });

  const shareOfPoolPercent = computed(() => {
    return `${shareOfPool.value.multiply("100").toFixed(2)}%`;
  });

  const aPerBRatioMessage = computed(() => {
    const aAmount = fromField.fieldAmount.value;
    const bAmount = toField.fieldAmount.value;
    
    if (!aAmount || aAmount.equalTo("0")) return ""; // invalid, must supply external
    if (!bAmount || bAmount.equalTo("0")) {
      // if rowan is 0 or empty ...
      // allow if the pool exists (BUT ratio is inapplicable - N/A),
      // invalid if the pool doesn't exist - ""
      return preExistingPool.value ? "N/A" : ""; 
    }

    return aAmount.divide(bAmount).toFixed(8);
  });

  const bPerARatioMessage = computed(() => {
    const aAmount = fromField.fieldAmount.value;
    const bAmount = toField.fieldAmount.value;

    if (!aAmount || aAmount.equalTo("0")) return ""; // invalid, must supply external

    if (!bAmount || bAmount.equalTo("0")) {
      // if rowan is 0 or empty ...
      // allow if the pool exists (BUT ratio is inapplicable - N/A),
      // invalid if the pool doesn't exist - ""
      return preExistingPool.value ? "N/A" : ""; 
    }

    return bAmount.divide(aAmount).toFixed(8);
  });

  const state = computed(() => {
    const aAmount = fromField.fieldAmount.value;
    const bAmount = toField.fieldAmount.value;

    if (!input.fromSymbol.value || !input.toSymbol.value)
      return PoolState.SELECT_TOKENS;
    
    if (fromBalanceOverdrawn.value || toBalanceOverdrawn.value) 
      return PoolState.INSUFFICIENT_FUNDS;

    if (!aAmount || aAmount.equalTo("0"))
      return PoolState.ZERO_AMOUNTS;

    if (!bAmount || bAmount.equalTo("0"))
      // if rowan is 0 or empty ...
      // allow if the pool exists
      // invalid if the pool doesn't exist - ""
      return preExistingPool.value ? PoolState.VALID_INPUT : PoolState.ZERO_AMOUNTS;

    return PoolState.VALID_INPUT;
  });
  return {
    state,
    aPerBRatioMessage,
    bPerARatioMessage,
    shareOfPool,
    shareOfPoolPercent,
    preExistingPool,
    poolUnits,
    totalPoolUnits,
    fromFieldAmount: fromField.fieldAmount,
    toFieldAmount: toField.fieldAmount,
  };
}

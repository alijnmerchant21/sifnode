import {
  createStore,
  createApi,
  createActions,
  createPoolFinder,
  getConfig,
} from "ui-core";

const config = getConfig(
  process.env.VUE_APP_DEPLOYMENT_TAG,
  process.env.VUE_APP_SIFCHAIN_ASSET_TAG,
  process.env.VUE_APP_ETHEREUM_ASSET_TAG
);

const api = createApi(config);
const store = createStore();
const actions = createActions({ store, api });
const poolFinder = createPoolFinder(store);

export function useCore() {
  return {
    store,
    api,
    actions,
    poolFinder,
    config,
  };
}

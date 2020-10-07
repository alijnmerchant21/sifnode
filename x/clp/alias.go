package clp

import (
	"github.com/Sifchain/sifnode/x/clp/keeper"
	types "github.com/Sifchain/sifnode/x/clp/types"
)

const (
	ModuleName   = types.ModuleName
	RouterKey    = types.RouterKey
	StoreKey     = types.StoreKey
	QuerierRoute = types.QuerierRoute
)

var (
	NewKeeper             = keeper.NewKeeper
	NewMsgSwap            = types.NewMsgSwap
	NewMsgAddLiquidity    = types.NewMsgAddLiquidity
	NewMsgRemoveLiquidity = types.NewMsgRemoveLiquidity
	NewMsgCreatePool      = types.NewMsgCreatePool
	NewLiquidityProvider  = types.NewLiquidityProvider
	NewAsset              = types.NewAsset
	NewPool               = types.NewPool
)

type (
	Keeper             = keeper.Keeper
	MsgCreatePool      = types.MsgCreatePool
	MsgAddLiquidity    = types.MsgAddLiquidity
	MsgRemoveLiquidity = types.MsgRemoveLiquidity
	MsgSwap            = types.MsgSwap
	Pool               = types.Pool
	LiquidityProvider  = types.LiquidityProvider
	Asset              = types.Asset
)

/// <reference types="node" />
import { Amount, InstructionsWrapper } from "@mrgnlabs/mrgn-common";
import { Address } from "@coral-xyz/anchor";
import { AccountMeta, Commitment, PublicKey, Transaction, TransactionInstruction, Signer, AddressLookupTableAccount, VersionedTransaction } from "@solana/web3.js";
import BigNumber from "bignumber.js";
import { MarginfiClient, MarginfiGroup } from "../..";
import { MarginfiAccount, MarginRequirementType, MarginfiAccountRaw } from "./pure";
import { Bank } from "../bank";
import { Balance } from "../balance";
export interface SimulationResult {
    banks: Map<string, Bank>;
    marginfiAccount: MarginfiAccountWrapper;
}
export interface FlashLoanArgs {
    ixs: TransactionInstruction[];
    signers?: Signer[];
    addressLookupTableAccounts?: AddressLookupTableAccount[];
}
declare class MarginfiAccountWrapper {
    private readonly client;
    address: PublicKey;
    private _marginfiAccount;
    /**
     * @internal
     */
    private constructor();
    static fetch(marginfiAccountPk: Address, client: MarginfiClient, commitment?: Commitment): Promise<MarginfiAccountWrapper>;
    static fromAccountParsed(marginfiAccountPk: Address, client: MarginfiClient, accountData: MarginfiAccountRaw): MarginfiAccountWrapper;
    static fromAccountDataRaw(marginfiAccountPk: PublicKey, client: MarginfiClient, marginfiAccountRawData: Buffer): MarginfiAccountWrapper;
    get authority(): PublicKey;
    get group(): MarginfiGroup;
    get balances(): Balance[];
    get data(): MarginfiAccount;
    /** @internal */
    private get _program();
    /** @internal */
    private get _config();
    get activeBalances(): Balance[];
    get isDisabled(): boolean;
    get isFlashLoanEnabled(): boolean;
    get isTransferAccountAuthorityEnabled(): boolean;
    getBalance(bankPk: PublicKey): Balance;
    updateAccountAddressAndAuthority(address: PublicKey, authority: PublicKey): void;
    canBeLiquidated(): boolean;
    computeHealthComponents(marginRequirement: MarginRequirementType, excludedBanks?: PublicKey[]): {
        assets: BigNumber;
        liabilities: BigNumber;
    };
    computeFreeCollateral(opts?: {
        clamped?: boolean;
    }): BigNumber;
    computeHealthComponentsWithoutBias(marginRequirement: MarginRequirementType): {
        assets: BigNumber;
        liabilities: BigNumber;
    };
    computeAccountValue(): BigNumber;
    computeMaxBorrowForBank(bankAddress: PublicKey, opts?: {
        volatilityFactor?: number;
    }): BigNumber;
    computeMaxWithdrawForBank(bankAddress: PublicKey, opts?: {
        volatilityFactor?: number;
    }): BigNumber;
    computeMaxLiquidatableAssetAmount(assetBankAddress: PublicKey, liabilityBankAddress: PublicKey): BigNumber;
    computeLiquidationPriceForBank(bankAddress: PublicKey): number | null;
    computeLiquidationPriceForBankAmount(bankAddress: PublicKey, isLending: boolean, amount: number): number | null;
    computeNetApy(): number;
    makePriorityFeeIx(priorityFeeUi?: number): TransactionInstruction[];
    makeComputeBudgetIx(): TransactionInstruction[];
    makeDepositIx(amount: Amount, bankAddress: PublicKey): Promise<InstructionsWrapper>;
    deposit(amount: Amount, bankAddress: PublicKey, priorityFeeUi?: number): Promise<string>;
    simulateDeposit(amount: Amount, bankAddress: PublicKey): Promise<SimulationResult>;
    repayWithCollat(amount: Amount, repayAmount: Amount, bankAddress: PublicKey, repayBankAddress: PublicKey, withdrawAll: boolean | undefined, repayAll: boolean | undefined, swapIxs: TransactionInstruction[], addressLookupTableAccounts: AddressLookupTableAccount[], priorityFeeUi?: number): Promise<string>;
    simulateRepayWithCollat(amount: Amount, repayAmount: Amount, bankAddress: PublicKey, repayBankAddress: PublicKey, repayAll: boolean | undefined, swapIxs: TransactionInstruction[], addressLookupTableAccounts: AddressLookupTableAccount[]): Promise<SimulationResult>;
    makeRepayIx(amount: Amount, bankAddress: PublicKey, repayAll?: boolean): Promise<InstructionsWrapper>;
    repay(amount: Amount, bankAddress: PublicKey, repayAll?: boolean, priorityFeeUi?: number): Promise<string>;
    simulateRepay(amount: Amount, bankAddress: PublicKey, repayAll?: boolean): Promise<SimulationResult>;
    makeWithdrawIx(amount: Amount, bankAddress: PublicKey, withdrawAll?: boolean, opt?: {
        observationBanksOverride?: PublicKey[];
    } | undefined): Promise<InstructionsWrapper>;
    withdraw(amount: Amount, bankAddress: PublicKey, withdrawAll?: boolean, priorityFeeUi?: number): Promise<string>;
    simulateWithdraw(amount: Amount, bankAddress: PublicKey, withdrawAll?: boolean): Promise<SimulationResult>;
    makeBorrowIx(amount: Amount, bankAddress: PublicKey, skipAtaSetup?: boolean, opt?: {
        observationBanksOverride?: PublicKey[];
    } | undefined): Promise<InstructionsWrapper>;
    borrow(amount: Amount, bankAddress: PublicKey, priorityFeeUi?: number): Promise<string>;
    simulateBorrow(amount: Amount, bankAddress: PublicKey): Promise<SimulationResult>;
    makeWithdrawEmissionsIx(bankAddress: PublicKey): Promise<InstructionsWrapper>;
    withdrawEmissions(bankAddress: PublicKey): Promise<string>;
    makeLendingAccountLiquidateIx(liquidateeMarginfiAccount: MarginfiAccount, assetBankAddress: PublicKey, assetQuantityUi: Amount, liabBankAddress: PublicKey): Promise<InstructionsWrapper>;
    lendingAccountLiquidate(liquidateeMarginfiAccount: MarginfiAccount, assetBankAddress: PublicKey, assetQuantityUi: Amount, liabBankAddress: PublicKey): Promise<string>;
    makeBeginFlashLoanIx(endIndex: number): Promise<InstructionsWrapper>;
    makeEndFlashLoanIx(projectedActiveBalances: PublicKey[]): Promise<InstructionsWrapper>;
    flashLoan(args: FlashLoanArgs): Promise<string>;
    buildFlashLoanTx(args: FlashLoanArgs, lookupTables?: AddressLookupTableAccount[]): Promise<VersionedTransaction>;
    buildFlashLoanTxV0(args: FlashLoanArgs, createNewAccountIx?: InstructionsWrapper): Promise<Transaction>;
    makeTransferAccountAuthorityIx(newAccountAuthority: PublicKey): Promise<InstructionsWrapper>;
    transferAccountAuthority(newAccountAuthority: PublicKey): Promise<string>;
    getHealthCheckAccounts(mandatoryBanks?: Bank[], excludedBanks?: Bank[]): AccountMeta[];
    private static _fetchAccountData;
    static encode(decoded: MarginfiAccountRaw): Promise<Buffer>;
    reload(): Promise<void>;
    private _updateFromAccountParsed;
    describe(): string;
}
export { MarginfiAccountWrapper };
//# sourceMappingURL=wrapper.d.ts.map
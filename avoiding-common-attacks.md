# SWC Registry

## SWC-103 Floating Pragma

`Pool`,`Qfunding` and `Project` contracts use fixed floating pragma `0.8.10`

## SWC-123 Requirement Violation

Both `Pool` and `Qfunding` contracts use `require()` construct to validate legit external inputs e.g.

- Pool `calandPayoutMatch` function uses ` require(sumSquaredSqrtFundsSum>0,"No contributions recorded");`, and
- Qfunding `payoutpools` function uses `require(poolsID<poolcount,"Pool does not exist");`
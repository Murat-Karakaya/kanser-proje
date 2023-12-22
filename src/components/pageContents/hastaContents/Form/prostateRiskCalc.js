export default (info) => {
    const patientVarList = [Math.log(parseFloat(info.PSA))*Math.LOG2E, info.DRE, info.priorBiop, info.famHist, info.AA, info.age]
    const s1Constant = -3.00215469
    const s2Constant = -7.05304534
    const s1CoeffList = [0.25613390, -0.03864628, -0.45533257, 0.27197219, .12172599, 0.01643637]
    const s2CoeffList = [0.70489441, 0.40068434, -0.21409933, 0.22467348, 1.04174529, 0.04753804]

    let s1 = 0
    let s2 = 0
    patientVarList.forEach((e, index) => {
        s1 += (e * s1CoeffList[index])
        s2 += (e * s2CoeffList[index])
    })
    s1 += s1Constant
    s2 += s2Constant

    const risk = {noRisk:100,lowRisk:0,highRisk:0}
    risk.noRisk = 1*100 / (1 + Math.exp(s1) + Math.exp(s2)),
    risk.lowRisk = Math.exp(s1)*100 / (1 + Math.exp(s1) + Math.exp(s2))
    risk.highRisk = Math.exp(s2)*100 / (1 + Math.exp(s1) + Math.exp(s2))

    return risk
}
export default (age, gender, race, totalCholesterol, hdl, systolic, hypertensive, smoker, diabetic) => {
  const whom = {
    true: {
      true: 'aa_male',
      false: 'aa_female'
    },
    false: {
      true: 'male',
      false: 'female'
    }
  };

  const baselineSurvival = {
    aa_male: 0.89536,
    aa_female: 0.95334,
    male: 0.91436,
    female: 0.96652
  };

  const mnxb = {
    aa_male: 19.5425,
    aa_female: 86.6081,
    male: 61.1816,
    female: -29.1817
  };

  const coefficientTable = {
    aa_male: {
      age_co: 2.469,
      age2_co: 0,
      chol_co: 0.302,
      chol_age_co: 0,
      hdl_co: -0.307,
      hdl_age_co: 0,
      treated_systolic_co: 1.916,
      treated_systolic_age_co: 0,
      untreated_systolic_co: 1.809,
      untreated_systolic_age_co: 0,
      smoker_co: 0.549,
      smoker_age_co: 0,
      diabetic_co: 0.645
    },
    aa_female: {
      age_co: 17.1141,
      age2_co: 0,
      chol_co: 0.9396,
      chol_age_co: 0,
      hdl_co: -18.9196,
      hdl_age_co: 4.4748,
      treated_systolic_co: 29.2907,
      treated_systolic_age_co: -6.4321,
      untreated_systolic_co: 27.8197,
      untreated_systolic_age_co: -6.0873,
      smoker_co: 0.6908,
      smoker_age_co: 0,
      diabetic_co: 0.8738
    },
    male: {
      age_co: 12.344,
      age2_co: 0,
      chol_co: 11.853,
      chol_age_co: -2.664,
      hdl_co: -7.990,
      hdl_age_co: 1.769,
      treated_systolic_co: 1.797,
      treated_systolic_age_co: 0,
      untreated_systolic_co: 1.764,
      untreated_systolic_age_co: 0,
      smoker_co: 7.837,
      smoker_age_co: -1.795,
      diabetic_co: 0.658
    },
    female: {
      age_co: -29.799,
      age2_co: 4.884,
      chol_co: 13.540,
      chol_age_co: -3.114,
      hdl_co: -13.578,
      hdl_age_co: 3.149,
      treated_systolic_co: 2.019,
      treated_systolic_age_co: 0,
      untreated_systolic_co: 1.957,
      untreated_systolic_age_co: 0,
      smoker_co: 7.574,
      smoker_age_co: -1.665,
      diabetic_co: 0.661
    }
  };

  const computeTenYearScore = () => {
    const predictRet = sumOfCalcs();
    const pct = 1 - Math.pow(baselineSurvival[who()], Math.exp(predictRet - mnxb[who()]));
    return Math.round(pct * 1000) / 10;
  };

  const sumOfCalcs = () => {
    const cof = coefficients();

    return Math.round((
      calcAgeValue(cof) +
      calcAgeSquaredValue(cof) +
      calcCholesterolValue(cof) +
      calcCholesterolAgeValue(cof) +
      calcHdlValue(cof) +
      calcHdlAgeValue(cof) +
      calcTreatedSystolicValue(cof) +
      calcTreatedSystolicAgeValue(cof) +
      calcUntreatedSystolicValue(cof) +
      calcUntreatedSystolicAgeValue(cof) +
      calcSmokerValue(cof) +
      calcSmokerAgeValue(cof) +
      calcDiabeticValue(cof)
    )*100) / 100;
  };

  const calcDiabeticValue = (cof) => Math.round(cof.diabetic_co * Number(diabetic) * 100) / 100;
  const calcSmokerAgeValue = (cof) => Math.round(cof.smoker_age_co * Math.log(age) * Number(smoker) * 100) / 100;
  const calcSmokerValue = (cof) => Math.round(cof.smoker_co * Number(smoker) * 100) / 100;
  const calcUntreatedSystolicAgeValue = (cof) => Math.round(cof.untreated_systolic_age_co * Math.log(age) * Math.log(systolic) * Number(!hypertensive) * 100) / 100;
  const calcUntreatedSystolicValue = (cof) => Math.round(cof.untreated_systolic_co * Math.log(systolic) * Number(!hypertensive) * 100) / 100;
  const calcTreatedSystolicAgeValue = (cof) => Math.round(cof.treated_systolic_age_co * Math.log(age) * Math.log(systolic) * Number(hypertensive) * 100) / 100;
  const calcTreatedSystolicValue = (cof) => Math.round(cof.treated_systolic_co * Math.log(systolic) * Number(hypertensive) * 100) / 100;
  const calcHdlAgeValue = (cof) => Math.round(cof.hdl_age_co * Math.log(age) * Math.log(hdl) * 100) / 100;
  const calcHdlValue = (cof) => Math.round(cof.hdl_co * Math.log(hdl) * 100) / 100;
  const calcCholesterolAgeValue = (cof) => Math.round(cof.chol_age_co * Math.log(age) * Math.log(totalCholesterol) * 100) / 100;
  const calcCholesterolValue = (cof) => Math.round(cof.chol_co * Math.log(totalCholesterol) * 100) / 100;
  const calcAgeSquaredValue = (cof) => Math.round(cof.age2_co * Math.pow(Math.log(age), 2) * 100) / 100;
  const calcAgeValue = (cof) => Math.round(cof.age_co * Math.log(age) * 100) / 100;

  const who = () => whom[race === 'aa'][gender === 'male'];
  const coefficients = () => coefficientTable[who()];

  return computeTenYearScore();
};
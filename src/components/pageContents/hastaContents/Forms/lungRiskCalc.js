export default(age, race, education, bmi, copd, cancer_hist, family_hist_lung_cancer, smoking_status, smoking_intensity, duration_smoking, smoking_quit_time) =>{
    if (race === "white") {
        const model = 0.0778868 * (age - 62) - 0.0812744 * (education - 4) - 0.0274194 * (bmi - 27) + 0.3553063 * copd + 0.4589971 * cancer_hist +
            0.587185 * family_hist_lung_cancer + 0.2597431 * smoking_status - 1.822606 * (Math.pow((smoking_intensity/10), -1) - 0.4021541613) + 0.0317321 *
            (duration_smoking - 27) - 0.0308572 * (smoking_quit_time - 10) - 4.532506;
        return 100 * (Math.exp(model) / (1 + Math.exp(model)));
    }
    if (race === "black") {
        const model = 0.0778868 * (age - 62) - 0.0812744 * (education - 4) - 0.0274194 * (bmi - 27) + 0.3553063 * copd + 0.4589971 * cancer_hist +
            0.587185 * family_hist_lung_cancer + 0.2597431 * smoking_status - 1.822606 * (Math.pow((smoking_intensity/10), -1) - 0.4021541613) + 0.0317321 *
            (duration_smoking - 27) - 0.0308572 * (smoking_quit_time - 10) - 4.532506 + 0.3944778;
        return 100 * (Math.exp(model) / (1 + Math.exp(model)));
    }
    if (race === "hispanic") {
        const model = 0.0778868 * (age - 62) - 0.0812744 * (education - 4) - 0.0274194 * (bmi - 27) + 0.3553063 * copd + 0.4589971 * cancer_hist +
            0.587185 * family_hist_lung_cancer + 0.2597431 * smoking_status - 1.822606 * (Math.pow((smoking_intensity/10), -1) - 0.4021541613) + 0.0317321 *
            (duration_smoking - 27) - 0.0308572 * (smoking_quit_time - 10) - 4.532506 - 0.7434744;
        return 100 * (Math.exp(model) / (1 + Math.exp(model)));
    }
    if (race === "asian") {
        const model = 0.0778868 * (age - 62) - 0.0812744 * (education - 4) - 0.0274194 * (bmi - 27) + 0.3553063 * copd + 0.4589971 * cancer_hist +
            0.587185 * family_hist_lung_cancer + 0.2597431 * smoking_status - 1.822606 * (Math.pow((smoking_intensity/10), -1) - 0.4021541613) + 0.0317321 *
            (duration_smoking - 27) - 0.0308572 * (smoking_quit_time - 10) - 4.532506 - 0.466585;
        return 100 * (Math.exp(model) / (1 + Math.exp(model)));
    }
    if (race === "hawaiian") {
        const model = 0.0778868 * (age - 62) - 0.0812744 * (education - 4) - 0.0274194 * (bmi - 27) + 0.3553063 * copd + 0.4589971 * cancer_hist +
            0.587185 * family_hist_lung_cancer + 0.2597431 * smoking_status - 1.822606 * (Math.pow((smoking_intensity/10), -1) - 0.4021541613) + 0.0317321 *
            (duration_smoking - 27) - 0.0308572 * (smoking_quit_time - 10) - 4.532506 + 1.027152;
        return 10000 * (Math.exp(model) / (1 + Math.exp(model)));
    }
}
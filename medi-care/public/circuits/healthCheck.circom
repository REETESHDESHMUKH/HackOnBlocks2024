pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/comparators.circom";

template HealthCheck() {
    signal input age;
    signal input bloodPressure;
    signal output isHealthy;

    component ageCheck = LessThan(8);
    ageCheck.in[0] <== age;
    ageCheck.in[1] <== 100;

    component bpCheck = LessThan(8);
    bpCheck.in[0] <== bloodPressure;
    bpCheck.in[1] <== 140;

    isHealthy <== ageCheck.out * bpCheck.out;
}

component main = HealthCheck();
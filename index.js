const password = document.getElementById("password");
const rule1 = document.getElementById("rule1");
const rule2 = document.getElementById("rule2");
const rule3 = document.getElementById("rule3");

function validatePassword() {
    const passwordValue = password.value;
    const passwordLength = passwordValue.length;
    const firstCharacter = passwordValue[0];
    const lastCharacter = passwordValue[passwordLength - 1];

    console.log(passwordValue);

    //reset all rules when password is empty
    if (passwordValue === "") {
        rule1.style.display = "block";
        rule2.style.display = "block";
        rule3.style.display = "block";
    }

    validateFirstCharacter(firstCharacter);
    validateLastCharacter(lastCharacter);
    validateLength(passwordLength);
}

function validateFirstCharacter(firstCharacter) {
    if (firstCharacter === firstCharacter.toUpperCase() && isNaN(firstCharacter)) {
        rule2.style.display = "none";
    } else {
        rule2.style.display = "block";
    }
}

function validateLastCharacter(lastCharacter) {
    console.log(typeof lastCharacter);
    console.log(isNaN(lastCharacter));
    if (!isNaN(lastCharacter)) {
        rule3.style.display = "none";
    } else {
        rule3.style.display = "block";
    }
}

function validateLength(passwordLength) {
    if (passwordLength >= 8) {
        rule1.style.display = "none";
    } else {
        rule1.style.display = "block";
    }
}

password.addEventListener("input", validatePassword);
password.addEventListener("change", validatePassword);
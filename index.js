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
        return;
    }

    validateFirstCharacter(firstCharacter);
    validateLastCharacter(lastCharacter);
    validateLength(passwordLength);
}

function validateFirstCharacter(firstCharacter) {
    //check by ascii
    if(firstCharacter.charCodeAt(0) < 65 || firstCharacter.charCodeAt(0) > 90) {
        rule2.style.display = "block";
        return;
    }
    rule2.style.display = "none";
}

function validateLastCharacter(lastCharacter) {
    //check by ascii
    console.log(lastCharacter.charCodeAt(0));
    if (lastCharacter.charCodeAt(0) < 48 || lastCharacter.charCodeAt(0) > 57) {
        rule3.style.display = "block";
        return;
    }
    rule3.style.display = "none";
}

function validateLength(passwordLength) {
    if (passwordLength >= 8) {
        rule1.style.display = "none";
    } else {
        rule1.style.display = "block";
    }
}

password.addEventListener("input", validatePassword);

/* Here goes your JS code */

const clickMeBtn = document.getElementById("show-popup-form");
const popup = document.querySelector(".popup");
const fields = ["email", "password"];
const cancelBtn = document.querySelector(".cancel");
const submitBtn = document.querySelector(".login-button");
const thanks = document.querySelector(".login-confirmation");
//
clickMeBtn.addEventListener("click", () => {
  popup.classList.remove("hidden");
});

cancelBtn.addEventListener("click", e => {
  e.preventDefault();
  popup.classList.add("hidden");
});

class FormValidator {
    constructor(fields) {
        this.fields = fields;
    }

    initialize() {
        this.validateOnEntry();
        this.validateOnSubmit();
    }

    validateOnSubmit() {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.fields.forEach(field => {
                        const input = document.querySelector(`#${field}`);
                        this.validateFields(input);
                    });
            let isValid = true;
            const arr = Array.from(document.getElementsByClassName('error'))
            arr.map(err => {
                if (err.innerHTML) isValid = false;
            })
            if (isValid) {
                setInterval(() => {
                    thanks.classList.remove('hidden');
                    clickMeBtn.classList.add('hidden');
                    popup.classList.add('hidden');
                }, 3000)
            }
        })
    }

    validateOnEntry() {
        this.fields.forEach(field => {
            const input = document.querySelector(`#${field}`);

            input.addEventListener("input", () => {
                this.validateFields(input);
            });
        });
    }

    validateFields(field) {
        if (field.value.trim() === "") {
            this.setStatus(field, "Field cannot be empty", "error");
        } else if (field.type === "password" && field.value.trim().length < 8) {
            this.setStatus(
                field,
                "Password should have at least 8 characters",
                "error"
            );
        } else {
            this.setStatus(field, null, "success");
        }
        if (field.type === "email") {
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(field.value)) {
                this.setStatus(field, "Please enter valid email address", "error");
            } else {
                this.setStatus(field, null, "success");
            }
        }
    }

    setStatus(field, message, status) {
        const errorMessage = field.parentElement.querySelector(".error");
        if (status === "error") {
            field.parentElement.querySelector(".error").innerText = message;
            field.classList.add("input-error");
        }
        if (status === "success") {
            if (errorMessage) {
                errorMessage.innerText = "";
            }
            field.classList.remove("input-error");
        }
    }
}
const validator = new FormValidator(fields);

validator.initialize();
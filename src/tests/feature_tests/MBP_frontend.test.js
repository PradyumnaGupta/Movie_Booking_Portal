const {assert}=require("chai");
const mongoose=require("mongoose");
const Users=require("../../../Databases/users_collection.js");


mongoose.connect("mongodb://127.0.0.1:27017/MBP")
.then(()=>{console.log("Connected to Database...")})
.catch((error)=>{console.log(error)});

describe("Front-End Testing",()=>{
    describe("Testing Login",()=>{

        let wrongUsername='abcd';
        let wrongPassword='abcd';

        it("Failing login with wrong credentials",()=>{
            browser.url('/');
            $('#login-button').click();
            $('#user').setValue(wrongUsername);
            $('#pass').setValue(wrongPassword);
            $('#submit').click();
            assert.equal(browser.getAlertText(),"There is no account linked to that username and password");
        });

        let tempUsername='temporary';
        let tempPassword='Temporary';

        it("Passing login with correct credentials",()=>{
            browser.url('/');
            $('#login-button').click();
            $('#user').setValue(tempUsername);
            $('#pass').setValue(tempPassword);
            $('#submit').click();
            assert.equal($('#greeting').getText(),`Hey ${tempUsername}`);
            $('#logout').click();
        });

    });
    describe("Testing Registration",()=>{
        let tempUsername='temp';
        let tempPassword='Temp@123';
        let tempEmail='temp@email.com';
        let tempPhone='1234567890';

        after(()=>{
            Users.findOneAndRemove(
                {Username:tempUsername}
            )
            .catch((error)=>{console.log(error)});
        });

        afterEach(()=>{
            tempUsername='temp';
            tempPassword='Temp@123';
            tempEmail='temp@email.com';
            tempPhone='1234567890';
        })
        
        it("Passing to register with valid information",()=>{
            browser.url('/');
            $('#register-button').click();
            $('#user').setValue(tempUsername);
            $('#pass').setValue(tempPassword);
            $('#email').setValue(tempEmail);
            $('#phone').setValue(tempPhone);
            $('#submit').click();
            assert.equal($('#greeting').getText(),`Hey ${tempUsername}`);
            $('#logout').click();
        });

        it("Failing to register with invalid username",()=>{
            tempUsername='!@#$%';
            browser.url('/');
            $('#register-button').click();
            $('#user').setValue(tempUsername);
            $('#pass').setValue(tempPassword);
            $('#email').setValue(tempEmail);
            $('#phone').setValue(tempPhone);
            $('#submit').click();
            assert.equal(browser.getAlertText(),"Username can't contain special characters.");
            try{$('#logout').click();}catch(e){};
        });

        it("Failing to register with invalid password",()=>{
            tempPassword='temp!@#$%';
            browser.url('/');
            $('#register-button').click();
            $('#user').setValue(tempUsername);
            $('#pass').setValue(tempPassword);
            $('#email').setValue(tempEmail);
            $('#phone').setValue(tempPhone);
            $('#submit').click();
            assert.equal(browser.getAlertText(),"Password does not meet the rule requirements.Please try again.");
            try{$('#logout').click();}catch(e){};
        });

        it("Failing to register with invalid email",()=>{
            tempEmail='!@#$%';
            browser.url('/');
            $('#register-button').click();
            $('#user').setValue(tempUsername);
            $('#pass').setValue(tempPassword);
            $('#email').setValue(tempEmail);
            $('#phone').setValue(tempPhone);
            $('#submit').click();
            assert.equal(browser.getAlertText(),"Please enter a valid email address.");
            try{$('#logout').click();}catch(e){};
        });

        it("Failing to register with invalid phone",()=>{
            tempPhone='!@#$%';
            browser.url('/');
            $('#register-button').click();
            $('#user').setValue(tempUsername);
            $('#pass').setValue(tempPassword);
            $('#email').setValue(tempEmail);
            $('#phone').setValue(tempPhone);
            $('#submit').click();
            assert.equal(browser.getAlertText(),"Please enter a valid 10 digit phone number.");
            try{$('#logout').click();}catch(e){};
        });
    });
});
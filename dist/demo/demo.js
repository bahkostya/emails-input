!function(){"use strict";document.addEventListener("DOMContentLoaded",(function(){var t=document.querySelector("#emails-input"),e=window.EmailsInput(t,{placeholder:"add more people..."});window.emailsInput=e,document.querySelector('[data-button="add-email"]').addEventListener("click",(function(){var t="".concat(Math.random().toString(36).substring(7),"@miro.com");e.add(t)})),document.querySelector('[data-button="get-emails-count"]').addEventListener("click",(function(){var t=e.getAll().filter((function(t){return!!t.isValid}));alert("Number of valid emails: ".concat(t.length))}))}))}();

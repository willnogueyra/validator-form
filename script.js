let validator = {
    handleSubmit:(event)=> {
        event.preventDefault(); // desativa o comportamento padrão de enviar
        let send = true;

        let inputs = form.querySelectorAll('input');

        validator.clearErrors();

        for(let i=0; i<inputs.length; i++) { // seleciona cada um dos input
            let input = inputs[i]
            let check = validator.checkInput(input);
            if(check !== true) {
                send = false;
                validator.showError(input, check);
            }
        }

        if(send) { // se send for true realiza o envio
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');

        if(rules !== null) {
            rules = rules.split('|');
            for(let k in rules){
                let rDetails = rules[k].split('=');
                switch(rDetails[0]) {
                    case 'required':
                        if(input.value == '') {
                            return 'Campo não pode ser vazio'
                        }
                    break;    
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return `Campo tem que ter pelomenos ${rDetails[1]} caracteres`
                        }
                    break;
                    case 'email':
                        if(input.value != '') {
                            //expressão regular de verificação de email
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())){
                                return "Email digitado não é válido";
                            }
                        }
                    break;
                } 
            }
        }

        return true;
    },
    showError:(input, error) =>{
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:()=> {
        let inputs = form.querySelectorAll('input');
        for(let i=0; i<inputs.length; i++) {
            inputs[i].style = '';
        }
        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i<errorElements.length; i++){
            errorElements[i].remove()
        }
    }

}


let form = document.querySelector('.formulario');
form.addEventListener('submit', validator.handleSubmit) // ao enviar, roda function handleSubmit

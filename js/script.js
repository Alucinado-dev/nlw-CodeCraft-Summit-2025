const form = document.getElementById('form');

const formAction =  () => {
    form.onsubmit = (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        console.log(email, phone);
    }
}

const startApp = () => {
    const content = `
                <input type="email" name="email" id="email" placeholder="E-mail">

                <input type="tel" name="phone" id="phone" placeholder="Telefone">

                <button>Confirmar</button>`;

    form.innerHTML = content;
    formAction();
};

startApp();
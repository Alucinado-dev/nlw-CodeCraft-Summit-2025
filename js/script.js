const app = document.getElementById('app');

/* banco de dados existente para exemplo da aplicação */
const users= [
    {
        email:'test@test.com',
        phone: '91123456789',
        ref: 1,
        refBy: null
    },
    {
        email:'taste@taste.com',
        phone: '91987654321',
        ref: 2,
        refBy: 1
    },
    {
        email: 'seila@naosei.com',
        phone: '919568239874',
        ref: 3,
        refBy: 2
    }

]

/* salva o novo usuário no banco de dados */

const saveUser = (userData) => {
    const newUser ={
        ...userData,
        ref: Math.round(Math.random()*10000 + 4),
        refBy: 1 /* não tenho habilidades o suficiente para manipular como um número dinâmico ainda, portanto todos os usuários vão ser referenciados pelo usuário 1 */
    }

    users.push(newUser);
    return newUser;
}

/* Pega o usuário cadastrado que tem o email digitado, se existir*/

const getUserByEmail = (userData) => {
    return users.find((user) =>{
        return user.email === userData.email;
    });
}

/* conta o total de inscritos */

const getTotalSubscribers = (userData) =>{
    const subs = users.filter((user) =>{
        user.refBy === userData.ref;
    }) 
    return subs.length;
}

/* mostra o convite ao invés do formulário */

const showInvite = (userData) => {
    app.innerHTML = `
                <div class="link-container">
                <label for="link">Seu link foi gerado</label>
                <input type="text" name="link" id="link" value="https://evento.com?${userData.ref}" disabled>
                <button id="copy">Copiar</button>
            </div>

            <div class="count-subscriptions">
                <h4>${getTotalSubscribers(userData)}</h4>
                <p>Inscrições feitas</p>
            </div>`;
}

/* função que será chamada ao submeter o formulário */

const formAction =  () => {
    app.onsubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const userData = {
            email: formData.get('email'),
            phone: formData.get('phone')
        }

        const user = getUserByEmail(userData);
        if(user){
            /* usuario existe */
            showInvite(user)
        } else{
            /* criar novo usuario */
            const newUser = saveUser(userData);
            showInvite(newUser);
        }
    }
}


/* coloca o  fomulário ao iniciar a aplicação */

const startApp = () => {
    const content = `
                <form>
                <input type="email" name="email" id="email" placeholder="E-mail">

                <input type="tel" name="phone" id="phone" placeholder="Telefone">

                <button>Confirmar</button>
                </form>`;

    app.innerHTML = content;
    formAction();
};

startApp();